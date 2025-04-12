"use client"

import { useEffect, useRef, useState } from "react"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import javascript from "highlight.js/lib/languages/javascript"
import bash from "highlight.js/lib/languages/bash"
import json from "highlight.js/lib/languages/json"
import xml from "highlight.js/lib/languages/xml" // Para HTML
import css from "highlight.js/lib/languages/css"
// Importando um tema mais vibrante e expressivo
import "highlight.js/styles/atom-one-light.css" // Tema claro com cores mais vibrantes
import { Copy, Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Registrar todas as linguagens necessárias
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("bash", bash)
hljs.registerLanguage("json", json)
hljs.registerLanguage("html", xml)
hljs.registerLanguage("css", css)

// Configuração adicional para melhorar o highlighting
hljs.configure({
  ignoreUnescapedHTML: true,
  throwUnescapedHTML: false,
  languages: ["typescript", "javascript", "bash", "json", "html", "css"],
})

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

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("Código copiado para a área de transferência!")

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      toast.error("Falha ao copiar o código")
      console.error("Falha ao copiar: ", err)
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

  // Adicionar estilos personalizados para melhorar o highlighting
  const customStyles = `
    .hljs-keyword { color: #0033B3; font-weight: bold; }
    .hljs-string { color: #067D17; }
    .hljs-title { color: #795E26; font-weight: bold; }
    .hljs-built_in { color: #0033B3; }
    .hljs-comment { color: #8C8C8C; font-style: italic; }
    .hljs-variable { color: #871094; }
    .hljs-params { color: #1750EB; }
    .hljs-function { color: #5C2699; }
    .hljs-attr { color: #174AD4; }
    .hljs-literal { color: #0033B3; font-weight: bold; }
    .hljs-number { color: #1750EB; }
    .hljs-operator { color: #5C2699; }
    .hljs-punctuation { color: #000000; }
    .hljs-property { color: #871094; }
    .hljs-tag { color: #0033B3; }
    .hljs-regexp { color: #067D17; }
    .hljs-symbol { color: #0033B3; }
    .hljs-meta { color: #808080; }
    .hljs-deletion { color: #A31515; background-color: #FFDDDD; }
    .hljs-addition { color: #067D17; background-color: #DDFFDD; }
  `

  return (
    <div className={cn("overflow-hidden rounded-lg border shadow-sm bg-white my-4", className)}>
      {/* Estilos personalizados para melhorar o highlighting */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Cabeçalho do bloco de código */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#f6f8fa] border-b border-[#e1e4e8]">
        <div className="flex items-center space-x-2">
          {fileName && (
            <span className="text-xs font-medium text-gray-600 mr-2 flex items-center">
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
          <span className="text-xs font-medium text-gray-600 px-2 py-1 rounded-md bg-[#e1e4e8]">{displayLanguage}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md hover:bg-[#e1e4e8] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 group"
          aria-label="Copiar código"
        >
          {copied ? (
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-500" />
              <span className="ml-1.5 text-xs text-green-500">Copiado!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Copy className="h-4 w-4 text-gray-600 group-hover:text-gray-800" />
              <span className="ml-1.5 text-xs text-gray-600 group-hover:text-gray-800">Copiar</span>
            </div>
          )}
        </button>
      </div>

      {/* Conteúdo do código com numeração de linha opcional */}
      <div className="relative overflow-auto">
        {showLineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 flex flex-col py-4 pr-3 pl-4 text-right bg-[#f6f8fa] border-r border-[#e1e4e8] select-none">
            {codeLines.map((_, i) => (
              <div key={i} className="text-xs text-gray-400 leading-5 select-none">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <pre className={cn("overflow-x-auto p-4 text-sm", showLineNumbers && "pl-[3.5rem]")}>
          <code ref={codeRef} className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
