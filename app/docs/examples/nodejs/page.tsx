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

