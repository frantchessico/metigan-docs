import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Rocket, BookOpen, Code, Mail, Users, Target, LayoutTemplate, FormInput, Webhook } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-6 pb-6 border-b">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to Metigan
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Metigan is a powerful email infrastructure platform that provides everything you need to send transactional and marketing emails at scale. 
            Our SDK makes it easy to integrate Metigan into your applications with just a few lines of code.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Key Features</h2>
          <p className="text-muted-foreground">
            Everything you need to build powerful email experiences
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg mb-2">Email Sending</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Send transactional and marketing emails with ease. Support for HTML, attachments, templates, and more.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg mb-2">Contact Management</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Create, update, and manage contacts efficiently. Built-in validation and deduplication.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg mb-2">Audiences</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Organize contacts into targeted audiences for better segmentation and campaign management.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LayoutTemplate className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg mb-2">Email Templates</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Create reusable email templates with variable substitution and responsive design support.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FormInput className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg mb-2">Form Builder</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Build custom forms with our drag-and-drop form builder. Collect submissions automatically.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Webhook className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg mb-2">Webhooks</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Get real-time notifications about email events, form submissions, and more via webhooks.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Get Started</h2>
          <p className="text-muted-foreground">
            Choose your path to start building with Metigan
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/docs/installation" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary hover:bg-muted">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      Installation
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardDescription className="text-sm leading-relaxed pl-[52px]">
                  Get started by installing the Metigan SDK in your project. Works with npm, yarn, and pnpm.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/quick-start" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary hover:bg-muted">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      Quick Start
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardDescription className="text-sm leading-relaxed pl-[52px]">
                  Send your first email in 5 minutes with our quick start guide. Perfect for developers new to Metigan.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/api/email" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary hover:bg-muted">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Code className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      API Reference
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardDescription className="text-sm leading-relaxed pl-[52px]">
                  Complete API reference for all Metigan SDK methods, types, and options. Comprehensive documentation with examples.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/guides/sending-emails" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary hover:bg-muted">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      Guides & Tutorials
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardDescription className="text-sm leading-relaxed pl-[52px]">
                  Step-by-step guides for common use cases and best practices. Learn how to build powerful email workflows.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Basic Example */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Quick Example</h2>
          <p className="text-muted-foreground leading-relaxed">
            Here's a simple example to get you started. This example initializes the SDK and sends an email in just a few lines of code.
          </p>
        </div>
        <CodeBlock
          language="typescript"
          fileName="example.ts"
          code={`import Metigan from 'metigan';

// Initialize the Metigan client with your API key
const metigan = new Metigan({
  apiKey: 'your_api_key_here'
});

// Send an email
async function sendEmail() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Hello from Metigan!',
      content: '<h1>Welcome!</h1><p>This is your first email with Metigan.</p>'
    });

    if ('success' in result && result.success) {
      console.log('Email sent successfully!', result);
    } else {
      console.error('Failed to send email:', result);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();`}
        />
      </div>

      {/* Next Steps */}
      <div className="rounded-xl border-2 bg-muted/50 p-8 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">What's Next?</h2>
          <p className="text-muted-foreground">
            Continue your journey with these recommended guides
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
              <span>Install the SDK</span>
            </div>
            <p className="text-sm text-muted-foreground ml-8 leading-relaxed">
              Read the <Link href="/docs/installation" className="text-primary hover:underline font-medium">Installation Guide</Link> to set up the SDK in your project
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
              <span>Send Your First Email</span>
            </div>
            <p className="text-sm text-muted-foreground ml-8 leading-relaxed">
              Follow the <Link href="/docs/quick-start" className="text-primary hover:underline font-medium">Quick Start</Link> to send your first email in minutes
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
              <span>Explore the API</span>
            </div>
            <p className="text-sm text-muted-foreground ml-8 leading-relaxed">
              Explore the <Link href="/docs/api/email" className="text-primary hover:underline font-medium">API Reference</Link> for detailed documentation of all methods
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">4</span>
              <span>Learn Best Practices</span>
            </div>
            <p className="text-sm text-muted-foreground ml-8 leading-relaxed">
              Check out our <Link href="/docs/guides/sending-emails" className="text-primary hover:underline font-medium">Guides</Link> for best practices and advanced techniques
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

