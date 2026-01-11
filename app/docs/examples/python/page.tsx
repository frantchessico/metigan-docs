import { CodeBlock } from "@/components/code-block"
import { Callout } from "@/components/callout"

export default function PythonExamplesPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4 pb-6 border-b">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Python Examples</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Python integration examples using the Metigan SDK. Learn how to send emails, manage contacts, 
          and integrate Metigan into your Python applications.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Installation</h2>
        <CodeBlock
          language="bash"
          fileName="install.sh"
          code={`pip install metigan
# or
pip3 install metigan`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Basic Setup</h2>
        <CodeBlock
          language="python"
          fileName="basic.py"
          code={`from metigan import MetiganClient

# Initialize the client
client = MetiganClient(api_key="your-api-key")

# Send email
result = client.email.send_email(
    from_address="Sender <sender@example.com>",
    recipients=["customer@email.com"],
    subject="Welcome!",
    content="<h1>Hello!</h1><p>Thank you for signing up.</p>"
)

if result["success"]:
    print("Email sent successfully!")
    print(f"Emails remaining: {result.get('emailsRemaining', 'N/A')}")`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Sending Emails</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Basic Email</h3>
        <CodeBlock
          language="python"
          fileName="send-email.py"
          code={`result = client.email.send_email(
    from_address="sender@example.com",
    recipients=["recipient@example.com"],
    subject="Email Subject",
    content="<h1>HTML Content</h1><p>This is the email body.</p>"
)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with CC and BCC</h3>
        <CodeBlock
          language="python"
          fileName="send-email-cc.py"
          code={`result = client.email.send_email(
    from_address="company@email.com",
    recipients=["main@email.com"],
    subject="Meeting",
    content="Email content",
    cc=["copy@email.com"],
    bcc=["hidden-copy@email.com"],
    reply_to="reply-here@email.com"
)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Attachments</h3>
        <CodeBlock
          language="python"
          fileName="send-email-attachment.py"
          code={`with open("document.pdf", "rb") as f:
    file_data = f.read()

result = client.email.send_email(
    from_address="company@email.com",
    recipients=["customer@email.com"],
    subject="Important Document",
    content="Please find the document attached.",
    attachments=[
        {
            "content": file_data,
            "filename": "document.pdf",
            "content_type": "application/pdf"
        }
    ]
)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Email with Template</h3>
        <CodeBlock
          language="python"
          fileName="send-email-template.py"
          code={`result = client.email.send_email_with_template(
    template_id="template-123",
    variables={
        "name": "John Doe",
        "company": "Acme Inc"
    },
    from_address="sender@example.com",
    recipients=["recipient@example.com"]
)`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Contact Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Contact</h3>
        <CodeBlock
          language="python"
          fileName="create-contact.py"
          code={`contact = client.contacts.create(
    email="new@email.com",
    first_name="Jane",
    last_name="Doe",
    audience_id="audience-123",
    tags=["customer", "newsletter"]
)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Contact</h3>
        <CodeBlock
          language="python"
          fileName="get-contact.py"
          code={`# By ID
contact = client.contacts.get("contact-456")

# By email
contact = client.contacts.get_by_email("jane@email.com", "audience-123")`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Contacts</h3>
        <CodeBlock
          language="python"
          fileName="list-contacts.py"
          code={`result = client.contacts.list(
    audience_id="audience-123",
    status="subscribed",
    page=1,
    limit=50
)

print(f"Total contacts: {result['pagination']['total']}")
for contact in result["contacts"]:
    print(f"{contact['email']}: {contact.get('first_name', 'N/A')}")`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Update Contact</h3>
        <CodeBlock
          language="python"
          fileName="update-contact.py"
          code={`updated = client.contacts.update(
    contact_id="contact-456",
    first_name="Jane Marie",
    tags=["customer", "vip"]
)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Manage Subscription</h3>
        <CodeBlock
          language="python"
          fileName="manage-subscription.py"
          code={`# Subscribe
client.contacts.subscribe("contact-456")

# Unsubscribe
client.contacts.unsubscribe("contact-456")`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Manage Tags</h3>
        <CodeBlock
          language="python"
          fileName="manage-tags.py"
          code={`# Add tags
client.contacts.add_tags("contact-456", ["vip", "black-friday"])

# Remove tags
client.contacts.remove_tags("contact-456", ["test"])`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Audience Management</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Create Audience</h3>
        <CodeBlock
          language="python"
          fileName="create-audience.py"
          code={`audience = client.audiences.create(
    name="Main Newsletter",
    description="Main subscriber list"
)`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">List Audiences</h3>
        <CodeBlock
          language="python"
          fileName="list-audiences.py"
          code={`result = client.audiences.list(page=1, limit=10)

for audience in result["audiences"]:
    print(f"{audience['name']}: {audience['count']} contacts")`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Audience Statistics</h3>
        <CodeBlock
          language="python"
          fileName="audience-stats.py"
          code={`stats = client.audiences.get_stats("audience-123")

print(f"Total: {stats['total']}")
print(f"Subscribed: {stats['subscribed']}")
print(f"Unsubscribed: {stats['unsubscribed']}")`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Forms</h2>
        
        <h3 className="text-2xl font-semibold mb-4">Submit Form</h3>
        <CodeBlock
          language="python"
          fileName="submit-form.py"
          code={`result = client.forms.submit(
    form_id="form-123",
    data={
        "field-email": "user@email.com",
        "field-name": "John Doe",
        "field-message": "Hello, I would like more information."
    }
)

print(result["message"])`}
        />

        <h3 className="text-2xl font-semibold mb-4 mt-8">Get Form</h3>
        <CodeBlock
          language="python"
          fileName="get-form.py"
          code={`form = client.forms.get("form-123")
print(form["title"])
print(form["fields"])`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Error Handling</h2>
        <CodeBlock
          language="python"
          fileName="error-handling.py"
          code={`from metigan import MetiganClient, ApiError, ValidationError

try:
    result = client.email.send_email(options)
except ValidationError as e:
    print(f"Validation Error: {e.message}")
    if e.field:
        print(f"Field: {e.field}")
except ApiError as e:
    print(f"API Error: {e.status_code} - {e.message}")
except Exception as e:
    print(f"Unknown error: {e}")`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Advanced Configuration</h2>
        <CodeBlock
          language="python"
          fileName="advanced-config.py"
          code={`from metigan import MetiganClient

client = MetiganClient(
    api_key="your-api-key",
    timeout=30,        # Optional, defaults to 30 seconds
    retry_count=3,     # Optional, defaults to 3
    retry_delay=2,     # Optional, defaults to 2 seconds
    debug=False        # Optional, defaults to False
)`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Flask Example</h2>
        <CodeBlock
          language="python"
          fileName="flask-example.py"
          code={`from flask import Flask, request, jsonify
from metigan import MetiganClient
import os

app = Flask(__name__)
client = MetiganClient(api_key=os.getenv("METIGAN_API_KEY"))

@app.route("/send-email", methods=["POST"])
def send_email():
    data = request.get_json()
    
    try:
        result = client.email.send_email(
            from_address="noreply@example.com",
            recipients=[data["to"]],
            subject=data["subject"],
            content=data["content"]
        )
        
        return jsonify({
            "success": result.get("success"),
            "message": result.get("message")
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)`}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight scroll-mt-20">Django Example</h2>
        <CodeBlock
          language="python"
          fileName="views.py"
          code={`from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from metigan import MetiganClient
import os
import json

client = MetiganClient(api_key=os.getenv("METIGAN_API_KEY"))

@csrf_exempt
@require_http_methods(["POST"])
def send_email(request):
    try:
        data = json.loads(request.body)
        
        result = client.email.send_email(
            from_address="noreply@example.com",
            recipients=[data["to"]],
            subject=data["subject"],
            content=data["content"]
        )
        
        return JsonResponse({
            "success": result.get("success"),
            "message": result.get("message")
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)`}
        />
      </section>

      <Callout variant="tip" title="Environment Variables">
        <p>
          Use environment variables to store your API key securely. Set <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">METIGAN_API_KEY</code> before running your application.
        </p>
      </Callout>
    </div>
  )
}

