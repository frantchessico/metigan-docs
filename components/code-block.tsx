"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// Importar CSS do highlight.js
import "highlight.js/styles/atom-one-light.css"

interface CodeBlockProps {
  code: string
  language: string
  className?: string
  showLineNumbers?: boolean
  fileName?: string
}

export function CodeBlock({ code, language, className, showLineNumbers = true, fileName }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Garantir que só renderize diferenças após mount para evitar hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Carregar e aplicar highlighting apenas no cliente
    if (typeof window === "undefined" || !mounted) return

    const highlightCode = async () => {
      try {
        // Importar dinamicamente apenas no cliente
        const hljs = (await import("highlight.js")).default
        
        // Carregar linguagens dinamicamente (com cache para não recarregar)
        if (!isHighlighted) {
          const languages = await Promise.all([
            import("highlight.js/lib/languages/typescript"),
            import("highlight.js/lib/languages/javascript"),
            import("highlight.js/lib/languages/bash"),
            import("highlight.js/lib/languages/json"),
            import("highlight.js/lib/languages/xml"),
            import("highlight.js/lib/languages/css"),
            import("highlight.js/lib/languages/python"),
            import("highlight.js/lib/languages/php"),
            import("highlight.js/lib/languages/java"),
            import("highlight.js/lib/languages/go"),
          ])

          // Registrar linguagens apenas uma vez
          hljs.registerLanguage("typescript", languages[0].default)
          hljs.registerLanguage("javascript", languages[1].default)
          hljs.registerLanguage("bash", languages[2].default)
          hljs.registerLanguage("json", languages[3].default)
          hljs.registerLanguage("html", languages[4].default)
          hljs.registerLanguage("css", languages[5].default)
          hljs.registerLanguage("python", languages[6].default)
          hljs.registerLanguage("php", languages[7].default)
          hljs.registerLanguage("java", languages[8].default)
          hljs.registerLanguage("go", languages[9].default)
          
          setIsHighlighted(true)
        }

        // Sempre reaplicar highlighting quando code ou language mudarem
        if (codeRef.current) {
          // Remover highlight anterior antes de reaplicar
          delete codeRef.current.dataset.highlighted
          // Limpar classes de highlight anteriores
          codeRef.current.textContent = code
          hljs.highlightElement(codeRef.current)
        }
      } catch (error) {
        console.error("Error loading highlight.js:", error)
      }
    }

    highlightCode()
  }, [code, language, isHighlighted, mounted])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("Code copied to clipboard!")

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      toast.error("Failed to copy code")
      console.error("Failed to copy: ", err)
    }
  }

  // Dividir o código em linhas para numeração
  const codeLines = code.split("\n")

  // Determinar o rótulo da linguagem para exibição
  const languageLabels: Record<string, string> = {
    typescript: "TypeScript",
    javascript: "JavaScript",
    bash: "Terminal",
    json: "JSON",
    html: "HTML",
    css: "CSS",
  }

  const displayLanguage = languageLabels[language] || language.charAt(0).toUpperCase() + language.slice(1)

  // Estilos personalizados para o tema escuro - estilo Resend
  const darkCustomStyles = `
    .dark .hljs {
      background: transparent !important;
      color: #e6edf3 !important;
    }
    .dark .hljs-keyword,
    .dark .hljs-selector-tag,
    .dark .hljs-built_in {
      color: #ff7b72;
      font-weight: 500;
    }
    .dark .hljs-string,
    .dark .hljs-template-string {
      color: #a5d6ff;
    }
    .dark .hljs-title.function_,
    .dark .hljs-function {
      color: #d2a8ff;
      font-weight: 500;
    }
    .dark .hljs-attr,
    .dark .hljs-name,
    .dark .hljs-tag {
      color: #79c0ff;
    }
    .dark .hljs-selector-class,
    .dark .hljs-selector-id {
      color: #ffa657;
    }
    .dark .hljs-comment,
    .dark .hljs-quote {
      color: #8b949e;
      font-style: italic;
    }
    .dark .hljs-variable,
    .dark .hljs-template-variable {
      color: #ffa657;
    }
    .dark .hljs-literal,
    .dark .hljs-number {
      color: #79c0ff;
    }
    .dark .hljs-title,
    .dark .hljs-class .hljs-title {
      color: #79c0ff;
      font-weight: 500;
    }
    .dark .hljs-section,
    .dark .hljs-property {
      color: #79c0ff;
    }
    .dark .hljs-punctuation {
      color: #e6edf3;
    }
    .dark .hljs-operator {
      color: #ff7b72;
    }
    .dark .hljs-regexp {
      color: #a5d6ff;
    }
    .dark .hljs-meta {
      color: #8b949e;
    }
    .dark .hljs-deletion {
      background-color: rgba(248,81,73,.16);
      color: #f85149;
    }
    .dark .hljs-addition {
      background-color: rgba(63,185,80,.16);
      color: #3fb950;
    }
  `

  // Estilos personalizados para o tema claro - estilo moderno
  const lightCustomStyles = `
    .hljs {
      background: transparent !important;
      color: #24292f !important;
    }
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-built_in {
      color: #cf222e;
      font-weight: 600;
    }
    .hljs-string,
    .hljs-template-string {
      color: #0a3069;
    }
    .hljs-title.function_,
    .hljs-function {
      color: #8250df;
      font-weight: 600;
    }
    .hljs-attr,
    .hljs-name,
    .hljs-tag {
      color: #1168e3;
    }
    .hljs-selector-class,
    .hljs-selector-id {
      color: #953800;
    }
    .hljs-comment,
    .hljs-quote {
      color: #656d76;
      font-style: italic;
    }
    .hljs-variable,
    .hljs-template-variable {
      color: #953800;
    }
    .hljs-literal,
    .hljs-number {
      color: #0550ae;
      font-weight: 500;
    }
    .hljs-title,
    .hljs-class .hljs-title {
      color: #8250df;
      font-weight: 600;
    }
    .hljs-section,
    .hljs-property {
      color: #1168e3;
    }
    .hljs-punctuation {
      color: #24292f;
    }
    .hljs-operator {
      color: #cf222e;
    }
    .hljs-regexp {
      color: #1168e3;
    }
    .hljs-meta {
      color: #656d76;
    }
    .hljs-deletion {
      background-color: #ffebe9;
      color: #82071e;
    }
    .hljs-addition {
      background-color: #dafbe1;
      color: #1a7f37;
    }
  `

  return (
    <div className={cn("overflow-hidden rounded-lg border shadow-sm my-4", className, mounted && isDark && "dark:border-gray-700")}>
      {/* Estilos personalizados */}
      <style dangerouslySetInnerHTML={{ __html: mounted && isDark ? darkCustomStyles : lightCustomStyles }} />

      {/* Cabeçalho do bloco de código */}
      <div className="flex items-center justify-between px-4 py-2 bg-transparent border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {fileName && (
            <span className="text-xs font-medium text-gray-400 mr-2 flex items-center">
              <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 2V9H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {fileName}
            </span>
          )}
          <span className="text-xs font-medium text-gray-400 px-2 py-1 rounded-md bg-gray-700">
            {displayLanguage}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 group"
          aria-label="Copy code"
        >
          {copied ? (
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500" />
              <span className="ml-1.5 text-xs text-green-500">Copied!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Copy className="h-4 w-4 text-gray-400 group-hover:text-gray-300" />
              <span className="ml-1.5 text-xs text-gray-400 group-hover:text-gray-300">
                Copy
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Conteúdo do código com numeração de linha opcional */}
      <div className="relative overflow-auto">
        {showLineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 flex flex-col py-4 pr-3 pl-4 text-right bg-transparent border-r border-gray-700 select-none z-10">
            {codeLines.map((_, i) => (
              <div key={i} className="text-xs text-gray-500 leading-5 select-none">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <pre
          className={cn(
            "overflow-x-auto p-4 text-sm bg-transparent",
            showLineNumbers && "pl-[3.5rem]"
          )}
        >
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
