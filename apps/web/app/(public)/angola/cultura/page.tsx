"use client"
import { CultureCategoryCard } from "@/components/angola/culture-category-card"
export default function CulturaPage() {
  const cats = [
    { slug: "kuduro", name: "Kuduro", emoji: "🎵", desc: "O ritmo de Luanda para o mundo", streams: 12 },
    { slug: "semba", name: "Semba", emoji: "🎶", desc: "A raiz da música angolana", streams: 8 },
    { slug: "kizomba", name: "Kizomba", emoji: "💃", desc: "Dança e romance angolano", streams: 6 },
    { slug: "afrohouse", name: "Afrohouse", emoji: "🎧", desc: "Beats electrónicos de Angola", streams: 15 },
    { slug: "futebol", name: "Futebol", emoji: "⚽", desc: "Girabola e seleção nacional", streams: 23 },
    { slug: "comedia", name: "Comédia", emoji: "😂", desc: "Humor angolano sem filtro", streams: 9 },
  ]
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-2xl font-bold">🇦🇴 Cultura Angolana</h1>
    <p className="text-sm text-muted-foreground">O melhor da cultura angolana no Kwanza Stream</p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">{cats.map(c => <CultureCategoryCard key={c.slug} {...c} />)}</div>
  </div>)
}
