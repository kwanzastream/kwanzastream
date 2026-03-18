"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Scissors, Share2 } from "lucide-react"
import Link from "next/link"

const FILTERS = [{ id: "all", label: "Todos" },{ id: "short", label: "< 30s" },{ id: "medium", label: "30-90s" },{ id: "today", label: "Hoje" },{ id: "week", label: "Esta semana" },{ id: "views", label: "Mais vistos" }]
const MOCK = [
  { id: "cl1", title: "Clutch 1v5 incrível", channel: "Angola Gamer", views: 45000, duration: "0:28" },
  { id: "cl2", title: "Fail épico ao vivo", channel: "Luanda FPS", views: 23000, duration: "0:45" },
]

export default function PesquisaClipsPage() {
  return (
    <SearchCategoryPage category="clips" title="Clips" filters={FILTERS}>
      {(q) => (
        <div className="space-y-2">
          {MOCK.map(c => (
            <Link key={c.id} href={`/clips/${c.id}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"><Scissors className="w-4 h-4 text-amber-400" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{c.title}</p><p className="text-xs text-muted-foreground">{c.channel} · {(c.views / 1000).toFixed(1)}k views · {c.duration}</p></div>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
