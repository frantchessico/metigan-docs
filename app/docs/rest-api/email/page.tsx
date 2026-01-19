import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export const metadata = {
  title: "Email Endpoints | REST API | Metigan",
  description: "REST API documentation for sending emails, OTP codes, and transactional messages",
}

export default function EmailEndpointsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full">
            REST API
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-500 rounded-full">
            Email
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Email Endpoints</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Send emails, verification codes (OTP), and transactional messages via the REST API.
        </p>
      </div>

      {/* Send Email */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/email/send</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Send Email</h2>
        <p className="text-muted-foreground">
          Send an email to one or more recipients. Supports HTML content, attachments, CC/BCC, and templates.
        </p>

        <h3 className="text-xl font-semibold mt-6">Request Body</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Field</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Required</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>from</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Sender email (or "Name &lt;email&gt;")</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>recipients</code></td>
                <td className="py-3 px-4 text-muted-foreground">string[]</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Array of recipient email addresses</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>subject</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Email subject line</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>content</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-yellow-500">Conditional</span></td>
                <td className="py-3 px-4 text-muted-foreground">HTML email content (required if no templateId)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>templateId</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Template ID to use instead of content</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>variables</code></td>
                <td className="py-3 px-4 text-muted-foreground">object</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Template variables for substitution</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>cc</code></td>
                <td className="py-3 px-4 text-muted-foreground">string[]</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">CC recipients</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>bcc</code></td>
                <td className="py-3 px-4 text-muted-foreground">string[]</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">BCC recipients</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>replyTo</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Reply-to email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>attachments</code></td>
                <td className="py-3 px-4 text-muted-foreground">array</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">File attachments (base64 encoded)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/email/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "Your Company <noreply@yourcompany.com>",
    "recipients": ["user@example.com", "another@example.com"],
    "subject": "Welcome to Our Platform!",
    "content": "<h1>Welcome!</h1><p>Thank you for joining us.</p>",
    "replyTo": "support@yourcompany.com"
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Example with Template</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/email/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "Your Company <noreply@yourcompany.com>",
    "recipients": ["user@example.com"],
    "subject": "Welcome, {{firstName}}!",
    "templateId": "welcome-template-id",
    "variables": {
      "firstName": "John",
      "lastName": "Doe",
      "accountUrl": "https://app.yourcompany.com/dashboard"
    }
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Example with Attachments</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/email/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "billing@yourcompany.com",
    "recipients": ["customer@example.com"],
    "subject": "Your Invoice #INV-2024-001",
    "content": "<p>Please find your invoice attached.</p>",
    "attachments": [
      {
        "content": "JVBERi0xLjQK...(base64 encoded)",
        "filename": "invoice.pdf",
        "contentType": "application/pdf"
      }
    ]
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "Email sent successfully",
  "successfulEmails": [
    {
      "recipient": "user@example.com",
      "trackingId": "mtg-1705678234567-0001"
    }
  ],
  "failedEmails": [],
  "recipientCount": 1,
  "emailsRemaining": 9999
}`}
        />
      </section>

      {/* Send OTP */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/otp/send</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Send OTP</h2>
        <p className="text-muted-foreground">
          Send a One-Time Password (OTP) verification email. OTP emails are sent through a priority fast lane
          with built-in rate limiting to prevent abuse.
        </p>

        <Callout variant="info" title="Priority Delivery">
          <p>
            OTP emails are processed with higher priority than regular emails to ensure quick delivery 
            of time-sensitive verification codes.
          </p>
        </Callout>

        <h3 className="text-xl font-semibold mt-6">Request Body</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Field</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Required</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>to</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Recipient email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>from</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Sender email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>code</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">The OTP code to send</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>appName</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Application name (default: "Metigan")</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>expiresInMinutes</code></td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Code expiration time in minutes</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>subject</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Custom email subject</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>templateId</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Custom OTP template ID</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>idempotencyKey</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Key to prevent duplicate sends</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/otp/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "security@yourapp.com",
    "code": "847291",
    "appName": "YourApp",
    "expiresInMinutes": 10
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "OTP email sent successfully",
  "trackingId": "mtg-1705678234567-otp",
  "emailId": "email_abc123xyz",
  "queued": false
}`}
        />

        <h3 className="text-xl font-semibold mt-6">Template Variables</h3>
        <p className="text-muted-foreground mb-4">
          If using a custom template, these variables are automatically available:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Variable</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>{`{{code}}`}</code></td>
                <td className="py-3 px-4 text-muted-foreground">The OTP code</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>{`{{appName}}`}</code></td>
                <td className="py-3 px-4 text-muted-foreground">Your application name</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>{`{{expiresInMinutes}}`}</code></td>
                <td className="py-3 px-4 text-muted-foreground">Expiration time in minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Send Transactional */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/transactional/send</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Send Transactional Email</h2>
        <p className="text-muted-foreground">
          Send time-sensitive transactional emails like password resets, order confirmations, receipts,
          and other critical notifications. These emails are processed with priority delivery.
        </p>

        <Callout variant="tip" title="Use Cases">
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Password reset emails</li>
            <li>Order confirmations</li>
            <li>Payment receipts</li>
            <li>Shipping notifications</li>
            <li>Account notifications</li>
          </ul>
        </Callout>

        <h3 className="text-xl font-semibold mt-6">Request Body</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Field</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Required</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>to</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Recipient email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>from</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Sender email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>subject</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Email subject line</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>content</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-yellow-500">Conditional</span></td>
                <td className="py-3 px-4 text-muted-foreground">HTML email content (required if no templateId)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>templateId</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Template ID to use</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>variables</code></td>
                <td className="py-3 px-4 text-muted-foreground">object</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Template variables</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>replyTo</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Reply-to email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>idempotencyKey</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Key to prevent duplicate sends</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Password Reset Example</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/transactional/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "security@yourapp.com",
    "subject": "Reset Your Password",
    "content": "<h1>Password Reset</h1><p>Click <a href=\"https://yourapp.com/reset?token=abc123\">here</a> to reset your password.</p><p>This link expires in 1 hour.</p>"
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Order Confirmation Example</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/transactional/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "customer@example.com",
    "from": "orders@yourshop.com",
    "subject": "Order Confirmed #ORD-12345",
    "templateId": "order-confirmation-template",
    "variables": {
      "orderId": "ORD-12345",
      "customerName": "John Doe",
      "orderTotal": "$99.99",
      "orderItems": [
        {"name": "Product A", "qty": 2, "price": "$49.99"},
        {"name": "Product B", "qty": 1, "price": "$50.00"}
      ],
      "trackingUrl": "https://yourshop.com/track/ORD-12345"
    }
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "Transactional email sent successfully",
  "trackingId": "mtg-1705678234567-txn",
  "emailId": "email_xyz789abc",
  "queued": false
}`}
        />
      </section>

      {/* Error Codes */}
      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Codes</h2>
        <p className="text-muted-foreground">
          Common error responses for email endpoints:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Error</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>INVALID_EMAIL</code></td>
                <td className="py-3 px-4">422</td>
                <td className="py-3 px-4 text-muted-foreground">Invalid email address format</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>MISSING_REQUIRED_FIELD</code></td>
                <td className="py-3 px-4">400</td>
                <td className="py-3 px-4 text-muted-foreground">Required field is missing</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>TEMPLATE_NOT_FOUND</code></td>
                <td className="py-3 px-4">404</td>
                <td className="py-3 px-4 text-muted-foreground">Template ID not found</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>ATTACHMENT_TOO_LARGE</code></td>
                <td className="py-3 px-4">400</td>
                <td className="py-3 px-4 text-muted-foreground">Attachment exceeds 7MB limit</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>RATE_LIMIT_EXCEEDED</code></td>
                <td className="py-3 px-4">429</td>
                <td className="py-3 px-4 text-muted-foreground">Too many requests</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>QUOTA_EXCEEDED</code></td>
                <td className="py-3 px-4">403</td>
                <td className="py-3 px-4 text-muted-foreground">Email quota exceeded for your plan</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>SENDER_NOT_VERIFIED</code></td>
                <td className="py-3 px-4">403</td>
                <td className="py-3 px-4 text-muted-foreground">Sender domain not verified</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Error Response Example</h3>
        <CodeBlock
          language="json"
          fileName="422 Unprocessable Entity"
          code={`{
  "success": false,
  "error": "INVALID_EMAIL",
  "message": "Invalid email address format: user@invalid",
  "field": "recipients[0]"
}`}
        />
      </section>

      {/* Code Examples */}
      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Code Examples</h2>
        
        <h3 className="text-xl font-semibold">JavaScript (fetch)</h3>
        <CodeBlock
          language="javascript"
          fileName="send-email.js"
          code={`const response = await fetch('https://api.metigan.com/api/email/send', {
  method: 'POST',
  headers: {
    'x-api-key': 'your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'Your Company <noreply@yourcompany.com>',
    recipients: ['user@example.com'],
    subject: 'Welcome!',
    content: '<h1>Welcome!</h1><p>Thank you for signing up.</p>'
  })
});

const result = await response.json();
console.log(result);`}
        />

        <h3 className="text-xl font-semibold mt-6">Python (requests)</h3>
        <CodeBlock
          language="python"
          fileName="send_email.py"
          code={`import requests

response = requests.post(
    'https://api.metigan.com/api/email/send',
    headers={
        'x-api-key': 'your_api_key',
        'Content-Type': 'application/json'
    },
    json={
        'from': 'Your Company <noreply@yourcompany.com>',
        'recipients': ['user@example.com'],
        'subject': 'Welcome!',
        'content': '<h1>Welcome!</h1><p>Thank you for signing up.</p>'
    }
)

result = response.json()
print(result)`}
        />

        <h3 className="text-xl font-semibold mt-6">PHP (cURL)</h3>
        <CodeBlock
          language="php"
          fileName="send-email.php"
          code={`<?php
$ch = curl_init('https://api.metigan.com/api/email/send');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'x-api-key: your_api_key',
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'from' => 'Your Company <noreply@yourcompany.com>',
        'recipients' => ['user@example.com'],
        'subject' => 'Welcome!',
        'content' => '<h1>Welcome!</h1><p>Thank you for signing up.</p>'
    ])
]);

$response = curl_exec($ch);
$result = json_decode($response, true);
print_r($result);`}
        />
      </section>
    </div>
  )
}
