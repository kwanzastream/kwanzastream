"use client"
import Link from "next/link"
interface ArticleCardProps { slug: string; title: string; category: string; excerpt: string }
export function ArticleCard({ slug, title, category, excerpt }: ArticleCardProps) {
  return (
    <Link href={`/suporte/artigo/${slug}`} className="block p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
      <span className="text-[9px] text-primary uppercase tracking-wider">{category}</span>
      <h3 className="text-sm font-semibold mt-1">{title}</h3>
      <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{excerpt}</p>
    </Link>
  )
}
