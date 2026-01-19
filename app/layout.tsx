import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Metigan - Email for Developers",
    template: "%s | Metigan"
  },
  description: "The best way to reach humans instead of spam folders. Build powerful email solutions with Metigan. High deliverability email API for developers.",
  keywords: [
    "email API",
    "email for developers",
    "transactional email",
    "email delivery",
    "email service",
    "email marketing API",
    "SMTP API",
    "email infrastructure",
    "developer tools",
    "email automation",
    "mass email",
    "email SDK",
    "Node.js email",
    "Python email",
    "React email",
    "email templates",
    "email deliverability",
    "Metigan"
  ],
  authors: [{ name: "Metigan", url: "https://metigan.com" }],
  creator: "Metigan",
  publisher: "Metigan",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://docs.metigan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Metigan - Email for Developers",
    description: "The best way to reach humans instead of spam folders. Build powerful email solutions with Metigan.",
    siteName: "Metigan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Metigan - Email for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metigan - Email for Developers",
    description: "The best way to reach humans instead of spam folders. Build powerful email solutions with Metigan.",
    images: ["/og-image.png"],
    creator: "@metigan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, jetbrainsMono.variable)}>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
          <SonnerProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
