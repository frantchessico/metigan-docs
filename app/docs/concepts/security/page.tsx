import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function SecurityPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Security</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Learn about Metigan's security features and best practices for keeping your application 
          and API keys secure. Security is a top priority at Metigan.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Security Features</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Metigan implements multiple layers of security to protect your data and API access:
        </p>

        <div className="space-y-4">
          <div className="p-6 rounded-lg border-2 bg-muted">
            <h3 className="text-xl font-semibold mb-3">🔒 Encrypted Connections</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All API requests are made over HTTPS using TLS 1.2 or higher. Data is encrypted in transit 
              to prevent interception and tampering.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 bg-muted">
            <h3 className="text-xl font-semibold mb-3">🔑 API Key Security</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              API keys are hashed and stored securely. Keys can be rotated, revoked, and scoped to 
              specific permissions. Never expose API keys in client-side code.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 bg-muted">
            <h3 className="text-xl font-semibold mb-3">🛡️ Input Validation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All inputs are validated and sanitized to prevent injection attacks, XSS, and other 
              security vulnerabilities. Invalid inputs are rejected with clear error messages.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">API Key Management</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Follow these best practices for managing your API keys securely:
        </p>

        <CodeBlock
          language="typescript"
          fileName="secure-api-key.ts"
          code={`// ❌ NEVER DO THIS - Exposing API key in code
const metigan = new Metigan({
  apiKey: 'sk_live_1234567890abcdef' // DON'T HARDCODE KEYS!
});

// ✅ DO THIS - Use environment variables
const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// Validate that API key is set
if (!process.env.METIGAN_API_KEY) {
  throw new Error('METIGAN_API_KEY environment variable is required');
}

// ✅ Use different keys for different environments
const metigan = new Metigan({
  apiKey: process.env.NODE_ENV === 'production'
    ? process.env.METIGAN_API_KEY_PRODUCTION!
    : process.env.METIGAN_API_KEY_DEVELOPMENT!
});`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Secure Practices</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Environment Variables</h3>
            <CodeBlock
              language="bash"
              fileName=".env.example"
              code={`# Never commit .env file to version control
# Add .env to .gitignore

METIGAN_API_KEY=sk_live_your_api_key_here
METIGAN_API_KEY_DEVELOPMENT=sk_test_your_dev_key_here
METIGAN_API_KEY_PRODUCTION=sk_live_your_prod_key_here`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Secret Management</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Use secure secret management services in production:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>AWS Secrets Manager</li>
              <li>HashiCorp Vault</li>
              <li>Vercel Environment Variables</li>
              <li>Azure Key Vault</li>
              <li>Google Secret Manager</li>
            </ul>
          </div>
        </div>
      </section>

      <Callout variant="warning" title="Security Checklist">
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Never commit API keys to version control</li>
          <li>Use environment variables for all secrets</li>
          <li>Rotate API keys regularly</li>
          <li>Use different keys for different environments</li>
          <li>Revoke compromised keys immediately</li>
          <li>Monitor API key usage for anomalies</li>
          <li>Use the principle of least privilege</li>
        </ul>
      </Callout>
    </div>
  )
}
