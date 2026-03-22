"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ArticleCard } from "@/components/support/article-card"
import api from "@/lib/api"
const catNames: Record<string, string> = { conta: "Conta", pagamentos: "Pagamentos", streaming: "Streaming", chat: "Chat", tecnico: "Técnico", criadores: "Criadores" }
export default function SuporteCategoriaPage() {
  const { slug } = useParams()
  const [articles, setArticles] = useState<any[]>([])
  useEffect(() => { api.get("/api/support/articles").then(r => setArticles((r.data || []).filter((a: any) => a.category === slug))).catch(() => {}) }, [slug])
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">{catNames[slug as string] || slug}</h1>
      <div className="space-y-3">{articles.length > 0 ? articles.map(a => <ArticleCard key={a.slug} {...a} />) : <p className="text-xs text-muted-foreground">Sem artigos nesta categoria.</p>}</div>
    </div>
  )
}
