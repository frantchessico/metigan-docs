"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { docsConfig } from "@/lib/docs-config"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DocsSearch() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {docsConfig.map((section) => (
            <CommandGroup key={section.title} heading={section.title}>
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <CommandItem
                    key={item.href}
                    value={`${item.title} ${item.description || ""} ${section.title}`}
                    onSelect={() => {
                      runCommand(() => router.push(item.href))
                    }}
                    className="cursor-pointer"
                  >
                    {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                    {item.badge && (
                      <span className="ml-auto px-1.5 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary">
                        {item.badge}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
