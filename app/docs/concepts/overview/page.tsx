import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function ConceptsOverviewPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Core Concepts</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Understand the core concepts and architecture behind Metigan. This section covers the fundamental 
          principles that make Metigan a powerful email infrastructure platform.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Architecture Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          Metigan is built on a modern, scalable architecture designed to handle high volumes of emails 
          with reliability and performance. The SDK provides a simple interface while handling complex 
          operations behind the scenes.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <div className="p-6 rounded-lg border-2 bg-muted hover:border-primary transition-all">
            <h3 className="text-xl font-semibold mb-3">RESTful API</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Metigan uses a RESTful API design, making it easy to integrate with any programming language 
              or framework. All operations follow standard HTTP methods and status codes.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 bg-muted hover:border-primary transition-all">
            <h3 className="text-xl font-semibold mb-3">Type Safety</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built with TypeScript from the ground up, Metigan provides complete type definitions and 
              type safety out of the box. No additional type packages needed.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 bg-muted hover:border-primary transition-all">
            <h3 className="text-xl font-semibold mb-3">Scalable Infrastructure</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Metigan's infrastructure is designed to scale automatically, handling everything from 
              single emails to millions of messages per day.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 bg-muted hover:border-primary transition-all">
            <h3 className="text-xl font-semibold mb-3">Developer Experience</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simple, intuitive API design with comprehensive documentation, examples, and tooling to 
              make integration as smooth as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Key Components</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Metigan consists of several key components that work together to provide a complete email solution:
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-6 rounded-lg border bg-muted/30">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <span className="text-lg font-bold  dark:">1</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email API</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Send transactional and marketing emails with support for HTML, templates, attachments, 
                and advanced features like tracking and analytics.
              </p>
              <Link href="/docs/api/email" className="text-sm text-primary hover:underline font-medium">
                View Email API â†’
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg border bg-muted/30">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <span className="text-lg font-bold  dark:">2</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Management</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Manage contacts, subscribers, and customer data with built-in validation, deduplication, 
                and segmentation capabilities.
              </p>
              <Link href="/docs/api/contacts" className="text-sm text-primary hover:underline font-medium">
                View Contacts API â†’
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg border bg-muted/30">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <span className="text-lg font-bold  dark:">3</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Templates & Forms</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Create reusable email templates and build custom forms with drag-and-drop form builder 
                for collecting leads and subscriptions.
              </p>
              <Link href="/docs/api/templates" className="text-sm text-primary hover:underline font-medium">
                View Templates API â†’
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg border bg-muted/30">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <span className="text-lg font-bold  dark:">4</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Webhooks & Events</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Receive real-time notifications about email events, form submissions, and other actions 
                through webhooks.
              </p>
              <Link href="/docs/api/webhooks" className="text-sm text-primary hover:underline font-medium">
                View Webhooks API â†’
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Usage Pattern</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Here's the typical pattern for using Metigan in your application:
        </p>
        <CodeBlock
          language="typescript"
          fileName="basic-pattern.ts"
          code={`import Metigan from 'metigan';
import type { EmailApiResponse, EmailSuccessResponse } from 'metigan';

// 1. Initialize the client
const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// 2. Type guard for responses
function isEmailSuccess(response: EmailApiResponse): response is EmailSuccessResponse {
  return 'success' in response && response.success === true;
}

// 3. Make API calls
async function sendEmail() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Hello',
      content: '<p>Hello World!</p>'
    });

    // 4. Handle responses with type safety
    if (isEmailSuccess(result)) {
      console.log('Success!', result.successfulEmails);
    } else {
      console.error('Error:', result.message || result.error);
    }
  } catch (error) {
    // 5. Handle errors
    console.error('Exception:', error);
  }
}`}
        />
      </section>

      <Callout variant="tip" title="Next Steps">
        <p>
          Now that you understand the core concepts, check out the <Link href="/docs/concepts/error-handling" className="text-primary hover:underline font-medium">Error Handling guide</Link> 
          and <Link href="/docs/concepts/rate-limits" className="text-primary hover:underline font-medium">Rate Limits documentation</Link> to learn about handling errors and managing quotas.
        </p>
      </Callout>
    </div>
  )
}

