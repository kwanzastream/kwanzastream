"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Users } from "lucide-react"
import Link from "next/link"

const MOCK = [
  { id: "t1", name: "Gamers de Angola", icon: "🎮", members: 2400, description: "Comunidade de gamers angolanos" },
  { id: "t2", name: "Kuduro Nation", icon: "🇦🇴", members: 5600, description: "Tudo sobre kuduro e música angolana" },
]

export default function PesquisaTribosPage() {
  return (
    <SearchCategoryPage category="tribos" title="Tribos">
      {(q) => (
        <div className="space-y-2">
          {MOCK.map(t => (
            <Link key={t.id} href={`/tribos/${t.id}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">{t.icon}</div>
              <div className="flex-1 min-w-0"><p className="text-sm font-bold">{t.name}</p><p className="text-xs text-muted-foreground truncate">{t.description}</p><div className="flex items-center gap-1 mt-0.5"><Users className="w-2.5 h-2.5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">{(t.members / 1000).toFixed(1)}k membros</span></div></div>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
