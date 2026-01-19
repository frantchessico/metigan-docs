import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function SendingEmailsGuidePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Sending Emails Guide</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Complete guide to sending emails with Metigan. Learn best practices, advanced techniques, 
          and common patterns for sending transactional and marketing emails.
        </p>
      </div>

      {/* Related Guides */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Specialized Guides</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/docs/guides/otp-emails" className="block p-5 rounded-lg border hover:border-primary transition-colors bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔐</span>
              <h3 className="font-semibold">OTP Emails</h3>
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary">New</span>
            </div>
            <p className="text-sm text-muted-foreground">Send verification codes with built-in rate limiting and template support</p>
          </Link>
          <Link href="/docs/guides/transactional-emails" className="block p-5 rounded-lg border hover:border-primary transition-colors bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚡</span>
              <h3 className="font-semibold">Transactional Emails</h3>
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary">New</span>
            </div>
            <p className="text-sm text-muted-foreground">Welcome emails, password resets, order confirmations, and more</p>
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Email Sending</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Start with the basics. See the <Link href="/docs/quick-start" className="text-primary hover:underline font-medium">Quick Start guide</Link> for your first email.
        </p>
        <CodeBlock
          language="typescript"
          fileName="basic-send.ts"
          code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

const result = await metigan.email.sendEmail({
  from: 'sender@example.com',
  recipients: ['recipient@example.com'],
  subject: 'Hello!',
  content: '<p>This is a simple email.</p>'
});`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Best Practices</h2>
        <div className="space-y-4">
          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-xl font-semibold mb-3">Use Templates</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Create reusable templates for consistent branding and easier maintenance. Templates support variables 
              and make it easy to update designs without changing code.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-xl font-semibold mb-3">Handle Errors Gracefully</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Always check for success and handle errors appropriately. Use type guards for type safety 
              and implement retry logic for transient errors.
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-xl font-semibold mb-3">Monitor Rate Limits</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Monitor rate limit headers and implement queuing for high-volume sends. Respect rate limits 
              to ensure reliable delivery.
            </p>
          </div>
        </div>
      </section>

      <Callout variant="tip" title="Next Steps">
        <p>
          Check out the <Link href="/docs/api/email" className="text-primary hover:underline font-medium">Email API reference</Link> 
          for complete documentation of all available options and parameters.
        </p>
      </Callout>
    </div>
  )
}

