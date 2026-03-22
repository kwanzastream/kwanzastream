"use client"
import { useState, useEffect, Suspense } from "react"
import { ArticleCard } from "@/components/support/article-card"
import api from "@/lib/api"
import { useSearchParams } from "next/navigation"

function SearchContent() {
  const params = useSearchParams()
  const q = params.get("q") || ""
  const [query, setQuery] = useState(q)
  const [results, setResults] = useState<any[]>([])
  useEffect(() => { api.get("/api/support/articles").then(r => { const arts = r.data || []; setResults(query ? arts.filter((a: any) => a.title.toLowerCase().includes(query.toLowerCase())) : arts) }).catch(() => {}) }, [query])
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar artigos..." className="w-full px-4 py-3 rounded-xl border border-white/10 bg-transparent text-sm" autoFocus />
      <div className="space-y-3">{results.length > 0 ? results.map(a => <ArticleCard key={a.slug} {...a} />) : <p className="text-xs text-muted-foreground text-center py-6">Sem resultados. Tenta outros termos ou <a href="/suporte/ticket/criar" className="text-primary hover:underline">cria um ticket</a>.</p>}</div>
    </>
  )
}

export default function SuporteBuscarPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">🔍 Pesquisar Artigos de Ajuda</h1>
      <Suspense fallback={<p className="text-xs text-muted-foreground">A carregar...</p>}>
        <SearchContent />
      </Suspense>
    </div>
  )
}

