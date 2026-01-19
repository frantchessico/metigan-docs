import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function PhpExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">PHP Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          PHP integration examples using the Metigan SDK. Learn how to send emails, manage contacts, 
          and integrate Metigan into your PHP applications.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Installation</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Composer</h3>
        <CodeBlock
          language="bash"
          fileName="composer.json"
          code={`composer require metigan/metigan-php`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Setup</h2>
        <CodeBlock
          language="php"
          fileName="basic.php"
          code={`<?php

require 'vendor/autoload.php';

use Metigan\\MetiganClient;
use Metigan\\Exception\\ApiException;
use Metigan\\Exception\\ValidationException;

// Initialize the client
$client = new MetiganClient(getenv('METIGAN_API_KEY'));

// Send email
try {
    $result = $client->email()->sendEmail(
        fromAddress: "Sender <sender@example.com>",
        recipients: ["recipient@example.com"],
        subject: "Hello!",
        content: "<h1>Hello!</h1><p>Thank you for signing up.</p>"
    );

    if ($result['success'] ?? false) {
        echo "Email sent successfully!\n";
        // IMPORTANT: API returns fields in camelCase (emailsRemaining), not snake_case
        echo "Emails remaining: " . ($result['emailsRemaining'] ?? 'N/A') . "\n";
    }
} catch (ValidationException $e) {
    echo "Validation Error: " . $e->getMessage() . "\n";
} catch (ApiException $e) {
    echo "API Error: " . $e->getStatusCode() . " - " . $e->getMessage() . "\n";
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Sending Emails</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Basic Email</h3>
        <CodeBlock
          language="php"
          fileName="send-email.php"
          code={`$result = $client->email()->sendEmail(
    fromAddress: "sender@example.com",
    recipients: ["recipient@example.com"],
    subject: "Email Subject",
    content: "<h1>HTML Content</h1><p>This is the email body.</p>"
);

if ($result['success']) {
    echo "Email sent successfully!\n";
    echo "Emails remaining: " . $result['emailsRemaining'] . "\n";
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with CC and BCC</h3>
        <CodeBlock
          language="php"
          fileName="send-email-cc.php"
          code={`$result = $client->email()->sendEmail(
    fromAddress: "company@email.com",
    recipients: ["main@email.com"],
    subject: "Meeting",
    content: "Email content",
    cc: ["copy@email.com"],
    bcc: ["hidden-copy@email.com"],
    replyTo: "reply-here@email.com"
);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Attachments</h3>
        <CodeBlock
          language="php"
          fileName="send-email-attachment.php"
          code={`$fileData = file_get_contents("document.pdf");

$result = $client->email()->sendEmail(
    fromAddress: "company@email.com",
    recipients: ["customer@email.com"],
    subject: "Important Document",
    content: "Please find the document attached.",
    attachments: [
        [
            'content' => $fileData,
            'filename' => 'document.pdf',
            'contentType' => 'application/pdf'
        ]
    ]
);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Template</h3>
        <CodeBlock
          language="php"
          fileName="send-email-template.php"
          code={`$result = $client->email()->sendEmailWithTemplate(
    templateId: "template-123",
    variables: [
        'name' => 'John Doe',
        'company' => 'Acme Inc'
    ],
    fromAddress: "sender@example.com",
    recipients: ["recipient@example.com"],
    replyTo: "reply@example.com"
);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">OTP Email (Verification Code)</h2>
        <p className="text-muted-foreground mb-4">
          Send One-Time Password emails with priority delivery and built-in rate limiting.
        </p>
        <CodeBlock
          language="php"
          fileName="otp-example.php"
          code={`<?php

use Metigan\\MetiganClient;

$client = new MetiganClient(getenv('METIGAN_API_KEY'));

/**
 * Send OTP with default template
 */
function sendVerificationCode(MetiganClient $client, string $userEmail): array {
    // Generate 6-digit code
    $code = str_pad((string)random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
    
    $result = $client->email()->sendOtp(
        to: $userEmail,
        from: "security@myapp.com",
        code: $code,
        appName: "MyApp",
        expiresInMinutes: 10
    );
    
    if ($result['success'] ?? false) {
        echo "OTP sent! Tracking: " . $result['trackingId'] . "\n";
        return ['success' => true, 'code' => $code];
    }
    
    return ['success' => false, 'error' => $result['error'] ?? 'Unknown error'];
}

/**
 * Send OTP with custom branded template
 */
function sendBrandedOtp(MetiganClient $client, string $userEmail, string $templateId): array {
    $code = str_pad((string)random_int(100000, 999999), 6, '0', STR_PAD_LEFT);
    
    $result = $client->email()->sendOtp(
        to: $userEmail,
        from: "security@myapp.com",
        code: $code,
        appName: "MyApp",
        expiresInMinutes: 5,
        templateId: $templateId  // Custom branded template
    );
    
    return $result;
}

// Usage
$result = sendVerificationCode($client, "user@example.com");`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Transactional Email (Fast Lane)</h2>
        <p className="text-muted-foreground mb-4">
          Send time-sensitive transactional emails like password resets, receipts, and confirmations.
        </p>
        <CodeBlock
          language="php"
          fileName="transactional-example.php"
          code={`<?php

use Metigan\\MetiganClient;

$client = new MetiganClient(getenv('METIGAN_API_KEY'));

/**
 * Send password reset email
 */
function sendPasswordReset(MetiganClient $client, string $userEmail, string $resetLink): array {
    $result = $client->email()->sendTransactional(
        to: $userEmail,
        from: "security@myapp.com",
        subject: "Reset Your Password",
        content: "
            <h1>Password Reset</h1>
            <p>Click the link below to reset your password:</p>
            <a href='{$resetLink}' style='padding: 12px 24px; background: #2563eb; 
               color: white; text-decoration: none; border-radius: 8px; display: inline-block;'>
                Reset Password
            </a>
            <p style='color: #666; margin-top: 20px;'>This link expires in 1 hour.</p>
        "
    );
    
    return $result;
}

/**
 * Send order confirmation email
 */
function sendOrderConfirmation(MetiganClient $client, array $order): array {
    $result = $client->email()->sendTransactional(
        to: $order['customerEmail'],
        from: "orders@myshop.com",
        subject: "Order Confirmed #{$order['id']}",
        content: "
            <h1>Thank you for your order!</h1>
            <p>Order #{$order['id']} has been confirmed.</p>
            <p><strong>Total:</strong> $" . number_format($order['total'], 2) . "</p>
            <a href='https://myshop.com/orders/{$order['id']}'>Track Your Order</a>
        "
    );
    
    return $result;
}

/**
 * Send payment receipt
 */
function sendPaymentReceipt(MetiganClient $client, array $payment): array {
    $amount = number_format($payment['amount'], 2);
    
    $result = $client->email()->sendTransactional(
        to: $payment['customerEmail'],
        from: "billing@myservice.com",
        subject: "Payment Receipt - {$payment['currency']} {$amount}",
        content: "
            <h1>Payment Receipt</h1>
            <p>Thank you for your payment.</p>
            <div style='background: #f5f5f5; padding: 20px; border-radius: 8px;'>
                <p><strong>Amount:</strong> {$payment['currency']} {$amount}</p>
                <p><strong>Receipt ID:</strong> {$payment['id']}</p>
                <p><strong>Date:</strong> {$payment['date']}</p>
            </div>
        "
    );
    
    return $result;
}

// Usage examples
$resetResult = sendPasswordReset($client, "user@example.com", "https://myapp.com/reset?token=abc123");

$orderResult = sendOrderConfirmation($client, [
    'id' => 'ORD-2024-001',
    'customerEmail' => 'customer@example.com',
    'total' => 99.99
]);`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Managing Contacts</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Contact</h3>
        <CodeBlock
          language="php"
          fileName="create-contact.php"
          code={`$contact = $client->contacts()->create(
    email: "new@email.com",
    audienceId: "audience-123",
    firstName: "Jane",
    lastName: "Doe",
    phone: "+1234567890",
    tags: ["customer", "newsletter"]
);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Contact</h3>
        <CodeBlock
          language="php"
          fileName="get-contact.php"
          code={`$contact = $client->contacts()->get("contact-456");
echo $contact['email'] . ": " . $contact['firstName'];`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Contacts</h3>
        <CodeBlock
          language="php"
          fileName="list-contacts.php"
          code={`$result = $client->contacts()->list(
    audienceId: "audience-123",
    status: "subscribed",
    page: 1,
    limit: 50
);

foreach ($result['contacts'] ?? [] as $contact) {
    echo $contact['email'] . ": " . ($contact['firstName'] ?? 'N/A') . "\n";
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Update Contact</h3>
        <CodeBlock
          language="php"
          fileName="update-contact.php"
          code={`$updated = $client->contacts()->update(
    contactId: "contact-456",
    firstName: "Jane Marie",
    tags: ["customer", "vip"]
);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Manage Subscription</h3>
        <CodeBlock
          language="php"
          fileName="manage-subscription.php"
          code={`// Subscribe
$client->contacts()->subscribe("contact-456");

// Unsubscribe
$client->contacts()->unsubscribe("contact-456");`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Managing Audiences</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Audience</h3>
        <CodeBlock
          language="php"
          fileName="create-audience.php"
          code={`$audience = $client->audiences()->create(
    name: "Main Newsletter",
    description: "Main subscriber list"
);`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Audiences</h3>
        <CodeBlock
          language="php"
          fileName="list-audiences.php"
          code={`$result = $client->audiences()->list(page: 1, limit: 10);

foreach ($result['audiences'] ?? [] as $audience) {
    echo $audience['name'] . ": " . ($audience['count'] ?? 0) . " contacts\n";
}`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Audience Stats</h3>
        <CodeBlock
          language="php"
          fileName="audience-stats.php"
          code={`$stats = $client->audiences()->getStats("audience-123");
echo "Total: " . ($stats['total'] ?? 0) . "\n";
echo "Subscribed: " . ($stats['subscribed'] ?? 0) . "\n";`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Handling</h2>
        <CodeBlock
          language="php"
          fileName="error-handling.php"
          code={`use Metigan\\Exception\\ApiException;
use Metigan\\Exception\\ValidationException;

try {
    $result = $client->email()->sendEmail(/* ... */);
} catch (ValidationException $e) {
    echo "Validation Error: " . $e->getMessage() . "\n";
    if ($e->getField()) {
        echo "Field: " . $e->getField() . "\n";
    }
} catch (ApiException $e) {
    echo "API Error: " . $e->getStatusCode() . " - " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "Unknown error: " . $e->getMessage() . "\n";
}`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Advanced Configuration</h2>
        <CodeBlock
          language="php"
          fileName="config.php"
          code={`$client = new MetiganClient(
    apiKey: "your-api-key",
    timeout: 30,        // Optional, defaults to 30 seconds
    retryCount: 3,      // Optional, defaults to 3
    retryDelay: 2,      // Optional, defaults to 2 seconds
    debug: false        // Optional, defaults to false
);`}
        />
      </section>

      <Callout variant="tip" title="Response Format">
        <p>
          The API returns all fields in <strong>camelCase</strong> format. Always use camelCase when accessing response data:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">emailsRemaining</code> (not <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">emails_remaining</code>)</li>
          <li><code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">recipientCount</code> (not <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">recipient_count</code>)</li>
          <li><code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">successfulEmails</code> (not <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">successful_emails</code>)</li>
        </ul>
      </Callout>
    </div>
  )
}
