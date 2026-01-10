import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function EmailTemplatesGuidePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Email Templates Guide</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Learn how to create responsive, beautiful email templates with Metigan. Templates make it 
          easy to maintain consistent branding and design across all your emails.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Creating Templates</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Templates support HTML, CSS, and variables. See the <Link href="/docs/api/templates" className="text-primary hover:underline font-medium">Templates API</Link> for details.
        </p>
        <CodeBlock
          language="html"
          fileName="template-example.html"
          code={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: hsl(var(--primary));
        color: white;
        padding: 30px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        background: #ffffff;
        padding: 30px;
        border: 1px solid #e5e7eb;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #667eea;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Welcome, {{firstName}}!</h1>
      </div>
      <div class="content">
        <p>Hello {{firstName}} {{lastName}},</p>
        <p>Thank you for signing up! Your email is {{email}}.</p>
        <a href="{{activationLink}}" class="button">Activate Account</a>
      </div>
    </div>
  </body>
</html>`}
        />
      </section>

      <Callout variant="tip" title="Responsive Design">
        <p>
          Always test your templates on different devices and email clients. Use media queries and 
          inline styles for maximum compatibility.
        </p>
      </Callout>
    </div>
  )
}

