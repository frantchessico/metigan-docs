import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"
import { ArrowRight, Mail, Users, Target, LayoutTemplate, FormInput, Key, Zap, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "REST API Reference | Metigan",
  description: "Complete REST API documentation for direct HTTP integration with Metigan",
}

export default function RestApiPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full">
            REST API
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">REST API Reference</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Complete REST API documentation for integrating Metigan directly via HTTP requests.
          No SDK required - use any programming language or tool.
        </p>
      </div>

      {/* Base URL */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Base URL</h2>
        <p className="text-muted-foreground">
          All API requests should be made to the following base URL:
        </p>
        <CodeBlock
          language="bash"
          code={`https://api.metigan.com`}
        />
        <Callout variant="info" title="Regional Endpoints">
          <p>
            For improved latency, you can use regional endpoints:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="text-sm bg-muted px-1.5 py-0.5 rounded">https://us.api.metigan.com</code> - US East</li>
            <li><code className="text-sm bg-muted px-1.5 py-0.5 rounded">https://eu.api.metigan.com</code> - Europe</li>
          </ul>
        </Callout>
      </section>

      {/* Authentication */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Authentication</h2>
        <p className="text-muted-foreground">
          Authenticate requests using your API key in the <code className="text-sm bg-muted px-1.5 py-0.5 rounded">x-api-key</code> header:
        </p>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/email/send \\
  -H "x-api-key: your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"from": "sender@example.com", "recipients": ["user@example.com"], "subject": "Hello", "content": "<p>Hello World</p>"}'`}
        />
        <Callout variant="warning" title="Keep Your API Key Secret">
          <p>
            Never expose your API key in client-side code. Use environment variables and server-side requests.
          </p>
        </Callout>
      </section>

      {/* Request Format */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Request Format</h2>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Headers</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code className="bg-muted px-1 rounded">x-api-key</code> - Your API key (required)</li>
                <li><code className="bg-muted px-1 rounded">Content-Type</code> - application/json</li>
                <li><code className="bg-muted px-1 rounded">Accept</code> - application/json</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Body Format</h3>
              <p className="text-sm text-muted-foreground">
                All request bodies should be JSON encoded. Use <code className="bg-muted px-1 rounded">camelCase</code> for 
                field names.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Response Format */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Response Format</h2>
        <p className="text-muted-foreground">
          All responses are JSON and include the following structure:
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Success Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "trackingId": "mtg-1234567890-0001",
    "emailsRemaining": 9999
  }
}`}
        />

        <h3 className="text-xl font-semibold mt-6">Error Response</h3>
        <CodeBlock
          language="json"
          fileName="400 Bad Request"
          code={`{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Invalid email address format",
  "field": "recipients"
}`}
        />
      </section>

      {/* HTTP Status Codes */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">HTTP Status Codes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Code</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-emerald-500">200</code></td>
                <td className="py-3 px-4">OK</td>
                <td className="py-3 px-4 text-muted-foreground">Request successful</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-emerald-500">201</code></td>
                <td className="py-3 px-4">Created</td>
                <td className="py-3 px-4 text-muted-foreground">Resource created successfully</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-yellow-500">400</code></td>
                <td className="py-3 px-4">Bad Request</td>
                <td className="py-3 px-4 text-muted-foreground">Invalid request body or parameters</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-yellow-500">401</code></td>
                <td className="py-3 px-4">Unauthorized</td>
                <td className="py-3 px-4 text-muted-foreground">Missing or invalid API key</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-yellow-500">403</code></td>
                <td className="py-3 px-4">Forbidden</td>
                <td className="py-3 px-4 text-muted-foreground">Insufficient permissions</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-yellow-500">404</code></td>
                <td className="py-3 px-4">Not Found</td>
                <td className="py-3 px-4 text-muted-foreground">Resource not found</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-yellow-500">422</code></td>
                <td className="py-3 px-4">Unprocessable Entity</td>
                <td className="py-3 px-4 text-muted-foreground">Validation error</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-orange-500">429</code></td>
                <td className="py-3 px-4">Too Many Requests</td>
                <td className="py-3 px-4 text-muted-foreground">Rate limit exceeded</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-red-500">500</code></td>
                <td className="py-3 px-4">Internal Error</td>
                <td className="py-3 px-4 text-muted-foreground">Server error - please retry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Rate Limits</h2>
        <p className="text-muted-foreground">
          Rate limits are applied per API key:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Plan</th>
                <th className="text-left py-3 px-4 font-semibold">Requests/Second</th>
                <th className="text-left py-3 px-4 font-semibold">Requests/Day</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Free</td>
                <td className="py-3 px-4">10</td>
                <td className="py-3 px-4">1,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Pro</td>
                <td className="py-3 px-4">50</td>
                <td className="py-3 px-4">50,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Growth</td>
                <td className="py-3 px-4">100</td>
                <td className="py-3 px-4">200,000</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Business</td>
                <td className="py-3 px-4">200</td>
                <td className="py-3 px-4">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Callout variant="info" title="Rate Limit Headers">
          <p>
            Check these headers in responses:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li><code className="bg-muted px-1 rounded">X-RateLimit-Limit</code> - Max requests allowed</li>
            <li><code className="bg-muted px-1 rounded">X-RateLimit-Remaining</code> - Requests remaining</li>
            <li><code className="bg-muted px-1 rounded">X-RateLimit-Reset</code> - Unix timestamp when limit resets</li>
          </ul>
        </Callout>
      </section>

      {/* API Endpoints */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">API Endpoints</h2>
        <p className="text-muted-foreground mb-6">
          Explore the complete API reference for each module:
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Link 
            href="/docs/rest-api/email"
            className="group p-6 border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Email</h3>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Send emails, OTP codes, and transactional messages
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">POST /email/send</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded">POST /otp/send</span>
                </div>
              </div>
            </div>
          </Link>

          <Link 
            href="/docs/rest-api/contacts"
            className="group p-6 border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Contacts</h3>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Create, update, and manage contact records
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">POST /contacts</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded">GET /contacts</span>
                </div>
              </div>
            </div>
          </Link>

          <Link 
            href="/docs/rest-api/audiences"
            className="group p-6 border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Audiences</h3>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Organize contacts into segmented audiences
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">POST /audiences</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded">GET /audiences</span>
                </div>
              </div>
            </div>
          </Link>

          <Link 
            href="/docs/rest-api/templates"
            className="group p-6 border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <LayoutTemplate className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Templates</h3>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Create and manage reusable email templates
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">POST /templates</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded">GET /templates</span>
                </div>
              </div>
            </div>
          </Link>

          <Link 
            href="/docs/rest-api/forms"
            className="group p-6 border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FormInput className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Forms</h3>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Submit form data and manage form configurations
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">POST /forms/submit</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded">GET /forms</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Examples */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Quick Examples</h2>
        
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Send Email
        </h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/email/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "Your Company <noreply@yourcompany.com>",
    "recipients": ["user@example.com"],
    "subject": "Welcome to Our Platform!",
    "content": "<h1>Welcome!</h1><p>Thank you for signing up.</p>"
  }'`}
        />

        <h3 className="text-xl font-semibold flex items-center gap-2 mt-8">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Send OTP (Verification Code)
        </h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/otp/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "security@yourapp.com",
    "code": "123456",
    "appName": "YourApp",
    "expiresInMinutes": 10
  }'`}
        />

        <h3 className="text-xl font-semibold flex items-center gap-2 mt-8">
          <Zap className="w-5 h-5 text-primary" />
          Send Transactional Email
        </h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/transactional/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "orders@yourshop.com",
    "subject": "Order Confirmed #12345",
    "content": "<h1>Order Confirmed</h1><p>Your order #12345 has been confirmed.</p>"
  }'`}
        />

        <h3 className="text-xl font-semibold flex items-center gap-2 mt-8">
          <Users className="w-5 h-5 text-primary" />
          Create Contact
        </h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/contacts \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "audienceId": "aud_123456",
    "tags": ["customer", "newsletter"],
    "status": "subscribed"
  }'`}
        />
      </section>

      {/* SDKs */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Official SDKs</h2>
        <p className="text-muted-foreground">
          While you can use the REST API directly, we recommend using our official SDKs for the best developer experience:
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { name: 'Node.js', pkg: 'npm install metigan' },
            { name: 'Python', pkg: 'pip install metigan' },
            { name: 'PHP', pkg: 'composer require metigan/metigan-php' },
            { name: 'Go', pkg: 'go get github.com/metigan/go' },
            { name: 'Java', pkg: 'com.metigan:metigan-java' },
            { name: 'Angular', pkg: 'npm install @metigan/angular' },
            { name: 'NestJS', pkg: 'npm install @metigan/nestjs' },
          ].map((sdk) => (
            <div key={sdk.name} className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-1">{sdk.name}</h4>
              <code className="text-xs text-muted-foreground">{sdk.pkg}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Support */}
      <section className="space-y-6 pb-8">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Need Help?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">📚 Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Explore our comprehensive guides and examples.
            </p>
            <Link href="/docs" className="text-sm text-primary hover:underline mt-2 inline-block">
              Browse Docs →
            </Link>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">💬 Support</h3>
            <p className="text-sm text-muted-foreground">
              Contact our support team for assistance.
            </p>
            <a href="mailto:support@metigan.com" className="text-sm text-primary hover:underline mt-2 inline-block">
              support@metigan.com →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
