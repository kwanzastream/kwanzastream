"use client"

import { Lightbulb } from "lucide-react"

interface CampChapterContentProps {
  title: string
  content: string
  angolaTip?: string
}

export function CampChapterContent({ title, content, angolaTip }: CampChapterContentProps) {
  return (
    <div className="space-y-4">
      <article className="prose prose-invert prose-sm max-w-none">
        <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">{content}</div>
      </article>

      {angolaTip && (
        <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-yellow-400 mb-1">💡 Dica Angola</p>
            <p className="text-xs text-muted-foreground">{angolaTip}</p>
          </div>
        </div>
      )}
    </div>
  )
}
