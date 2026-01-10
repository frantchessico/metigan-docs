import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function NestJsExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">NestJS Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          NestJS integration examples using the Metigan SDK. Learn how to send emails, manage contacts, 
          and integrate Metigan into your NestJS applications.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Installation</h2>
        <CodeBlock
          language="bash"
          fileName="install.sh"
          code={`npm install @metigan/nestjs
# or
yarn add @metigan/nestjs`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Setup</h2>
        
        <h3 className="text-2xl font-semibold mb-4">1. Import the Module</h3>
        <CodeBlock
          language="typescript"
          fileName="app.module.ts"
          code={`import { Module } from '@nestjs/common';
import { MetiganModule } from '@metigan/nestjs';

@Module({
  imports: [
    MetiganModule.forRoot({
      apiKey: process.env.METIGAN_API_KEY,
    }),
  ],
})
export class AppModule {}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">2. Use in Your Service</h3>
        <CodeBlock
          language="typescript"
          fileName="email.service.ts"
          code={`import { Injectable } from '@nestjs/common';
import { MetiganService } from '@metigan/nestjs';

@Injectable()
export class EmailService {
  constructor(private readonly metigan: MetiganService) {}

  async sendWelcomeEmail(email: string) {
    const result = await this.metigan.email.sendEmail({
      from: 'Sender <sender@example.com>',
      recipients: [email],
      subject: 'Welcome!',
      content: '<h1>Hello!</h1><p>Thank you for signing up.</p>',
    });

    return result;
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Sending Emails</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Basic Email</h3>
        <CodeBlock
          language="typescript"
          fileName="send-email.ts"
          code={`async sendEmail() {
  const result = await this.metigan.email.sendEmail({
    from: 'sender@example.com',
    recipients: ['recipient@example.com'],
    subject: 'Email Subject',
    content: '<h1>HTML Content</h1><p>This is the email body.</p>',
  });

  if (result.success) {
    console.log('Email sent successfully!');
    console.log(\`Emails remaining: \${result.emailsRemaining}\`);
  }
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with CC and BCC</h3>
        <CodeBlock
          language="typescript"
          fileName="send-email-cc.ts"
          code={`const result = await this.metigan.email.sendEmail({
  from: 'company@email.com',
  recipients: ['main@email.com'],
  subject: 'Meeting',
  content: 'Email content',
  cc: ['copy@email.com'],
  bcc: ['hidden-copy@email.com'],
  replyTo: 'reply-here@email.com',
});`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Attachments</h3>
        <CodeBlock
          language="typescript"
          fileName="send-email-attachment.ts"
          code={`import * as fs from 'fs';

const fileData = fs.readFileSync('document.pdf');

const result = await this.metigan.email.sendEmail({
  from: 'company@email.com',
  recipients: ['customer@email.com'],
  subject: 'Important Document',
  content: 'Please find the document attached.',
  attachments: [
    {
      buffer: fileData,
      originalname: 'document.pdf',
      mimetype: 'application/pdf',
    },
  ],
});`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Template</h3>
        <CodeBlock
          language="typescript"
          fileName="send-email-template.ts"
          code={`const result = await this.metigan.email.sendEmailWithTemplate(
  'template-123',
  {
    name: 'John Doe',
    company: 'Acme Inc',
  },
  {
    from: 'sender@example.com',
    recipients: ['recipient@example.com'],
  },
);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Contact Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Contact</h3>
        <CodeBlock
          language="typescript"
          fileName="create-contact.ts"
          code={`const contact = await this.metigan.contacts.create({
  email: 'new@email.com',
  firstName: 'Jane',
  lastName: 'Doe',
  audienceId: 'audience-123',
  tags: ['customer', 'newsletter'],
});`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Contact</h3>
        <CodeBlock
          language="typescript"
          fileName="get-contact.ts"
          code={`// By ID
const contact = await this.metigan.contacts.get('contact-456');

// By email
const contact = await this.metigan.contacts.getByEmail('jane@email.com', 'audience-123');`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Contacts</h3>
        <CodeBlock
          language="typescript"
          fileName="list-contacts.ts"
          code={`const result = await this.metigan.contacts.list({
  audienceId: 'audience-123',
  status: 'subscribed',
  page: 1,
  limit: 50,
});

console.log(\`Total contacts: \${result.pagination.total}\`);
result.contacts.forEach(contact => {
  console.log(\`\${contact.email}: \${contact.firstName}\`);
});`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Update Contact</h3>
        <CodeBlock
          language="typescript"
          fileName="update-contact.ts"
          code={`const updated = await this.metigan.contacts.update('contact-456', {
  firstName: 'Jane Marie',
  tags: ['customer', 'vip'],
});`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Manage Subscription</h3>
        <CodeBlock
          language="typescript"
          fileName="manage-subscription.ts"
          code={`// Subscribe
await this.metigan.contacts.subscribe('contact-456');

// Unsubscribe
await this.metigan.contacts.unsubscribe('contact-456');`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Manage Tags</h3>
        <CodeBlock
          language="typescript"
          fileName="manage-tags.ts"
          code={`// Add tags
await this.metigan.contacts.addTags('contact-456', ['vip', 'black-friday']);

// Remove tags
await this.metigan.contacts.removeTags('contact-456', ['test']);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Audience Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Audience</h3>
        <CodeBlock
          language="typescript"
          fileName="create-audience.ts"
          code={`const audience = await this.metigan.audiences.create({
  name: 'Main Newsletter',
  description: 'Main subscriber list',
});`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Audiences</h3>
        <CodeBlock
          language="typescript"
          fileName="list-audiences.ts"
          code={`const result = await this.metigan.audiences.list({
  page: 1,
  limit: 10,
});

result.audiences.forEach(audience => {
  console.log(\`\${audience.name}: \${audience.count} contacts\`);
});`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Audience Statistics</h3>
        <CodeBlock
          language="typescript"
          fileName="audience-stats.ts"
          code={`const stats = await this.metigan.audiences.getStats('audience-123');

console.log(\`Total: \${stats.total}\`);
console.log(\`Subscribed: \${stats.subscribed}\`);
console.log(\`Unsubscribed: \${stats.unsubscribed}\`);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Forms</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Submit Form</h3>
        <CodeBlock
          language="typescript"
          fileName="submit-form.ts"
          code={`const result = await this.metigan.forms.submit({
  formId: 'form-123',
  data: {
    'field-email': 'user@email.com',
    'field-name': 'John Doe',
    'field-message': 'Hello, I would like more information.',
  },
});

console.log(result.message);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Form</h3>
        <CodeBlock
          language="typescript"
          fileName="get-form.ts"
          code={`const form = await this.metigan.forms.get('form-123');
console.log(form.title);
console.log(form.fields);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Handling</h2>
        <CodeBlock
          language="typescript"
          fileName="error-handling.ts"
          code={`import { ApiError, ValidationError } from '@metigan/nestjs';

try {
  const result = await this.metigan.email.sendEmail(options);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(\`API Error: \${error.statusCode} - \${error.message}\`);
  } else if (error instanceof ValidationError) {
    console.error(\`Validation Error: \${error.message}\`);
    if (error.field) {
      console.error(\`Field: \${error.field}\`);
    }
  } else {
    console.error(\`Unknown error: \${error}\`);
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Async Configuration</h2>
        <CodeBlock
          language="typescript"
          fileName="async-config.ts"
          code={`import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetiganModule } from '@metigan/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MetiganModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('METIGAN_API_KEY'),
        timeout: configService.get<number>('METIGAN_TIMEOUT', 30000),
        retryCount: configService.get<number>('METIGAN_RETRY_COUNT', 3),
        retryDelay: configService.get<number>('METIGAN_RETRY_DELAY', 2000),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Advanced Configuration</h2>
        <CodeBlock
          language="typescript"
          fileName="advanced-config.ts"
          code={`MetiganModule.forRoot({
  apiKey: process.env.METIGAN_API_KEY,
  timeout: 30000,     // Optional, defaults to 30000ms
  retryCount: 3,      // Optional, defaults to 3
  retryDelay: 2000,   // Optional, defaults to 2000ms
  debug: false,       // Optional, defaults to false
})`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Controller Example</h2>
        <CodeBlock
          language="typescript"
          fileName="email.controller.ts"
          code={`import { Controller, Post, Body } from '@nestjs/common';
import { MetiganService } from '@metigan/nestjs';

@Controller('email')
export class EmailController {
  constructor(private readonly metigan: MetiganService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; content: string }) {
    const result = await this.metigan.email.sendEmail({
      from: 'noreply@example.com',
      recipients: [body.to],
      subject: body.subject,
      content: body.content,
    });

    return {
      success: result.success,
      message: result.message,
    };
  }
}`}
        />
      </section>

      <Callout variant="tip" title="Environment Variables">
        <p>
          Use environment variables to store your API key securely. Create a <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">.env</code> file with <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">METIGAN_API_KEY=your_api_key</code>
        </p>
      </Callout>
    </div>
  )
}

