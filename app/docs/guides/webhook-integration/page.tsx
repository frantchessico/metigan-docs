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
          about email events and other actions.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          Webhooks allow your application to receive real-time notifications when events occur in 
          Metigan. Instead of polling for updates, webhooks push data to your server as soon as 
          events happen.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg border bg-muted/20">
            <h3 className="font-semibold mb-2">1. Create Webhook</h3>
            <p className="text-sm text-muted-foreground">
              Set up a webhook endpoint in your Metigan dashboard or via API
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h3 className="font-semibold mb-2">2. Receive Events</h3>
            <p className="text-sm text-muted-foreground">
              Your endpoint receives POST requests with event data
            </p>
          </div>
          <div className="p-4 rounded-lg border bg-muted/20">
            <h3 className="font-semibold mb-2">3. Verify & Process</h3>
            <p className="text-sm text-muted-foreground">
              Verify the signature and process the event in your app
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Quick Start</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Here&apos;s a minimal example to get started with webhooks in Node.js:
        </p>
        <CodeBlock
          language="typescript"
          fileName="webhook-server.ts"
          code={`import express from 'express';
import crypto from 'crypto';

const app = express();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

// IMPORTANT: Use express.raw() to preserve the raw body for signature verification
app.post('/webhooks/metigan', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-webhook-signature'] as string;
  const payload = req.body.toString();
  
  // Verify the signature
  if (!verifySignature(payload, signature, WEBHOOK_SECRET)) {
    console.error('Invalid webhook signature');
    return res.status(401).send('Invalid signature');
  }
  
  // Parse and process the event
  const event = JSON.parse(payload);
  
  switch (event.event) {
    case 'email.delivered':
      console.log(\`Email delivered to \${event.data.recipient}\`);
      break;
    case 'email.opened':
      console.log(\`Email opened by \${event.data.recipient}\`);
      break;
    case 'email.clicked':
      console.log(\`Link clicked in email to \${event.data.recipient}\`);
      break;
    case 'email.bounced':
      console.log(\`Email bounced for \${event.data.recipient}\`);
      break;
    default:
      console.log(\`Received event: \${event.event}\`);
  }
  
  res.status(200).send('OK');
});

function verifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const parts = signature.split(',');
    const timestamp = parseInt(parts.find(p => p.startsWith('t='))!.slice(2));
    const providedSig = parts.find(p => p.startsWith('v1='))!.slice(3);
    
    // Check timestamp (5 minute tolerance)
    if (Math.floor(Date.now() / 1000) - timestamp > 300) return false;
    
    // Verify HMAC
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(\`\${timestamp}.\${payload}\`)
      .digest('hex');
    
    return crypto.timingSafeEqual(Buffer.from(providedSig), Buffer.from(expectedSig));
  } catch {
    return false;
  }
}

app.listen(3000, () => console.log('Webhook server running on port 3000'));`}
        />
      </section>

      <Callout variant="info" title="Signature Verification">
        <p>
          The signature uses HMAC-SHA256 with the format <code className="bg-muted px-1 rounded">t=timestamp,v1=signature</code>. 
          The signed payload is <code className="bg-muted px-1 rounded">timestamp.payload</code> (timestamp dot raw JSON body).
        </p>
      </Callout>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Common Use Cases</h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">📊 Track Email Engagement</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code>email.opened</code> and <code>email.clicked</code> events to track user engagement 
              and update your analytics.
            </p>
            <CodeBlock
              language="typescript"
              fileName="track-engagement.ts"
              code={`// Update user engagement score when they interact with emails
switch (event.event) {
  case 'email.opened':
    await db.users.updateEngagement(event.data.userId, { opens: 1 });
    break;
  case 'email.clicked':
    await db.users.updateEngagement(event.data.userId, { clicks: 1 });
    break;
}`}
            />
          </div>

          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">🚫 Handle Bounces</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Automatically clean your mailing list when emails bounce.
            </p>
            <CodeBlock
              language="typescript"
              fileName="handle-bounces.ts"
              code={`if (event.event === 'email.bounced') {
  const { recipient, bounceType } = event.data;
  
  if (bounceType === 'hard') {
    // Permanently invalid address - remove from list
    await db.contacts.markInvalid(recipient);
  } else {
    // Soft bounce - retry later
    await db.contacts.incrementBounceCount(recipient);
  }
}`}
            />
          </div>

          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">⚠️ Monitor Spam Complaints</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Handle spam complaints to maintain sender reputation.
            </p>
            <CodeBlock
              language="typescript"
              fileName="handle-complaints.ts"
              code={`if (event.event === 'email.complained') {
  const { recipient } = event.data;
  
  // Unsubscribe user immediately
  await db.contacts.unsubscribe(recipient, 'spam_complaint');
  
  // Alert your team
  await slack.notify(\`⚠️ Spam complaint from \${recipient}\`);
}`}
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Best Practices</h2>
        <div className="space-y-4">
          <div className="flex gap-3 p-4 rounded-lg border">
            <span className="text-2xl">✅</span>
            <div>
              <h3 className="font-semibold">Always verify signatures</h3>
              <p className="text-sm text-muted-foreground">
                Never process webhook data without verifying the HMAC signature first.
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-lg border">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold">Respond quickly</h3>
              <p className="text-sm text-muted-foreground">
                Return a 2xx response within 30 seconds. For long operations, queue the work and respond immediately.
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-lg border">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold">Use HTTPS only</h3>
              <p className="text-sm text-muted-foreground">
                Webhook endpoints must use HTTPS to ensure data is encrypted in transit.
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-lg border">
            <span className="text-2xl">🔄</span>
            <div>
              <h3 className="font-semibold">Handle idempotency</h3>
              <p className="text-sm text-muted-foreground">
                Use the messageId to ensure you don&apos;t process the same event twice if retries occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Callout variant="warning" title="Security">
        <p>
          Always verify webhook signatures to ensure requests are authentic. Never process webhook 
          payloads without verification. See the{" "}
          <Link href="/docs/api/webhooks" className="text-primary hover:underline font-medium">
            Webhooks API documentation
          </Link>{" "}
          for complete code examples.
        </p>
      </Callout>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Testing Webhooks</h2>
        <p className="text-muted-foreground leading-relaxed">
          You can test your webhook integration directly from the Metigan dashboard:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Go to <strong>Settings → Webhooks</strong> in your dashboard</li>
          <li>Select the webhook you want to test</li>
          <li>Click the <strong>&quot;Test Webhook&quot;</strong> button</li>
          <li>Choose an event type and send a test payload</li>
          <li>Check the delivery history to see the result</li>
        </ol>
        <p className="text-muted-foreground leading-relaxed mt-4">
          For local development, you can use tools like <strong>ngrok</strong> or <strong>localtunnel</strong> to 
          expose your local server to the internet.
        </p>
      </section>
    </div>
  )
}
