import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export const metadata = {
  title: "Authentication | REST API | Metigan",
  description: "How to authenticate with the Metigan REST API",
}

export default function AuthenticationPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full">
            REST API
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-500 rounded-full">
            Authentication
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">API Authentication</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Learn how to authenticate your requests to the Metigan API using API keys.
        </p>
      </div>

      {/* Getting Your API Key */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Getting Your API Key</h2>
        <p className="text-muted-foreground">
          To get your API key:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Log in to your <Link href="https://app.metigan.com" className="text-primary hover:underline">Metigan Dashboard</Link></li>
          <li>Navigate to <strong>Settings → API Keys</strong></li>
          <li>Click <strong>Create API Key</strong></li>
          <li>Give your key a descriptive name (e.g., "Production Server", "Development")</li>
          <li>Copy and securely store your API key</li>
        </ol>

        <Callout variant="warning" title="Keep Your API Key Secret">
          <p>
            Your API key grants full access to your Metigan account. Never share it publicly, 
            commit it to version control, or expose it in client-side code.
          </p>
        </Callout>
      </section>

      {/* Using the API Key */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Using Your API Key</h2>
        <p className="text-muted-foreground">
          Include your API key in the <code className="bg-muted px-1.5 py-0.5 rounded">x-api-key</code> header 
          with every API request:
        </p>

        <h3 className="text-xl font-semibold mt-6">cURL</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/email/send \\
  -H "x-api-key: mtg_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"from": "hello@example.com", "recipients": ["user@example.com"], "subject": "Hello", "content": "<p>Hello World</p>"}'`}
        />

        <h3 className="text-xl font-semibold mt-6">JavaScript (fetch)</h3>
        <CodeBlock
          language="javascript"
          fileName="example.js"
          code={`const response = await fetch('https://api.metigan.com/api/email/send', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.METIGAN_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'hello@example.com',
    recipients: ['user@example.com'],
    subject: 'Hello',
    content: '<p>Hello World</p>'
  })
});`}
        />

        <h3 className="text-xl font-semibold mt-6">Python (requests)</h3>
        <CodeBlock
          language="python"
          fileName="example.py"
          code={`import os
import requests

response = requests.post(
    'https://api.metigan.com/api/email/send',
    headers={
        'x-api-key': os.environ['METIGAN_API_KEY'],
        'Content-Type': 'application/json'
    },
    json={
        'from': 'hello@example.com',
        'recipients': ['user@example.com'],
        'subject': 'Hello',
        'content': '<p>Hello World</p>'
    }
)`}
        />

        <h3 className="text-xl font-semibold mt-6">PHP</h3>
        <CodeBlock
          language="php"
          fileName="example.php"
          code={`<?php
$ch = curl_init('https://api.metigan.com/api/email/send');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'x-api-key: ' . getenv('METIGAN_API_KEY'),
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'from' => 'hello@example.com',
        'recipients' => ['user@example.com'],
        'subject' => 'Hello',
        'content' => '<p>Hello World</p>'
    ])
]);

$response = curl_exec($ch);
curl_close($ch);`}
        />
      </section>

      {/* API Key Types */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">API Key Types</h2>
        <p className="text-muted-foreground">
          Metigan supports different API key types for different environments:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Prefix</th>
                <th className="text-left py-3 px-4 font-semibold">Environment</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-emerald-500">mtg_live_</code></td>
                <td className="py-3 px-4">Production</td>
                <td className="py-3 px-4 text-muted-foreground">Full access, sends real emails, counts against quota</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-yellow-500">mtg_test_</code></td>
                <td className="py-3 px-4">Test/Sandbox</td>
                <td className="py-3 px-4 text-muted-foreground">Emails are not sent, for development and testing</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout variant="tip" title="Development Tip">
          <p>
            Use <code className="bg-muted px-1 rounded">mtg_test_</code> keys during development 
            to avoid sending real emails and consuming your email quota.
          </p>
        </Callout>
      </section>

      {/* Environment Variables */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Environment Variables</h2>
        <p className="text-muted-foreground">
          Store your API key in environment variables to keep it secure:
        </p>

        <h3 className="text-xl font-semibold mt-6">.env file</h3>
        <CodeBlock
          language="bash"
          fileName=".env"
          code={`# Production
METIGAN_API_KEY=mtg_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Development
METIGAN_API_KEY=mtg_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
        />

        <Callout variant="warning" title="Never Commit .env Files">
          <p>
            Add <code className="bg-muted px-1 rounded">.env</code> to your <code className="bg-muted px-1 rounded">.gitignore</code> file 
            to prevent accidentally committing sensitive credentials.
          </p>
        </Callout>

        <h3 className="text-xl font-semibold mt-6">Platform-specific Configuration</h3>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Vercel</h4>
            <p>Add to Settings → Environment Variables</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Heroku</h4>
            <p><code>heroku config:set METIGAN_API_KEY=mtg_live_xxx</code></p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">AWS</h4>
            <p>Use AWS Secrets Manager or Parameter Store</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Docker</h4>
            <p><code>docker run -e METIGAN_API_KEY=mtg_live_xxx ...</code></p>
          </div>
        </div>
      </section>

      {/* Authentication Errors */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Authentication Errors</h2>
        <p className="text-muted-foreground">
          Common authentication errors and how to resolve them:
        </p>

        <div className="space-y-6">
          <div className="p-4 border rounded-lg border-red-500/20 bg-red-500/5">
            <h4 className="font-semibold text-red-500 mb-2">401 Unauthorized</h4>
            <CodeBlock
              language="json"
              code={`{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Invalid or missing API key"
}`}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Solution:</strong> Check that your API key is correct and included in the 
              <code className="bg-muted px-1 rounded mx-1">x-api-key</code> header.
            </p>
          </div>

          <div className="p-4 border rounded-lg border-yellow-500/20 bg-yellow-500/5">
            <h4 className="font-semibold text-yellow-500 mb-2">403 Forbidden</h4>
            <CodeBlock
              language="json"
              code={`{
  "success": false,
  "error": "FORBIDDEN",
  "message": "API key does not have permission for this action"
}`}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Solution:</strong> Your API key may have restricted permissions or be disabled. 
              Check your API key settings in the dashboard.
            </p>
          </div>

          <div className="p-4 border rounded-lg border-orange-500/20 bg-orange-500/5">
            <h4 className="font-semibold text-orange-500 mb-2">429 Rate Limited</h4>
            <CodeBlock
              language="json"
              code={`{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please retry after 60 seconds.",
  "retryAfter": 60
}`}
            />
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Solution:</strong> Implement exponential backoff and respect the 
              <code className="bg-muted px-1 rounded mx-1">retryAfter</code> value.
            </p>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Security Best Practices</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">✅ Do</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Store API keys in environment variables</li>
              <li>• Use test keys during development</li>
              <li>• Rotate keys periodically</li>
              <li>• Use different keys for different environments</li>
              <li>• Monitor API key usage in dashboard</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">❌ Don't</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Commit API keys to version control</li>
              <li>• Expose keys in client-side JavaScript</li>
              <li>• Share keys via email or chat</li>
              <li>• Use production keys for testing</li>
              <li>• Hard-code keys in your source code</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Revoking API Keys */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Revoking API Keys</h2>
        <p className="text-muted-foreground">
          If you suspect your API key has been compromised:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Go to <Link href="https://app.metigan.com/settings/api-keys" className="text-primary hover:underline">Settings → API Keys</Link> in your dashboard</li>
          <li>Find the compromised key</li>
          <li>Click the <strong>Revoke</strong> button</li>
          <li>Create a new API key</li>
          <li>Update your application with the new key</li>
        </ol>

        <Callout variant="info" title="Immediate Effect">
          <p>
            Revoking an API key takes effect immediately. All requests using that key will 
            start returning 401 errors.
          </p>
        </Callout>
      </section>
    </div>
  )
}
