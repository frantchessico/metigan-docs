import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TransactionalEmailsGuidePage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Transactional Emails</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Send transactional emails for user actions: welcome emails, password resets, order confirmations, 
          receipts, and more. Built for reliability with tracking and analytics.
        </p>
      </div>

      {/* What are Transactional Emails */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">What are Transactional Emails?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Transactional emails are triggered by user actions and contain information specific to that user. 
          Unlike marketing emails (broadcasts), they are:
        </p>
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-lg font-semibold mb-2">🎯 Triggered</h3>
            <p className="text-sm text-muted-foreground">
              Sent automatically based on user actions like signing up, making a purchase, or resetting a password.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-lg font-semibold mb-2">👤 Personalized</h3>
            <p className="text-sm text-muted-foreground">
              Contain information specific to the recipient like their name, order details, or account information.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-muted/30">
            <h3 className="text-lg font-semibold mb-2">⚡ Time-Sensitive</h3>
            <p className="text-sm text-muted-foreground">
              Expected immediately after the action. Delivery speed is critical for user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Common Types */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Common Transactional Email Types</h2>
        
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Trigger</th>
                  <th className="px-4 py-3 text-left font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Welcome Email</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">User registration</td>
                  <td className="px-4 py-3 text-sm">High</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Email Verification</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Account creation</td>
                  <td className="px-4 py-3 text-sm">High</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Password Reset</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Forgot password request</td>
                  <td className="px-4 py-3 text-sm">Critical</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Order Confirmation</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Purchase completed</td>
                  <td className="px-4 py-3 text-sm">High</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Shipping Notification</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Order shipped</td>
                  <td className="px-4 py-3 text-sm">Medium</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Receipt/Invoice</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Payment processed</td>
                  <td className="px-4 py-3 text-sm">Medium</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">Account Activity</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">Login, changes, etc.</td>
                  <td className="px-4 py-3 text-sm">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Examples */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Quick Examples</h2>
        
        <Tabs defaultValue="welcome" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="password">Password Reset</TabsTrigger>
            <TabsTrigger value="order">Order Confirm</TabsTrigger>
            <TabsTrigger value="receipt">Receipt</TabsTrigger>
          </TabsList>

          <TabsContent value="welcome" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="welcome-email.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

async function sendWelcomeEmail(user: { email: string; name: string }) {
  const result = await metigan.email.sendEmail({
    from: 'Welcome Team <welcome@myapp.com>',
    recipients: [user.email],
    subject: \`Welcome to MyApp, \${user.name}! 🎉\`,
    content: \`
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; padding: 40px 0;">
            <h1 style="color: #2563eb; margin: 0;">Welcome, \${user.name}! 👋</h1>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            Thank you for joining MyApp! We're excited to have you on board.
          </p>
          
          <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <h3 style="margin: 0 0 15px 0; color: #1f2937;">Getting Started:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
              <li style="margin-bottom: 10px;">Complete your profile</li>
              <li style="margin-bottom: 10px;">Explore our features</li>
              <li style="margin-bottom: 10px;">Invite your team</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://myapp.com/dashboard" 
               style="display: inline-block; padding: 14px 28px; background: #2563eb; color: white; 
                      text-decoration: none; border-radius: 8px; font-weight: 600;">
              Go to Dashboard →
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            Questions? Reply to this email or contact support@myapp.com
          </p>
        </body>
      </html>
    \`
  });

  return result;
}

// On user registration
sendWelcomeEmail({ email: 'newuser@example.com', name: 'John' });`}
            />
          </TabsContent>

          <TabsContent value="password" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="password-reset.ts"
              code={`import Metigan from 'metigan';
import crypto from 'crypto';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

async function sendPasswordResetEmail(user: { email: string; name: string }) {
  // Generate secure reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetUrl = \`https://myapp.com/reset-password?token=\${resetToken}\`;
  
  // Store token in database with expiry (implement this)
  // await storeResetToken(user.email, resetToken, expiresIn: '1h');
  
  const result = await metigan.email.sendEmail({
    from: 'Security <security@myapp.com>',
    recipients: [user.email],
    subject: 'Reset Your Password',
    content: \`
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 3px solid #ef4444; padding-bottom: 20px;">
            <h1 style="color: #1f2937; margin: 0;">🔐 Password Reset</h1>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-top: 20px;">
            Hi \${user.name},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #374151;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="\${resetUrl}" 
               style="display: inline-block; padding: 16px 32px; background: #ef4444; color: white; 
                      text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Reset Password
            </a>
          </div>
          
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #991b1b; font-size: 14px;">
              ⚠️ This link expires in <strong>1 hour</strong>. If you didn't request this, 
              please ignore this email or contact support immediately.
            </p>
          </div>
          
          <p style="font-size: 13px; color: #6b7280; margin-top: 30px;">
            Link not working? Copy and paste this URL:<br>
            <span style="color: #2563eb; word-break: break-all;">\${resetUrl}</span>
          </p>
        </body>
      </html>
    \`
  });

  return result;
}

// On forgot password request
sendPasswordResetEmail({ email: 'user@example.com', name: 'John' });`}
            />
          </TabsContent>

          <TabsContent value="order" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="order-confirmation.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  shippingAddress: string;
}

async function sendOrderConfirmation(order: Order) {
  const itemsHtml = order.items.map(item => \`
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">\${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">\${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$\${item.price.toFixed(2)}</td>
    </tr>
  \`).join('');

  const result = await metigan.email.sendEmail({
    from: 'Orders <orders@mystore.com>',
    recipients: [order.customerEmail],
    subject: \`Order Confirmed! #\${order.id}\`,
    content: \`
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
          <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">✅ Order Confirmed!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Order #\${order.id}</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <p style="font-size: 16px; color: #374151; margin: 0 0 20px 0;">
                Hi \${order.customerName}, thank you for your order!
              </p>
              
              <!-- Order Items -->
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                  <tr style="background: #f3f4f6;">
                    <th style="padding: 12px; text-align: left; font-size: 14px;">Item</th>
                    <th style="padding: 12px; text-align: center; font-size: 14px;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 14px;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  \${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 15px 12px; font-weight: bold; font-size: 16px;">Total</td>
                    <td style="padding: 15px 12px; font-weight: bold; font-size: 18px; text-align: right; color: #10b981;">
                      $\${order.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              
              <!-- Shipping Address -->
              <div style="background: #f3f4f6; border-radius: 8px; padding: 15px; margin-top: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">📦 Shipping to:</h3>
                <p style="margin: 0; color: #374151;">\${order.shippingAddress}</p>
              </div>
              
              <!-- Track Order Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://mystore.com/orders/\${order.id}" 
                   style="display: inline-block; padding: 14px 28px; background: #2563eb; color: white; 
                          text-decoration: none; border-radius: 8px; font-weight: 600;">
                  Track Your Order
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    \`
  });

  return result;
}

// On order completion
sendOrderConfirmation({
  id: 'ORD-2024-001',
  customerEmail: 'customer@example.com',
  customerName: 'Jane Doe',
  items: [
    { name: 'Product A', quantity: 2, price: 29.99 },
    { name: 'Product B', quantity: 1, price: 49.99 }
  ],
  total: 109.97,
  shippingAddress: '123 Main St, City, Country'
});`}
            />
          </TabsContent>

          <TabsContent value="receipt" className="space-y-4">
            <CodeBlock
              language="typescript"
              fileName="payment-receipt.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

interface Payment {
  id: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: string;
  description: string;
  date: Date;
  paymentMethod: string;
}

async function sendPaymentReceipt(payment: Payment) {
  const formattedDate = payment.date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const result = await metigan.email.sendEmail({
    from: 'Billing <billing@myservice.com>',
    recipients: [payment.customerEmail],
    subject: \`Payment Receipt - \${payment.currency} \${payment.amount.toFixed(2)}\`,
    content: \`
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <!-- Header -->
          <div style="text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
            <h1 style="color: #1f2937; margin: 0;">Payment Receipt</h1>
            <p style="color: #6b7280; margin: 10px 0 0 0;">Thank you for your payment</p>
          </div>
          
          <div style="margin: 30px 0;">
            <p style="font-size: 16px; color: #374151;">Hi \${payment.customerName},</p>
            <p style="font-size: 16px; color: #374151;">
              We've received your payment. Here are the details:
            </p>
          </div>
          
          <!-- Receipt Details -->
          <div style="background: #f9fafb; border-radius: 12px; padding: 25px; margin: 20px 0;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="font-size: 42px; font-weight: bold; color: #10b981;">
                \${payment.currency} \${payment.amount.toFixed(2)}
              </span>
              <div style="background: #d1fae5; color: #065f46; padding: 4px 12px; border-radius: 20px; 
                          display: inline-block; margin-top: 10px; font-size: 14px; font-weight: 600;">
                ✓ Paid
              </div>
            </div>
            
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Receipt ID</td>
                <td style="padding: 8px 0; text-align: right; color: #374151; font-family: monospace;">
                  \${payment.id}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Date</td>
                <td style="padding: 8px 0; text-align: right; color: #374151;">\${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Description</td>
                <td style="padding: 8px 0; text-align: right; color: #374151;">\${payment.description}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Payment Method</td>
                <td style="padding: 8px 0; text-align: right; color: #374151;">\${payment.paymentMethod}</td>
              </tr>
            </table>
          </div>
          
          <!-- Download Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://myservice.com/receipts/\${payment.id}/download" 
               style="display: inline-block; padding: 12px 24px; background: #374151; color: white; 
                      text-decoration: none; border-radius: 8px; font-weight: 500;">
              📄 Download PDF Receipt
            </a>
          </div>
          
          <p style="font-size: 13px; color: #6b7280; text-align: center; margin-top: 30px;">
            Questions about this charge? Contact us at billing@myservice.com
          </p>
        </body>
      </html>
    \`
  });

  return result;
}

// On successful payment
sendPaymentReceipt({
  id: 'PAY-123456',
  customerEmail: 'customer@example.com',
  customerName: 'John Doe',
  amount: 99.00,
  currency: 'USD',
  description: 'Pro Plan - Monthly',
  date: new Date(),
  paymentMethod: 'Visa •••• 4242'
});`}
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Using Templates */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Using Templates with Variables</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          For cleaner code and easier maintenance, use templates with dynamic variables. 
          Create the template once, then just pass the data when sending.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Step 1: Create Template</h3>
            <CodeBlock
              language="typescript"
              fileName="create-transactional-template.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

// Create a welcome email template with variables
const template = await metigan.templates.create({
  name: 'Welcome Email',
  subject: 'Welcome to {{appName}}, {{firstName}}! 🎉',
  content: \`
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>Welcome, {{firstName}} {{lastName}}! 👋</h1>
        
        <p>Thank you for joining {{appName}}!</p>
        
        <p>Your account details:</p>
        <ul>
          <li>Email: {{email}}</li>
          <li>Plan: {{plan}}</li>
        </ul>
        
        <a href="{{dashboardUrl}}" style="display: inline-block; padding: 14px 28px; 
           background: #2563eb; color: white; text-decoration: none; border-radius: 8px;">
          Go to Dashboard
        </a>
        
        <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
          Need help? Contact us at {{supportEmail}}
        </p>
      </body>
    </html>
  \`
});

console.log('Template ID:', template.id);
// Save: WELCOME_TEMPLATE_ID = template.id`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Step 2: Send with Variables</h3>
            <CodeBlock
              language="typescript"
              fileName="send-with-variables.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

const WELCOME_TEMPLATE_ID = 'your-template-id';

async function sendWelcomeEmail(user: {
  email: string;
  firstName: string;
  lastName: string;
  plan: string;
}) {
  const result = await metigan.email.sendEmail({
    from: 'Welcome <welcome@myapp.com>',
    recipients: [user.email],
    templateId: WELCOME_TEMPLATE_ID,
    variables: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      plan: user.plan,
      appName: 'MyApp',
      dashboardUrl: 'https://myapp.com/dashboard',
      supportEmail: 'support@myapp.com'
    }
  });

  return result;
}

// Usage
sendWelcomeEmail({
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  plan: 'Pro'
});`}
            />
          </div>
        </div>

        <Callout variant="tip" title="Template Variables">
          <p>
            Use <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">{"{{variableName}}"}</code> syntax in your templates. 
            All variables passed in the <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">variables</code> object 
            will be automatically replaced when sending.
          </p>
        </Callout>
      </section>

      {/* Best Practices */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Best Practices</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 rounded-lg border bg-muted/30 space-y-4">
            <h3 className="text-lg font-semibold">📧 Email Design</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Keep emails simple and focused</li>
              <li>• Use inline CSS for compatibility</li>
              <li>• Test on multiple email clients</li>
              <li>• Mobile-first design (600px max-width)</li>
              <li>• Clear call-to-action buttons</li>
              <li>• Include plain text fallback</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-lg border bg-muted/30 space-y-4">
            <h3 className="text-lg font-semibold">⚡ Delivery</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Send immediately after trigger event</li>
              <li>• Use verified sender domains</li>
              <li>• Implement retry logic for failures</li>
              <li>• Monitor delivery rates</li>
              <li>• Use tracking IDs for debugging</li>
              <li>• Set up webhooks for status updates</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-lg border bg-muted/30 space-y-4">
            <h3 className="text-lg font-semibold">🔒 Security</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Never include passwords in emails</li>
              <li>• Use short expiry for sensitive links</li>
              <li>• Generate secure random tokens</li>
              <li>• Validate email addresses</li>
              <li>• Implement rate limiting</li>
              <li>• Log sending events (not content)</li>
            </ul>
          </div>
          
          <div className="p-6 rounded-lg border bg-muted/30 space-y-4">
            <h3 className="text-lg font-semibold">📊 Tracking</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use tracking IDs for each email</li>
              <li>• Set up webhooks for open/click events</li>
              <li>• Monitor bounce and complaint rates</li>
              <li>• A/B test subject lines</li>
              <li>• Track conversion rates</li>
              <li>• Analyze engagement metrics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Tracking with Webhooks</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Set up webhooks to receive real-time notifications about email events:
        </p>
        
        <CodeBlock
          language="typescript"
          fileName="webhook-handler.ts"
          code={`// Express webhook handler for email events
app.post('/webhooks/metigan', (req, res) => {
  const event = req.body;
  
  switch (event.event) {
    case 'email.delivered':
      console.log(\`Email \${event.trackingId} delivered to \${event.recipient}\`);
      // Update your database
      break;
      
    case 'email.opened':
      console.log(\`Email \${event.trackingId} opened\`);
      // Track engagement
      break;
      
    case 'email.clicked':
      console.log(\`Link clicked in email \${event.trackingId}\`);
      // Track conversion
      break;
      
    case 'email.bounced':
      console.log(\`Email bounced: \${event.recipient}\`);
      // Mark email as invalid, stop sending
      break;
      
    case 'email.complained':
      console.log(\`Spam complaint from \${event.recipient}\`);
      // Unsubscribe user immediately
      break;
  }
  
  res.status(200).send('OK');
});`}
        />

        <Callout variant="tip" title="Learn More">
          <p>
            See the <Link href="/docs/guides/webhook-integration" className="text-primary hover:underline font-medium">Webhook Integration Guide</Link> 
            {" "}for complete setup instructions and event types.
          </p>
        </Callout>
      </section>

      {/* Related Guides */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Related Guides</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/docs/guides/otp-emails" className="block p-6 rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">OTP Emails →</h3>
            <p className="text-sm text-muted-foreground">Send verification codes with built-in rate limiting</p>
          </Link>
          <Link href="/docs/guides/email-templates" className="block p-6 rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Email Templates →</h3>
            <p className="text-sm text-muted-foreground">Create reusable templates with variables</p>
          </Link>
          <Link href="/docs/api/email" className="block p-6 rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Email API Reference →</h3>
            <p className="text-sm text-muted-foreground">Complete API documentation</p>
          </Link>
          <Link href="/docs/guides/webhook-integration" className="block p-6 rounded-lg border hover:border-primary transition-colors">
            <h3 className="font-semibold mb-2">Webhook Integration →</h3>
            <p className="text-sm text-muted-foreground">Track delivery, opens, and clicks</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
