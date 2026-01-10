import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function RateLimitsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Rate Limits</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Understand Metigan's rate limits and quotas to ensure your application handles them gracefully. 
          Learn about different rate limit tiers and best practices.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Rate Limit Overview</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Metigan uses rate limiting to ensure fair usage and maintain service quality. Rate limits 
          vary based on your plan and are typically measured in requests per minute or per hour.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mt-8">
          <div className="p-6 rounded-lg border-2 bg-muted">
            <h3 className="text-xl font-semibold mb-2">Free Plan</h3>
            <p className="text-3xl font-bold  dark: mb-2">100</p>
            <p className="text-sm text-muted-foreground">emails per day</p>
          </div>

          <div className="p-6 rounded-lg border-2 bg-muted">
            <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
            <p className="text-3xl font-bold  dark: mb-2">10,000</p>
            <p className="text-sm text-muted-foreground">emails per day</p>
          </div>

          <div className="p-6 rounded-lg border-2 bg-muted">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <p className="text-3xl font-bold  dark: mb-2">Unlimited</p>
            <p className="text-sm text-muted-foreground">custom limits</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Rate Limit Headers</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          The API includes rate limit information in response headers:
        </p>

        <CodeBlock
          language="typescript"
          fileName="rate-limit-headers.ts"
          code={`// Rate limit headers in API responses
{
  'x-ratelimit-limit': '100',        // Maximum requests allowed
  'x-ratelimit-remaining': '95',     // Remaining requests in window
  'x-ratelimit-reset': '1640995200', // Unix timestamp when limit resets
  'retry-after': '60'                // Seconds to wait before retrying (if exceeded)
}

// Check rate limit status
async function checkRateLimit() {
  const response = await fetch('https://api.metigan.com/v1/emails', {
    headers: {
      'Authorization': \`Bearer \${apiKey}\`
    }
  });

  const limit = response.headers.get('x-ratelimit-limit');
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');

  console.log(\`Rate limit: \${remaining}/\${limit}\`);
  console.log(\`Resets at: \${new Date(parseInt(reset!) * 1000).toLocaleString()}\`);
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Handling Rate Limits</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Implement proper handling for rate limit exceeded errors:
        </p>

        <CodeBlock
          language="typescript"
          fileName="handle-rate-limit.ts"
          code={`import Metigan from 'metigan';

async function sendEmailWithRateLimitHandling() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test',
      content: '<p>Hello</p>'
    });

    if ('success' in result && result.success) {
      return result;
    }

    // Handle rate limit error
    if ('error' in result && result.error === 'rate_limit_exceeded') {
      const retryAfter = result.retryAfter || 60; // Default to 60 seconds
      
      console.log(\`Rate limit exceeded. Retrying after \${retryAfter} seconds...\`);
      
      // Wait and retry
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      
      // Retry the request
      return await metigan.email.sendEmail({
        from: 'sender@example.com',
        recipients: ['recipient@example.com'],
        subject: 'Test',
        content: '<p>Hello</p>'
      });
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`}
        />
      </section>

      <Callout variant="tip" title="Best Practice">
        <p>
          Monitor rate limit headers and implement exponential backoff for retries. Consider using 
          a queue system for high-volume applications to avoid hitting rate limits.
        </p>
      </Callout>
    </div>
  )
}

