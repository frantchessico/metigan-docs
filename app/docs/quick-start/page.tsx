import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function QuickStartPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Quick Start</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Get up and running with Metigan in 5 minutes. Send your first email in just a few simple steps. 
          Perfect for developers who want to get started quickly.
        </p>
      </div>

      {/* Step 1 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            1
          </div>
          <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Your API Key</h2>
        </div>
        <div className="ml-14 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            First, you'll need an API key. You can create one in your <Link href="https://app.metigan.com/api-keys" target="_blank" className="text-primary hover:underline font-medium">Metigan Dashboard</Link> under Settings â†’ API Keys.
          </p>
          <Callout variant="warning" title="Security Best Practice">
            <p>
              Never commit your API key to version control. Always use environment variables or a secure secret management service like AWS Secrets Manager, HashiCorp Vault, or similar.
            </p>
          </Callout>
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            2
          </div>
          <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Install the SDK</h2>
        </div>
        <div className="ml-14 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Install the Metigan SDK using your preferred package manager:
          </p>
          <CodeBlock
            language="bash"
            fileName="Terminal"
            code={`# Using npm
npm install metigan

# Using yarn
yarn add metigan

# Using pnpm
pnpm add metigan`}
          />
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            3
          </div>
          <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Initialize the Client</h2>
        </div>
        <div className="ml-14 space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Create a new Metigan client instance with your API key:
          </p>
          <CodeBlock
            language="typescript"
            fileName="index.ts"
            code={`import Metigan from 'metigan';

// Initialize the Metigan client
const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY || 'your_api_key_here'
});`}
          />
        </div>
      </section>

      {/* Step 4 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
            4
          </div>
          <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Send Your First Email</h2>
        </div>
        
        <div className="ml-14 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Now you're ready to send your first email! Choose between a simple email or using a template:
          </p>
          
          <Tabs defaultValue="simple" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="simple" className="text-sm">Simple Email</TabsTrigger>
              <TabsTrigger value="template" className="text-sm">Using Template</TabsTrigger>
            </TabsList>

            <TabsContent value="simple" className="space-y-4 mt-0">
              <CodeBlock
                language="typescript"
                fileName="send-email.ts"
                code={`async function sendWelcomeEmail() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Welcome to Metigan!',
      content: '<h1>Welcome!</h1><p>This is your first email sent with Metigan.</p>'
    });

    if ('success' in result && result.success) {
      console.log('âœ… Email sent successfully!', result);
    } else {
      console.error('âŒ Failed to send email:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

sendWelcomeEmail();`}
              />
            </TabsContent>

            <TabsContent value="template" className="space-y-4 mt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                You can also send emails using pre-created templates. First create a template in your dashboard, then use its ID:
              </p>
              <CodeBlock
                language="typescript"
                fileName="send-with-template.ts"
                code={`async function sendEmailWithTemplate() {
  try {
    // Send email using a template ID (create template in dashboard first)
    const result = await metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Welcome Email', // Can override template subject if needed
      templateId: 'your_template_id_here' // Get this from your Metigan dashboard
    });

    if ('success' in result && result.success) {
      console.log('âœ… Email sent successfully using template!', result);
    } else {
      console.error('âŒ Failed to send email:', result);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

sendEmailWithTemplate();`}
              />
              <Callout variant="tip" title="Template Variables">
                <p>
                  Templates can contain variables like <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{"{{name}}"}</code> or <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{"{{email}}"}</code>. 
                  These will be automatically replaced when sending. See the <Link href="/docs/api/email" className="text-primary hover:underline font-medium">Email API documentation</Link> for more details on templates.
                </p>
              </Callout>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Complete Example */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4 scroll-mt-20">Complete Example</h2>
          <p className="text-muted-foreground leading-relaxed">
            Here's a complete, production-ready example that includes error handling, type guards, and best practices:
          </p>
        </div>
        <CodeBlock
          language="typescript"
          fileName="complete-example.ts"
          code={`import Metigan from 'metigan';
import type { EmailApiResponse, EmailSuccessResponse } from 'metigan';

// Initialize the client
const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// Type guard helper for type safety
function isEmailSuccess(response: EmailApiResponse): response is EmailSuccessResponse {
  return 'success' in response && response.success === true;
}

// Send email with proper error handling
async function sendEmail() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'Sender Name <sender@example.com>',
      recipients: ['recipient@example.com'],
      subject: 'Welcome to Metigan!',
      content: \`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            <h1>Welcome to Metigan!</h1>
            <p>This is your first email sent with the Metigan SDK.</p>
          </body>
        </html>
      \`
    });

    if (isEmailSuccess(result)) {
      console.log('âœ… Email sent successfully!');
      console.log('Tracking ID:', result.successfulEmails[0]?.trackingId);
      console.log('Emails remaining:', result.emailsRemaining);
    } else {
      console.error('âŒ Failed to send email:', result.message || result.error);
    }
  } catch (error) {
    console.error('âŒ Error sending email:', error);
  }
}

// Run the function
sendEmail();`}
        />
      </section>

      {/* Next Steps */}
      <section className="rounded-xl border-2 bg-muted p-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">What's Next?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Continue learning with these recommended resources
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/docs/api/email" className="group">
            <div className="rounded-lg border-2 p-6 hover:border-primary hover:bg-muted transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg group-hover: dark:group-hover: transition-colors">
                  Email API Reference
                </h3>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover: dark:group-hover: group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn about all available email methods, parameters, and response types. Complete reference documentation.
              </p>
            </div>
          </Link>

          <Link href="/docs/guides/sending-emails" className="group">
            <div className="rounded-lg border-2 p-6 hover:border-primary hover:bg-muted transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg group-hover: dark:group-hover: transition-colors">
                  Sending Emails Guide
                </h3>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover: dark:group-hover: group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Best practices, advanced techniques, and real-world examples for sending emails effectively.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

