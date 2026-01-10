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
          code={`go get github.com/metigan/metigan-go`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Setup</h2>
        <CodeBlock
          language="go"
          fileName="main.go"
          code={`package main

import (
    "fmt"
    "log"
    "os"
    
    "github.com/metigan/metigan-go"
)

func main() {
    // Initialize the client
    apiKey := os.Getenv("METIGAN_API_KEY")
    if apiKey == "" {
        log.Fatal("METIGAN_API_KEY environment variable is required")
    }
    
    client := metigan.NewClient(metigan.Config{
        APIKey: apiKey,
    })
    
    // Send an email
    result, err := client.Email().SendEmail(metigan.EmailOptions{
        From:       "Sender <sender@example.com>",
        Recipients: []string{"recipient@example.com"},
        Subject:    "Hello from Go!",
        Content:    "<h1>Hello!</h1><p>This email was sent from a Go application.</p>",
    })
    
    if err != nil {
        log.Fatalf("Failed to send email: %v", err)
    }
    
    if result.Success {
        fmt.Println("Email sent successfully!")
        fmt.Printf("Message: %s\\n", result.Message)
        fmt.Printf("Recipients: %d\\n", result.RecipientCount)
        fmt.Printf("Emails remaining: %d\\n", result.EmailsRemaining)
    } else {
        fmt.Printf("Failed to send email: %s\\n", result.Message)
    }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Sending Emails</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Basic Email</h3>
        <CodeBlock
          language="go"
          fileName="send-email.go"
          code={`result, err := client.Email().SendEmail(metigan.EmailOptions{
    From:       "sender@example.com",
    Recipients: []string{"recipient@example.com"},
    Subject:    "Email Subject",
    Content:    "<h1>HTML Content</h1><p>This is the email body.</p>",
})

if err != nil {
    log.Fatalf("Error: %v", err)
}

if result.Success {
    fmt.Println("Email sent successfully!")
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with CC and BCC</h3>
        <CodeBlock
          language="go"
          fileName="send-email-cc.go"
          code={`result, err := client.Email().SendEmail(metigan.EmailOptions{
    From:       "company@email.com",
    Recipients: []string{"main@email.com"},
    Subject:    "Meeting",
    Content:    "Email content",
    CC:         []string{"copy@email.com"},
    BCC:        []string{"hidden-copy@email.com"},
    ReplyTo:    "reply-here@email.com",
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Attachments</h3>
        <CodeBlock
          language="go"
          fileName="send-email-attachment.go"
          code={`import (
    "os"
    "github.com/metigan/metigan-go"
)

// Read file
fileData, err := os.ReadFile("document.pdf")
if err != nil {
    log.Fatalf("Failed to read file: %v", err)
}

result, err := client.Email().SendEmail(metigan.EmailOptions{
    From:       "company@email.com",
    Recipients: []string{"customer@email.com"},
    Subject:    "Important Document",
    Content:    "Please find the document attached.",
    Attachments: []metigan.Attachment{
        {
            Content:     fileData,
            Filename:    "document.pdf",
            ContentType: "application/pdf",
        },
    },
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Template</h3>
        <CodeBlock
          language="go"
          fileName="send-email-template.go"
          code={`variables := map[string]interface{}{
    "name":    "John Doe",
    "company": "Acme Inc",
}

result, err := client.Email().SendEmailWithTemplate(
    "template-123",
    variables,
    metigan.EmailOptions{
        From:       "sender@example.com",
        Recipients: []string{"recipient@example.com"},
    },
)`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Contact Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Contact</h3>
        <CodeBlock
          language="go"
          fileName="create-contact.go"
          code={`contact, err := client.Contacts().Create(metigan.CreateContactOptions{
    Email:      "new@email.com",
    FirstName:  "Jane",
    LastName:   "Doe",
    AudienceID: "audience-123",
    Tags:       []string{"customer", "newsletter"},
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
contact, err := client.Contacts().Get("contact-456")

// By email
contact, err := client.Contacts().GetByEmail("jane@email.com", "audience-123")`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Contacts</h3>
        <CodeBlock
          language="go"
          fileName="list-contacts.go"
          code={`result, err := client.Contacts().List(metigan.ContactListFilters{
    AudienceID: "audience-123",
    Status:     metigan.ContactStatusSubscribed,
    Page:       1,
    Limit:      50,
})

if err != nil {
    log.Fatalf("Error: %v", err)
}

for _, contact := range result.Contacts {
    fmt.Printf("%s: %s\\n", contact.Email, contact.FirstName)
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Update Contact</h3>
        <CodeBlock
          language="go"
          fileName="update-contact.go"
          code={`updated, err := client.Contacts().Update("contact-456", metigan.UpdateContactOptions{
    FirstName: "Jane Marie",
    Tags:      []string{"customer", "vip"},
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Manage Subscription</h3>
        <CodeBlock
          language="go"
          fileName="manage-subscription.go"
          code={`// Unsubscribe
err := client.Contacts().Unsubscribe("contact-456")

// Resubscribe
err := client.Contacts().Subscribe("contact-456")`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Audience Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Audience</h3>
        <CodeBlock
          language="go"
          fileName="create-audience.go"
          code={`audience, err := client.Audiences().Create(metigan.CreateAudienceOptions{
    Name:        "Main Newsletter",
    Description: "Main subscriber list",
})`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Audiences</h3>
        <CodeBlock
          language="go"
          fileName="list-audiences.go"
          code={`result, err := client.Audiences().List(metigan.PaginationOptions{
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
          code={`stats, err := client.Audiences().GetStats("audience-123")

if err != nil {
    log.Fatalf("Error: %v", err)
}

fmt.Printf("Total: %d\\n", stats.Total)
fmt.Printf("Subscribed: %d\\n", stats.Subscribed)
fmt.Printf("Unsubscribed: %d\\n", stats.Unsubscribed)`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Handling</h2>
        <CodeBlock
          language="go"
          fileName="error-handling.go"
          code={`result, err := client.Email().SendEmail(options)
if err != nil {
    switch e := err.(type) {
    case *metigan.APIError:
        fmt.Printf("API Error: %d - %s\\n", e.StatusCode, e.Message)
    case *metigan.ValidationError:
        fmt.Printf("Validation Error: %s\\n", e.Message)
        if e.Field != "" {
            fmt.Printf("Field: %s\\n", e.Field)
        }
    default:
        fmt.Printf("Unknown error: %v\\n", err)
    }
    return
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Advanced Configuration</h2>
        <CodeBlock
          language="go"
          fileName="advanced-config.go"
          code={`import "time"

client := metigan.NewClient(metigan.Config{
    APIKey:     "your-api-key",
    Timeout:    30 * time.Second, // Optional, defaults to 30s
    RetryCount: 3,                 // Optional, defaults to 3
    RetryDelay: 2 * time.Second,   // Optional, defaults to 2s
    Debug:      false,             // Optional, defaults to false
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
    "fmt"
    "log"
    "net/http"
    "os"
    
    "github.com/metigan/metigan-go"
)

func main() {
    apiKey := os.Getenv("METIGAN_API_KEY")
    client := metigan.NewClient(metigan.Config{
        APIKey: apiKey,
    })
    
    http.HandleFunc("/send-email", func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
            return
        }
        
        var req struct {
            To      string \`json:"to"\`
            Subject string \`json:"subject"\`
            Content string \`json:"content"\`
        }
        
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        
        result, err := client.Email().SendEmail(metigan.EmailOptions{
            From:       "noreply@example.com",
            Recipients: []string{req.To},
            Subject:    req.Subject,
            Content:    req.Content,
        })
        
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(result)
    })
    
    fmt.Println("Server listening on :8080")
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

