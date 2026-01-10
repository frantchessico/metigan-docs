import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function WebhooksApiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Webhooks API</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Set up webhooks to receive real-time notifications about email events, form submissions, 
          and other actions in your Metigan account.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Create Webhook</h2>
        <CodeBlock
          language="typescript"
          fileName="create-webhook.ts"
          code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Create a webhook
const webhook = await metigan.webhooks.create({
  url: 'https://your-app.com/webhooks/metigan',
  events: [
    'email.sent',
    'email.delivered',
    'email.bounced',
    'email.opened',
    'email.clicked',
    'form.submitted'
  ],
  secret: 'your_webhook_secret' // For signature verification
});

console.log('Webhook created:', webhook.id);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Webhook Events</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Available webhook events you can subscribe to:
        </p>
        <div className="overflow-hidden rounded-lg border-2">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="px-6 py-4 text-left font-semibold">Event</th>
                <th className="px-6 py-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.sent</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Email was successfully sent</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.delivered</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Email was delivered to recipient</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.opened</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Recipient opened the email</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.clicked</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Recipient clicked a link</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.bounced</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Email bounced</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">form.submitted</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Form submission received</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Verify Webhook Signature</h2>
        <CodeBlock
          language="typescript"
          fileName="verify-webhook.ts"
          code={`import crypto from 'crypto';

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// In your webhook endpoint
app.post('/webhooks/metigan', (req, res) => {
  const signature = req.headers['x-metigan-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature!, process.env.WEBHOOK_SECRET!)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook event
  const event = req.body;
  console.log('Webhook event:', event.type, event.data);
  
  res.status(200).send('OK');
});`}
        />
      </section>

      <Callout variant="warning" title="Security">
        <p>
          Always verify webhook signatures to ensure the request is from Metigan. Never trust 
          webhook payloads without verification.
        </p>
      </Callout>
    </div>
  )
}

