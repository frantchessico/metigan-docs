import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"

export default function ErrorHandlingPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Error Handling</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Learn how to handle errors effectively when working with the Metigan API. This guide covers 
          error types, response formats, and best practices for robust error handling.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Response Types</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Metigan API uses consistent error response formats to help you handle errors gracefully:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">API Error Response</h3>
            <CodeBlock
              language="typescript"
              fileName="error-response.ts"
              code={`// Generic API Error Response
interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}

// Example error responses
{
  success: false,
  error: "invalid_api_key",
  message: "The provided API key is invalid",
  statusCode: 401
}

{
  success: false,
  error: "rate_limit_exceeded",
  message: "You have exceeded your rate limit. Please try again later.",
  statusCode: 429
}`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Validation Error Response</h3>
            <CodeBlock
              language="typescript"
              fileName="validation-error.ts"
              code={`// Validation Error Response
interface ValidationErrorResponse {
  success: false;
  error: "validation_error";
  message: string;
  validationErrors?: Array<{
    field: string;
    message: string;
  }>;
}

// Example validation error
{
  success: false,
  error: "validation_error",
  message: "Invalid request parameters",
  validationErrors: [
    {
      field: "recipients",
      message: "At least one recipient is required"
    },
    {
      field: "subject",
      message: "Subject cannot be empty"
    }
  ]
}`}
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Handling Errors</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Here's how to properly handle errors in your application:
        </p>

        <CodeBlock
          language="typescript"
          fileName="error-handling.ts"
          code={`import Metigan from 'metigan';
import type { EmailApiResponse } from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

async function sendEmailWithErrorHandling() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Test Email',
      content: '<p>Hello!</p>'
    });

    // Check if the response indicates success
    if ('success' in result && result.success === true) {
      console.log('âœ… Email sent successfully!');
      console.log('Tracking ID:', result.successfulEmails[0]?.trackingId);
      return result;
    } else {
      // Handle API errors
      handleApiError(result);
      return null;
    }
  } catch (error) {
    // Handle exceptions (network errors, timeouts, etc.)
    handleException(error);
    return null;
  }
}

function handleApiError(error: EmailApiResponse) {
  if (!('success' in error) || error.success !== false) {
    return;
  }

  switch (error.error) {
    case 'invalid_api_key':
      console.error('âŒ Authentication failed. Check your API key.');
      break;
    
    case 'rate_limit_exceeded':
      console.error('âŒ Rate limit exceeded. Please wait before retrying.');
      // Implement retry logic with exponential backoff
      break;
    
    case 'validation_error':
      console.error('âŒ Validation error:', error.message);
      if ('validationErrors' in error && error.validationErrors) {
        error.validationErrors.forEach(err => {
          console.error(\`  - \${err.field}: \${err.message}\`);
        });
      }
      break;
    
    case 'insufficient_quota':
      console.error('âŒ Insufficient quota. Please upgrade your plan.');
      break;
    
    default:
      console.error('âŒ API Error:', error.error, error.message);
  }
}

function handleException(error: unknown) {
  if (error instanceof Error) {
    console.error('âŒ Exception:', error.message);
    
    // Check for network errors
    if (error.message.includes('network') || error.message.includes('fetch')) {
      console.error('Network error. Check your internet connection.');
    }
    
    // Check for timeout errors
    if (error.message.includes('timeout')) {
      console.error('Request timeout. The server may be overloaded.');
    }
  } else {
    console.error('âŒ Unknown error:', error);
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Codes Reference</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Common error codes you may encounter:
        </p>

        <div className="overflow-hidden rounded-lg border-2">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="px-6 py-4 text-left font-semibold">Error Code</th>
                <th className="px-6 py-4 text-left font-semibold">HTTP Status</th>
                <th className="px-6 py-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">invalid_api_key</td>
                <td className="px-6 py-4 text-sm">401</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">The API key is invalid or missing</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">validation_error</td>
                <td className="px-6 py-4 text-sm">400</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Request validation failed</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">rate_limit_exceeded</td>
                <td className="px-6 py-4 text-sm">429</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Rate limit exceeded</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">insufficient_quota</td>
                <td className="px-6 py-4 text-sm">402</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Email quota exceeded</td>
              </tr>
              <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">server_error</td>
                <td className="px-6 py-4 text-sm">500</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Internal server error</td>
              </tr>
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">service_unavailable</td>
                <td className="px-6 py-4 text-sm">503</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">Service temporarily unavailable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Retry Logic</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For transient errors like rate limits or network issues, implement retry logic with exponential backoff:
        </p>

        <CodeBlock
          language="typescript"
          fileName="retry-logic.ts"
          code={`async function sendEmailWithRetry(
  emailParams: EmailParams,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<EmailApiResponse | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await metigan.email.sendEmail(emailParams);
      
      if ('success' in result && result.success === true) {
        return result;
      }

      // Check if error is retryable
      if ('error' in result) {
        const retryableErrors = ['rate_limit_exceeded', 'server_error', 'service_unavailable'];
        
        if (retryableErrors.includes(result.error) && attempt < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, attempt);
          console.log(\`Retrying after \${delay}ms... (attempt \${attempt + 1}/\${maxRetries})\`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }

      return result;
    } catch (error) {
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.log(\`Retrying after \${delay}ms... (attempt \${attempt + 1}/\${maxRetries})\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }

  return null;
}`}
        />
      </section>

      <Callout variant="warning" title="Important">
        <p>
          Always validate and sanitize user input before sending API requests. Never expose API keys 
          in client-side code. Use environment variables to store your API keys securely.
        </p>
      </Callout>
    </div>
  )
}

