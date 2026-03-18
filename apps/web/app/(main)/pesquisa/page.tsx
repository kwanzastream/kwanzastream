"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SearchBar } from "@/components/search/search-bar"
import { SearchHistoryItem } from "@/components/search/search-history-item"
import { TrendingUp, Clock, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"

const TRENDING = ["kuduro ao vivo", "gaming angola", "valorant ranked", "música angolana", "fifa", "culinária luanda"]

function SearchHub() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get("q")

  // Redirect if ?q= present
  useEffect(() => {
    if (q) router.replace(`/pesquisa/tudo?q=${encodeURIComponent(q)}`)
  }, [q, router])

  const [history, setHistory] = useState([
    { query: "angolangamer", date: "há 2h" },
    { query: "kuduro streams", date: "há 5h" },
    { query: "valorant angola", date: "ontem" },
  ])

  if (q) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-6">
      <SearchBar />

      {/* Search history */}
      {history.length > 0 && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold flex items-center gap-2"><Clock className="w-4 h-4" />Pesquisas recentes</h2>
            <button className="text-xs text-muted-foreground hover:text-destructive" onClick={() => setHistory([])}>Limpar</button>
          </div>
          {history.map((h, i) => (
            <SearchHistoryItem key={i} query={h.query} date={h.date}
              onRepeat={() => router.push(`/pesquisa/tudo?q=${encodeURIComponent(h.query)}`)}
              onRemove={() => setHistory(prev => prev.filter((_, j) => j !== i))} />
          ))}
        </section>
      )}

      {/* Trending searches */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold flex items-center gap-2"><TrendingUp className="w-4 h-4" />Em tendência</h2>
        <div className="flex flex-wrap gap-2">
          {TRENDING.map(t => (
            <Link key={t} href={`/pesquisa/tudo?q=${encodeURIComponent(t)}`} className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-muted-foreground hover:border-primary/30 hover:text-primary transition-all">{t}</Link>
          ))}
        </div>
      </section>

      <Link href="/pesquisa/avancada" className="flex items-center gap-2 text-xs text-primary hover:underline"><Sparkles className="w-3 h-3" />Pesquisa avançada</Link>
    </div>
  )
}

export default function PesquisaPage() { return <Suspense><SearchHub /></Suspense> }
