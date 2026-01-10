import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function TemplatesApiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Templates API</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Create and manage reusable email templates with variable substitution. Templates make it 
          easy to maintain consistent email designs and content across your campaigns.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Create Template</h2>
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
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Welcome, {{firstName}}!</h1>
        <p>Thank you for signing up, {{firstName}} {{lastName}}.</p>
        <p>Your email address is: <strong>{{email}}</strong></p>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f3f4f6;">
          <p>To get started, please click the button below:</p>
          <a href="{{activationLink}}" 
             style="display: inline-block; padding: 12px 24px; background-color: #2563eb; 
                    color: white; text-decoration: none; border-radius: 6px;">
            Activate Account
          </a>
        </div>
      </body>
    </html>
  \`
});

console.log('Template created with ID:', template.id);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Use Template</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Send emails using a template ID. Learn more in the <Link href="/docs/api/email" className="text-primary hover:underline font-medium">Email API documentation</Link>.
        </p>
        <CodeBlock
          language="typescript"
          fileName="use-template.ts"
          code={`// Send email using a template
const result = await metigan.email.sendEmail({
  from: 'sender@example.com',
  recipients: ['recipient@example.com'],
  templateId: 'template_123', // Use the template ID
  subject: 'Welcome!' // Optional: override template subject
});`}
        />
      </section>

      <Callout variant="tip" title="Template Variables">
        <p>
          Templates support variables using <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{"{{variableName}}"}</code> syntax. 
          These variables are replaced when sending emails. See the <Link href="/docs/api/email" className="text-primary hover:underline font-medium">Email API</Link> for details.
        </p>
      </Callout>
    </div>
  )
}

