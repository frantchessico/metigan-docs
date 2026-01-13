import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function AuthenticationPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Authentication</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Learn how to authenticate with the Metigan API using API keys. 
          All API requests require authentication via an API key in your request headers.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-4 scroll-mt-20">API Keys</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Metigan uses API keys to authenticate requests. You can create and manage your API keys in your <a href="https://app.metigan.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Metigan Dashboard</a>. 
            API keys are scoped to your account and provide access to all features based on your plan.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4 scroll-mt-20">Getting Your API Key</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Follow these steps to get your API key:
          </p>
          <div className="space-y-4">
            {[
              { step: 1, title: "Log in to Dashboard", description: "Log in to your Metigan Dashboard", link: "https://app.metigan.com" },
              { step: 2, title: "Navigate to API Keys", description: "Go to Settings â†’ API Keys section" },
              { step: 3, title: "Create API Key", description: "Click the 'Create API Key' button" },
              { step: 4, title: "Copy Your Key", description: "Copy your API key immediately (you'll only see it once!)" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground font-bold shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.link ? (
                      <>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">{item.description}</a>
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4 scroll-mt-20">Initializing the Client</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Initialize the Metigan client with your API key. Always use environment variables in production:
          </p>
          <CodeBlock
            language="typescript"
            fileName="initialize.ts"
            code={`import Metigan from 'metigan';

// Initialize with your API key from environment variable
const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY || 'your_api_key_here'
});

// Make sure API key is set
if (!process.env.METIGAN_API_KEY) {
  throw new Error('METIGAN_API_KEY environment variable is required');
}`}
          />
        </section>

        <Callout variant="warning" title="Never Commit API Keys">
          <p>
            Always use environment variables for your API keys. Never commit them to version control. 
            Use services like <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">dotenv</code> for local development 
            and environment variables for production.
          </p>
        </Callout>

        <section>
          <h3 className="text-2xl font-semibold mb-4 scroll-mt-20">Using Environment Variables</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Store your API key in an environment variable for security. This is the recommended approach for all environments:
          </p>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">Create a <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">.env</code> file:</p>
              <CodeBlock
                language="bash"
                fileName=".env"
                code={`METIGAN_API_KEY=sp_your_api_key_here`}
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2 text-muted-foreground">Load the API key in your code:</p>
              <CodeBlock
                language="typescript"
                fileName="with-env.ts"
                code={`import Metigan from 'metigan';

// Load API key from environment variable
const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// Validate that API key is set
if (!process.env.METIGAN_API_KEY) {
  throw new Error('METIGAN_API_KEY environment variable is not set');
}

console.log('âœ… Metigan client initialized successfully');`}
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4 scroll-mt-20">API Key Permissions</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            API keys can have different permission levels depending on your plan and configuration:
          </p>
          <div className="overflow-hidden rounded-lg border-2">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted">
                  <th className="px-6 py-4 text-left font-semibold">Permission Level</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                  <th className="px-6 py-4 text-left font-semibold">Access</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm font-medium">full_access</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground leading-relaxed">
                    Full access to all API endpoints and resources
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10  dark:">
                      All Features
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm font-medium">sending_access</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground leading-relaxed">
                    Can only send emails, cannot manage contacts or audiences
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10  dark:">
                      Email Only
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Callout variant="tip" title="Best Practice: Principle of Least Privilege">
          <p>
            Use the principle of least privilege. Create separate API keys for different environments 
            (development, staging, production) and use the minimum permissions required for each use case. 
            This limits the impact if a key is compromised.
          </p>
        </Callout>

        <section>
          <h3 className="text-2xl font-semibold mb-4 scroll-mt-20">Error Handling</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            If your API key is invalid or missing, the SDK will throw an error. Here's how to handle authentication errors:
          </p>
          <CodeBlock
            language="typescript"
            fileName="error-handling.ts"
            code={`import Metigan from 'metigan';
import { MetiganError } from 'metigan';

try {
  const metigan = new Metigan({
    apiKey: process.env.METIGAN_API_KEY || 'invalid_key'
  });
  
  const result = await metigan.email.sendEmail({
    from: 'sender@example.com',
    recipients: ['recipient@example.com'],
    subject: 'Test Email',
    content: '<p>Test content</p>'
  });

  console.log('Email sent:', result);
} catch (error) {
  if (error instanceof MetiganError) {
    if (error.message.includes('API key') || error.message.includes('authentication')) {
      console.error('âŒ Authentication failed. Please check your API key.');
      console.error('Make sure METIGAN_API_KEY environment variable is set correctly.');
    } else {
      console.error('âŒ Metigan error:', error.message);
    }
  } else {
    console.error('âŒ Unexpected error:', error);
  }
  throw error;
}`}
          />
        </section>
      </div>
    </div>
  )
}

