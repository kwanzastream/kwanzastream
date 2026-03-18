"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Video } from "lucide-react"
import Link from "next/link"

const FILTERS = [
  { id: "all", label: "Todos" },{ id: "short", label: "< 30min" },{ id: "medium", label: "30-120min" },{ id: "long", label: "> 2h" },{ id: "recent", label: "Recentes" },{ id: "views", label: "Mais vistos" },
]

const MOCK = [
  { id: "v1", title: "Melhores momentos — Girabola 2026", channel: "Desporto AO", views: 15600, duration: "12:34", date: "há 2 dias" },
  { id: "v2", title: "Tutorial: Stream com telemóvel", channel: "Tech AO", views: 8900, duration: "25:10", date: "há 1 semana" },
  { id: "v3", title: "Kuduro Session #45", channel: "Kuduro King", views: 4200, duration: "1:42:30", date: "há 3 dias" },
]

export default function PesquisaVideosPage() {
  return (
    <SearchCategoryPage category="videos" title="Vídeos" filters={FILTERS}>
      {(q) => (
        <div className="space-y-2">
          {MOCK.map(v => (
            <Link key={v.id} href={`/videos/${v.id}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0"><Video className="w-4 h-4 text-muted-foreground" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{v.title}</p><p className="text-xs text-muted-foreground">{v.channel} · {v.views.toLocaleString()} views · {v.duration}</p></div>
              <span className="text-[10px] text-muted-foreground shrink-0">{v.date}</span>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
