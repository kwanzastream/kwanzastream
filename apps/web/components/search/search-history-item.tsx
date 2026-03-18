"use client"

import { Clock, X, Search } from "lucide-react"

interface SearchHistoryItemProps {
  query: string
  date: string
  onRepeat: () => void
  onRemove: () => void
}

export function SearchHistoryItem({ query, date, onRepeat, onRemove }: SearchHistoryItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors group">
      <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
      <button onClick={onRepeat} className="flex-1 text-left min-w-0">
        <p className="text-sm truncate">{query}</p>
        <p className="text-[10px] text-muted-foreground">{date}</p>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onRemove() }} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
      </button>
      <button onClick={onRepeat} className="shrink-0"><Search className="w-3.5 h-3.5 text-muted-foreground" /></button>
    </div>
  )
}
