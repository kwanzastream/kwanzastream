"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Badge } from "@/components/ui/badge"
import { Radio } from "lucide-react"
import Link from "next/link"

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "live", label: "Ao vivo agora" },
  { id: "recent", label: "Recentes (24h)" },
  { id: "week", label: "Esta semana" },
]

const MOCK = [
  { id: "s1", title: "Kuduro & Gaming 🇦🇴", username: "angolangamer", category: "Gaming", isLive: true, viewerCount: 234 },
  { id: "s2", title: "Valorant Angola Ranked", username: "luanda_fps", category: "Valorant", isLive: true, viewerCount: 89 },
  { id: "s3", title: "Semba Session — Ao Vivo", username: "kuduroking", category: "Música", isLive: false, viewerCount: 0 },
]

export default function PesquisaStreamsPage() {
  return (
    <SearchCategoryPage category="streams" title="Streams" filters={FILTERS}>
      {(q, filter) => {
        const results = MOCK.filter(s => filter === "live" ? s.isLive : true)
        return results.length === 0 ? <p className="text-sm text-muted-foreground text-center py-8">Sem streams para &quot;{q}&quot;</p> : (
          <div className="space-y-2">
            {results.map(s => (
              <Link key={s.id} href={`/stream/${s.username}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#CE1126]/10 flex items-center justify-center shrink-0"><Radio className="w-4 h-4 text-[#CE1126]" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{s.title}</p><p className="text-xs text-muted-foreground">{s.username} · {s.category}</p></div>
                {s.isLive && <div className="flex items-center gap-1.5 shrink-0"><Badge className="bg-[#CE1126] text-white text-[8px]">LIVE</Badge><span className="text-xs text-muted-foreground">{s.viewerCount}</span></div>}
              </Link>
            ))}
          </div>
        )
      }}
    </SearchCategoryPage>
  )
}
