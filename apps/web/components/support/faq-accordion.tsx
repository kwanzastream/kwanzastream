"use client"
import { useState } from "react"
interface FaqItem { question: string; answer: string }
interface FaqAccordionProps { items: FaqItem[] }
export function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2">{items.map((item, i) => (
      <div key={i} className="rounded-xl border border-white/10 overflow-hidden">
        <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-4 py-3 flex items-center justify-between text-left">
          <span className="text-xs font-semibold">{item.question}</span>
          <span className="text-muted-foreground text-sm">{open === i ? "−" : "+"}</span>
        </button>
        {open === i && <div className="px-4 pb-3 text-xs text-muted-foreground leading-relaxed border-t border-white/5 pt-2">{item.answer}</div>}
      </div>
    ))}</div>
  )
}
