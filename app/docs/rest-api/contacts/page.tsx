import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export const metadata = {
  title: "Contacts Endpoints | REST API | Metigan",
  description: "REST API documentation for managing contacts and subscribers",
}

export default function ContactsEndpointsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full">
            REST API
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-purple-500/10 text-purple-500 rounded-full">
            Contacts
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contacts Endpoints</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Create, update, delete, and manage contacts in your audiences.
        </p>
      </div>

      {/* Create Contact */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/contacts</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Create Contact</h2>
        <p className="text-muted-foreground">
          Create a new contact in an audience.
        </p>

        <h3 className="text-xl font-semibold mt-6">Request Body</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Field</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Required</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code>email</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Contact email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>audienceId</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">ID of the audience to add contact to</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>firstName</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Contact's first name</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>lastName</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Contact's last name</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>phone</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Phone number</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>status</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">subscribed, unsubscribed, pending, bounced</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>tags</code></td>
                <td className="py-3 px-4 text-muted-foreground">string[]</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Array of tags</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>customFields</code></td>
                <td className="py-3 px-4 text-muted-foreground">object</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Custom field values</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/contacts \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "audienceId": "aud_abc123",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "status": "subscribed",
    "tags": ["customer", "newsletter"],
    "customFields": {
      "company": "Acme Inc",
      "role": "Developer"
    }
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="201 Created"
          code={`{
  "success": true,
  "data": {
    "id": "con_xyz789",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "status": "subscribed",
    "audienceId": "aud_abc123",
    "tags": ["customer", "newsletter"],
    "customFields": {
      "company": "Acme Inc",
      "role": "Developer"
    },
    "createdAt": "2024-01-19T10:30:00Z",
    "updatedAt": "2024-01-19T10:30:00Z"
  }
}`}
        />
      </section>

      {/* List Contacts */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/contacts</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">List Contacts</h2>
        <p className="text-muted-foreground">
          Retrieve a paginated list of contacts with optional filters.
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
                <td className="py-3 px-4"><code>audienceId</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Filter by audience ID</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>status</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Filter by status</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>tag</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Filter by tag</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>search</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Search by email or name</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>page</code></td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
                <td className="py-3 px-4 text-muted-foreground">Page number (default: 1)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>limit</code></td>
                <td className="py-3 px-4 text-muted-foreground">number</td>
                <td className="py-3 px-4 text-muted-foreground">Items per page (default: 50, max: 100)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET "https://api.metigan.com/api/contacts?audienceId=aud_abc123&status=subscribed&page=1&limit=50" \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "contacts": [
    {
      "id": "con_xyz789",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "status": "subscribed",
      "audienceId": "aud_abc123",
      "tags": ["customer"],
      "createdAt": "2024-01-19T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 1234,
    "page": 1,
    "limit": 50,
    "pages": 25
  }
}`}
        />
      </section>

      {/* Get Contact */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/contacts/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Contact</h2>
        <p className="text-muted-foreground">
          Retrieve a single contact by ID.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET https://api.metigan.com/api/contacts/con_xyz789 \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "id": "con_xyz789",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "status": "subscribed",
    "audienceId": "aud_abc123",
    "tags": ["customer", "newsletter"],
    "customFields": {
      "company": "Acme Inc"
    },
    "createdAt": "2024-01-19T10:30:00Z",
    "updatedAt": "2024-01-19T10:30:00Z",
    "lastActivityAt": "2024-01-19T12:00:00Z"
  }
}`}
        />
      </section>

      {/* Get Contact by Email */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/contacts/email/:email</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Contact by Email</h2>
        <p className="text-muted-foreground">
          Retrieve a contact by email address within an audience.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET "https://api.metigan.com/api/contacts/email/john@example.com?audienceId=aud_abc123" \\
  -H "x-api-key: your_api_key"`}
        />
      </section>

      {/* Update Contact */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-yellow-500/10 text-yellow-500 rounded">PATCH</span>
          <code className="text-lg font-mono">/api/contacts/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Update Contact</h2>
        <p className="text-muted-foreground">
          Update an existing contact's information.
        </p>

        <h3 className="text-xl font-semibold mt-6">Request Body</h3>
        <p className="text-muted-foreground text-sm">
          Only include fields you want to update.
        </p>
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
                <td className="py-3 px-4"><code>firstName</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">First name</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>lastName</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Last name</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>phone</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Phone number</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>status</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Contact status</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>tags</code></td>
                <td className="py-3 px-4 text-muted-foreground">string[]</td>
                <td className="py-3 px-4 text-muted-foreground">Replace all tags</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>customFields</code></td>
                <td className="py-3 px-4 text-muted-foreground">object</td>
                <td className="py-3 px-4 text-muted-foreground">Custom field values</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X PATCH https://api.metigan.com/api/contacts/con_xyz789 \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "Johnny",
    "tags": ["customer", "vip", "newsletter"],
    "customFields": {
      "company": "New Company Inc"
    }
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "id": "con_xyz789",
    "email": "john@example.com",
    "firstName": "Johnny",
    "lastName": "Doe",
    "status": "subscribed",
    "tags": ["customer", "vip", "newsletter"],
    "customFields": {
      "company": "New Company Inc"
    },
    "updatedAt": "2024-01-19T14:00:00Z"
  }
}`}
        />
      </section>

      {/* Delete Contact */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-red-500/10 text-red-500 rounded">DELETE</span>
          <code className="text-lg font-mono">/api/contacts/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Delete Contact</h2>
        <p className="text-muted-foreground">
          Permanently delete a contact.
        </p>

        <Callout variant="warning" title="Irreversible Action">
          <p>
            This action cannot be undone. Consider changing the contact's status to "unsubscribed" instead.
          </p>
        </Callout>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X DELETE https://api.metigan.com/api/contacts/con_xyz789 \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "Contact deleted successfully"
}`}
        />
      </section>

      {/* Bulk Import */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/contacts/bulk</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Bulk Import Contacts</h2>
        <p className="text-muted-foreground">
          Import multiple contacts at once. Duplicates are automatically handled.
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
                <td className="py-3 px-4"><code>audienceId</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4 text-muted-foreground">Target audience ID</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>contacts</code></td>
                <td className="py-3 px-4 text-muted-foreground">array</td>
                <td className="py-3 px-4 text-muted-foreground">Array of contact objects (max 1000)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>skipDuplicates</code></td>
                <td className="py-3 px-4 text-muted-foreground">boolean</td>
                <td className="py-3 px-4 text-muted-foreground">Skip instead of updating duplicates</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/contacts/bulk \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "audienceId": "aud_abc123",
    "skipDuplicates": true,
    "contacts": [
      {
        "email": "user1@example.com",
        "firstName": "User",
        "lastName": "One",
        "tags": ["import"]
      },
      {
        "email": "user2@example.com",
        "firstName": "User",
        "lastName": "Two",
        "tags": ["import"]
      }
    ]
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "imported": 2,
  "failed": 0,
  "skipped": 0,
  "errors": []
}`}
        />
      </section>

      {/* Contact Statuses */}
      <section className="space-y-6 pt-8 border-t">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Contact Statuses</h2>
        <p className="text-muted-foreground">
          Available contact status values:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-emerald-500">subscribed</code></td>
                <td className="py-3 px-4 text-muted-foreground">Active subscriber, can receive emails</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-yellow-500">pending</code></td>
                <td className="py-3 px-4 text-muted-foreground">Awaiting confirmation (double opt-in)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-muted-foreground">unsubscribed</code></td>
                <td className="py-3 px-4 text-muted-foreground">Opted out, will not receive emails</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-red-500">bounced</code></td>
                <td className="py-3 px-4 text-muted-foreground">Email bounced, delivery failed</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code className="text-red-500">complained</code></td>
                <td className="py-3 px-4 text-muted-foreground">Marked email as spam</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
