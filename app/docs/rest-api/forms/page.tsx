import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export const metadata = {
  title: "Forms Endpoints | REST API | Metigan",
  description: "REST API documentation for form submissions and management",
}

export default function FormsEndpointsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full">
            REST API
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-500 rounded-full">
            Forms
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Forms Endpoints</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Submit form data and manage form configurations via the REST API.
        </p>
      </div>

      {/* Submit Form */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/forms/:formId/submit</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Submit Form</h2>
        <p className="text-muted-foreground">
          Submit data to a published form. This endpoint is public and does not require authentication 
          for forms that allow public submissions.
        </p>

        <Callout variant="info" title="Public Endpoint">
          <p>
            Form submission is designed to work from client-side code without exposing your API key.
            The <code className="bg-muted px-1 rounded">formId</code> can be either the form ID or the form slug.
          </p>
        </Callout>

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
                <td className="py-3 px-4"><code>[fieldId]</code></td>
                <td className="py-3 px-4 text-muted-foreground">any</td>
                <td className="py-3 px-4 text-muted-foreground">Form field values keyed by field ID</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/forms/contact-form/submit \\
  -H "Content-Type: application/json" \\
  -d '{
    "field-email": "user@example.com",
    "field-name": "John Doe",
    "field-message": "Hello, I would like more information about your services.",
    "field-company": "Acme Inc"
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "Thank you for your submission!",
  "submissionId": "sub_xyz789"
}`}
        />

        <h3 className="text-xl font-semibold mt-6">JavaScript Example (Client-side)</h3>
        <CodeBlock
          language="javascript"
          fileName="form-submit.js"
          code={`// Client-side form submission (no API key needed)
const response = await fetch('https://api.metigan.com/api/forms/contact-form/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'field-email': formData.email,
    'field-name': formData.name,
    'field-message': formData.message
  })
});

const result = await response.json();

if (result.success) {
  alert(result.message);
}`}
        />
      </section>

      {/* List Forms */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/forms</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">List Forms</h2>
        <p className="text-muted-foreground">
          Retrieve all forms with pagination. Requires API key authentication.
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
                <td className="py-3 px-4"><code>published</code></td>
                <td className="py-3 px-4 text-muted-foreground">boolean</td>
                <td className="py-3 px-4 text-muted-foreground">Filter by published status</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET "https://api.metigan.com/api/forms?page=1&limit=20" \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "forms": [
    {
      "id": "frm_abc123",
      "title": "Contact Form",
      "description": "Get in touch with us",
      "slug": "contact-form",
      "published": true,
      "publishedUrl": "https://forms.metigan.com/f/contact-form",
      "analytics": {
        "views": 1234,
        "submissions": 89,
        "conversionRate": 7.2
      },
      "createdAt": "2024-01-19T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}`}
        />
      </section>

      {/* Get Form */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/forms/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Form</h2>
        <p className="text-muted-foreground">
          Retrieve a form's configuration including all fields and settings.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET https://api.metigan.com/api/forms/frm_abc123 \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "id": "frm_abc123",
    "title": "Contact Form",
    "description": "Get in touch with us",
    "slug": "contact-form",
    "fields": [
      {
        "id": "field-email",
        "type": "email",
        "label": "Email Address",
        "placeholder": "you@example.com",
        "required": true
      },
      {
        "id": "field-name",
        "type": "text",
        "label": "Full Name",
        "placeholder": "John Doe",
        "required": true
      },
      {
        "id": "field-message",
        "type": "textarea",
        "label": "Message",
        "placeholder": "How can we help?",
        "required": true
      },
      {
        "id": "field-company",
        "type": "text",
        "label": "Company",
        "required": false
      }
    ],
    "settings": {
      "successMessage": "Thank you for your submission!",
      "notifyEmail": "team@yourcompany.com",
      "enableCaptcha": true,
      "storeResponses": true
    },
    "audienceId": "aud_abc123",
    "published": true,
    "createdAt": "2024-01-19T10:30:00Z"
  }
}`}
        />
      </section>

      {/* Get Public Form */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/forms/public/:slug</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Public Form</h2>
        <p className="text-muted-foreground">
          Retrieve a published form by its slug for public rendering. No authentication required.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET https://api.metigan.com/api/forms/public/contact-form`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "title": "Contact Form",
    "description": "Get in touch with us",
    "fields": [
      {
        "id": "field-email",
        "type": "email",
        "label": "Email Address",
        "placeholder": "you@example.com",
        "required": true
      },
      {
        "id": "field-name",
        "type": "text",
        "label": "Full Name",
        "required": true
      },
      {
        "id": "field-message",
        "type": "textarea",
        "label": "Message",
        "required": true
      }
    ],
    "appearance": {
      "backgroundColor": "#FFFFFF",
      "primaryColor": "#4F46E5",
      "fontFamily": "Inter"
    },
    "buttonCustomization": {
      "text": "Submit",
      "variant": "default"
    }
  }
}`}
        />
      </section>

      {/* Get Form Submissions */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/forms/:id/submissions</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Form Submissions</h2>
        <p className="text-muted-foreground">
          Retrieve all submissions for a form with pagination.
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
                <td className="py-3 px-4 text-muted-foreground">Page number</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>limit</code></td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
                <td className="py-3 px-4 text-muted-foreground">Items per page (max: 100)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>startDate</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Filter from date (ISO 8601)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>endDate</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Filter to date (ISO 8601)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET "https://api.metigan.com/api/forms/frm_abc123/submissions?page=1&limit=50" \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "submissions": [
    {
      "id": "sub_xyz789",
      "data": {
        "field-email": "user@example.com",
        "field-name": "John Doe",
        "field-message": "Hello!"
      },
      "createdAt": "2024-01-19T14:30:00Z"
    }
  ],
  "pagination": {
    "total": 89,
    "page": 1,
    "limit": 50,
    "pages": 2
  }
}`}
        />
      </section>

      {/* Field Types */}
      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Form Field Types</h2>
        <p className="text-muted-foreground">
          Available field types for form configuration:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
                <th className="text-left py-3 px-4 font-semibold">Data Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>text</code></td>
                <td className="py-3 px-4 text-muted-foreground">Single-line text input</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>email</code></td>
                <td className="py-3 px-4 text-muted-foreground">Email address input</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>number</code></td>
                <td className="py-3 px-4 text-muted-foreground">Numeric input</td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>textarea</code></td>
                <td className="py-3 px-4 text-muted-foreground">Multi-line text input</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>select</code></td>
                <td className="py-3 px-4 text-muted-foreground">Dropdown selection</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>checkbox</code></td>
                <td className="py-3 px-4 text-muted-foreground">Multiple choice checkboxes</td>
                <td className="py-3 px-4 text-muted-foreground">string[]</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>radio</code></td>
                <td className="py-3 px-4 text-muted-foreground">Single choice radio buttons</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>date</code></td>
                <td className="py-3 px-4 text-muted-foreground">Date picker</td>
                <td className="py-3 px-4 text-muted-foreground">string (ISO)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>phone</code></td>
                <td className="py-3 px-4 text-muted-foreground">Phone number input</td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>file</code></td>
                <td className="py-3 px-4 text-muted-foreground">File upload</td>
                <td className="py-3 px-4 text-muted-foreground">object</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>rating</code></td>
                <td className="py-3 px-4 text-muted-foreground">Star rating</td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
