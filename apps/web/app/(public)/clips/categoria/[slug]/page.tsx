"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { SearchFilters } from "@/components/search/search-filters"
import { ArrowLeft, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const DUR_FILTERS = [{ id: "all", label: "Todas" }, { id: "short", label: "< 30s" }, { id: "long", label: "30–90s" }]
const PERIOD_FILTERS = [{ id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }, { id: "all", label: "De sempre" }]

const MOCK: ClipData[] = [
  { id: "c1", title: "Clutch 1v4 incrível!", duration: 28, viewCount: 45000, shares: 1200, createdAt: new Date(Date.now() - 3600000).toISOString(), creator: { username: "angolangamer", displayName: "Angola Gamer" } },
]

export default function ClipsCategoriaPage() {
  const { slug } = useParams()
  const [dur, setDur] = useState("all")
  const [period, setPeriod] = useState("week")

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/clips"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Hash className="w-5 h-5" />{typeof slug === "string" ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Categoria"}</h1></div>
      <div className="flex flex-wrap gap-4">
        <SearchFilters filters={DUR_FILTERS} active={dur} onChange={setDur} />
        <SearchFilters filters={PERIOD_FILTERS} active={period} onChange={setPeriod} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{MOCK.map(c => <ClipCard key={c.id} clip={c} />)}</div>
    </div>
  )
}
