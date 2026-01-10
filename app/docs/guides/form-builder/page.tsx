import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function FormBuilderGuidePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Form Builder Guide</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Build custom forms for collecting leads, subscriptions, and customer information. 
          Forms can be embedded on your website and automatically sync with your contact database.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Creating Forms</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Use the visual form builder in your dashboard or create forms programmatically via the API.
        </p>
        <CodeBlock
          language="typescript"
          fileName="create-form.ts"
          code={`// Create a form via API
const form = await metigan.forms.create({
  name: 'Newsletter Signup',
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'firstName', type: 'text', required: false }
  ]
});

// Get embed code
console.log('Embed code:', form.embedCode);`}
        />
      </section>

      <Callout variant="tip" title="Auto-Sync">
        <p>
          Configure forms to automatically add submissions to specific audiences. This streamlines 
          your lead collection and contact management workflow.
        </p>
      </Callout>
    </div>
  )
}

