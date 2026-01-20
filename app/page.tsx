"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  Mail, Github, ArrowRight, Check, Zap, Shield, Globe, 
  Code2, Sparkles, BarChart3, Users, Clock, Send, 
  FileCode, Layers, Terminal, Box, ChevronRight, 
  Star, ExternalLink, Play, Copy, CheckCircle2,
  Cpu, Database, Lock, Gauge, Heart, Rocket
} from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ============================================================================
// DATA
// ============================================================================

const companies = [
  { name: "SavanaPoint", logo: "S" },
  { name: "Waza Cursos", logo: "W" },
  { name: "Confirmado.pro", logo: "C" },
  { name: "Oito", logo: "O" },
  { name: "Flyone", logo: "F" },
  { name: "Fumane Films", logo: "F" },
]

const languages = [
  { name: "Node.js", lang: "javascript" },
  { name: "Python", lang: "python" },
  { name: "Go", lang: "go" },
  { name: "PHP", lang: "php" },
  { name: "cURL", lang: "bash" },
]

const codeExamples: Record<string, string> = {
  "Node.js": `import Metigan from 'metigan';

const metigan = new Metigan({ apiKey: 'your_api_key' });

await metigan.email.sendEmail({
  from: 'hello@example.com',
  recipients: ['user@gmail.com'],
  subject: 'Hello World',
  content: '<p>Welcome to Metigan!</p>'
});`,
  "Python": `from metigan import MetiganClient

client = MetiganClient(api_key="your_api_key")

client.email.send_email(
    from_address="hello@example.com",
    recipients=["user@gmail.com"],
    subject="Hello World",
    content="<p>Welcome to Metigan!</p>"
)`,
  "Go": `package main

import "github.com/metigan/metigan-go"

client := metigan.NewClient(metigan.Config{
    APIKey: "your_api_key",
})

client.Email().SendEmail(metigan.EmailOptions{
    From:       "hello@example.com",
    Recipients: []string{"user@gmail.com"},
    Subject:    "Hello World",
    Content:    "<p>Welcome to Metigan!</p>",
})`,
  "PHP": `<?php
use Metigan\\MetiganClient;

$client = new MetiganClient('your_api_key');

$client->email()->sendEmail(
    fromAddress: 'hello@example.com',
    recipients: ['user@gmail.com'],
    subject: 'Hello World',
    content: '<p>Welcome to Metigan!</p>'
);`,
  "cURL": `curl -X POST 'https://api.metigan.com/api/email/send' \\
  -H 'Authorization: Bearer your_api_key' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "from": "hello@example.com",
    "recipients": ["user@gmail.com"],
    "subject": "Hello World",
    "content": "<p>Welcome to Metigan!</p>"
  }'`,
}

const features = [
  {
    icon: Zap,
    title: "Fast Integration",
    description: "Get started in minutes with our simple API and SDKs for every major language.",
  },
  {
    icon: Shield,
    title: "High Deliverability",
    description: "Reach the inbox, not spam. Our infrastructure is optimized for deliverability.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Send millions of emails worldwide with our distributed infrastructure.",
  },
  {
    icon: Code2,
    title: "Developer First",
    description: "Built by developers, for developers. Clean APIs, great docs, and SDKs.",
  },
]

const developerFeatures = [
  {
    icon: Terminal,
    title: "Beautiful API",
    description: "RESTful API with predictable resource-oriented URLs and HTTP response codes.",
  },
  {
    icon: FileCode,
    title: "SDK for Every Language",
    description: "Official SDKs for Node.js, Python, Go, PHP, Ruby, and more.",
  },
  {
    icon: Layers,
    title: "React Components",
    description: "Build emails with React. Use components, props, and modern tooling.",
  },
  {
    icon: Box,
    title: "Template Engine",
    description: "Create dynamic templates with variables, loops, and conditionals.",
  },
]

const deliverabilityFeatures = [
  {
    title: "Automatic IP warming",
    description: "We gradually increase your sending volume to build reputation.",
  },
  {
    title: "Dedicated IPs",
    description: "Get your own IP address for complete control over reputation.",
  },
  {
    title: "SPF, DKIM & DMARC",
    description: "Full authentication support to prove you're legitimate.",
  },
  {
    title: "Feedback loops",
    description: "Automatic handling of complaints and bounces.",
  },
  {
    title: "Real-time monitoring",
    description: "Track delivery rates, opens, clicks, and more.",
  },
  {
    title: "Smart retries",
    description: "Intelligent retry logic for temporary failures.",
  },
]

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "388K+", label: "Emails sent" },
  { value: "<1s", label: "Avg. delivery time" },
  { value: "98%", label: "Inbox placement" },
]

const footerLinks = {
  Product: [
    { name: "Email API", href: "/docs/api/email" },
    { name: "Templates", href: "/docs/api/templates" },
    { name: "Audiences", href: "/docs/api/audiences" },
    { name: "Webhooks", href: "/docs/api/webhooks" },
    { name: "Pricing", href: "https://metigan.com/pricing" },
  ],
  Developers: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/docs/api/email" },
    { name: "SDKs", href: "/docs/installation" },
    { name: "Examples", href: "/docs/examples/nodejs" },
    { name: "Changelog", href: "https://metigan.com/changelog" },
  ],
  Resources: [
    { name: "Blog", href: "https://metigan.com/blog" },
    { name: "Guides", href: "/docs/guides/sending-emails" },
    { name: "Status", href: "https://status.metigan.com" },
    { name: "Support", href: "mailto:support@metigan.com" },
  ],
  Company: [
    { name: "About", href: "https://metigan.com/about" },
    { name: "Careers", href: "https://metigan.com/careers" },
    { name: "Privacy", href: "https://metigan.com/privacy" },
    { name: "Terms", href: "https://metigan.com/terms" },
  ],
}

// ============================================================================
// COMPONENTS
// ============================================================================

function Section({ 
  children, 
  className,
  id,
}: { 
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn("relative py-16 sm:py-20 md:py-28 lg:py-32", className)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {children}
      </div>
    </section>
  )
}

function SectionTitle({ 
  badge, 
  title, 
  description,
  center = true,
}: { 
  badge?: string
  title: string | React.ReactNode
  description?: string
  center?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <div 
      ref={ref}
      className={cn(
        "space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-16",
        center && "text-center max-w-3xl mx-auto"
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs text-muted-foreground"
        >
          <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {badge}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description,
  delay = 0,
}: { 
  icon: any
  title: string
  description: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
    >
      <div className="feature-icon mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}

function CodeTabs() {
  const [activeTab, setActiveTab] = useState("Node.js")
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-50" />
      
      <div className="relative rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            {languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => setActiveTab(lang.name)}
                className={cn(
                  "px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap",
                  activeTab === lang.name
                    ? "bg-white/10 text-white"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs text-muted-foreground hover:text-white transition-colors ml-2"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
        
        {/* Code */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3 sm:p-4 overflow-x-auto"
          >
            <CodeBlock
              code={codeExamples[activeTab]}
              language={languages.find(l => l.name === activeTab)?.lang || "javascript"}
              showLineNumbers={true}
              className="border-0 bg-transparent text-xs sm:text-sm"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function EmailPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="perspective-2000"
    >
      <div className="relative max-w-xl sm:max-w-2xl mx-auto transform-style-3d">
        {/* Glow */}
        <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl opacity-50" />
        
        {/* Email window */}
        <div className="relative rounded-lg sm:rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center text-[10px] sm:text-xs text-muted-foreground">
              Preview — Welcome Email
            </div>
          </div>
          
          {/* Email content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  M
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Welcome to Metigan</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">hello@metigan.com</p>
                </div>
              </div>
              
              {/* Body */}
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <p className="text-muted-foreground">Hi there,</p>
                <p className="text-muted-foreground">
                  Thanks for signing up! We&apos;re excited to have you on board.
                </p>
                <div className="py-3 sm:py-4">
                  <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-black rounded-lg font-medium text-xs sm:text-sm hover:bg-white/90 transition-colors">
                    Get Started
                  </button>
                </div>
                <p className="text-muted-foreground">
                  Best,<br />
                  The Metigan Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DashboardPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative max-w-5xl mx-auto"
    >
      {/* Glow */}
      <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
      
      {/* Dashboard window */}
      <div className="relative rounded-lg sm:rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
              M
            </div>
            <span className="font-medium text-sm sm:text-base">Dashboard</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 md:gap-4 text-xs sm:text-sm text-muted-foreground">
            <span>Emails</span>
            <span>Audiences</span>
            <span className="hidden md:inline">Templates</span>
            <span className="hidden md:inline">Analytics</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[
              { label: "Sent", value: "1,234,567" },
              { label: "Delivered", value: "99.2%" },
              { label: "Opened", value: "45.8%" },
              { label: "Clicked", value: "12.3%" },
            ].map((stat) => (
              <div key={stat.label} className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">{stat.label}</p>
                <p className="text-base sm:text-lg md:text-xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {/* Chart placeholder */}
          <div className="h-32 sm:h-40 md:h-48 rounded-lg bg-white/[0.02] border border-white/5 flex items-end justify-around p-2 sm:p-3 md:p-4 gap-1 sm:gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-cyan-500/40 to-blue-500/40 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Testimonial() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto text-center px-4 sm:px-0"
    >
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-full blur-3xl opacity-50" />
        
        <div className="relative space-y-4 sm:space-y-6">
          <div className="flex justify-center gap-0.5 sm:gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-white/90">
            &ldquo;Metigan changed the game for us at Fumane Films. We were spending 
            hours fighting with email servers, now we just call the API and it works. 
            The deliverability is incredible — our emails actually reach people.&rdquo;
          </blockquote>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
              GF
            </div>
            <div className="text-left">
              <p className="font-medium text-sm sm:text-base">Gamito Fumane</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Founder at Fumane Films</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                M
              </div>
              <span className="font-semibold text-base sm:text-lg">Metigan</span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Email for developers.
            </p>
          </div>
          
          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium mb-3 sm:mb-4 text-xs sm:text-sm">{category}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col items-center gap-4 sm:gap-5">
          {/* Social Links */}
          <div className="flex items-center gap-5">
            <Link 
              href="https://github.com/metigan" 
              target="_blank"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link 
              href="https://twitter.com/metigan" 
              target="_blank"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Metigan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Home() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Metigan",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    description: "Email for developers. The best way to reach humans instead of spam folders.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://metigan.com",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                  M
                </div>
                <span className="font-semibold text-base sm:text-lg">Metigan</span>
              </Link>
              
              <div className="hidden lg:flex items-center gap-8">
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="/docs/api/email" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  API Reference
                </Link>
                <Link href="https://metigan.com/pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="https://github.com/metigan" target="_blank" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="https://app.metigan.com/sign-in" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="https://app.metigan.com/sign-up">
                  <Button size="sm" className="text-xs sm:text-sm bg-white text-black hover:bg-white/90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
      {/* Hero Section */}
        <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[600px] bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent opacity-50" />
            <div className="absolute top-1/4 left-0 sm:left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 sm:right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
          
          {/* Grid */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm"
            >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                <span className="text-muted-foreground">Now with React Email support</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
                Email for
              <br />
                <span className="text-gradient-brand">developers</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0"
            >
                The best way to reach humans instead of spam folders. 
                Build, test, and send transactional emails at scale.
            </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2"
              >
                <Link href="https://app.metigan.com/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 bg-white text-black hover:bg-white/90 gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/docs" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 border-white/20 hover:bg-white/5 gap-2">
                    <FileCode className="w-4 h-4" />
                    Documentation
                  </Button>
                </Link>
              </motion.div>
        </div>

            {/* Hero Visual - 3D Email */}
      <motion.div
              initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
            >
              <EmailPreview />
            </motion.div>
          </div>
        </section>
        
        {/* Trusted By */}
        <section className="py-10 sm:py-12 md:py-16 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            <p className="text-center text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
              Trusted by developers from around the world
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 flex-wrap opacity-50">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center gap-2 text-base sm:text-lg font-medium text-muted-foreground"
                >
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-white/10 flex items-center justify-center text-xs sm:text-sm">
                    {company.logo}
                  </span>
                  <span className="hidden sm:inline">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Integrate This Morning */}
        <Section>
          <SectionTitle
            badge="Simple Integration"
            title={<>Integrate <span className="text-gradient-brand">this morning</span></>}
            description="Start sending emails in minutes. Our SDKs make it easy to integrate with your existing codebase."
          />
          <CodeTabs />
        </Section>
        
        {/* First Class Developer Experience */}
        <Section className="bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <SectionTitle
            badge="Developer Experience"
            title={<>First class<br />developer experience</>}
            description="Built by developers, for developers. Everything you need to send emails at scale."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {developerFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </Section>
        
        {/* Reach Humans Not Spam */}
        <Section>
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start lg:items-center">
            <div>
              <SectionTitle
                badge="Deliverability"
                title={<>Reach humans,<br /><span className="text-gradient-brand">not spam folders</span></>}
                description="Our infrastructure is optimized for deliverability. We handle the hard parts so your emails reach the inbox."
                center={false}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {deliverabilityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-2.5 sm:gap-3"
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm">{feature.title}</h4>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>

            <div className="relative">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] text-center"
                  >
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-brand">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        
        {/* Testimonial */}
        <Section className="bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <Testimonial />
        </Section>
        
        {/* Everything in Your Control */}
        <Section>
          <SectionTitle
            badge="Full Control"
            title={<>Everything in <span className="text-gradient-brand">your control</span></>}
            description="Monitor deliverability, track engagement, and manage your email infrastructure from a beautiful dashboard."
          />
          <DashboardPreview />
        </Section>
        
        {/* Beyond Expectations */}
        <Section className="bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <SectionTitle
            badge="Features"
            title="Beyond expectations"
            description="Everything you need to build world-class email experiences."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </Section>
        
        {/* Final CTA */}
        <Section>
          <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-0">
            {/* Glow */}
            <div className="absolute -inset-10 sm:-inset-20 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl opacity-30" />
            
      <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative space-y-5 sm:space-y-6 md:space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Email reimagined.
                <br />
                <span className="text-gradient-brand">Available today.</span>
          </h2>
              
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl mx-auto">
                Join thousands of developers who trust Metigan to deliver their most important emails.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                <Link href="https://app.metigan.com/sign-up" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 bg-white text-black hover:bg-white/90 gap-2">
                    Start for Free
                    <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
                <Link href="/docs" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 border-white/20 hover:bg-white/5">
                    Read the Docs
                </Button>
              </Link>
              </div>
              
              <p className="text-xs sm:text-sm text-muted-foreground">
                Free tier includes 3,000 emails/month. No credit card required.
              </p>
            </motion.div>
          </div>
        </Section>
        
        {/* Footer */}
        <Footer />
    </div>
    </>
  )
}
