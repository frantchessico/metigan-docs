import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function GoExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Go Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Go integration examples using the Metigan SDK. Learn how to send emails, manage contacts,
          and integrate Metigan into your Go applications.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Installation</h2>
        <CodeBlock
          language="bash"
          fileName="install.sh"
          code={`go get github.com/metigan/go@latest`}
        />
        <p className="text-muted-foreground">
          Requires Go 1.21+. The module is <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">github.com/metigan/go</code> and
          the package name is <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">metigan</code>. No dependencies outside the standard library.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Setup</h2>
        <CodeBlock
          language="go"
          fileName="main.go"
          code={`package main

import (
    "context"
    "fmt"
    "log"
    "os"

    metigan "github.com/metigan/go"
)

func main() {
    apiKey := os.Getenv("METIGAN_API_KEY")
    if apiKey == "" {
        log.Fatal("METIGAN_API_KEY environment variable is required")
    }

    client := metigan.NewClient(metigan.Config{
        APIKey: apiKey,
    })

    // onboarding@metigan.io works on every account without verifying a domain
    result, err := client.Email().SendEmail(context.Background(), metigan.EmailOptions{
        From:       "My App <onboarding@metigan.io>",
        Recipients: []string{"recipient@example.com"},
        Subject:    "Hello from Go!",
        Content:    "<h1>Hello!</h1><p>This email was sent from a Go application.</p>",
    })
    if err != nil {
        log.Fatalf("Failed to send email: %v", err)
    }

    fmt.Println(result.Message) // "Emails queued for processing"
    for _, e := range result.SuccessfulEmails {
        fmt.Printf("%s -> %s\\n", e.Recipient, e.EmailID)
    }
    fmt.Printf("Emails remaining: %d\\n", result.EmailsRemaining)
}`}
        />
        <Callout variant="info" title="Context on every call">
          <p>
            Every method takes a <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">context.Context</code> as
            its first argument, for cancellation and deadlines. The client is safe for concurrent use: create it once and share it.
          </p>
        </Callout>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Sending Emails</h2>

        <h3 className="text-2xl font-semibold mb-4">Basic Email</h3>
        <CodeBlock
          language="go"
          fileName="send-email.go"
          code={`result, err := client.Email().SendEmail(ctx, metigan.EmailOptions{
    From:       "Acme <hello@acme.com>",
    Recipients: []string{"recipient@example.com"}, // up to 1000, one message each
    Subject:    "Email Subject",
    Content:    "<h1>HTML Content</h1><p>This is the email body.</p>",
    Text:       "Plain-text version (optional)",
})
if err != nil {
    log.Fatalf("Error: %v", err)
}

for _, f := range result.FailedEmails {
    fmt.Printf("%s was refused: %s\\n", f.Recipient, f.Error)
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with CC and BCC</h3>
        <CodeBlock
          language="go"
          fileName="send-email-cc.go"
          code={`result, err := client.Email().SendEmail(ctx, metigan.EmailOptions{
    From:       "Acme <company@acme.com>",
    Recipients: []string{"main@example.com"},
    Subject:    "Meeting",
    Content:    "<p>Email content</p>",
    CC:         []string{"copy@example.com"},        // CC + BCC: at most 49 addresses
    BCC:        []string{"hidden-copy@example.com"},
    ReplyTo:    "reply-here@acme.com",
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Attachments</h3>
        <CodeBlock
          language="go"
          fileName="send-email-attachment.go"
          code={`fileData, err := os.ReadFile("document.pdf")
if err != nil {
    log.Fatalf("Failed to read file: %v", err)
}

// Content is the raw file; the SDK base64-encodes it
result, err := client.Email().SendEmail(ctx, metigan.EmailOptions{
    From:       "Acme <company@acme.com>",
    Recipients: []string{"customer@example.com"},
    Subject:    "Important Document",
    Content:    "<p>Please find the document attached.</p>",
    Attachments: []metigan.Attachment{
        {
            Filename:    "document.pdf",
            Content:     fileData,
            ContentType: "application/pdf",
        },
    },
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Template</h3>
        <CodeBlock
          language="go"
          fileName="send-email-template.go"
          code={`variables := map[string]any{
    "name":    "John Doe",   // fills {{name}}
    "company": "Acme Inc",   // fills {{company}}
}

// Subject and body come from the template; set Subject to override it
result, err := client.Email().SendEmailWithTemplate(ctx, "TEMPLATE_ID", variables,
    metigan.EmailOptions{
        From:       "Acme <hello@acme.com>",
        Recipients: []string{"recipient@example.com"},
    },
)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">OTP Codes</h3>
        <CodeBlock
          language="go"
          fileName="send-otp.go"
          code={`queued, err := client.Email().SendOTP(ctx, metigan.OTPOptions{
    To:               "user@example.com",
    From:             "Acme <security@acme.com>",
    Code:             "482913",
    AppName:          "Acme",
    ExpiresInMinutes: 10,
    Locale:           "en", // built-in localized email ("pt" by default)
})
fmt.Println(queued.EmailID)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Transactional Message</h3>
        <CodeBlock
          language="go"
          fileName="send-transactional.go"
          code={`queued, err := client.Email().SendTransactional(ctx, metigan.TransactionalOptions{
    To:      "user@example.com",
    From:    "Acme <hello@acme.com>",
    Subject: "Password changed",
    HTML:    "<p>Your password was changed.</p>",
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Delivery Status</h3>
        <CodeBlock
          language="go"
          fileName="email-status.go"
          code={`// A successful send means the email was queued. Follow it by its EmailID:
status, err := client.Email().Get(ctx, result.SuccessfulEmails[0].EmailID)
if err != nil {
    log.Fatalf("Error: %v", err)
}
fmt.Println(status.Status, status.DeliveredAt, status.OpenCount, status.BounceReason)`}
        />

        <Callout variant="tip" title="Safe retries">
          <p>
            The SDK retries network errors and 5xx responses, and attaches an idempotency key to every send so a retry
            never delivers twice. Set <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">IdempotencyKey</code> yourself
            (for example an order ID) to make your own application&apos;s retries safe too.
          </p>
        </Callout>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Contact Management</h2>

        <h3 className="text-2xl font-semibold mb-4">Create Contact</h3>
        <CodeBlock
          language="go"
          fileName="create-contact.go"
          code={`contact, err := client.Contacts().Create(ctx, metigan.CreateContactOptions{
    Email:        "new@example.com",
    FirstName:    "Jane",
    LastName:     "Doe",
    AudienceID:   "AUDIENCE_ID",
    Tags:         []string{"customer", "newsletter"},
    CustomFields: map[string]any{"plan": "pro"},
})
if err != nil {
    log.Fatalf("Error: %v", err)
}

fmt.Printf("Contact created: %s\\n", contact.ID)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Contact</h3>
        <CodeBlock
          language="go"
          fileName="get-contact.go"
          code={`// By ID
contact, err := client.Contacts().Get(ctx, "CONTACT_ID")

// By email, within an audience
contact, err = client.Contacts().GetByEmail(ctx, "jane@example.com", "AUDIENCE_ID")

// Search by email or name
found, err := client.Contacts().Search(ctx, "jane", "AUDIENCE_ID")`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Contacts</h3>
        <CodeBlock
          language="go"
          fileName="list-contacts.go"
          code={`result, err := client.Contacts().List(ctx, metigan.ContactListFilters{
    AudienceID: "AUDIENCE_ID",
    Status:     metigan.ContactStatusSubscribed,
    Page:       1,
    Limit:      50,
})
if err != nil {
    log.Fatalf("Error: %v", err)
}

for _, contact := range result.Contacts {
    fmt.Printf("%s: %s\\n", contact.Email, contact.FirstName)
}
fmt.Printf("Page %d of %d\\n", result.Pagination.Page, result.Pagination.Pages)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Update Contact</h3>
        <CodeBlock
          language="go"
          fileName="update-contact.go"
          code={`// Only the fields you set (non-nil) are changed
name := "Jane Marie"
tags := []string{"customer", "vip"}

updated, err := client.Contacts().Update(ctx, "CONTACT_ID", metigan.UpdateContactOptions{
    FirstName: &name,
    Tags:      &tags,
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Tags and Subscription</h3>
        <CodeBlock
          language="go"
          fileName="manage-subscription.go"
          code={`contact, err := client.Contacts().AddTags(ctx, "CONTACT_ID", []string{"vip"})
contact, err = client.Contacts().RemoveTags(ctx, "CONTACT_ID", []string{"vip"})

contact, err = client.Contacts().Unsubscribe(ctx, "CONTACT_ID")
contact, err = client.Contacts().Subscribe(ctx, "CONTACT_ID")

err = client.Contacts().Delete(ctx, "CONTACT_ID")`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Audience Management</h2>

        <h3 className="text-2xl font-semibold mb-4">Create Audience</h3>
        <CodeBlock
          language="go"
          fileName="create-audience.go"
          code={`audience, err := client.Audiences().Create(ctx, metigan.CreateAudienceOptions{
    Name:        "Main Newsletter",
    Description: "Main subscriber list",
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Audiences</h3>
        <CodeBlock
          language="go"
          fileName="list-audiences.go"
          code={`result, err := client.Audiences().List(ctx, metigan.PaginationOptions{
    Page:  1,
    Limit: 10,
})
if err != nil {
    log.Fatalf("Error: %v", err)
}

for _, audience := range result.Audiences {
    fmt.Printf("%s: %d contacts\\n", audience.Name, audience.Count)
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Audience Statistics</h3>
        <CodeBlock
          language="go"
          fileName="audience-stats.go"
          code={`stats, err := client.Audiences().GetStats(ctx, "AUDIENCE_ID")
if err != nil {
    log.Fatalf("Error: %v", err)
}

fmt.Printf("Total: %d\\n", stats.Total)
fmt.Printf("Subscribed: %d (%s%%)\\n", stats.Subscribed, stats.SubscriptionRate)
fmt.Printf("Unsubscribed: %d\\n", stats.Unsubscribed)`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Templates and Forms</h2>
        <CodeBlock
          language="go"
          fileName="templates-forms.go"
          code={`templates, err := client.Templates().List(ctx, metigan.PaginationOptions{})
tpl, err := client.Templates().Get(ctx, "TEMPLATE_ID")

form, err := client.Forms().Get(ctx, "form-id-or-slug")
sub, err := client.Forms().Submit(ctx, metigan.FormSubmissionOptions{
    FormID: form.ID,
    Data:   metigan.FormSubmissionData{"field-email": "jane@example.com"},
})
submissions, err := client.Forms().ListSubmissions(ctx, form.ID, metigan.PaginationOptions{})`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Webhooks</h2>
        <p className="text-muted-foreground">
          Verify the signature of every delivery before trusting it. Read the raw body first: re-encoding parsed JSON
          changes the bytes and breaks the signature.
        </p>
        <CodeBlock
          language="go"
          fileName="webhooks.go"
          code={`client := metigan.NewClient(metigan.Config{
    APIKey:        os.Getenv("METIGAN_API_KEY"),
    WebhookSecret: os.Getenv("METIGAN_WEBHOOK_SECRET"), // whsec_...
})

http.HandleFunc("/webhooks/metigan", func(w http.ResponseWriter, r *http.Request) {
    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "bad body", http.StatusBadRequest)
        return
    }
    event, err := client.Webhooks().Verify(body, r.Header)
    if err != nil {
        http.Error(w, "invalid signature", http.StatusBadRequest)
        return
    }
    if event.Event == metigan.EventEmailBounced {
        log.Println("bounced:", event.Data["recipient"])
    }
    w.WriteHeader(http.StatusNoContent)
})`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Handling</h2>
        <CodeBlock
          language="go"
          fileName="error-handling.go"
          code={`result, err := client.Email().SendEmail(ctx, options)

var apiErr *metigan.APIError
var valErr *metigan.ValidationError
switch {
case errors.As(err, &valErr):
    // Rejected by the SDK before calling the API (missing field)
    fmt.Printf("Validation Error: %s %s\\n", valErr.Field, valErr.Message)
case errors.As(err, &apiErr):
    // Non-2xx from the API: 400 invalid input, 403 invalid key or unverified domain, 429 limit
    fmt.Printf("API Error: %d - %s\\n", apiErr.StatusCode, apiErr.Message)
case err != nil:
    // Network error or cancelled context
    fmt.Printf("Request failed: %v\\n", err)
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Advanced Configuration</h2>
        <CodeBlock
          language="go"
          fileName="advanced-config.go"
          code={`client := metigan.NewClient(metigan.Config{
    APIKey:     "your-api-key",    // Required, sent as the X-Api-Key header
    BaseURL:    "",                // Optional, defaults to $METIGAN_API_URL, then https://api.metigan.io
    Timeout:    30 * time.Second,  // Optional, per attempt, defaults to 30s
    RetryCount: 3,                 // Optional, defaults to 3; negative disables retries
    RetryDelay: time.Second,       // Optional, multiplied by the attempt number, defaults to 1s
    HTTPClient: nil,               // Optional, your own *http.Client
})`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">HTTP Server Example</h2>
        <CodeBlock
          language="go"
          fileName="http-server.go"
          code={`package main

import (
    "encoding/json"
    "log"
    "net/http"
    "os"

    metigan "github.com/metigan/go"
)

func main() {
    client := metigan.NewClient(metigan.Config{
        APIKey: os.Getenv("METIGAN_API_KEY"),
    })

    http.HandleFunc("POST /send-email", func(w http.ResponseWriter, r *http.Request) {
        var req struct {
            To      string \`json:"to"\`
            Subject string \`json:"subject"\`
            Content string \`json:"content"\`
        }
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }

        // r.Context() cancels the call if the client disconnects
        result, err := client.Email().SendEmail(r.Context(), metigan.EmailOptions{
            From:       "My App <onboarding@metigan.io>",
            Recipients: []string{req.To},
            Subject:    req.Subject,
            Content:    req.Content,
        })
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadGateway)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(result)
    })

    log.Println("Server listening on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}`}
        />
      </section>

      <Callout variant="tip" title="Environment Variables">
        <p>
          Use environment variables to store your API key securely. Set <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">METIGAN_API_KEY</code> before running your application.
        </p>
      </Callout>
    </div>
  )
}

