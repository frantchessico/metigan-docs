import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function FormsApiPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Forms API</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Build and manage custom forms for collecting leads, subscriptions, and customer information. 
          Forms automatically collect submissions and can add contacts to your database.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Create Form</h2>
        <CodeBlock
          language="typescript"
          fileName="create-form.ts"
          code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: 'your_api_key'
});

// Create a new form
const form = await metigan.forms.create({
  name: 'Newsletter Signup',
  fields: [
    { name: 'email', type: 'email', required: true, label: 'Email Address' },
    { name: 'firstName', type: 'text', required: false, label: 'First Name' },
    { name: 'newsletter', type: 'checkbox', required: false, label: 'Subscribe to newsletter' }
  ],
  settings: {
    autoAddToAudience: 'audience_123', // Automatically add submissions to audience
    sendConfirmationEmail: true,
    confirmationEmailTemplate: 'template_123'
  }
});

console.log('Form created:', form.id);
console.log('Embed code:', form.embedCode);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">List Form Submissions</h2>
        <CodeBlock
          language="typescript"
          fileName="list-submissions.ts"
          code={`// Get form submissions
const submissions = await metigan.forms.getSubmissions('form_123', {
  page: 1,
  limit: 50
});

console.log('Submissions:', submissions.items);`}
        />
      </section>

      <Callout variant="tip" title="Form Builder">
        <p>
          Use the visual form builder in your Metigan dashboard to create forms without code, 
          or use the API for programmatic form creation. See the <Link href="/docs/guides/form-builder" className="text-primary hover:underline font-medium">Form Builder guide</Link> for more details.
        </p>
      </Callout>
    </div>
  )
}

