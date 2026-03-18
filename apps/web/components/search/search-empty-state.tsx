"use client"

import { SearchX } from "lucide-react"
import Link from "next/link"

interface SearchEmptyStateProps { query: string; suggestions?: string[] }

export function SearchEmptyState({ query, suggestions = ["gaming angola", "kuduro", "valorant"] }: SearchEmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <SearchX className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
      <h3 className="font-bold text-lg mb-1">Sem resultados para &quot;{query}&quot;</h3>
      <p className="text-sm text-muted-foreground mb-4">Tenta com outros termos ou verifica a ortografia</p>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="text-xs text-muted-foreground">Sugestões:</span>
          {suggestions.map(s => (
            <Link key={s} href={`/pesquisa/tudo?q=${encodeURIComponent(s)}`} className="px-3 py-1 rounded-full text-xs border border-primary/30 text-primary hover:bg-primary/10">{s}</Link>
          ))}
        </div>
      )}
    </div>
  )
}
