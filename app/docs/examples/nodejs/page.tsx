import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function NodeJsExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Node.js Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Node.js integration examples using the Metigan SDK. Learn how to send emails, manage contacts, 
          and integrate Metigan into your Node.js applications.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Setup</h2>
        <CodeBlock
          language="javascript"
          fileName="index.js"
          code={`const Metigan = require('metigan');

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY
});

// Send an email
async function sendEmail() {
  try {
    const result = await metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Hello from Node.js!',
      content: '<p>This email was sent from a Node.js application.</p>'
    });

    if (result.success) {
      console.log('Email sent successfully!');
    } else {
      console.error('Failed to send email:', result.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

sendEmail();`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">OTP Email (Verification Code)</h2>
        <p className="text-muted-foreground mb-4">
          Send One-Time Password emails with priority delivery and built-in rate limiting.
        </p>
        <CodeBlock
          language="javascript"
          fileName="otp-example.js"
          code={`const Metigan = require('metigan');

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY
});

// Send OTP with default template
async function sendVerificationCode(userEmail) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  const result = await metigan.email.sendOtp({
    to: userEmail,
    from: 'security@myapp.com',
    code: code,
    appName: 'MyApp',
    expiresInMinutes: 10
  });

  if (result.success) {
    console.log('OTP sent! Tracking:', result.trackingId);
    return { success: true, code }; // Store code for verification
  }
  return { success: false };
}

// Send OTP with custom template
async function sendBrandedOtp(userEmail) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  const result = await metigan.email.sendOtp({
    to: userEmail,
    from: 'security@myapp.com',
    code: code,
    appName: 'MyApp',
    expiresInMinutes: 10,
    templateId: 'your-otp-template-id' // Custom branded template
  });

  return result;
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Transactional Email (Fast Lane)</h2>
        <p className="text-muted-foreground mb-4">
          Send time-sensitive transactional emails like password resets, order confirmations, etc.
        </p>
        <CodeBlock
          language="javascript"
          fileName="transactional-example.js"
          code={`const Metigan = require('metigan');

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY
});

// Password reset email
async function sendPasswordReset(userEmail, resetLink) {
  const result = await metigan.email.sendTransactional({
    to: userEmail,
    from: 'security@myapp.com',
    subject: 'Reset Your Password',
    content: \`
      <h1>Password Reset</h1>
      <p>Click the link below to reset your password:</p>
      <a href="\${resetLink}" style="padding: 12px 24px; background: #2563eb; color: white; 
         text-decoration: none; border-radius: 8px; display: inline-block;">
        Reset Password
      </a>
      <p>This link expires in 1 hour.</p>
    \`
  });

  return result;
}

// Order confirmation email
async function sendOrderConfirmation(order) {
  const result = await metigan.email.sendTransactional({
    to: order.customerEmail,
    from: 'orders@myshop.com',
    subject: \`Order Confirmed #\${order.id}\`,
    content: \`
      <h1>Thank you for your order!</h1>
      <p>Order #\${order.id} has been confirmed.</p>
      <p>Total: $\${order.total.toFixed(2)}</p>
    \`
  });

  return result;
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Email with Template & Variables</h2>
        <p className="text-muted-foreground mb-4">
          Use pre-created templates with dynamic variable substitution.
        </p>
        <CodeBlock
          language="javascript"
          fileName="template-example.js"
          code={`const Metigan = require('metigan');

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY
});

// Send email using a template with variables
async function sendWelcomeEmail(user) {
  const result = await metigan.email.sendEmail({
    from: 'Welcome Team <welcome@myapp.com>',
    recipients: [user.email],
    subject: \`Welcome, \${user.firstName}!\`,
    templateId: 'welcome-template-id',
    variables: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dashboardUrl: 'https://myapp.com/dashboard'
    }
  });

  return result;
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Express.js Integration</h2>
        <CodeBlock
          language="javascript"
          fileName="express-route.js"
          code={`const express = require('express');
const Metigan = require('metigan');
const router = express.Router();

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY
});

// Send email endpoint
router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, content } = req.body;

    const result = await metigan.email.sendEmail({
      from: 'noreply@example.com',
      recipients: [to],
      subject,
      content
    });

    if (result.success) {
      res.json({ success: true, message: 'Email sent successfully' });
    } else {
      res.status(400).json({ success: false, error: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// OTP endpoint
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await metigan.email.sendOtp({
      to: email,
      from: 'security@myapp.com',
      code,
      appName: 'MyApp',
      expiresInMinutes: 5
    });

    if (result.success) {
      // Store code in session/cache for verification
      res.json({ success: true, message: 'Verification code sent' });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;`}
        />
      </section>

      <Callout variant="tip" title="Environment Variables">
        <p>
          Use <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">dotenv</code> package 
          to load environment variables: <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">require('dotenv').config()</code>
        </p>
      </Callout>
    </div>
  )
}

