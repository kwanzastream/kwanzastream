"use client"
import { useParams } from "next/navigation"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { useState } from "react"
import { SearchFilters } from "@/components/search/search-filters"
import { ArrowLeft, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const DURATION_FILTERS = [{ id: "all", label: "Todas" }, { id: "short", label: "< 30min" }, { id: "medium", label: "30-120min" }, { id: "long", label: "> 2h" }]
const SORT_FILTERS = [{ id: "popular", label: "Populares" }, { id: "recent", label: "Recentes" }]

const MOCK: VodData[] = [
  { id: "v1", title: "Kuduro Session #45", duration: 18000, viewCount: 4200, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "v5", title: "Girabola Live", duration: 3600, viewCount: 12000, createdAt: new Date(Date.now() - 432000000).toISOString(), category: "Desporto", creator: { username: "desporto_ao", displayName: "Desporto AO" } },
]

export default function VideoCategoriaPage() {
  const { slug } = useParams()
  const [durFilter, setDurFilter] = useState("all")
  const [sort, setSort] = useState("popular")

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/videos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Hash className="w-5 h-5" />{typeof slug === "string" ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Categoria"}</h1></div>
      <div className="flex flex-wrap gap-4">
        <SearchFilters filters={DURATION_FILTERS} active={durFilter} onChange={setDurFilter} />
        <SearchFilters filters={SORT_FILTERS} active={sort} onChange={setSort} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{MOCK.map(v => <VodCard key={v.id} vod={v} />)}</div>
    </div>
  )
}
