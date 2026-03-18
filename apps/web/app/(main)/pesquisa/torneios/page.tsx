"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Swords } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const FILTERS = [{ id: "all", label: "Todos" },{ id: "active", label: "Activos" },{ id: "past", label: "Passados" }]
const MOCK = [
  { id: "t1", name: "Angola Cup FIFA 2026", game: "FIFA", status: "Activo", participants: 64 },
  { id: "t2", name: "CS2 Angola Open", game: "CS2", status: "Inscrições abertas", participants: 32 },
]

export default function PesquisaTorneiosPage() {
  return (
    <SearchCategoryPage category="torneios" title="Torneios" filters={FILTERS}>
      {(q) => (
        <div className="space-y-2">
          {MOCK.map(t => (
            <Link key={t.id} href={`/feed/eventos`} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"><Swords className="w-4 h-4 text-amber-400" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{t.name}</p><p className="text-xs text-muted-foreground">{t.game} · {t.participants} participantes</p></div>
              <Badge variant="outline" className="text-[9px] shrink-0">{t.status}</Badge>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
