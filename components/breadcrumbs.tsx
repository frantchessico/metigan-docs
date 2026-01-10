"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function Breadcrumbs() {
  const pathname = usePathname()
  
  if (pathname === "/docs") {
    return null
  }

  const segments = pathname.split("/").filter(Boolean)
  
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    
    return {
      href,
      label,
      isLast: index === segments.length - 1,
    }
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link
        href="/docs"
        className="hover:text-foreground transition-colors flex items-center"
      >
        <Home className="h-4 w-4 mr-1" />
        Docs
      </Link>
      {breadcrumbs.map((crumb) => (
        <React.Fragment key={crumb.href}>
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          {crumb.isLast ? (
            <span className="text-foreground font-medium">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

