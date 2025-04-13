import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Metigan SDK",
  description: "A powerful and flexible SDK for integrating with the Metigan email and audience management platform.",
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
