import { CodeBlock } from "@/components/code-block"

export const metadata = {
  title: "Audiences Endpoints | REST API | Metigan",
  description: "REST API documentation for managing audiences and contact lists",
}

export default function AudiencesEndpointsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-500 rounded-full">
            REST API
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-500 rounded-full">
            Audiences
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Audiences Endpoints</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Create and manage audiences to organize your contacts into segmented lists.
        </p>
      </div>

      {/* Create Audience */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-emerald-500/10 text-emerald-500 rounded">POST</span>
          <code className="text-lg font-mono">/api/audiences</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Create Audience</h2>
        <p className="text-muted-foreground">
          Create a new audience to organize contacts.
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
                <td className="py-3 px-4"><code>name</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-emerald-500">Yes</span></td>
                <td className="py-3 px-4 text-muted-foreground">Audience name</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4"><code>description</code></td>
                <td className="py-3 px-4 text-muted-foreground">string</td>
                <td className="py-3 px-4"><span className="text-muted-foreground">No</span></td>
                <td className="py-3 px-4 text-muted-foreground">Audience description</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X POST https://api.metigan.com/api/audiences \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Newsletter Subscribers",
    "description": "Main newsletter subscriber list"
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="201 Created"
          code={`{
  "success": true,
  "data": {
    "id": "aud_abc123",
    "name": "Newsletter Subscribers",
    "description": "Main newsletter subscriber list",
    "count": 0,
    "createdAt": "2024-01-19T10:30:00Z",
    "updatedAt": "2024-01-19T10:30:00Z"
  }
}`}
        />
      </section>

      {/* List Audiences */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/audiences</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">List Audiences</h2>
        <p className="text-muted-foreground">
          Retrieve all audiences with pagination.
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
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET "https://api.metigan.com/api/audiences?page=1&limit=20" \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "audiences": [
    {
      "id": "aud_abc123",
      "name": "Newsletter Subscribers",
      "description": "Main newsletter subscriber list",
      "count": 5432,
      "createdAt": "2024-01-19T10:30:00Z"
    },
    {
      "id": "aud_def456",
      "name": "Customers",
      "description": "Paying customers",
      "count": 1234,
      "createdAt": "2024-01-15T08:00:00Z"
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

      {/* Get Audience */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/audiences/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Audience</h2>
        <p className="text-muted-foreground">
          Retrieve a single audience by ID.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET https://api.metigan.com/api/audiences/aud_abc123 \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "id": "aud_abc123",
    "name": "Newsletter Subscribers",
    "description": "Main newsletter subscriber list",
    "count": 5432,
    "createdAt": "2024-01-19T10:30:00Z",
    "updatedAt": "2024-01-19T10:30:00Z"
  }
}`}
        />
      </section>

      {/* Get Audience Stats */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-blue-500/10 text-blue-500 rounded">GET</span>
          <code className="text-lg font-mono">/api/audiences/:id/stats</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Get Audience Statistics</h2>
        <p className="text-muted-foreground">
          Retrieve detailed statistics for an audience.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X GET https://api.metigan.com/api/audiences/aud_abc123/stats \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "total": 5432,
    "subscribed": 5100,
    "unsubscribed": 250,
    "pending": 50,
    "bounced": 25,
    "complained": 7,
    "growthRate": 12.5
  }
}`}
        />
      </section>

      {/* Update Audience */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-yellow-500/10 text-yellow-500 rounded">PATCH</span>
          <code className="text-lg font-mono">/api/audiences/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Update Audience</h2>
        <p className="text-muted-foreground">
          Update an audience's name or description.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X PATCH https://api.metigan.com/api/audiences/aud_abc123 \\
  -H "x-api-key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Premium Newsletter",
    "description": "Premium content subscribers"
  }'`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "data": {
    "id": "aud_abc123",
    "name": "Premium Newsletter",
    "description": "Premium content subscribers",
    "count": 5432,
    "updatedAt": "2024-01-19T14:00:00Z"
  }
}`}
        />
      </section>

      {/* Delete Audience */}
      <section className="space-y-6 pt-8 border-t">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-mono font-bold bg-red-500/10 text-red-500 rounded">DELETE</span>
          <code className="text-lg font-mono">/api/audiences/:id</code>
        </div>
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Delete Audience</h2>
        <p className="text-muted-foreground">
          Delete an audience. Contacts in the audience will not be deleted.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Request</h3>
        <CodeBlock
          language="bash"
          fileName="curl"
          code={`curl -X DELETE https://api.metigan.com/api/audiences/aud_abc123 \\
  -H "x-api-key: your_api_key"`}
        />

        <h3 className="text-xl font-semibold mt-6">Response</h3>
        <CodeBlock
          language="json"
          fileName="200 OK"
          code={`{
  "success": true,
  "message": "Audience deleted successfully"
}`}
        />
      </section>
    </div>
  )
}
