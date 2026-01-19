import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OtpEmailsGuidePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">OTP Emails</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Send One-Time Password (OTP) verification emails with Metigan. Support for custom templates, 
          automatic rate limiting, and priority delivery for authentication flows.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          OTP emails are critical for user authentication, account verification, and password recovery. 
          Metigan provides a dedicated <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">POST /api/otp</code> endpoint 
          optimized for OTP delivery with:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Priority delivery</strong> - OTP emails are sent with highest priority</li>
          <li><strong>Rate limiting</strong> - Built-in protection against abuse</li>
          <li><strong>Template support</strong> - Use custom templates or default design</li>
          <li><strong>Variable substitution</strong> - Dynamic code and app name replacement</li>
          <li><strong>Idempotency</strong> - Prevent duplicate sends with idempotency keys</li>
        </ul>
      </section>

      {/* Quick Start */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Quick Start</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Send your first OTP email in seconds using the default template:
        </p>
        <CodeBlock
          language="typescript"
          fileName="send-otp-basic.ts"
          code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// Send OTP with default template
const result = await metigan.otp.send({
  to: 'user@example.com',
  from: 'auth@yourdomain.com',
  code: '123456',
  appName: 'MyApp',
  expiresInMinutes: 5
});

console.log(result);
// { success: true, queued: true, emailId: "otp-...", trackingId: "otp-..." }`}
        />
      </section>

      {/* Without Template */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">OTP Without Template (Default)</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          When you don't specify a <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">templateId</code>, 
          Metigan uses a clean, professional default template that displays your OTP code prominently.
        </p>

        <Tabs defaultValue="nodejs" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="nodejs">Node.js</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="php">PHP</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
          </TabsList>

          <TabsContent value="nodejs" className="space-y-4">
            <CodeBlock
              language="javascript"
              fileName="otp-nodejs.js"
              code={`const Metigan = require('metigan');

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY
});

async function sendVerificationCode(userEmail) {
  // Generate a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  const result = await metigan.otp.send({
    to: userEmail,
    from: 'noreply@myapp.com',
    code: code,
    appName: 'MyApp',
    subject: 'Your verification code', // Optional custom subject
    expiresInMinutes: 10
  });

  if (result.success) {
    console.log('OTP sent! Tracking ID:', result.trackingId);
    // Store code in your database/cache for verification
    return { success: true, code }; // Don't return code in production!
  } else {
    console.error('Failed to send OTP:', result.error);
    return { success: false };
  }
}

sendVerificationCode('user@example.com');`}
            />
          </TabsContent>

          <TabsContent value="typescript" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="otp-typescript.ts"
              code={`import Metigan from 'metigan';

interface OtpResult {
  success: boolean;
  queued?: boolean;
  emailId?: string;
  trackingId?: string;
  error?: string;
}

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

async function sendVerificationCode(userEmail: string): Promise<OtpResult> {
  // Generate secure random code
  const code = crypto.randomInt(100000, 999999).toString();
  
  try {
    const result = await metigan.otp.send({
      to: userEmail,
      from: 'security@myapp.com',
      code,
      appName: 'MyApp',
      expiresInMinutes: 5,
      // Prevent duplicate sends for same request
      idempotencyKey: \`verify-\${userEmail}-\${Date.now()}\`
    });

    return result as OtpResult;
  } catch (error) {
    console.error('OTP send error:', error);
    return { success: false, error: 'Failed to send OTP' };
  }
}

// Usage
sendVerificationCode('user@example.com')
  .then(result => console.log(result));`}
            />
          </TabsContent>

          <TabsContent value="python" className="space-y-4">
            <CodeBlock
              language="python"
              fileName="otp_python.py"
              code={`from metigan import MetiganClient
import random

client = MetiganClient(api_key="your-api-key")

def send_verification_code(user_email: str) -> dict:
    # Generate 6-digit code
    code = str(random.randint(100000, 999999))
    
    result = client.otp.send(
        to=user_email,
        from_address="noreply@myapp.com",
        code=code,
        app_name="MyApp",
        expires_in_minutes=10
    )
    
    if result.get("success"):
        print(f"OTP sent! Tracking: {result['trackingId']}")
        return {"success": True, "code": code}
    else:
        print(f"Failed: {result.get('error')}")
        return {"success": False}

# Usage
send_verification_code("user@example.com")`}
            />
          </TabsContent>

          <TabsContent value="php" className="space-y-4">
            <CodeBlock
              language="php"
              fileName="otp.php"
              code={`<?php
use Metigan\\MetiganClient;

$client = new MetiganClient(getenv('METIGAN_API_KEY'));

function sendVerificationCode(string $userEmail): array {
    global $client;
    
    // Generate 6-digit code
    $code = str_pad((string)random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
    
    $result = $client->otp()->send(
        to: $userEmail,
        from: "noreply@myapp.com",
        code: $code,
        appName: "MyApp",
        expiresInMinutes: 10
    );
    
    if ($result['success'] ?? false) {
        echo "OTP sent! Tracking: " . $result['trackingId'];
        return ['success' => true, 'code' => $code];
    } else {
        echo "Failed: " . ($result['error'] ?? 'Unknown error');
        return ['success' => false];
    }
}

// Usage
sendVerificationCode("user@example.com");`}
            />
          </TabsContent>

          <TabsContent value="curl" className="space-y-4">
            <CodeBlock
              language="bash"
              fileName="otp-curl.sh"
              code={`curl -X POST https://api.metigan.com/api/otp \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "noreply@myapp.com",
    "code": "123456",
    "appName": "MyApp",
    "subject": "Your verification code",
    "expiresInMinutes": 10
  }'`}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 rounded-lg border bg-muted/30">
          <h4 className="font-semibold mb-2">Default Template Preview</h4>
          <p className="text-sm text-muted-foreground mb-4">
            The default OTP template displays:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc list-inside">
            <li>Title: "Seu código de verificação" (Your verification code)</li>
            <li>App name context message</li>
            <li>Large, spaced OTP code for easy reading</li>
            <li>Expiration notice (if provided)</li>
            <li>Security disclaimer</li>
          </ul>
        </div>
      </section>

      {/* With Template */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">OTP With Custom Template</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Use your own branded templates for OTP emails. Templates support dynamic variables 
          that are automatically replaced when sending.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Step 1: Create an OTP Template</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a template with OTP-specific variables. Supported variables:
            </p>
            <div className="overflow-hidden rounded-lg border mb-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Variable</th>
                    <th className="px-4 py-3 text-left font-medium">Description</th>
                    <th className="px-4 py-3 text-left font-medium">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-sm">{"{{code}}"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">The OTP code</td>
                    <td className="px-4 py-3 text-sm">123456</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono text-sm">{"{{appName}}"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">Your application name</td>
                    <td className="px-4 py-3 text-sm">MyApp</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm">{"{{expiresInMinutes}}"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">Code expiration time</td>
                    <td className="px-4 py-3 text-sm">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <CodeBlock
              language="typescript"
              fileName="create-otp-template.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// Create a branded OTP template
const template = await metigan.templates.create({
  name: 'Branded OTP Template',
  subject: '{{appName}} - Verification Code',
  content: \`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: white;">
          <tr>
            <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <h1 style="margin: 0; color: white; font-size: 28px;">{{appName}}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 24px;">Verification Code</h2>
              <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                Enter the code below to verify your identity:
              </p>
              
              <!-- OTP Code Box -->
              <div style="background: #f8f9fa; border: 2px dashed #667eea; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                <span style="font-size: 42px; font-weight: bold; letter-spacing: 12px; color: #333; font-family: 'Courier New', monospace;">
                  {{code}}
                </span>
              </div>
              
              <p style="margin: 20px 0; color: #999; font-size: 14px; text-align: center;">
                ⏱️ This code expires in <strong>{{expiresInMinutes}} minutes</strong>
              </p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="margin: 0; color: #999; font-size: 13px; line-height: 1.5;">
                If you didn't request this code, please ignore this email or contact our support team.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; background: #f8f9fa; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                © {{appName}} - Sent via Metigan
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  \`
});

console.log('Template ID:', template.id);
// Save this ID for sending OTPs`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Step 2: Send OTP Using Template</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reference your template by ID when sending. Variables will be automatically replaced:
            </p>
            <CodeBlock
              language="typescript"
              fileName="send-otp-with-template.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

const BRANDED_OTP_TEMPLATE_ID = 'your_template_id_here';

async function sendBrandedOtp(userEmail: string) {
  const code = crypto.randomInt(100000, 999999).toString();
  
  const result = await metigan.otp.send({
    to: userEmail,
    from: 'security@myapp.com',
    code: code,
    appName: 'MyApp',
    expiresInMinutes: 10,
    templateId: BRANDED_OTP_TEMPLATE_ID // 🎨 Use custom template
  });

  if (result.success) {
    console.log('✅ Branded OTP sent!');
    console.log('Tracking ID:', result.trackingId);
    return { success: true, code };
  } else {
    console.error('❌ Failed:', result.error);
    return { success: false };
  }
}

// Send branded OTP
sendBrandedOtp('user@example.com');`}
            />
          </div>
        </div>

        <Callout variant="tip" title="Template Best Practices">
          <ul className="text-sm space-y-1">
            <li>• Make the OTP code large and easy to read (42px+ font size)</li>
            <li>• Use letter-spacing for better digit separation</li>
            <li>• Include expiration time prominently</li>
            <li>• Add security disclaimers</li>
            <li>• Test on mobile devices - most OTPs are read on phones</li>
          </ul>
        </Callout>
      </section>

      {/* Parameters Reference */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">API Reference</h2>
        <p className="text-muted-foreground mb-4">
          <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">POST /api/otp</code> - Send an OTP email
        </p>
        
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
                <td className="px-4 py-3 font-mono text-sm">to</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">Yes</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Recipient email address (also accepts <code className="px-1 py-0.5 rounded bg-muted">email</code>)
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">from</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">Yes</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Sender email address (must be verified domain)
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">code</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">Yes</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  The OTP code (max 12 characters)
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">appName</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Your application name (default: "Metigan")
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">subject</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Custom subject line (default: "[appName] - Seu código de verificação")
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">expiresInMinutes</td>
                <td className="px-4 py-3 text-sm font-mono">number</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Code expiration time to display in email
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-sm">templateId</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Custom template ID to use instead of default
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sm">idempotencyKey</td>
                <td className="px-4 py-3 text-sm font-mono">string</td>
                <td className="px-4 py-3 text-sm">No</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  Unique key to prevent duplicate sends
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Rate Limits</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          OTP endpoints have built-in rate limiting to prevent abuse. Limits are per recipient, per user:
        </p>
        
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Plan</th>
                <th className="px-4 py-3 text-left font-medium">OTPs per recipient</th>
                <th className="px-4 py-3 text-left font-medium">Time window</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm font-medium">Free</td>
                <td className="px-4 py-3 text-sm">3</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">5 minutes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm font-medium">Pro</td>
                <td className="px-4 py-3 text-sm">5</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">5 minutes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm font-medium">Growth</td>
                <td className="px-4 py-3 text-sm">6</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">5 minutes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium">Business</td>
                <td className="px-4 py-3 text-sm">8</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">5 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout variant="warning" title="Rate Limit Exceeded">
          <p>
            If you exceed the rate limit, you'll receive a <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">429 Too Many Requests</code> response. 
            Implement exponential backoff and show users a "wait before requesting new code" message.
          </p>
        </Callout>
      </section>

      {/* Best Practices */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Security Best Practices</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-lg font-semibold mb-3">✅ Do</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use 6-8 digit numeric codes</li>
              <li>• Set short expiration (5-10 minutes)</li>
              <li>• Store codes hashed in your database</li>
              <li>• Invalidate code after successful verification</li>
              <li>• Use idempotency keys for retries</li>
              <li>• Log verification attempts</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-lg font-semibold mb-3">❌ Don't</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Never return the OTP code in API responses</li>
              <li>• Don't use predictable codes</li>
              <li>• Avoid very long expiration times</li>
              <li>• Don't allow unlimited verification attempts</li>
              <li>• Never log actual OTP codes</li>
              <li>• Don't reuse the same code</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Complete Example */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Complete Example</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Here's a full implementation of an OTP verification flow:
        </p>
        <CodeBlock
          language="typescript"
          fileName="otp-verification-flow.ts"
          code={`import Metigan from 'metigan';
import crypto from 'crypto';
import Redis from 'ioredis';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

const redis = new Redis(process.env.REDIS_URL!);
const OTP_EXPIRY_SECONDS = 600; // 10 minutes
const MAX_VERIFY_ATTEMPTS = 5;

// Generate secure OTP
function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

// Hash OTP for storage
function hashOtp(otp: string): string {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

// Send OTP
export async function sendOtp(email: string, purpose: 'login' | 'register' | 'reset') {
  const code = generateOtp();
  const hashedCode = hashOtp(code);
  const key = \`otp:\${purpose}:\${email}\`;
  const attemptsKey = \`otp:attempts:\${email}\`;
  
  // Store hashed OTP with expiry
  await redis.setex(key, OTP_EXPIRY_SECONDS, hashedCode);
  await redis.del(attemptsKey); // Reset attempts on new OTP
  
  // Send via Metigan
  const result = await metigan.otp.send({
    to: email,
    from: 'security@myapp.com',
    code: code,
    appName: 'MyApp',
    expiresInMinutes: Math.floor(OTP_EXPIRY_SECONDS / 60),
    idempotencyKey: \`\${purpose}-\${email}-\${Date.now()}\`
  });
  
  return {
    success: result.success,
    message: result.success 
      ? 'Verification code sent to your email' 
      : 'Failed to send verification code'
  };
}

// Verify OTP
export async function verifyOtp(email: string, code: string, purpose: string) {
  const key = \`otp:\${purpose}:\${email}\`;
  const attemptsKey = \`otp:attempts:\${email}\`;
  
  // Check attempts
  const attempts = await redis.incr(attemptsKey);
  await redis.expire(attemptsKey, OTP_EXPIRY_SECONDS);
  
  if (attempts > MAX_VERIFY_ATTEMPTS) {
    await redis.del(key); // Invalidate OTP after too many attempts
    return { success: false, error: 'Too many attempts. Request a new code.' };
  }
  
  // Get stored hash
  const storedHash = await redis.get(key);
  if (!storedHash) {
    return { success: false, error: 'Code expired or not found' };
  }
  
  // Verify
  const inputHash = hashOtp(code);
  if (inputHash !== storedHash) {
    return { 
      success: false, 
      error: 'Invalid code',
      attemptsRemaining: MAX_VERIFY_ATTEMPTS - attempts 
    };
  }
  
  // Success - invalidate OTP
  await redis.del(key);
  await redis.del(attemptsKey);
  
  return { success: true, message: 'Verification successful' };
}

// Usage in Express route
app.post('/api/auth/send-otp', async (req, res) => {
  const { email, purpose } = req.body;
  const result = await sendOtp(email, purpose);
  res.json(result);
});

app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, code, purpose } = req.body;
  const result = await verifyOtp(email, code, purpose);
  res.json(result);
});`}
        />
      </section>

      <Callout variant="tip" title="Next Steps">
        <p>
          Learn more about <Link href="/docs/guides/sending-emails" className="text-primary hover:underline font-medium">Transactional Emails</Link> 
          {" "}or explore the <Link href="/docs/api/templates" className="text-primary hover:underline font-medium">Templates API</Link> for creating custom email designs.
        </p>
      </Callout>
    </div>
  )
}
