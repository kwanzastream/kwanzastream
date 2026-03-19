"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { SearchFilters } from "@/components/search/search-filters"
import { ArrowLeft, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const SORT_FILTERS = [{ id: "views", label: "Mais vistos" }, { id: "recent", label: "Mais recentes" }, { id: "shares", label: "Mais partilhados" }]

const MOCK: ClipData[] = [
  { id: "ec1", title: "Golo incrível na final! 🔥", duration: 15, viewCount: 89000, shares: 4500, createdAt: new Date(Date.now() - 3600000).toISOString(), creator: { username: "esports_ao", displayName: "eSports AO" } },
  { id: "ec2", title: "Clutch impossível — round 14", duration: 28, viewCount: 45000, shares: 2100, createdAt: new Date(Date.now() - 7200000).toISOString(), creator: { username: "gamer_luanda", displayName: "Gamer Luanda" } },
]

export default function EventClipsPage() {
  const { id } = useParams()
  const [sort, setSort] = useState("views")
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/eventos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Scissors className="w-5 h-5" />Clips do Evento</h1></div>
      <SearchFilters filters={SORT_FILTERS} active={sort} onChange={setSort} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{MOCK.map(c => <ClipCard key={c.id} clip={c} />)}</div>
    </div>
  )
}
