"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ArticleRating } from "@/components/support/article-rating"
import api from "@/lib/api"
import Link from "next/link"
export default function SuporteArtigoPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState<any>(null)
  useEffect(() => { api.get(`/api/support/articles/${slug}`).then(r => setArticle(r.data)).catch(() => setArticle({ slug, title: "Artigo", category: "geral", content: "Conteúdo do artigo em breve." })) }, [slug])
  if (!article) return <div className="max-w-3xl mx-auto px-4 py-8"><p className="text-xs text-muted-foreground">A carregar...</p></div>
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href="/suporte" className="text-[10px] text-muted-foreground hover:text-foreground">← Suporte</Link>
      <span className="text-[9px] text-primary uppercase tracking-wider">{article.category}</span>
      <h1 className="text-xl font-bold">{article.title}</h1>
      <div className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{article.content}</div>
      <ArticleRating slug={slug as string} />
      <div className="border-t border-white/5 pt-4"><p className="text-[10px] text-muted-foreground">Não resolveu? <Link href="/suporte/ticket/criar" className="text-primary hover:underline">Cria um ticket</Link></p></div>
    </div>
  )
}
