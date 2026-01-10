import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function ReactExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">React Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          React component examples for integrating Metigan. Note: API calls should typically be made 
          from server-side code or API routes, not directly from React components.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">React Hook for Email Sending</h2>
        <CodeBlock
          language="typescript"
          fileName="useEmail.ts"
          code={`import { useState } from 'react';

interface UseEmailReturn {
  sendEmail: (params: EmailParams) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useEmail(): UseEmailReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (params: EmailParams) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Call your API route, not Metigan directly from client
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to send email');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error, success };
}`}
        />
      </section>

      <Callout variant="warning" title="Security">
        <p>
          Never use API keys in client-side React code. Always make API calls through server-side 
          API routes or server components to keep your API keys secure.
        </p>
      </Callout>
    </div>
  )
}

