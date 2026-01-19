import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export const metadata = {
  title: "Templates Endpoints | REST API | Metigan",
  description: "REST API documentation for managing email templates",
}

export default function TemplatesEndpointsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full">
            REST API
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-pink-500/10 text-pink-500 rounded-full">
            Templates
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Templates Endpoints</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Create, manage, and use reusable email templates with dynamic variables.
        </p>
      </div>

      {/* List Templates */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/templates</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">List Templates</h2>
        <p className="text-muted-foreground">
          Retrieve all email templates with pagination.
        </p>

        <h3 className="text-xl font-semibold mt-6">Query Parameters</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Parameter</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>page</code></td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
                <td className="py-3 px-4 text-muted-foreground">Page number (default: 1)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>limit</code></td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
                <td className="py-3 px-4 text-muted-foreground">Items per page (default: 20)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>search</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Search by template name</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET "https://api.metigan.com/api/templates?page=1&limit=20" \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "templates": [
    {
      "id": "tpl_abc123",
      "name": "Welcome Email",
      "subject": "Welcome to {{appName}}!",
      "createdAt": "2024-01-19T10:30:00Z",
      "updatedAt": "2024-01-19T10:30:00Z"
    },
    {
      "id": "tpl_def456",
      "name": "Order Confirmation",
      "subject": "Order Confirmed #{{orderId}}",
      "createdAt": "2024-01-15T08:00:00Z",
      "updatedAt": "2024-01-18T12:00:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}`}
        />
      </section>

      {/* Get Template */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/templates/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Template</h2>
        <p className="text-muted-foreground">
          Retrieve a single template with all its components and styles.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET https://api.metigan.com/api/templates/tpl_abc123 \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "id": "tpl_abc123",
    "name": "Welcome Email",
    "subject": "Welcome to {{appName}}!",
    "components": [
      {
        "id": "header-1",
        "type": "heading",
        "content": "Welcome, {{firstName}}!",
        "styles": {
          "fontSize": 24,
          "fontWeight": "bold",
          "textAlign": "center"
        }
      },
      {
        "id": "text-1",
        "type": "text",
        "content": "Thank you for joining {{appName}}. We're excited to have you!",
        "styles": {
          "fontSize": 16,
          "textAlign": "left"
        }
      },
      {
        "id": "button-1",
        "type": "button",
        "label": "Get Started",
        "url": "{{dashboardUrl}}",
        "styles": {
          "backgroundColor": "#4F46E5",
          "color": "#FFFFFF",
          "borderRadius": 8
        }
      }
    ],
    "styles": {
      "backgroundColor": "#FFFFFF",
      "width": 600,
      "padding": 20
    },
    "createdAt": "2024-01-19T10:30:00Z",
    "updatedAt": "2024-01-19T10:30:00Z"
  }
}`}
        />
      </section>

      {/* Render Template */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/templates/:id/render</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Render Template</h2>
        <p className="text-muted-foreground">
          Render a template with variables to preview the final HTML output.
        </p>

        <h3 className="text-xl font-semibold mt-6">Request Body</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Field</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>variables</code></td>
                <td className="py-3 px-4 text-muted-foreground">object</td>
                <td className="py-3 px-4 text-muted-foreground">Key-value pairs for variable substitution</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/templates/tpl_abc123/render \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "variables": {
      "firstName": "John",
      "appName": "MyApp",
      "dashboardUrl": "https://app.myapp.com/dashboard"
    }
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "html": "<!DOCTYPE html><html>...</html>",
  "subject": "Welcome to MyApp!"
}`}
        />
      </section>

      {/* Template Variables */}
      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Template Variables</h2>
        <p className="text-muted-foreground">
          Use double curly braces to define variables in your templates:
        </p>

        <CodeBlock
          language="html"
          fileName="template-example.html"
          code={`<h1>Welcome, {{firstName}}!</h1>
<p>Thank you for signing up for {{appName}}.</p>
<p>Your account email: {{email}}</p>

<a href="{{verificationLink}}">Verify Your Email</a>

<!-- Conditional content -->
{{#if isPremium}}
  <p>Enjoy your premium features!</p>
{{/if}}

<!-- Default values -->
<p>Company: {{company|"Not specified"}}</p>`}
        />

        <h3 className="text-xl font-semibold mt-6">Built-in Variables</h3>
        <p className="text-muted-foreground mb-4">
          These variables are automatically available in all templates:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Variable</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>{`{{unsubscribeUrl}}`}</code></td>
                <td className="py-3 px-4 text-muted-foreground">One-click unsubscribe link</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>{`{{preferencesUrl}}`}</code></td>
                <td className="py-3 px-4 text-muted-foreground">Email preferences page link</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>{`{{currentYear}}`}</code></td>
                <td className="py-3 px-4 text-muted-foreground">Current year (e.g., 2024)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>{`{{currentDate}}`}</code></td>
                <td className="py-3 px-4 text-muted-foreground">Current date formatted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Using Templates with Email */}
      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Using Templates with Email</h2>
        <p className="text-muted-foreground">
          To send an email using a template, pass the <code className="bg-muted px-1 rounded">templateId</code> and 
          <code className="bg-muted px-1 rounded">variables</code> to the email send endpoint:
        </p>

        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/email/send \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "YourApp <noreply@yourapp.com>",
    "recipients": ["user@example.com"],
    "subject": "Welcome to YourApp!",
    "templateId": "tpl_abc123",
    "variables": {
      "firstName": "John",
      "appName": "YourApp",
      "dashboardUrl": "https://yourapp.com/dashboard"
    }
  }'`}
        />

        <Callout variant="info" title="Subject Override">
          <p>
            If you provide a <code className="bg-muted px-1 rounded">subject</code> in the request, 
            it will override the template's default subject. The subject can also contain variables.
          </p>
        </Callout>
      </section>

      {/* Delete Template */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-red-500/10 text-red-500 rounded">DELETE</span>
          <code className="text-lg font-mono">/api/templates/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Delete Template</h2>
        <p className="text-muted-foreground">
          Delete an email template.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X DELETE https://api.metigan.com/api/templates/tpl_abc123 \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "Template deleted successfully"
}`}
        />
      </section>
    </div>
  )
}
