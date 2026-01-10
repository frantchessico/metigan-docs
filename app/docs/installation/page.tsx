import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Installation</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Install the Metigan SDK in your project using npm, yarn, or pnpm. 
          The SDK is lightweight, type-safe, and works seamlessly with TypeScript and JavaScript.
        </p>
      </div>

      {/* Installation Methods */}
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-4 scroll-mt-20">Package Managers</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Choose your preferred package manager and install the Metigan SDK:
          </p>
          <CodeBlock
            language="bash"
            fileName="Terminal"
            code={`# Using npm
npm install metigan

# Using yarn
yarn add metigan

# Using pnpm
pnpm add metigan`}
          />
        </section>

        <Callout variant="note" title="Current Version">
          <p>
            The current stable version is <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">2.2.1</code>.
            Make sure you're using the latest version for the best experience and latest features.
          </p>
        </Callout>

        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-4 scroll-mt-20">Requirements</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Before installing, make sure you have the following prerequisites:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30">
              <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold  dark:">1</span>
              </div>
              <div>
                <p className="font-medium mb-1">Node.js</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Version <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">14.0.0</code> or higher is required. 
                  You can check your version by running <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">node --version</code>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30">
              <div className="h-6 w-6 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold  dark:">2</span>
              </div>
              <div>
                <p className="font-medium mb-1">TypeScript (Optional)</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  TypeScript <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">4.0.0</code> or higher is recommended but not required. 
                  The SDK works great with plain JavaScript too!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30">
              <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold  dark:">3</span>
              </div>
              <div>
                <p className="font-medium mb-1">API Key</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A valid Metigan API key is required. Get one from your <a href="https://app.metigan.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">dashboard</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-4 scroll-mt-20">Verifying Installation</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            After installation, verify that the package is installed correctly:
          </p>
          <CodeBlock
            language="typescript"
            fileName="verify-installation.ts"
            code={`import Metigan from 'metigan';

// Check if Metigan is available
console.log('Metigan version:', Metigan.VERSION || '2.2.1');

// Initialize (this will throw if there's an issue)
const metigan = new Metigan({
  apiKey: 'your_api_key'
});

console.log('âœ… Metigan SDK installed successfully!');`}
          />
        </section>

        <Callout variant="tip" title="TypeScript Support">
          <p>
            The Metigan SDK is written in TypeScript and includes complete type definitions out of the box. 
            No additional <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">@types</code> package is needed. 
            You'll get full autocomplete and type checking in your IDE.
          </p>
        </Callout>
      </div>
    </div>
  )
}

