import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function WebhookIntegrationGuidePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Webhook Integration Guide</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Learn how to integrate webhooks into your application to receive real-time notifications 
          about email events, form submissions, and other actions.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Setting Up Webhooks</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          See the <Link href="/docs/api/webhooks" className="text-primary hover:underline font-medium">Webhooks API documentation</Link> for complete details on creating and managing webhooks.
        </p>
      </section>

      <Callout variant="warning" title="Security">
        <p>
          Always verify webhook signatures to ensure requests are authentic. Never process webhook 
          payloads without verification.
        </p>
      </Callout>
    </div>
  )
}

