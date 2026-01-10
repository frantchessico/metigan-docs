import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Metigan SDK - Email API for Developers",
    template: "%s | Metigan SDK"
  },
  description: "Build powerful email solutions with Metigan SDK. Mass email delivery simplified for everyone. Support for Node.js, Python, PHP, Java, Go, TypeScript, Angular, and NestJS.",
  keywords: [
    "email API",
    "email SDK",
    "mass email",
    "email delivery",
    "email service",
    "transactional email",
    "email marketing API",
    "Node.js email",
    "Python email",
    "PHP email",
    "Java email",
    "Go email",
    "TypeScript email",
    "Angular email",
    "NestJS email",
    "email infrastructure",
    "developer tools",
    "email automation",
    "Metigan"
  ],
  authors: [{ name: "Metigan" }],
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
    title: "Metigan SDK - Email API for Developers",
    description: "Build powerful email solutions with Metigan SDK. Mass email delivery simplified for everyone.",
    siteName: "Metigan SDK",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Metigan SDK - Email API for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metigan SDK - Email API for Developers",
    description: "Build powerful email solutions with Metigan SDK. Mass email delivery simplified for everyone.",
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <SonnerProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
