"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { SearchFilters } from "@/components/search/search-filters"
import Link from "next/link"

const SORT = [{ id: "views", label: "Mais vistos" }, { id: "recent", label: "Mais recentes" }]
const MOCK = [{ id: "c1", title: "Dança insana no palco! 🔥", creator: "danca_ao", views: 45000, duration: "0:28" }, { id: "c2", title: "Novo beat — produção ao vivo", creator: "beats_angola", views: 12000, duration: "0:15" }]

export default function TriboClipsPage() {
  const { slug } = useParams()
  const [sort, setSort] = useState("views")
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      <SearchFilters filters={SORT} active={sort} onChange={setSort} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{MOCK.map(c => <Link key={c.id} href={`/clips/${c.id}`} className="rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all"><div className="relative aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10"><span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1 rounded">{c.duration}</span></div><div className="p-2"><p className="text-[10px] font-bold truncate">{c.title}</p><p className="text-[9px] text-muted-foreground">@{c.creator} · {(c.views/1000).toFixed(0)}K</p></div></Link>)}</div>
    </div>
  )
}
