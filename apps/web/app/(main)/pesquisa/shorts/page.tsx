"use client"
import { SearchCategoryPage } from "../search-category-page"
import { Smartphone } from "lucide-react"
import Link from "next/link"

const MOCK = [
  { id: "sh1", title: "Kuduro dance challenge", channel: "kuduroking", views: 89000 },
  { id: "sh2", title: "Angola street food tour", channel: "luanda_life", views: 45000 },
  { id: "sh3", title: "Gaming setup em Luanda", channel: "tech_ao", views: 12000 },
]

export default function PesquisaShortsPage() {
  return (
    <SearchCategoryPage category="shorts" title="Shorts">
      {(q) => (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {MOCK.map(s => (
            <Link key={s.id} href={`/shorts/${s.id}`} className="aspect-[9/16] rounded-xl border border-white/10 hover:border-primary/30 bg-muted flex flex-col items-center justify-center p-3 text-center transition-all">
              <Smartphone className="w-6 h-6 text-muted-foreground mb-2" />
              <p className="text-xs font-bold truncate w-full">{s.title}</p>
              <p className="text-[10px] text-muted-foreground">{(s.views / 1000).toFixed(0)}k views</p>
            </Link>
          ))}
        </div>
      )}
    </SearchCategoryPage>
  )
}
