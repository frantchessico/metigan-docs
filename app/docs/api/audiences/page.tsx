import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function AudiencesApiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Audiences API</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Organize contacts into targeted audiences for better segmentation and campaign management. 
          Use audiences to send targeted emails to specific groups of contacts.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Create Audience</h2>
        <CodeBlock
          language="typescript"
          fileName="create-audience.ts"
          code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Create a new audience
const audience = await metigan.audiences.create({
  name: 'Premium Customers',
  description: 'Customers with premium subscription',
  tags: ['premium', 'active'] // Optional: filter by tags
});

console.log('Audience created:', audience.id);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Add Contacts to Audience</h2>
        <CodeBlock
          language="typescript"
          fileName="add-contacts.ts"
          code={`// Add contacts to an audience
await metigan.audiences.addContacts('audience_123', {
  contactIds: ['contact_1', 'contact_2', 'contact_3']
});

// Or add by email
await metigan.audiences.addContactsByEmail('audience_123', {
  emails: ['user1@example.com', 'user2@example.com']
});`}
        />
      </section>

      <Callout variant="tip" title="Audience Segmentation">
        <p>
          Use audiences to segment your contacts for targeted campaigns. Audiences can be created 
          based on tags, custom fields, or specific contact criteria.
        </p>
      </Callout>
    </div>
  )
}

