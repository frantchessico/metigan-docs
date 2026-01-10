import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function AngularExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Angular Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Angular integration examples using the Metigan SDK. Learn how to send emails, manage contacts, 
          forms, and audiences in your Angular applications using RxJS Observables.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Installation</h2>
        <CodeBlock
          language="bash"
          fileName="terminal"
          code={`npm install @metigan/angular
# or
yarn add @metigan/angular`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Module Configuration</h2>
        <CodeBlock
          language="typescript"
          fileName="app.module.ts"
          code={`import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MetiganModule } from '@metigan/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // Configure Metigan SDK
    MetiganModule.forRoot({
      apiKey: 'your-api-key-here',
      timeout: 30000,
      retryCount: 3
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Component Usage</h2>
        <CodeBlock
          language="typescript"
          fileName="email.component.ts"
          code={`import { Component, OnInit } from '@angular/core';
import { MetiganService } from '@metigan/angular';

@Component({
  selector: 'app-email',
  template: \`
    <div>
      <button (click)="sendEmail()" [disabled]="loading">
        {{ loading ? 'Sending...' : 'Send Email' }}
      </button>
      <div *ngIf="message" class="success">{{ message }}</div>
      <div *ngIf="error" class="error">{{ error }}</div>
    </div>
  \`
})
export class EmailComponent implements OnInit {
  message = '';
  error = '';
  loading = false;

  constructor(private metigan: MetiganService) {}

  ngOnInit() {
    // Initialize if not done via module
    if (!this.metigan.isInitialized()) {
      this.metigan.initialize({
        apiKey: 'your-api-key-here'
      });
    }
  }

  sendEmail() {
    this.loading = true;
    this.message = '';
    this.error = '';

    this.metigan.email.sendEmail({
      from: 'Your Company <noreply@yourcompany.com>',
      recipients: ['customer@email.com'],
      subject: 'Welcome!',
      content: '<h1>Hello!</h1><p>Thank you for signing up.</p>'
    }).subscribe({
      next: (response) => {
        this.message = \`Email sent! \${response.message}\`;
        this.loading = false;
      },
      error: (error) => {
        this.error = \`Error: \${error.message}\`;
        this.loading = false;
      }
    });
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Using Async Pipe</h2>
        <CodeBlock
          language="typescript"
          fileName="contacts.component.ts"
          code={`import { Component, OnInit } from '@angular/core';
import { MetiganService } from '@metigan/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  template: \`
    <div *ngIf="contacts$ | async as contacts">
      <h2>Contacts</h2>
      <div *ngFor="let contact of contacts.contacts">
        <p>\{{ contact.email }} - \{{ contact.firstName }} \{{ contact.lastName }}</p>
      </div>
      <p>Total: \{{ contacts.pagination.total }}</p>
    </div>
  \`
})
export class ContactsComponent implements OnInit {
  contacts$!: Observable<any>;

  constructor(private metigan: MetiganService) {}

  ngOnInit() {
    if (!this.metigan.isInitialized()) {
      this.metigan.initialize({ apiKey: 'your-api-key' });
    }

    this.contacts$ = this.metigan.contacts.list({
      audienceId: 'audience-123',
      page: 1,
      limit: 50
    });
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Form Submission</h2>
        <CodeBlock
          language="typescript"
          fileName="form.component.ts"
          code={`import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MetiganService } from '@metigan/angular';

@Component({
  selector: 'app-contact-form',
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="email" type="email" placeholder="Email" />
      <input formControlName="name" placeholder="Name" />
      <textarea formControlName="message" placeholder="Message"></textarea>
      <button type="submit" [disabled]="form.invalid || loading">
        {{ loading ? 'Submitting...' : 'Submit' }}
      </button>
      <div *ngIf="successMessage">{{ successMessage }}</div>
      <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
  \`
})
export class ContactFormComponent {
  form: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private metigan: MetiganService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.metigan.forms.submit({
      formId: 'your-form-id',
      data: {
        'field-email': this.form.value.email,
        'field-name': this.form.value.name,
        'field-message': this.form.value.message
      }
    }).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.form.reset();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Creating Contacts</h2>
        <CodeBlock
          language="typescript"
          fileName="create-contact.component.ts"
          code={`import { Component, OnDestroy } from '@angular/core';
import { MetiganService } from '@metigan/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-contact',
  template: \`
    <form (ngSubmit)="createContact()">
      <input [(ngModel)]="email" type="email" placeholder="Email" required />
      <input [(ngModel)]="firstName" placeholder="First Name" />
      <input [(ngModel)]="lastName" placeholder="Last Name" />
      <button type="submit" [disabled]="loading">Create Contact</button>
    </form>
  \`
})
export class CreateContactComponent implements OnDestroy {
  email = '';
  firstName = '';
  lastName = '';
  loading = false;
  private subscription = new Subscription();

  constructor(private metigan: MetiganService) {}

  createContact() {
    if (!this.email) return;

    this.loading = true;

    const sub = this.metigan.contacts.create({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      audienceId: 'audience-123',
      tags: ['subscriber']
    }).subscribe({
      next: (contact) => {
        console.log('Contact created:', contact);
        this.loading = false;
        // Reset form
        this.email = '';
        this.firstName = '';
        this.lastName = '';
      },
      error: (error) => {
        console.error('Error creating contact:', error);
        this.loading = false;
      }
    });

    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Email with Attachments</h2>
        <CodeBlock
          language="typescript"
          fileName="email-attachment.component.ts"
          code={`import { Component } from '@angular/core';
import { MetiganService } from '@metigan/angular';

@Component({
  selector: 'app-email-attachment',
  template: \`
    <div>
      <input type="file" #fileInput multiple (change)="onFileSelected($event)" />
      <button (click)="sendEmailWithAttachments()" [disabled]="loading || files.length === 0">
        Send Email with Attachments
      </button>
      <div *ngFor="let file of files">{{ file.name }}</div>
    </div>
  \`
})
export class EmailAttachmentComponent {
  files: File[] = [];
  loading = false;

  constructor(private metigan: MetiganService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
    }
  }

  sendEmailWithAttachments() {
    if (this.files.length === 0) return;

    this.loading = true;

    this.metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Email with Attachments',
      content: '<p>Please find the attachments below.</p>',
      attachments: this.files
    }).subscribe({
      next: (response) => {
        console.log('Email sent with attachments:', response);
        this.files = [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Handling</h2>
        <CodeBlock
          language="typescript"
          fileName="error-handling.component.ts"
          code={`import { Component } from '@angular/core';
import { MetiganService, MetiganError, ValidationError, ApiError } from '@metigan/angular';

@Component({
  selector: 'app-error-handling',
  template: \`
    <div>
      <button (click)="sendEmail()">Send Email</button>
      <div *ngIf="error" class="error">{{ error }}</div>
    </div>
  \`
})
export class ErrorHandlingComponent {
  error = '';

  constructor(private metigan: MetiganService) {}

  sendEmail() {
    this.error = '';

    this.metigan.email.sendEmail({
      from: 'invalid-email', // This will cause a validation error
      recipients: ['recipient@example.com'],
      subject: 'Test',
      content: '<p>Test</p>'
    }).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        if (error instanceof ValidationError) {
          this.error = \`Validation Error: \${error.message}\`;
        } else if (error instanceof ApiError) {
          this.error = \`API Error (\${error.statusCode}): \${error.message}\`;
        } else if (error instanceof MetiganError) {
          this.error = \`Metigan Error: \${error.message}\`;
        } else {
          this.error = \`Unknown error: \${error.message}\`;
        }
      }
    });
  }
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Service Injection Pattern</h2>
        <CodeBlock
          language="typescript"
          fileName="service-example.ts"
          code={`import { Injectable } from '@angular/core';
import { MetiganEmailService } from '@metigan/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private metiganEmail: MetiganEmailService) {
    // Initialize the service
    this.metiganEmail.initialize('your-api-key');
  }

  sendWelcomeEmail(userEmail: string, userName: string): Observable<any> {
    return this.metiganEmail.sendEmail({
      from: 'noreply@yourapp.com',
      recipients: [userEmail],
      subject: 'Welcome to Our App!',
      content: \`<h1>Welcome \${userName}!</h1><p>Thank you for joining us.</p>\`
    });
  }
}

// Use in component
@Component({
  selector: 'app-user',
  template: ''
})
export class UserComponent {
  constructor(private emailService: EmailService) {}

  onUserSignup(userEmail: string, userName: string) {
    this.emailService.sendWelcomeEmail(userEmail, userName).subscribe({
      next: () => console.log('Welcome email sent'),
      error: (error) => console.error('Error:', error)
    });
  }
}`}
        />
      </section>

      <Callout variant="tip" title="RxJS Observables">
        <p>
          All Metigan service methods return RxJS Observables. Always subscribe to handle responses 
          and errors. Don't forget to unsubscribe in <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">ngOnDestroy</code> 
          or use the <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">async</code> pipe in templates.
        </p>
      </Callout>

      <Callout variant="warning" title="API Key Security">
        <p>
          Store your API key in environment variables or a configuration service. Never hardcode API keys 
          in your source code. Use Angular's environment files for different environments.
        </p>
      </Callout>
    </div>
  )
}

