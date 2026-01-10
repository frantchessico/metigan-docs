"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { docsConfig } from "@/lib/docs-config"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, BookOpen } from "lucide-react"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-64 border-r bg-[#000000] shrink-0">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-6 p-6">
          {/* Logo Section */}
          <div className="mb-6">
            <Link 
              href="/docs" 
              className="flex items-center space-x-2 font-bold"
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-base font-semibold">Documentation</span>
            </Link>
          </div>

          <Separator className="my-6" />

          {/* Navigation Sections */}
          <nav className="space-y-6">
            {docsConfig.map((section, sectionIndex) => (
              <div key={section.title} className={cn(sectionIndex > 0 && "mt-8")}>
                <h4 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative",
                          isActive
                            ? "bg-accent text-foreground border-l-2 border-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {Icon && (
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0 transition-colors",
                                isActive 
                                  ? "text-primary" 
                                  : "text-muted-foreground group-hover:text-accent-foreground"
                              )}
                            />
                          )}
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto px-1.5 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-primary ml-2 shrink-0" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  )
}
