import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function NextJsExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Next.js Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Next.js integration examples using API routes and Server Components. Learn how to integrate 
          Metigan into your Next.js applications securely.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">API Route Example</h2>
        <CodeBlock
          language="typescript"
          fileName="app/api/send-email/route.ts"
          code={`import { NextRequest, NextResponse } from 'next/server';
import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, content } = body;

    const result = await metigan.email.sendEmail({
      from: 'noreply@example.com',
      recipients: [to],
      subject,
      content
    });

    if ('success' in result && result.success) {
      return NextResponse.json({ 
        success: true, 
        trackingId: result.successfulEmails[0]?.trackingId 
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.message || 'Failed to send email' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Server Component Example</h2>
        <CodeBlock
          language="typescript"
          fileName="app/emails/page.tsx"
          code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

export default async function EmailsPage() {
  // Server Components can directly use Metigan
  const contacts = await metigan.contacts.list({ limit: 10 });

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.items.map(contact => (
          <li key={contact.id}>{contact.email}</li>
        ))}
      </ul>
    </div>
  );
}`}
        />
      </section>

      <Callout variant="tip" title="Environment Variables">
        <p>
          Store your API key in <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">.env.local</code> 
          and access it via <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">process.env.METIGAN_API_KEY</code>
        </p>
      </Callout>
    </div>
  )
}

