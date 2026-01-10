import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function ContactManagementGuidePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Management Guide</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Best practices for managing contacts effectively. Learn about organization, segmentation, 
          and maintaining a healthy contact database.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Organizing Contacts</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Use tags and audiences to organize your contacts effectively:
        </p>
        <CodeBlock
          language="typescript"
          fileName="organize-contacts.ts"
          code={`// Tag contacts for segmentation
await metigan.contacts.update('contact_123', {
  tags: ['customer', 'premium', 'active']
});

// Add to audiences for targeted campaigns
await metigan.audiences.addContacts('audience_123', {
  contactIds: ['contact_123']
});`}
        />
      </section>

      <Callout variant="tip" title="Segmentation">
        <p>
          Use tags and custom fields to segment your contacts. This makes it easier to send targeted 
          emails to specific groups based on their interests, behavior, or characteristics.
        </p>
      </Callout>
    </div>
  )
}

