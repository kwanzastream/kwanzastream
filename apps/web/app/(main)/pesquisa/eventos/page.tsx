"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Calendar } from "lucide-react"
import Link from "next/link"

const FILTERS = [{ id: "all", label: "Todos" },{ id: "future", label: "Próximos" },{ id: "past", label: "Passados" }]
const MOCK = [
  { id: "e1", name: "Angola Gaming Festival 2026", date: "25 Mar 2026", status: "Próximo" },
  { id: "e2", name: "Kuduro Night Stream", date: "20 Mar 2026", status: "Passado" },
]

export default function PesquisaEventosPage() {
  return (
    <SearchCategoryPage category="eventos" title="Eventos" filters={FILTERS}>
      {(q) => (
        <div className="space-y-2">
          {MOCK.map(e => (
            <Link key={e.id} href={`/feed/eventos`} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Calendar className="w-4 h-4 text-primary" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold truncate">{e.name}</p><p className="text-xs text-muted-foreground">{e.date} · {e.status}</p></div>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
