"use client"

import * as React from "react"
import { Bot, Send, Sparkles, User, Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"
import python from "highlight.js/lib/languages/python"
import go from "highlight.js/lib/languages/go"
import php from "highlight.js/lib/languages/php"
import bash from "highlight.js/lib/languages/bash"
import json from "highlight.js/lib/languages/json"

// Register languages
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("js", javascript)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("ts", typescript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("py", python)
hljs.registerLanguage("go", go)
hljs.registerLanguage("php", php)
hljs.registerLanguage("bash", bash)
hljs.registerLanguage("shell", bash)
hljs.registerLanguage("sh", bash)
hljs.registerLanguage("json", json)

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

// Code block component with syntax highlighting
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = React.useState(false)
  const codeRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (codeRef.current && code) {
      try {
        if (language && hljs.getLanguage(language)) {
          codeRef.current.innerHTML = hljs.highlight(code, { language }).value
        } else {
          codeRef.current.innerHTML = hljs.highlightAuto(code).value
        }
      } catch {
        codeRef.current.textContent = code
      }
    }
  }, [code, language])

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-3 rounded-lg overflow-hidden border border-white/10 bg-transparent">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10">
        <span className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={copyCode}
          className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-500" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <pre className="p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed bg-transparent">
        <code ref={codeRef} className="font-mono text-slate-300">
          {code}
        </code>
      </pre>
    </div>
  )
}

// Format text with markdown-like syntax
function formatText(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = []
  
  // Split by lines first
  const lines = text.split("\n")
  
  lines.forEach((line, lineIndex) => {
    // Handle headers
    if (line.startsWith("### ")) {
      result.push(
        <h4 key={`h4-${lineIndex}`} className="text-sm font-semibold text-white mt-3 mb-1">
          {formatInline(line.slice(4))}
        </h4>
      )
      return
    }
    if (line.startsWith("## ")) {
      result.push(
        <h3 key={`h3-${lineIndex}`} className="text-base font-semibold text-white mt-4 mb-2">
          {formatInline(line.slice(3))}
        </h3>
      )
      return
    }
    if (line.startsWith("# ")) {
      result.push(
        <h2 key={`h2-${lineIndex}`} className="text-lg font-bold text-white mt-4 mb-2">
          {formatInline(line.slice(2))}
        </h2>
      )
      return
    }
    
    // Handle bullet points
    if (line.match(/^[-*]\s/)) {
      result.push(
        <div key={`li-${lineIndex}`} className="flex gap-2 ml-2 my-0.5">
          <span className="text-purple-400 shrink-0">•</span>
          <span>{formatInline(line.slice(2))}</span>
        </div>
      )
      return
    }
    
    // Handle numbered lists
    const numberedMatch = line.match(/^(\d+)\.\s/)
    if (numberedMatch) {
      result.push(
        <div key={`ol-${lineIndex}`} className="flex gap-2 ml-2 my-0.5">
          <span className="text-purple-400 shrink-0 font-medium">{numberedMatch[1]}.</span>
          <span>{formatInline(line.slice(numberedMatch[0].length))}</span>
        </div>
      )
      return
    }
    
    // Regular text
    if (line.trim()) {
      result.push(
        <p key={`p-${lineIndex}`} className="my-1">
          {formatInline(line)}
        </p>
      )
    } else if (lineIndex > 0 && lineIndex < lines.length - 1) {
      // Empty line = paragraph break
      result.push(<div key={`br-${lineIndex}`} className="h-2" />)
    }
  })
  
  return result
}

// Format inline elements (bold, italic, code, links)
function formatInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0
  
  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="font-semibold text-white">
          {boldMatch[1]}
        </strong>
      )
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }
    
    // Italic *text* or _text_
    const italicMatch = remaining.match(/^[*_]([^*_]+)[*_]/)
    if (italicMatch) {
      parts.push(
        <em key={key++} className="italic text-slate-200">
          {italicMatch[1]}
        </em>
      )
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }
    
    // Inline code `code`
    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-400 font-mono text-[0.85em]"
        >
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }
    
    // Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
        >
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }
    
    // Find next special character
    const nextSpecial = remaining.search(/[*_`\[]/)
    if (nextSpecial === -1) {
      parts.push(<span key={key++}>{remaining}</span>)
      break
    } else if (nextSpecial === 0) {
      // Special char at start but didn't match pattern, treat as regular text
      parts.push(<span key={key++}>{remaining[0]}</span>)
      remaining = remaining.slice(1)
    } else {
      parts.push(<span key={key++}>{remaining.slice(0, nextSpecial)}</span>)
      remaining = remaining.slice(nextSpecial)
    }
  }
  
  return parts.length === 1 ? parts[0] : <>{parts}</>
}

// Parse markdown-like content into components
function MessageContent({ content }: { content: string }) {
  const parts = React.useMemo(() => {
    const result: Array<{ type: "text" | "code"; content: string; language?: string }> = []
    const codeBlockRegex = /```(\w*)\n?([\s\S]*?)```/g
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const text = content.slice(lastIndex, match.index)
        if (text.trim()) {
          result.push({ type: "text", content: text })
        }
      }
      // Add code block
      result.push({
        type: "code",
        language: match[1] || "",
        content: match[2].trim(),
      })
      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      const text = content.slice(lastIndex)
      if (text.trim()) {
        result.push({ type: "text", content: text })
      }
    }

    return result
  }, [content])

  if (parts.length === 0) {
    return <div className="text-slate-300 leading-relaxed">{formatText(content)}</div>
  }

  return (
    <div className="text-slate-300 leading-relaxed">
      {parts.map((part, index) => {
        if (part.type === "code") {
          return (
            <CodeBlock
              key={index}
              code={part.content}
              language={part.language || ""}
            />
          )
        }
        return <div key={index}>{formatText(part.content)}</div>
      })}
    </div>
  )
}

export function AskAI() {
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Focus input when dialog opens
  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  // Clear messages when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setMessages([])
      setInput("")
    }
  }

  // Handle keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "i" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let content = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          content += decoder.decode(value, { stream: true })
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id ? { ...m, content } : m
            )
          )
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: "Sorry, I encountered an error. Please try again." }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  // Handle Enter key (submit on Enter, new line on Shift+Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 hover:border-purple-500/40 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 px-2 sm:px-3"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="hidden sm:inline text-xs sm:text-sm">Ask AI</span>
          <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            <span className="text-xs">⌘</span>I
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[700px] h-[90vh] max-h-[700px] flex flex-col p-0 gap-0 bg-[#0a0a0a] border-white/10">
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-[#0a0a0a] shrink-0">
          <DialogTitle className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-semibold">Metigan AI</span>
              <p className="text-[10px] sm:text-xs font-normal text-slate-400">Your documentation assistant</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
          <div className="px-4 sm:px-6 py-4 space-y-4 sm:space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center py-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-purple-500/10">
                  <Sparkles className="h-7 w-7 sm:h-10 sm:w-10 text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg sm:text-xl mb-2 text-white">How can I help you?</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 sm:mb-8 px-4">
                  Ask me anything about Metigan - API endpoints, SDKs, code examples, and more.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-md px-2">
                  {[
                    { text: "How do I send an email?", icon: "📧" },
                    { text: "Show me a Python example", icon: "🐍" },
                    { text: "What are the rate limits?", icon: "⚡" },
                    { text: "How do I authenticate?", icon: "🔐" },
                  ].map((suggestion) => (
                    <button
                      key={suggestion.text}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all text-left group"
                    >
                      <span className="text-base sm:text-lg">{suggestion.icon}</span>
                      <span className="text-slate-300 group-hover:text-white transition-colors line-clamp-1">
                        {suggestion.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2 sm:gap-4",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-xl sm:rounded-2xl max-w-[85%] sm:max-w-[80%] text-xs sm:text-sm",
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 sm:px-4 py-2 sm:py-3"
                        : "bg-white/5 border border-white/10 px-3 sm:px-4 py-2 sm:py-3"
                    )}
                  >
                    {message.role === "assistant" && message.content === "" && isLoading ? (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        <span className="text-xs sm:text-sm">Thinking...</span>
                      </div>
                    ) : message.role === "user" ? (
                      <span className="whitespace-pre-wrap">{message.content}</span>
                    ) : (
                      <MessageContent content={message.content} />
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <form onSubmit={onSubmit} className="border-t border-white/10 p-3 sm:p-4 bg-[#0a0a0a] shrink-0">
          <div className="flex gap-2 sm:gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              rows={1}
              className="flex-1 resize-none rounded-lg sm:rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 min-h-[40px] sm:min-h-[48px] max-h-[100px] sm:max-h-[120px] placeholder:text-slate-500"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              ) : (
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500 mt-2 sm:mt-3 text-center">
            AI can make mistakes. Verify important information.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
