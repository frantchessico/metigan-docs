import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmailApiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Email API</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Send transactional and marketing emails with the Metigan Email API. Supports HTML content, attachments, templates, tracking, and more. 
          Built for reliability, scalability, and developer experience.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          The Email API allows you to send emails through Metigan's infrastructure. All emails are sent using the <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">metigan.email.sendEmail()</code> method, 
          which provides a simple, consistent interface for all your email sending needs.
        </p>
      </section>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Usage</h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Here's a simple example of sending an email using the Metigan Email API:
        </p>
        <CodeBlock
          language="typescript"
          fileName="basic-email.ts"
          code={`import Metigan from 'metigan';
import type { EmailApiResponse, EmailSuccessResponse } from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Type guard for type safety
function isEmailSuccess(response: EmailApiResponse): response is EmailSuccessResponse {
  return 'success' in response && response.success === true;
}

// Send a basic email
async function sendEmail() {
  const result = await metigan.email.sendEmail({
    from: 'Sender Name <sender@example.com>',
    recipients: ['recipient@example.com'],
    subject: 'Hello from Metigan!',
    content: '<h1>Hello!</h1><p>This is a test email.</p>'
  });

  // Check result with type guard
  if (isEmailSuccess(result)) {
    console.log('âœ… Email sent successfully!');
    console.log('Tracking ID:', result.successfulEmails[0]?.trackingId);
    console.log('Emails remaining:', result.emailsRemaining);
  } else {
    console.error('âŒ Failed to send:', result.message || result.error);
  }
}

sendEmail();`}
        />
      </section>

      {/* Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Parameters</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Parameter</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">from</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">Yes</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Sender email address. Can be formatted as <code className="px-1 py-0.5 rounded bg-muted">"Name &lt;email@example.com&gt;"</code> or just <code className="px-1 py-0.5 rounded bg-muted">"email@example.com"</code>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">recipients</td>
                <td className="px-4 py-3 text-sm font-mono">string[]</td>
                <td className="px-4 py-3 text-sm">Yes</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Array of recipient email addresses
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">subject</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">Yes</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Email subject line
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">content</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">Yes*</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  HTML email content. Required if <code className="px-1 py-0.5 rounded bg-muted">templateId</code> is not provided
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">templateId</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  ID of a pre-created email template to use instead of content
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">cc</td>
                <td className="px-4 py-3 text-sm font-mono">string[]</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Array of CC recipient email addresses
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">bcc</td>
                <td className="px-4 py-3 text-sm font-mono">string[]</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Array of BCC recipient email addresses
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">replyTo</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Reply-to email address
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm">attachments</td>
                <td className="px-4 py-3 text-sm font-mono">Array&lt;File | NodeAttachment | CustomAttachment&gt;</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Array of file attachments
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="basic-email.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Send a simple HTML email
const result = await metigan.email.sendEmail({
  from: 'hello@example.com',
  recipients: ['user@example.com'],
  subject: 'Welcome!',
  content: \`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Welcome to Our Service!</h1>
        <p>Thank you for signing up.</p>
      </body>
    </html>
  \`
});`}
            />
          </TabsContent>

          <TabsContent value="template" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Step 1: Create a Template</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  First, create a template in your Metigan dashboard or using the Templates API. Templates can contain variables that will be replaced when sending.
                </p>
                <CodeBlock
                  language="typescript"
                  fileName="create-template.ts"
                  code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Create an email template
const template = await metigan.templates.create({
  name: 'Welcome Email Template',
  subject: 'Welcome to Our Service, {{firstName}}!',
  content: \`
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Welcome, {{firstName}}!</h1>
        <p>Thank you for signing up, {{firstName}} {{lastName}}.</p>
        <p>Your account email is: {{email}}</p>
        <a href="{{activationLink}}">Click here to activate your account</a>
      </body>
    </html>
  \`
});

console.log('Template ID:', template.id);
// Save this templateId to use when sending emails`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Step 2: Send Email Using Template</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use the <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">templateId</code> to send emails. 
                  The template's subject and content will be used, and variables will be replaced.
                </p>
                <CodeBlock
                  language="typescript"
                  fileName="send-with-template.ts"
                  code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Send email using a template
const result = await metigan.email.sendEmail({
  from: 'hello@example.com',
  recipients: ['user@example.com'],
  subject: 'Welcome to Our Service, John!', // Can override template subject
  templateId: 'your_template_id_here',
  // Template variables will be automatically replaced in the template content
  // Variables like {{firstName}}, {{lastName}}, {{email}}, {{activationLink}} 
  // should be defined in your template when you created it
});`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Complete Example</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Here's a complete example showing how to create and use templates:
                </p>
                <CodeBlock
                  language="typescript"
                  fileName="template-complete.ts"
                  code={`import Metigan from 'metigan';
import type { EmailSuccessResponse, EmailApiResponse } from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

function isEmailSuccess(response: EmailApiResponse): response is EmailSuccessResponse {
  return 'success' in response && response.success === true;
}

async function sendWelcomeEmail(userEmail: string, userName: string) {
  try {
    // Option 1: Create template programmatically (or create in dashboard)
    const template = await metigan.templates.create({
      name: 'Welcome Email',
      subject: 'Welcome to Metigan, {{name}}!',
      content: \`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>Welcome, {{name}}!</h1>
            <p>Thank you for joining us.</p>
            <p>Your email: {{email}}</p>
          </body>
        </html>
      \`
    });

    // Option 2: Send email using the template
    const result = await metigan.email.sendEmail({
      from: 'welcome@example.com',
      recipients: [userEmail],
      templateId: template.id,
      // Note: Template variables like {{name}} and {{email}} 
      // should be replaced by your backend or defined in template settings
    });

    if (isEmailSuccess(result)) {
      console.log('âœ… Welcome email sent!');
      return result;
    } else {
      console.error('âŒ Failed to send:', result.message || result.error);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Usage
sendWelcomeEmail('user@example.com', 'John Doe');`}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="email-with-attachments.ts"
              code={`import Metigan from 'metigan';
import type { NodeAttachment, CustomAttachment } from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Browser environment (File API)
const file = new File(['content'], 'document.pdf', { 
  type: 'application/pdf' 
});

// Node.js environment
const nodeAttachment: NodeAttachment = {
  buffer: Buffer.from('file content'),
  originalname: 'document.pdf',
  mimetype: 'application/pdf'
};

// Custom attachment format
const customAttachment: CustomAttachment = {
  content: 'file content as string or buffer',
  filename: 'document.pdf',
  contentType: 'application/pdf'
};

// Send email with attachments
const result = await metigan.email.sendEmail({
  from: 'hello@example.com',
  recipients: ['user@example.com'],
  subject: 'Document Attached',
  content: '<p>Please find the attached document.</p>',
  attachments: [file] // or [nodeAttachment] or [customAttachment]
});`}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="advanced-email.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Send email with CC, BCC, and reply-to
const result = await metigan.email.sendEmail({
  from: 'Sender Name <sender@example.com>',
  recipients: ['primary@example.com'],
  cc: ['cc@example.com'],
  bcc: ['bcc@example.com'],
  replyTo: 'support@example.com',
  subject: 'Important Announcement',
  content: \`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Important Update</h1>
          <p>We have an important announcement to share with you.</p>
          <a href="https://example.com" style="display: inline-block; padding: 10px 20px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">
            Learn More
          </a>
        </div>
      </body>
    </html>
  \`
});`}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Response Format */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Response Format</h2>
        <p className="text-muted-foreground">
          The <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">sendEmail</code> method returns an <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">EmailApiResponse</code> which can be one of three types:
        </p>

        <Tabs defaultValue="success" className="w-full">
          <TabsList>
            <TabsTrigger value="success">Success</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
            <TabsTrigger value="key-error">API Key Error</TabsTrigger>
          </TabsList>

          <TabsContent value="success">
            <CodeBlock
              language="typescript"
              fileName="success-response.ts"
              code={`// EmailSuccessResponse
{
  success: true,
  message: "Email sent successfully",
  successfulEmails: [
    {
      recipient: "user@example.com",
      trackingId: "track_abc123"
    }
  ],
  failedEmails: [],
  recipientCount: 1,
  emailsRemaining: 9999
}`}
            />
          </TabsContent>

          <TabsContent value="error">
            <CodeBlock
              language="typescript"
              fileName="error-response.ts"
              code={`// EmailErrorResponse
{
  error: "validation_error",
  message: "Invalid email address format"
}`}
            />
          </TabsContent>

          <TabsContent value="key-error">
            <CodeBlock
              language="typescript"
              fileName="key-error-response.ts"
              code={`// ApiKeyErrorResponse
{
  error: "invalid_api_key"
}`}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Callout variant="tip" title="Type Safety">
        <p>
          Use the <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">isEmailSuccess()</code> type guard 
          or check for the <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">success</code> property to 
          narrow the response type safely.
        </p>
      </Callout>

      {/* Using Templates Section */}
      <div className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Using Email Templates</h2>
        <p className="text-muted-foreground">
          Templates allow you to reuse email designs and content. You can create templates in your Metigan dashboard 
          or programmatically using the Templates API.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Creating Templates</h3>
            <p className="text-muted-foreground mb-4">
              Create templates using the Templates API or in your dashboard. Templates support variables using double curly braces: <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{"{{variableName}}"}</code>
            </p>
            <CodeBlock
              language="typescript"
              fileName="create-template.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Create a reusable email template
const template = await metigan.templates.create({
  name: 'Welcome Email Template',
  subject: 'Welcome to Our Service, {{firstName}}!',
  content: \`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome, {{firstName}}!</h1>
        <p>Thank you for signing up, {{firstName}} {{lastName}}.</p>
        <p>Your email address is: <strong>{{email}}</strong></p>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <p>To get started, please click the button below:</p>
          <a href="{{activationLink}}" 
             style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; 
                    text-decoration: none; border-radius: 6px; margin-top: 10px;">
            Activate Account
          </a>
        </div>
        
        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
          If you didn't create this account, please ignore this email.
        </p>
      </body>
    </html>
  \`
});

console.log('Template created with ID:', template.id);
// Save this templateId for later use`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Sending Emails with Templates</h3>
            <p className="text-muted-foreground mb-4">
              Once you have a template ID, you can send emails using that template. The template's subject and content 
              will be used, and variables will be replaced automatically if configured in your template settings.
            </p>
            <CodeBlock
              language="typescript"
              fileName="send-with-template.ts"
              code={`import Metigan from 'metigan';
import type { EmailApiResponse, EmailSuccessResponse } from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

function isEmailSuccess(response: EmailApiResponse): response is EmailSuccessResponse {
  return 'success' in response && response.success === true;
}

async function sendWelcomeEmail() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'Welcome Team <welcome@example.com>',
      recipients: ['newuser@example.com'],
      subject: 'Welcome to Our Service, John!', // Optional: override template subject
      templateId: 'your_template_id_here', // Template ID from dashboard or API
      // Template variables like {{firstName}}, {{lastName}}, {{email}}, {{activationLink}}
      // should be configured in your template settings or passed via template API
    });

    if (isEmailSuccess(result)) {
      console.log('âœ… Welcome email sent successfully!');
      console.log('Tracking ID:', result.successfulEmails[0]?.trackingId);
    } else {
      console.error('âŒ Failed to send email:', result.message || result.error);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendWelcomeEmail();`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Template Variables</h3>
            <p className="text-muted-foreground mb-4">
              Templates support variables using the <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{"{{variableName}}"}</code> syntax. 
              Common variables include:
            </p>
            <div className="overflow-hidden rounded-lg border mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Variable</th>
                    <th className="px-4 py-3 text-left font-medium">Example</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-sm">{"{{firstName}}"}</td>
                    <td className="px-4 py-3 text-sm">John</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">User's first name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-sm">{"{{lastName}}"}</td>
                    <td className="px-4 py-3 text-sm">Doe</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">User's last name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-sm">{"{{email}}"}</td>
                    <td className="px-4 py-3 text-sm">user@example.com</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">User's email address</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm">{"{{activationLink}}"}</td>
                    <td className="px-4 py-3 text-sm">https://...</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">Dynamic link for activation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Callout variant="tip" title="Variable Configuration">
              <p>
                Template variables are typically configured when creating the template or can be passed when sending. 
                Check the <Link href="/docs/api/templates" className="text-primary hover:underline font-medium">Templates API documentation</Link> for more details on managing template variables.
              </p>
            </Callout>
          </div>
        </div>
      </div>
    </div>
  )
}

