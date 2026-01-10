"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { docsConfig } from "@/lib/docs-config"
import { cn } from "@/lib/utils"

export function DocsHeader() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#000000] shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Documentation</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-full py-4">
                {docsConfig.map((section) => (
                  <div key={section.title} className="mb-6 px-4">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.title}
                    </h4>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold">
              Metigan
            </span>
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Docs</span>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 h-9 bg-muted/50 border-muted focus:bg-[#000000]"
            />
            {searchQuery && (
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link href="https://app.metigan.com" className="hidden sm:inline-block">
            <Button 
              variant="outline" 
              size="sm"
            >
              Go to App
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
