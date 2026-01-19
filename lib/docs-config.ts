import type { LucideIcon } from "lucide-react"
import { 
  BookOpen, 
  Mail, 
  Users, 
  Target, 
  FileText, 
  Code, 
  Rocket, 
  Key, 
  Settings,
  Webhook,
  LayoutTemplate,
  FormInput,
  ShieldCheck,
  Zap,
  Globe,
  Server
} from "lucide-react"

export interface DocSection {
  title: string
  description?: string
  items: DocItem[]
}

export interface DocItem {
  title: string
  href: string
  description?: string
  badge?: string
  icon?: LucideIcon
}

export const docsConfig: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        description: "Learn about Metigan and its capabilities",
        icon: Rocket,
      },
      {
        title: "Installation",
        href: "/docs/installation",
        description: "Install the Metigan SDK in your project",
        icon: Settings,
      },
      {
        title: "Quick Start",
        href: "/docs/quick-start",
        description: "Send your first email in 5 minutes",
        icon: Rocket,
      },
      {
        title: "Authentication",
        href: "/docs/authentication",
        description: "Learn how to authenticate with the API",
        icon: Key,
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "Overview",
        href: "/docs/concepts/overview",
        description: "Understanding the Metigan architecture",
        icon: BookOpen,
      },
      {
        title: "Error Handling",
        href: "/docs/concepts/error-handling",
        description: "Comprehensive error handling guide",
        icon: Code,
      },
      {
        title: "Rate Limits",
        href: "/docs/concepts/rate-limits",
        description: "Understanding rate limits and quotas",
        icon: Settings,
      },
      {
        title: "Security",
        href: "/docs/concepts/security",
        description: "Security best practices and features",
        icon: Key,
      },
    ],
  },
  {
    title: "REST API",
    description: "Complete REST API reference for direct HTTP integration",
    items: [
      {
        title: "REST API Overview",
        href: "/docs/rest-api",
        description: "Complete REST API reference",
        icon: Globe,
        badge: "New",
      },
      {
        title: "Authentication",
        href: "/docs/rest-api/authentication",
        description: "API authentication methods",
        icon: Key,
      },
      {
        title: "Email Endpoints",
        href: "/docs/rest-api/email",
        description: "Send emails, OTP, and transactional",
        icon: Mail,
      },
      {
        title: "Contacts Endpoints",
        href: "/docs/rest-api/contacts",
        description: "CRUD operations for contacts",
        icon: Users,
      },
      {
        title: "Audiences Endpoints",
        href: "/docs/rest-api/audiences",
        description: "Manage audiences and lists",
        icon: Target,
      },
      {
        title: "Templates Endpoints",
        href: "/docs/rest-api/templates",
        description: "Email template management",
        icon: LayoutTemplate,
      },
      {
        title: "Forms Endpoints",
        href: "/docs/rest-api/forms",
        description: "Form submission and management",
        icon: FormInput,
      },
    ],
  },
  {
    title: "SDK Reference",
    items: [
      {
        title: "Email",
        href: "/docs/api/email",
        description: "Send transactional and marketing emails",
        icon: Mail,
      },
      {
        title: "Contacts",
        href: "/docs/api/contacts",
        description: "Manage contacts and subscribers",
        icon: Users,
      },
      {
        title: "Audiences",
        href: "/docs/api/audiences",
        description: "Organize contacts into audiences",
        icon: Target,
      },
      {
        title: "Templates",
        href: "/docs/api/templates",
        description: "Create and manage email templates",
        icon: LayoutTemplate,
      },
      {
        title: "Forms",
        href: "/docs/api/forms",
        description: "Build and manage forms",
        icon: FormInput,
      },
      {
        title: "Webhooks",
        href: "/docs/api/webhooks",
        description: "Set up event webhooks",
        icon: Webhook,
      },
    ],
  },
  {
    title: "Guides",
    items: [
      {
        title: "Sending Emails",
        href: "/docs/guides/sending-emails",
        description: "Complete guide to sending emails",
        icon: Mail,
      },
      {
        title: "OTP Emails",
        href: "/docs/guides/otp-emails",
        description: "Send verification codes with rate limiting",
        icon: ShieldCheck,
        badge: "New",
      },
      {
        title: "Transactional Emails",
        href: "/docs/guides/transactional-emails",
        description: "Welcome, password reset, orders, and more",
        icon: Zap,
        badge: "New",
      },
      {
        title: "Contact Management",
        href: "/docs/guides/contact-management",
        description: "Best practices for managing contacts",
        icon: Users,
      },
      {
        title: "Email Templates",
        href: "/docs/guides/email-templates",
        description: "Creating responsive email templates",
        icon: LayoutTemplate,
      },
      {
        title: "Form Builder",
        href: "/docs/guides/form-builder",
        description: "Building forms with the form builder",
        icon: FormInput,
      },
      {
        title: "Webhook Integration",
        href: "/docs/guides/webhook-integration",
        description: "Integrating webhooks in your application",
        icon: Webhook,
      },
    ],
  },
  {
    title: "Examples",
    items: [
      {
        title: "Node.js",
        href: "/docs/examples/nodejs",
        description: "Node.js integration examples",
        icon: Code,
      },
      {
        title: "TypeScript",
        href: "/docs/examples/typescript",
        description: "TypeScript examples and patterns",
        icon: Code,
      },
      {
        title: "React",
        href: "/docs/examples/react",
        description: "React component examples",
        icon: Code,
      },
      {
        title: "Next.js",
        href: "/docs/examples/nextjs",
        description: "Next.js API routes and server components",
        icon: Code,
      },
      {
        title: "Go",
        href: "/docs/examples/go",
        description: "Go integration examples and patterns",
        icon: Code,
      },
      {
        title: "NestJS",
        href: "/docs/examples/nestjs",
        description: "NestJS module integration examples",
        icon: Code,
      },
      {
        title: "Python",
        href: "/docs/examples/python",
        description: "Python integration examples and patterns",
        icon: Code,
      },
      {
        title: "PHP",
        href: "/docs/examples/php",
        description: "PHP integration examples and patterns",
        icon: Code,
      },
      {
        title: "Angular",
        href: "/docs/examples/angular",
        description: "Angular integration examples with RxJS Observables",
        icon: Code,
      },
    ],
  },
]

export const allDocs = docsConfig.flatMap(section => 
  section.items.map(item => ({
    ...item,
    section: section.title,
  }))
)

