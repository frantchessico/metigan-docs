"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Github, Download } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { AnimatedEnvelope } from "@/components/animated-envelope"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const technologies = [
  { 
    name: "Node.js", 
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg",
    color: "#339933" // Verde Node.js
  },
  { 
    name: "TypeScript", 
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg",
    color: "#3178C6" // Azul TypeScript
  },
  { 
    name: "Python", 
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "#3776AB" // Azul Python
  },
  { 
    name: "PHP", 
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-plain.svg",
    color: "#777BB4" // Roxo PHP
  },
  { 
    name: "Go", 
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
    color: "#00ADD8" // Azul ciano Go
  },
  { 
    name: "Angular", 
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
    color: "#DD0031" // Vermelho Angular
  },
  { 
    name: "NestJS", 
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    color: "#E0234E" // Vermelho NestJS
  },
]

const frameworks = [
  { name: "Node.js", code: `const Metigan = require('metigan');

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY
});

const result = await metigan.email.sendEmail({
  from: 'sender@example.com',
  recipients: ['recipient@example.com'],
  subject: 'Hello from Node.js!',
  content: '<p>This email was sent from a Node.js application.</p>'
});

console.log(result);` },
  { name: "TypeScript", code: `import Metigan from 'metigan';

const metigan = new Metigan({
  apiKey: process.env.METIGAN_API_KEY!
});

const result = await metigan.email.sendEmail({
  from: 'sender@example.com',
  recipients: ['recipient@example.com'],
  subject: 'Hello from TypeScript!',
  content: '<h1>Hello!</h1><p>This email was sent from TypeScript.</p>'
});

console.log(result);` },
  { name: "Python", code: `from metigan import MetiganClient

client = MetiganClient(api_key="your-api-key")

result = client.email.send_email(
    from_address="Sender <sender@example.com>",
    recipients=["recipient@example.com"],
    subject="Hello from Python!",
    content="<h1>Hello!</h1><p>This email was sent from Python.</p>"
)

print(result)` },
  { name: "PHP", code: `use Metigan\\MetiganClient;

$client = new MetiganClient(getenv('METIGAN_API_KEY'));

$result = $client->email()->sendEmail(
    fromAddress: "sender@example.com",
    recipients: ["recipient@example.com"],
    subject: "Hello!",
    content: "<h1>Welcome</h1><p>Thank you for signing up.</p>"
);

echo $result['message'];` },
  { name: "Go", code: `package main

import "github.com/metigan/metigan-go"

client := metigan.NewClient(metigan.Config{
    APIKey: os.Getenv("METIGAN_API_KEY"),
})

result, _ := client.Email().SendEmail(metigan.EmailOptions{
    From:       "Sender <sender@example.com>",
    Recipients: []string{"recipient@example.com"},
    Subject:    "Hello from Go!",
    Content:    "<h1>Hello!</h1><p>This email was sent from Go.</p>",
})

fmt.Println(result.Message)` },
  { name: "Angular", code: `import { Component } from '@angular/core';
import { MetiganService } from '@metigan/angular';

@Component({
  selector: 'app-email',
  template: '<button (click)="sendEmail()">Send Email</button>'
})
export class EmailComponent {
  constructor(private metigan: MetiganService) {}

  sendEmail() {
    this.metigan.email.sendEmail({
      from: 'sender@example.com',
      recipients: ['recipient@example.com'],
      subject: 'Hello from Angular!',
      content: '<h1>Hello!</h1><p>This email was sent from Angular.</p>'
    }).subscribe(result => console.log(result));
  }
}` },
  { name: "NestJS", code: `import { Injectable } from '@nestjs/common';
import { MetiganService } from '@metigan/nestjs';

@Injectable()
export class EmailService {
  constructor(private readonly metigan: MetiganService) {}

  async sendWelcomeEmail(email: string) {
    return await this.metigan.email.sendEmail({
      from: 'Sender <sender@example.com>',
      recipients: [email],
      subject: 'Welcome!',
      content: '<h1>Hello!</h1><p>Thank you for signing up.</p>',
    });
  }
}` },
]

export default function Home() {
  const [activeFramework, setActiveFramework] = useState(0)

  // Função para encontrar o índice do framework pelo nome da tecnologia
  const getFrameworkIndex = (techName: string) => {
    const index = frameworks.findIndex(f => f.name === techName)
    return index >= 0 ? index : 0
  }

  // Função para verificar se uma tecnologia está ativa
  const isTechActive = (techName: string) => {
    return frameworks[activeFramework]?.name === techName
  }

  // Função para converter cor HEX em filtro CSS aproximado
  const getColorFilter = (hexColor: string) => {
    // Converter HEX para RGB
    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)
    
    // Calcular hue a partir de RGB
    const hue = getHueFromRGB(r, g, b)
    
    // Calcular saturação e brilho
    const max = Math.max(r, g, b) / 255
    const min = Math.min(r, g, b) / 255
    const saturation = max === 0 ? 0 : (max - min) / max
    
    // Aplicar filtro CSS
    return `invert(27%) sepia(100%) saturate(${saturation * 1000}%) hue-rotate(${hue}deg) brightness(${max * 1.2}) contrast(1.2)`
  }

  const getHueFromRGB = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    
    if (max === min) {
      h = 0
    } else if (max === r) {
      h = ((g - b) / (max - min) + (g < b ? 6 : 0)) * 60
    } else if (max === g) {
      h = ((b - r) / (max - min) + 2) * 60
    } else {
      h = ((r - g) / (max - min) + 4) * 60
    }
    
    return Math.round(h)
  }

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Metigan SDK",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Build powerful email solutions with Metigan SDK. Mass email delivery simplified for everyone.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://docs.metigan.com",
    "softwareVersion": "1.0",
    "programmingLanguage": ["JavaScript", "TypeScript", "Python", "PHP", "Go"],
    "featureList": [
      "Email API",
      "Mass Email Delivery",
      "Transactional Email",
      "Email Templates",
      "Audience Management",
      "Form Management"
    ]
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Metigan",
    "url": "https://metigan.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://docs.metigan.com"}/logo.png`,
    "sameAs": [
      "https://github.com/metigan",
      "https://twitter.com/metigan"
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      
      <div className="min-h-screen bg-[#0b0b12]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a1d4d] via-[#1c1b3a] to-[#0b0b12]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-32 left-10 w-72 h-72 bg-fuchsia-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 pt-36 pb-24 relative z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-widest text-white/70"
            >
              Metigan Documentation
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white"
            >
              Download‑fast docs,
              <br />
              for high‑scale email.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed"
            >
              Everything you need to ship reliable email—APIs, SDKs, workflows, and deliverability best practices.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-4 pt-2"
            >
              <Link href="/docs/quick-start">
                <Button size="lg" className="text-base px-8 py-6 rounded-lg font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all">
                  Get Started
                </Button>
              </Link>
              <Link href="/docs">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 rounded-lg font-semibold border-white/20 text-white hover:bg-white/5 transition-all"
                >
                  View Docs
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Technologies Grid with animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {technologies.map((tech, index) => {
            const isActive = isTechActive(tech.name)
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.8 + index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 1.05 }}
                onClick={() => setActiveFramework(getFrameworkIndex(tech.name))}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
              >
                <div className={cn(
                  "w-16 h-16 rounded-full border-2 bg-transparent flex items-center justify-center transition-all duration-300",
                  isActive
                    ? "border-border/70"
                    : "border-border/50 group-hover:border-border"
                )}>
                  <img 
                    src={tech.iconUrl}
                    alt={`${tech.name} logo icon for Metigan SDK integration`}
                    className={cn(
                      "w-8 h-8 transition-all duration-300",
                      isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                    )}
                    style={isActive && tech.color ? {
                      filter: `brightness(0) saturate(100%) ${getColorFilter(tech.color)}`,
                    } : {
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {tech.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Code Editor Section with animations */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="container mx-auto px-4 py-12 max-w-5xl"
      >
        <div className="rounded-xl border-2 border-border overflow-hidden shadow-lg">
          {/* Framework Tabs */}
          <div className="flex items-center border-b border-border bg-muted/50 overflow-x-auto">
            {frameworks.map((framework, index) => (
              <motion.button
                key={framework.name}
                onClick={() => setActiveFramework(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative",
                  activeFramework === index
                    ? "text-foreground bg-accent border-b-2 border-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {framework.name}
              </motion.button>
            ))}
          </div>

          {/* Code Content */}
          <div className="bg-[#000000]">
            <CodeBlock
                code={frameworks[activeFramework].code}
                language={
                  activeFramework === 0 ? "javascript" :
                  activeFramework === 1 ? "typescript" :
                  activeFramework === 2 ? "python" :
                  activeFramework === 3 ? "php" :
                  activeFramework === 4 ? "go" :
                  activeFramework === 5 ? "typescript" :
                  activeFramework === 6 ? "typescript" :
                  "typescript"
                }
                fileName={
                  activeFramework === 2 ? "example.py" :
                  activeFramework === 3 ? "example.php" :
                  activeFramework === 4 ? "main.go" :
                  activeFramework === 5 ? "email.component.ts" :
                  activeFramework === 6 ? "email.service.ts" :
                  frameworks[activeFramework].name.toLowerCase().replace(".", "") + ".ts"
                }
                showLineNumbers={true}
                className="border-0 rounded-none bg-transparent"
              />
          </div>
        </div>

          {/* Footer Links */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <Link
              href="https://github.com/metigan/metigan-lib"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </Link>
            <Link
              href="/docs"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Get Started</span>
            </Link>
          </div>
        </motion.div>

      {/* More Examples Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              More Examples
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore more examples for forms, contacts, audiences, and advanced features
            </p>
          </div>

          {/* Forms Example */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Forms Example</h3>
            <CodeBlock
              language="typescript"
              fileName="forms-example.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({ apiKey: 'your-api-key' });

const form = await metigan.forms.createForm({
  title: 'Contact Form',
  fields: [
    { id: 'field-email', type: 'email', label: 'Your Email', required: true },
    { id: 'field-message', type: 'textarea', label: 'Message', required: true }
  ]
});

const response = await metigan.forms.submit({
  formId: form.id!,
  data: {
    'field-email': 'user@email.com',
    'field-message': 'Hello!'
  }
});`}
              showLineNumbers={true}
            />
          </div>

          {/* Contacts Example */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contacts & Audiences Example</h3>
            <CodeBlock
              language="typescript"
              fileName="contacts-example.ts"
              code={`import Metigan from 'metigan';

const metigan = new Metigan({ apiKey: 'your-api-key' });

const audience = await metigan.audiences.create({
  name: 'Newsletter Subscribers'
});

const contact = await metigan.contacts.create({
  email: 'john@example.com',
  firstName: 'John',
  audienceId: audience.id!
});

const { contacts } = await metigan.contacts.list({
  audienceId: audience.id!
});`}
              showLineNumbers={true}
            />
          </div>

          {/* Python Forms Example */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Python Forms Example</h3>
            <CodeBlock
              language="python"
              fileName="forms-example.py"
              code={`from metigan import MetiganClient

client = MetiganClient(api_key="your-api-key")

result = client.forms.submit(
    form_id="form-123",
    data={
        "field-email": "user@email.com",
        "field-message": "Hello!"
    }
)`}
              showLineNumbers={true}
            />
          </div>

          {/* PHP Contacts Example */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">PHP Contacts Example</h3>
            <CodeBlock
              language="php"
              fileName="contacts-example.php"
              code={`<?php

use Metigan\\MetiganClient;

$client = new MetiganClient(getenv('METIGAN_API_KEY'));

// Create contact
$contact = $client->contacts()->create([
    'email' => 'john@example.com',
    'firstName' => 'John',
    'lastName' => 'Doe',
    'audienceId' => 'audience-123',
    'tags' => ['customer']
]);

// List contacts
$result = $client->contacts()->list([
    'audienceId' => 'audience-123',
    'status' => 'subscribed',
    'page' => 1,
    'limit' => 50
]);

echo "Total contacts: " . $result['pagination']['total'];`}
              showLineNumbers={true}
            />
          </div>
        </div>
      </motion.div>

      {/* Additional CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground">
            Send your first email in minutes. No credit card required.
          </p>
          <div className="flex items-center justify-center space-x-4 flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/docs/quick-start"
              >
                <Button variant="outline" size="lg">
                  Quick Start Guide
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/docs">
                <Button variant="ghost" size="lg">
                  Documentation
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/docs/examples">
                <Button variant="ghost" size="lg">
                  View All Examples
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  )
}
