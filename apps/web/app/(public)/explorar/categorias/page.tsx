"use client"

import { CategoryCard } from "@/components/public/content-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const ANGOLA_FIRST_CATEGORIES = [
  { slug: "gaming", name: "Gaming Angola", emoji: "🎮", liveCount: 12, weeklyViews: 45000 },
  { slug: "musica", name: "Música ao Vivo", emoji: "🎵", liveCount: 8, weeklyViews: 38000 },
  { slug: "futebol", name: "Futebol Angola (Girabola)", emoji: "⚽", liveCount: 5, weeklyViews: 62000 },
  { slug: "just-talking", name: "Just Talking PT-AO", emoji: "🎤", liveCount: 15, weeklyViews: 28000 },
  { slug: "irl", name: "IRL Angola", emoji: "📍", liveCount: 4, weeklyViews: 12000 },
  { slug: "radio", name: "Modo Rádio", emoji: "📻", liveCount: 6, weeklyViews: 22000 },
  { slug: "negocios", name: "Negócios & Empreendedorismo", emoji: "💼", liveCount: 3, weeklyViews: 8000 },
  { slug: "criatividade", name: "Criatividade & Arte", emoji: "🎨", liveCount: 2, weeklyViews: 6000 },
]

const GLOBAL_CATEGORIES = [
  { slug: "fps", name: "FPS / Shooters", emoji: "🔫", liveCount: 3, weeklyViews: 15000 },
  { slug: "moba", name: "MOBA", emoji: "⚔️", liveCount: 2, weeklyViews: 8000 },
  { slug: "battle-royale", name: "Battle Royale", emoji: "🪖", liveCount: 4, weeklyViews: 20000 },
  { slug: "sports", name: "Sports Games", emoji: "🏅", liveCount: 2, weeklyViews: 10000 },
  { slug: "comedia", name: "Comédia", emoji: "😂", liveCount: 3, weeklyViews: 14000 },
  { slug: "tech", name: "Tech & Dev", emoji: "💻", liveCount: 1, weeklyViews: 5000 },
  { slug: "educacao", name: "Educação", emoji: "📚", liveCount: 1, weeklyViews: 3000 },
  { slug: "culinaria", name: "Culinária", emoji: "🍳", liveCount: 1, weeklyViews: 4000 },
  { slug: "moda", name: "Moda & Beleza", emoji: "👗", liveCount: 0, weeklyViews: 2000 },
  { slug: "fitness", name: "Fitness", emoji: "💪", liveCount: 0, weeklyViews: 1500 },
  { slug: "travel", name: "Viagens", emoji: "✈️", liveCount: 0, weeklyViews: 1000 },
  { slug: "asmr", name: "ASMR", emoji: "🎧", liveCount: 0, weeklyViews: 500 },
]

export default function ExplorarCategoriasPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Categorias</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Todas as Categorias</h1>
        <p className="text-sm text-muted-foreground">Explora conteúdo por categoria — Angola-First no topo</p>
      </div>

      {/* Angola-First Section */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold">Angola-First 🇦🇴</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#CE1126]/30 via-[#000]/10 to-[#F9D616]/30" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {ANGOLA_FIRST_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} slug={cat.slug} name={cat.name} emoji={cat.emoji} liveCount={cat.liveCount} weeklyViews={cat.weeklyViews} angolaFirst />
          ))}
        </div>
      </section>

      {/* Global Categories */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold">Categorias Globais</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GLOBAL_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} slug={cat.slug} name={cat.name} emoji={cat.emoji} liveCount={cat.liveCount} weeklyViews={cat.weeklyViews} />
          ))}
        </div>
      </section>
    </div>
  )
}
