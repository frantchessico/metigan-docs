"use client"

import { Mail, Users, Target, FileText, Paperclip, RefreshCw, Lock, Github, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col dark:bg-[#0F0F10]">
      <header className="w-full border-b bg-background py-4 md:py-6 dark:bg-[#0F0F10]">
        <div className="container flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center px-4 relative ">
          {/* Theme Toggle Button - Posicionado no canto superior direito */}
          <div className="absolute right-4 top-0">
            <ThemeToggle />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Metigan SDK</h1>
          <p className="max-w-[42rem] text-sm md:text-base lg:text-xl leading-normal text-muted-foreground">
            A powerful and flexible SDK for integrating with the Metigan email and audience management platform.
          </p>
          <button
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-[#b026ff] px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#b026ff]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={() => window.open("https://metigan.com", "_blank")}
          >
            Get Started
          </button>
        </div>
      </header>

      <main className="flex-1 flex justify-center">
        <div className="container max-w-4xl py-8 mx-auto px-4 md:px-6">
          <section id="features" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">Features</h2>
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold">Email Sending</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Send transactional and marketing emails with ease
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold">Contact Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Create, update, and manage contacts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                  <Target className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold">Audience Management</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Organize contacts into targeted audiences</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold">Email Templates</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Use templates with variable substitution</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                  <Paperclip className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold">Attachments</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Support for file attachments in various formats
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                  <RefreshCw className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold">Retry Mechanism</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Built-in retry system for improved reliability
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold">Error Handling</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Comprehensive error handling and reporting</p>
                </div>
              </div>
            </div>
          </section>

          <section id="installation" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">Installation</h2>
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

          <section id="quick-start" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">Quick Start</h2>
            <CodeBlock
              language="typescript"
              fileName="quick-start.ts"
              code={`import Metigan from 'metigan';

// Initialize the SDK with your API key
const metigan = new Metigan('your_api_key');

// Send a simple email
async function sendWelcomeEmail() {
  try {
    const response = await metigan.sendEmail({
      from: 'your-company@example.com',
      recipients: ['new-user@example.com'],
      subject: 'Welcome to Our Service',
      content: '<h1>Welcome!</h1><p>Thank you for signing up.</p>',
    });
    
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendWelcomeEmail();`}
            />
          </section>

          <section id="configuration" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">Configuration</h2>
            <p className="mb-4 text-muted-foreground">The Metigan SDK can be configured with various options:</p>
            <CodeBlock
              language="typescript"
              fileName="config.ts"
              code={`const metigan = new Metigan('your_api_key', {
  // User ID for logs (optional)
  userId: 'your-user-id',
  
  // Disable logs (optional)
  disableLogs: false,
  
  // Number of retry attempts for failed operations (optional, default: 3)
  retryCount: 5,
  
  // Base time between retry attempts in ms (optional, default: 1000)
  retryDelay: 2000,
  
  // Timeout for requests in ms (optional, default: 30000)
  timeout: 60000,
});`}
            />
          </section>

          <section id="examples" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">Examples</h2>

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-3 text-xs md:text-sm">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="audiences">Audiences</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4 space-y-4">
                <h3 className="text-lg md:text-xl font-bold">Basic Email</h3>
                <CodeBlock
                  language="typescript"
                  fileName="basic-email.ts"
                  code={`await metigan.sendEmail({
  from: 'your-company@example.com',
  recipients: ['user@example.com', 'another-user@example.com'],
  subject: 'Important Update',
  content: '<h1>New Features Available</h1><p>Check out our latest updates...</p>',
});`}
                />

                <h3 className="text-lg md:text-xl font-bold">Email with Attachments</h3>
                <CodeBlock
                  language="typescript"
                  fileName="email-with-attachments.ts"
                  code={`// Browser environment (using File objects)
const file = new File(['file content'], 'document.pdf', { type: 'application/pdf' });

// Node.js environment
const nodeAttachment = {
  buffer: Buffer.from('file content'),
  originalname: 'document.pdf',
  mimetype: 'application/pdf',
};

// Custom attachment
const customAttachment = {
  content: 'file content as string or buffer',
  filename: 'document.pdf',
  contentType: 'application/pdf',
};

await metigan.sendEmail({
  from: 'your-company@example.com',
  recipients: ['user@example.com'],
  subject: 'Document Attached',
  content: '<p>Please find the attached document.</p>',
  attachments: [file], // or [nodeAttachment] or [customAttachment]
});`}
                />

                <h3 className="text-lg md:text-xl font-bold">Email with Template</h3>
                <CodeBlock
                  language="typescript"
                  fileName="email-with-template.ts"
                  code={`await metigan.sendEmailWithTemplate({
  from: 'your-company@example.com',
  recipients: ['user@example.com'],
  subject: 'Welcome to Our Service',
  templateId: 'welcome-template-id',
});`}
                />
              </TabsContent>

              <TabsContent value="contacts" className="mt-4 space-y-4">
                <h3 className="text-lg md:text-xl font-bold">Creating Contacts</h3>
                <CodeBlock
                  language="typescript"
                  fileName="create-contacts.ts"
                  code={`await metigan.createContacts(
  ['user@example.com', 'another-user@example.com'],
  {
    createContact: true,
    audienceId: 'your-audience-id'
  }
);`}
                />

                <h3 className="text-lg md:text-xl font-bold">Getting Contact Details</h3>
                <CodeBlock
                  language="typescript"
                  fileName="get-contact.ts"
                  code={`const contactDetails = await metigan.getContact('user@example.com', 'your-audience-id');
console.log('Contact details:', contactDetails);`}
                />

                <h3 className="text-lg md:text-xl font-bold">Updating a Contact</h3>
                <CodeBlock
                  language="typescript"
                  fileName="update-contact.ts"
                  code={`await metigan.updateContact('user@example.com', {
  audienceId: 'your-audience-id'
});`}
                />
              </TabsContent>

              <TabsContent value="audiences" className="mt-4 space-y-4">
                <h3 className="text-lg md:text-xl font-bold">Creating an Audience</h3>
                <CodeBlock
                  language="typescript"
                  fileName="create-audience.ts"
                  code={`const newAudience = await metigan.createAudience({
  name: 'Newsletter Subscribers',
  description: 'People who subscribed to our monthly newsletter',
});

console.log('New audience ID:', newAudience.audience.id);`}
                />

                <h3 className="text-lg md:text-xl font-bold">Getting All Audiences</h3>
                <CodeBlock
                  language="typescript"
                  fileName="get-audiences.ts"
                  code={`const audiences = await metigan.getAudiences();
console.log(\`Found \${audiences.audiences.length} audiences\`);`}
                />

                <h3 className="text-lg md:text-xl font-bold">Updating an Audience</h3>
                <CodeBlock
                  language="typescript"
                  fileName="update-audience.ts"
                  code={`await metigan.updateAudience('audience-id', {
  name: 'VIP Newsletter Subscribers',
  description: 'Premium subscribers to our newsletter',
});`}
                />
              </TabsContent>
            </Tabs>
          </section>

          <section id="error-handling" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">Error Handling</h2>
            <p className="mb-4 text-muted-foreground">
              The Metigan SDK provides comprehensive error handling with specific error types:
            </p>
            <CodeBlock
              language="typescript"
              fileName="error-handling.ts"
              code={`import { MetiganError, ValidationError, ApiError, NetworkError, ContactError } from 'metigan';
import { ErrorCode } from 'metigan';

try {
  await metigan.sendEmail({
    // Email options
  });
} catch (error) {
  if (error instanceof MetiganError) {
    console.error(\`Error code: \${error.code}, Message: \${error.message}\`);
    
    // Handle specific error types
    if (error instanceof ValidationError) {
      console.error('Validation failed');
    } else if (error instanceof ApiError) {
      console.error(\`API error with status: \${error.status}\`);
    } else if (error instanceof NetworkError) {
      console.error('Network connectivity issue');
    } else if (error instanceof ContactError) {
      console.error('Contact operation failed');
    }
    
    // Handle specific error codes
    switch (error.code) {
      case ErrorCode.INVALID_API_KEY:
        console.error('Invalid API key. Please check your credentials.');
        break;
      case ErrorCode.MISSING_REQUIRED_FIELD:
        console.error('Missing required field in request.');
        break;
      case ErrorCode.INVALID_EMAIL_FORMAT:
        console.error('Invalid email format.');
        break;
      // Handle other error codes
    }
  } else {
    console.error('Unknown error:', error);
  }
}`}
            />
          </section>

          <section id="api-reference" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">API Reference</h2>

            <h3 className="mb-4 text-xl font-bold">Core Methods</h3>
            <div className="mb-8 overflow-hidden rounded-lg border dark:border-gray-700">
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-full px-4 md:px-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 dark:bg-gray-800 dark:border-gray-700">
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Method</th>
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">sendEmail(options)</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                          Sends an email with the specified options
                        </td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">
                          sendEmailWithTemplate(options)
                        </td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Sends an email using a template</td>
                      </tr>
                      <tr>
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">generateTrackingId()</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                          Generates a unique tracking ID for email analytics
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold">Contact Methods</h3>
            <div className="mb-8 overflow-hidden rounded-lg border dark:border-gray-700">
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-full px-4 md:px-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 dark:bg-gray-800 dark:border-gray-700">
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Method</th>
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">
                          createContacts(emails, options)
                        </td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                          Creates contacts in the specified audience
                        </td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">
                          getContact(email, audienceId)
                        </td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Gets a contact by email</td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">listContacts(options)</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Lists contacts in an audience</td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">
                          updateContact(email, options)
                        </td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Updates a contact</td>
                      </tr>
                      <tr>
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">
                          deleteContact(contactId, audienceId)
                        </td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Deletes a contact</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold">Audience Methods</h3>
            <div className="overflow-hidden rounded-lg border dark:border-gray-700">
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-full px-4 md:px-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 dark:bg-gray-800 dark:border-gray-700">
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Method</th>
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">createAudience(options)</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Creates a new audience</td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">getAudiences()</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Gets all audiences</td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">getAudience(id)</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Gets an audience by ID</td>
                      </tr>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">updateAudience(id, options)</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Updates an audience</td>
                      </tr>
                      <tr>
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">deleteAudience(id)</td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">Deletes an audience</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <h3 className="mb-4 text-xl font-bold">Combined Methods</h3>
            <div className="overflow-hidden rounded-lg border dark:border-gray-700">
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-full px-4 md:px-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50 dark:bg-gray-800 dark:border-gray-700">
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Method</th>
                        <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">
                          sendEmailAndCreateContacts(options)
                        </td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                          Sends an email and creates contacts in one operation
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 md:px-4 py-2 font-mono text-xs md:text-sm">
                          sendTemplateAndCreateContacts(options)
                        </td>
                        <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                          Sends a template email and creates contacts in one operation
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section id="typescript-support" className="mb-8 md:mb-16">
            <h2 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold tracking-tighter">TypeScript Support</h2>
            <p className="mb-4 text-muted-foreground">
              The Metigan SDK is written in TypeScript and provides comprehensive type definitions for all methods and
              options.
            </p>
            <CodeBlock
              language="typescript"
              fileName="types.ts"
              code={`import type {
  EmailOptions,
  EmailSuccessResponse,
  EmailErrorResponse,
  ApiKeyErrorResponse,
  EmailApiResponse,
  ContactApiResponse,
  ContactCreationOptions,
  ContactQueryOptions,
  ContactUpdateOptions,
  ContactData,
  NodeAttachment,
  CustomAttachment,
  TemplateVariables,
  TemplateFunction,
  TemplateOptions,
  TemplateApiResponse,
  AudienceApiResponse,
  AudienceCreationOptions,
  AudienceUpdateOptions,
} from 'metigan';`}
            />
          </section>
        </div>
      </main>

      <footer className="border-t py-4 md:py-6 dark:border-gray-800">
        <div className="container flex flex-col items-center justify-center space-y-3 md:space-y-4 text-center px-4">
          <p className="text-xs md:text-sm text-muted-foreground">Made with ❤️ by the Metigan Team</p>

          {/* GitHub Star Button */}
          <a
            href="https://github.com/metigan/metigan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-[#24292e] text-white hover:bg-[#2c3137] transition-colors text-sm dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <Github className="h-4 w-4 mr-2" />
            <Star className="h-3.5 w-3.5 mr-1.5 fill-current" />
            <span>Give us a star on GitHub</span>
          </a>

          <p className="text-xs md:text-sm text-muted-foreground">This project is licensed under the MIT License</p>
        </div>
      </footer>
    </div>
  )
}
