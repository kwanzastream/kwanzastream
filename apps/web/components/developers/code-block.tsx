"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps { code: string; language?: string; title?: string }

export function CodeBlock({ code, language = "bash", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden my-3">
      {title && <div className="px-3 py-1.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{title}</span>
        <span className="text-[9px] text-muted-foreground uppercase">{language}</span>
      </div>}
      <div className="relative">
        <pre className="p-3 text-[11px] leading-relaxed overflow-x-auto bg-black/30"><code>{code}</code></pre>
        <button onClick={copy} className="absolute top-2 right-2 p-1 rounded bg-white/5 hover:bg-white/10 transition-all">
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
        </button>
      </div>
    </div>
  )
}
