import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function JavaExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Java Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Java integration examples using the Metigan SDK. Learn how to send emails, manage contacts, 
          and integrate Metigan into your Java applications.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Installation</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Maven</h3>
        <CodeBlock
          language="xml"
          fileName="pom.xml"
          code={`<dependency>
  <groupId>com.metigan</groupId>
  <artifactId>metigan-java</artifactId>
  <version>1.0.0</version>
</dependency>`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Gradle</h3>
        <CodeBlock
          language="gradle"
          fileName="build.gradle"
          code={`dependencies {
    implementation 'com.metigan:metigan-java:1.0.0'
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Setup</h2>
        <CodeBlock
          language="java"
          fileName="BasicExample.java"
          code={`import com.metigan.MetiganClient;
import com.metigan.model.EmailOptions;
import com.metigan.model.EmailSuccessResponse;

// Initialize the client
MetiganClient client = new MetiganClient.Builder()
    .apiKey(System.getenv("METIGAN_API_KEY"))
    .build();

// Send email
EmailOptions options = new EmailOptions.Builder()
    .from("Sender <sender@example.com>")
    .recipients(Arrays.asList("customer@email.com"))
    .subject("Welcome!")
    .content("<h1>Hello!</h1><p>Thank you for signing up.</p>")
    .build();

EmailSuccessResponse result = client.email().sendEmail(options);

if (result.isSuccess()) {
    System.out.println("Email sent successfully!");
    System.out.println("Emails remaining: " + result.getEmailsRemaining());
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Sending Emails</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Basic Email</h3>
        <CodeBlock
          language="java"
          fileName="send-email.java"
          code={`EmailOptions options = new EmailOptions.Builder()
    .from("sender@example.com")
    .recipients(Arrays.asList("recipient@example.com"))
    .subject("Email Subject")
    .content("<h1>HTML Content</h1><p>This is the email body.</p>")
    .build();

EmailSuccessResponse result = client.email().sendEmail(options);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with CC and BCC</h3>
        <CodeBlock
          language="java"
          fileName="send-email-cc.java"
          code={`EmailOptions options = new EmailOptions.Builder()
    .from("company@email.com")
    .recipients(Arrays.asList("main@email.com"))
    .subject("Meeting")
    .content("Email content")
    .cc(Arrays.asList("copy@email.com"))
    .bcc(Arrays.asList("hidden-copy@email.com"))
    .replyTo("reply-here@email.com")
    .build();`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Attachments</h3>
        <CodeBlock
          language="java"
          fileName="send-email-attachment.java"
          code={`import java.nio.file.Files;
import java.nio.file.Paths;
import com.metigan.model.Attachment;

byte[] fileData = Files.readAllBytes(Paths.get("document.pdf"));

Attachment attachment = new Attachment.Builder()
    .content(fileData)
    .filename("document.pdf")
    .contentType("application/pdf")
    .build();

EmailOptions options = new EmailOptions.Builder()
    .from("company@email.com")
    .recipients(Arrays.asList("customer@email.com"))
    .subject("Important Document")
    .content("Please find the document attached.")
    .attachments(Arrays.asList(attachment))
    .build();`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Template</h3>
        <CodeBlock
          language="java"
          fileName="send-email-template.java"
          code={`import java.util.HashMap;
import java.util.Map;

Map<String, Object> variables = new HashMap<>();
variables.put("name", "John Doe");
variables.put("company", "Acme Inc");

EmailSuccessResponse result = client.email().sendEmailWithTemplate(
    "template-123",
    variables,
    new EmailOptions.Builder()
        .from("sender@example.com")
        .recipients(Arrays.asList("recipient@example.com"))
        .build()
);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Contact Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Contact</h3>
        <CodeBlock
          language="java"
          fileName="create-contact.java"
          code={`import com.metigan.model.CreateContactOptions;
import com.metigan.model.Contact;

CreateContactOptions options = new CreateContactOptions.Builder()
    .email("new@email.com")
    .firstName("Jane")
    .lastName("Doe")
    .audienceId("audience-123")
    .tags(Arrays.asList("customer", "newsletter"))
    .build();

Contact contact = client.contacts().create(options);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Contact</h3>
        <CodeBlock
          language="java"
          fileName="get-contact.java"
          code={`// By ID
Contact contact = client.contacts().get("contact-456");

// By email
Contact contact = client.contacts().getByEmail("jane@email.com", "audience-123");`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Contacts</h3>
        <CodeBlock
          language="java"
          fileName="list-contacts.java"
          code={`import com.metigan.model.ContactListFilters;
import com.metigan.model.ContactListResponse;
import com.metigan.model.ContactStatus;

ContactListFilters filters = new ContactListFilters.Builder()
    .audienceId("audience-123")
    .status(ContactStatus.SUBSCRIBED)
    .page(1)
    .limit(50)
    .build();

ContactListResponse result = client.contacts().list(filters);

System.out.println("Total contacts: " + result.getPagination().getTotal());
for (Contact contact : result.getContacts()) {
    System.out.println(contact.getEmail() + ": " + contact.getFirstName());
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Update Contact</h3>
        <CodeBlock
          language="java"
          fileName="update-contact.java"
          code={`import com.metigan.model.UpdateContactOptions;

UpdateContactOptions options = new UpdateContactOptions.Builder()
    .firstName("Jane Marie")
    .tags(Arrays.asList("customer", "vip"))
    .build();

Contact updated = client.contacts().update("contact-456", options);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Manage Subscription</h3>
        <CodeBlock
          language="java"
          fileName="manage-subscription.java"
          code={`// Subscribe
client.contacts().subscribe("contact-456");

// Unsubscribe
client.contacts().unsubscribe("contact-456");`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Audience Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Audience</h3>
        <CodeBlock
          language="java"
          fileName="create-audience.java"
          code={`import com.metigan.model.CreateAudienceOptions;

CreateAudienceOptions options = new CreateAudienceOptions.Builder()
    .name("Main Newsletter")
    .description("Main subscriber list")
    .build();

Audience audience = client.audiences().create(options);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Audiences</h3>
        <CodeBlock
          language="java"
          fileName="list-audiences.java"
          code={`import com.metigan.model.PaginationOptions;
import com.metigan.model.AudienceListResponse;

PaginationOptions pagination = new PaginationOptions.Builder()
    .page(1)
    .limit(10)
    .build();

AudienceListResponse result = client.audiences().list(pagination);

for (Audience audience : result.getAudiences()) {
    System.out.println(audience.getName() + ": " + audience.getCount() + " contacts");
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Audience Statistics</h3>
        <CodeBlock
          language="java"
          fileName="audience-stats.java"
          code={`import com.metigan.model.AudienceStats;

AudienceStats stats = client.audiences().getStats("audience-123");

System.out.println("Total: " + stats.getTotal());
System.out.println("Subscribed: " + stats.getSubscribed());
System.out.println("Unsubscribed: " + stats.getUnsubscribed());`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Handling</h2>
        <CodeBlock
          language="java"
          fileName="error-handling.java"
          code={`import com.metigan.exception.ApiException;
import com.metigan.exception.ValidationException;

try {
    EmailSuccessResponse result = client.email().sendEmail(options);
} catch (ValidationException e) {
    System.err.println("Validation Error: " + e.getMessage());
    if (e.getField() != null) {
        System.err.println("Field: " + e.getField());
    }
} catch (ApiException e) {
    System.err.println("API Error: " + e.getStatusCode() + " - " + e.getMessage());
} catch (Exception e) {
    System.err.println("Unknown error: " + e.getMessage());
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Advanced Configuration</h2>
        <CodeBlock
          language="java"
          fileName="advanced-config.java"
          code={`MetiganClient client = new MetiganClient.Builder()
    .apiKey("your-api-key")
    .timeout(30)        // Optional, defaults to 30 seconds
    .retryCount(3)      // Optional, defaults to 3
    .retryDelay(2000)   // Optional, defaults to 2000ms
    .debug(false)       // Optional, defaults to false
    .build();`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Spring Boot Example</h2>
        <CodeBlock
          language="java"
          fileName="EmailService.java"
          code={[
            "import org.springframework.beans.factory.annotation.Value;",
            "import org.springframework.stereotype.Service;",
            "import com.metigan.MetiganClient;",
            "import com.metigan.model.EmailOptions;",
            "import com.metigan.model.EmailSuccessResponse;",
            "",
            "@Service",
            "public class EmailService {",
            "    private final MetiganClient client;",
            "",
            "    public EmailService(@Value(\"${metigan.api-key}\") String apiKey) {",
            "        this.client = new MetiganClient.Builder()",
            "            .apiKey(apiKey)",
            "            .build();",
            "    }",
            "",
            "    public EmailSuccessResponse sendWelcomeEmail(String email) {",
            "        EmailOptions options = new EmailOptions.Builder()",
            "            .from(\"Sender <sender@example.com>\")",
            "            .recipients(Arrays.asList(email))",
            "            .subject(\"Welcome!\")",
            "            .content(\"<h1>Hello!</h1><p>Thank you for signing up.</p>\")",
            "            .build();",
            "",
            "        return client.email().sendEmail(options);",
            "    }",
            "}",
          ].join("\n")}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">REST Controller Example</h2>
        <CodeBlock
          language="java"
          fileName="EmailController.java"
          code={`import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.metigan.MetiganClient;
import com.metigan.model.EmailOptions;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    private final MetiganClient client;

    public EmailController(MetiganClient client) {
        this.client = client;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request) {
        try {
            EmailOptions options = new EmailOptions.Builder()
                .from("noreply@example.com")
                .recipients(Arrays.asList(request.getTo()))
                .subject(request.getSubject())
                .content(request.getContent())
                .build();

            EmailSuccessResponse result = client.email().sendEmail(options);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    public static class EmailRequest {
        private String to;
        private String subject;
        private String content;

        // Getters and setters
        public String getTo() { return to; }
        public void setTo(String to) { this.to = to; }
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}`}
        />
      </section>

      <Callout variant="tip" title="Environment Variables">
        <p>
          Use environment variables to store your API key securely. Set <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">METIGAN_API_KEY</code> before running your application, or configure it in your <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">application.properties</code> for Spring Boot.
        </p>
      </Callout>
    </div>
  )
}

