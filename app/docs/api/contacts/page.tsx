import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function ContactsApiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contacts API</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Manage contacts and subscribers with the Metigan Contacts API. Create, update, delete, 
          and list contacts with built-in validation and deduplication.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          The Contacts API allows you to manage your contact database. Contacts can be organized 
          into audiences, tagged, and used for targeted email campaigns.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Create Contact</h2>
        <CodeBlock
          language="typescript"
          fileName="create-contact.ts"
          code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Create a new contact
const contact = await metigan.contacts.create({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  tags: ['customer', 'premium'],
  customFields: {
    company: 'Acme Corp',
    jobTitle: 'Software Engineer'
  }
});

console.log('Contact created:', contact.id);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">List Contacts</h2>
        <CodeBlock
          language="typescript"
          fileName="list-contacts.ts"
          code={`// List all contacts with pagination
const contacts = await metigan.contacts.list({
  page: 1,
  limit: 50,
  tags: ['customer'], // Optional: filter by tags
  audienceId: 'audience_123' // Optional: filter by audience
});

console.log('Total contacts:', contacts.total);
console.log('Contacts:', contacts.items);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Update Contact</h2>
        <CodeBlock
          language="typescript"
          fileName="update-contact.ts"
          code={`// Update an existing contact
const updatedContact = await metigan.contacts.update('contact_123', {
  firstName: 'Jane',
  lastName: 'Smith',
  tags: ['customer', 'vip']
});

console.log('Contact updated:', updatedContact);`}
        />
      </section>

      <Callout variant="tip" title="Learn More">
        <p>
          Check out the <Link href="/docs/guides/contact-management" className="text-primary hover:underline font-medium">Contact Management guide</Link> 
          for best practices and advanced techniques.
        </p>
      </Callout>
    </div>
  )
}

