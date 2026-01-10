import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function TypeScriptExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">TypeScript Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          TypeScript examples and patterns for using Metigan. Learn about type safety, type guards, 
          and best practices for TypeScript integration.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Type-Safe Email Sending</h2>
        <CodeBlock
          language="typescript"
          fileName="type-safe.ts"
          code={`import Metigan from 'metigan';
import type { EmailApiResponse, EmailSuccessResponse, EmailErrorResponse } from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// Type guard function
function isEmailSuccess(response: EmailApiResponse): response is EmailSuccessResponse {
  return 'success' in response && response.success === true;
}

function isEmailError(response: EmailApiResponse): response is EmailErrorResponse {
  return 'success' in response && response.success === false;
}

// Type-safe email sending
async function sendEmailTyped(): Promise<EmailSuccessResponse | null> {
  const result: EmailApiResponse = await metigan.email.sendEmail({
    from: 'sender@example.com',
    recipients: ['recipient@example.com'],
    subject: 'Hello from TypeScript!',
    content: '<p>Type-safe email sending.</p>'
  });

  if (isEmailSuccess(result)) {
    // TypeScript knows result is EmailSuccessResponse here
    console.log('Tracking ID:', result.successfulEmails[0]?.trackingId);
    return result;
  }

  if (isEmailError(result)) {
    // TypeScript knows result is EmailErrorResponse here
    console.error('Error:', result.error, result.message);
    return null;
  }

  return null;
}`}
        />
      </section>

      <Callout variant="tip" title="Type Safety">
        <p>
          Use type guards to narrow response types. This gives you full type safety and IntelliSense 
          support in your IDE.
        </p>
      </Callout>
    </div>
  )
}

