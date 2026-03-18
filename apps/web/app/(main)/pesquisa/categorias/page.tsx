"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Radio } from "lucide-react"
import Link from "next/link"

const MOCK = [
  { id: "cat1", name: "Gaming", icon: "🎮", liveCount: 12, channels: 245 },
  { id: "cat2", name: "Música", icon: "🎵", liveCount: 5, channels: 89 },
  { id: "cat3", name: "IRL", icon: "📹", liveCount: 3, channels: 56 },
]

export default function PesquisaCategoriasPage() {
  return (
    <SearchCategoryPage category="categorias" title="Categorias">
      {(q) => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MOCK.map(c => (
            <Link key={c.id} href={`/categorias/${c.id}`} className="rounded-xl border border-white/10 hover:border-primary/30 p-4 text-center transition-all">
              <p className="text-3xl mb-2">{c.icon}</p>
              <p className="text-sm font-bold">{c.name}</p>
              {c.liveCount > 0 && <div className="flex items-center justify-center gap-1 mt-1"><Radio className="w-2.5 h-2.5 text-[#CE1126]" /><span className="text-[10px] text-muted-foreground">{c.liveCount} ao vivo</span></div>}
              <p className="text-[10px] text-muted-foreground mt-0.5">{c.channels} canais</p>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
