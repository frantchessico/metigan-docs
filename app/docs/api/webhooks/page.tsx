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
    'email.clicked'
  ]
});

// Save the signature key securely - it will only be shown once!
console.log('Webhook created:', webhook.id);
console.log('Signature Key:', webhook.signatureKey);`}
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
                <td className="px-6 py-4 text-sm text-muted-foreground">Email was accepted by the mail server</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.delivered</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Email was delivered to recipient inbox</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.opened</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Recipient opened the email</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.clicked</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Recipient clicked a link in the email</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.bounced</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Email bounced (hard or soft bounce)</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.complained</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Recipient marked email as spam</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">email.delivery_delayed</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Email delivery was delayed</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">contact.created</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">A new contact was added to an audience</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">contact.updated</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">A contact was updated</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">contact.deleted</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">A contact was deleted</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">audience.created</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">A new audience was created</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">audience.updated</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">An audience was updated</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">audience.deleted</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">An audience was deleted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Webhook Headers</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Every webhook request includes these headers:
        </p>
        <div className="overflow-hidden rounded-lg border-2">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="px-6 py-4 text-left font-semibold">Header</th>
                <th className="px-6 py-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">X-Webhook-Signature</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  HMAC-SHA256 signature in format: <code className="bg-muted px-1 rounded">t=timestamp,v1=signature</code>
                </td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">X-Webhook-Id</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Your webhook ID for reference</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">X-Webhook-Timestamp</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Unix timestamp when the webhook was sent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Webhook Payloads</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Example webhook payload structures for different event types:
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Email Events</h3>
        <CodeBlock
          language="json"
          fileName="email-delivered.json"
          code={`{
  "event": "email.delivered",
  "messageId": "msg_abc123xyz",
  "data": {
    "recipient": "user@example.com",
    "subject": "Welcome to our service!",
    "status": "delivered",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "metadata": {
      "queueId": "1A86E41BB7",
      "dsn": "2.0.0",
      "statusDetail": "250 2.0.0 OK"
    }
  },
  "timestamp": 1705314600000
}`}
        />

        <h3 className="text-xl font-semibold mt-6">Email Opened</h3>
        <CodeBlock
          language="json"
          fileName="email-opened.json"
          code={`{
  "event": "email.opened",
  "messageId": "msg_abc123xyz",
  "data": {
    "recipient": "user@example.com",
    "subject": "Welcome to our service!",
    "status": "opened",
    "openCount": 1,
    "timestamp": "2024-01-15T10:35:00.000Z",
    "metadata": {
      "ip": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "geolocation": {
        "country": "US",
        "city": "New York"
      },
      "device": {
        "type": "desktop",
        "os": "Windows 10",
        "client": "Chrome 120"
      }
    }
  },
  "timestamp": 1705314900000
}`}
        />

        <h3 className="text-xl font-semibold mt-6">Contact Events</h3>
        <CodeBlock
          language="json"
          fileName="contact-created.json"
          code={`{
  "event": "contact.created",
  "messageId": "contact_def456xyz",
  "data": {
    "id": "contact_def456xyz",
    "email": "newuser@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "status": "subscribed",
    "audienceId": "aud_123abc",
    "tags": ["newsletter", "premium"],
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": 1705314600000
}`}
        />

        <h3 className="text-xl font-semibold mt-6">Audience Events</h3>
        <CodeBlock
          language="json"
          fileName="audience-created.json"
          code={`{
  "event": "audience.created",
  "messageId": "aud_789ghi",
  "data": {
    "id": "aud_789ghi",
    "name": "Newsletter Subscribers",
    "description": "Users who signed up for the newsletter",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": 1705314600000
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Verify Webhook Signature</h2>
        <Callout variant="warning" title="Important: Use Raw Body">
          <p>
            You must use the raw request body (as a string) to verify the signature. 
            Using a parsed JSON object will cause verification to fail.
          </p>
        </Callout>

        <h3 className="text-xl font-semibold mt-8">Node.js / Express</h3>
        <CodeBlock
          language="typescript"
          fileName="verify-webhook-nodejs.ts"
          code={`import express from 'express';
import crypto from 'crypto';

const app = express();

// IMPORTANT: Use express.raw() to get the body as a Buffer
app.post('/webhooks/metigan', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-webhook-signature'] as string;
  
  if (!signature) {
    return res.status(401).send('Missing signature');
  }
  
  // Convert Buffer to string for verification
  const payload = req.body.toString();
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET!)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Parse the verified payload
  const event = JSON.parse(payload);
  console.log('Webhook event:', event.event, event.data);
  
  res.status(200).send('OK');
});

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
  tolerance = 300 // 5 minutes
): boolean {
  try {
    // Parse signature: t=timestamp,v1=signature
    const parts = signature.split(',');
    const timestampPart = parts.find(p => p.startsWith('t='));
    const signaturePart = parts.find(p => p.startsWith('v1='));
    
    if (!timestampPart || !signaturePart) {
      return false;
    }
    
    const timestamp = parseInt(timestampPart.slice(2));
    const providedSignature = signaturePart.slice(3);
    
    // Check if signature is too old (replay attack protection)
    const now = Math.floor(Date.now() / 1000);
    if (now - timestamp > tolerance) {
      return false;
    }
    
    // Generate expected signature: HMAC-SHA256 of "timestamp.payload"
    const signedPayload = \`\${timestamp}.\${payload}\`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(providedSignature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

app.listen(3000);`}
        />

        <h3 className="text-xl font-semibold mt-8">Python / Flask</h3>
        <CodeBlock
          language="python"
          fileName="verify-webhook-python.py"
          code={`import hmac
import hashlib
import time
import os
from flask import Flask, request

app = Flask(__name__)

def verify_webhook_signature(payload: str, signature: str, secret: str, tolerance: int = 300) -> bool:
    try:
        # Parse signature: t=timestamp,v1=signature
        parts = signature.split(',')
        timestamp_part = next((p for p in parts if p.startswith('t=')), None)
        signature_part = next((p for p in parts if p.startswith('v1=')), None)
        
        if not timestamp_part or not signature_part:
            return False
        
        timestamp = int(timestamp_part[2:])
        provided_signature = signature_part[3:]
        
        # Check if signature is too old
        if time.time() - timestamp > tolerance:
            return False
        
        # Generate expected signature
        signed_payload = f"{timestamp}.{payload}"
        expected_signature = hmac.new(
            secret.encode(),
            signed_payload.encode(),
            hashlib.sha256
        ).hexdigest()
        
        # Use timing-safe comparison
        return hmac.compare_digest(provided_signature, expected_signature)
    except:
        return False

@app.route('/webhooks/metigan', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Webhook-Signature')
    
    if not signature:
        return 'Missing signature', 401
    
    # Get raw payload as string
    payload = request.get_data(as_text=True)
    
    if not verify_webhook_signature(payload, signature, os.environ['WEBHOOK_SECRET']):
        return 'Invalid signature', 401
    
    event = request.get_json()
    print(f"Webhook event: {event['event']}")
    
    return {'received': True}

if __name__ == '__main__':
    app.run(port=3000)`}
        />

        <h3 className="text-xl font-semibold mt-8">PHP</h3>
        <CodeBlock
          language="php"
          fileName="verify-webhook-php.php"
          code={`<?php

function verifyWebhookSignature(
    string $payload, 
    string $signature, 
    string $secret, 
    int $tolerance = 300
): bool {
    // Parse signature: t=timestamp,v1=signature
    $parts = explode(',', $signature);
    $timestamp = null;
    $providedSignature = null;
    
    foreach ($parts as $part) {
        if (strpos($part, 't=') === 0) {
            $timestamp = (int) substr($part, 2);
        }
        if (strpos($part, 'v1=') === 0) {
            $providedSignature = substr($part, 3);
        }
    }
    
    if (!$timestamp || !$providedSignature) {
        return false;
    }
    
    // Check if signature is too old
    if (time() - $timestamp > $tolerance) {
        return false;
    }
    
    // Generate expected signature
    $signedPayload = "{$timestamp}.{$payload}";
    $expectedSignature = hash_hmac('sha256', $signedPayload, $secret);
    
    // Use timing-safe comparison
    return hash_equals($expectedSignature, $providedSignature);
}

// Get the raw POST body
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? '';

if (empty($signature)) {
    http_response_code(401);
    exit('Missing signature');
}

if (!verifyWebhookSignature($payload, $signature, getenv('WEBHOOK_SECRET'))) {
    http_response_code(401);
    exit('Invalid signature');
}

$event = json_decode($payload, true);
echo "Webhook event: " . $event['event'];
http_response_code(200);`}
        />
      </section>

      <Callout variant="warning" title="Security Best Practices">
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>Always verify webhook signatures before processing events</li>
          <li>Use HTTPS endpoints only for receiving webhooks</li>
          <li>Implement timestamp tolerance to prevent replay attacks</li>
          <li>Store your signature key securely (environment variables)</li>
          <li>Respond quickly (within 30 seconds) to avoid timeouts</li>
          <li>Return 2xx status codes for successful processing</li>
        </ul>
      </Callout>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Retry Policy</h2>
        <p className="text-muted-foreground leading-relaxed">
          If your endpoint returns a non-2xx status code or times out, Metigan will automatically 
          retry the webhook delivery. After 10 consecutive failures, the webhook will be 
          automatically disabled to prevent further issues.
        </p>
        <div className="overflow-hidden rounded-lg border-2">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="px-6 py-4 text-left font-semibold">Attempt</th>
                <th className="px-6 py-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">1-9</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Retried on failure</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">10+</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Webhook automatically disabled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
