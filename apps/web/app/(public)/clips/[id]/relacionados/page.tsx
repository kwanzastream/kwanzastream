"use client"
import { useParams } from "next/navigation"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: ClipData[] = [
  { id: "c2", title: "Dança de kuduro viral", duration: 45, viewCount: 89000, shares: 3400, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "c3", title: "Receita relâmpago", duration: 60, viewCount: 12000, shares: 800, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Culinária", creator: { username: "chef_mwangole", displayName: "Chef Mwangolê" } },
]

export default function ClipRelacionadosPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/clips/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Clips relacionados</h1></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{MOCK.map(c => <ClipCard key={c.id} clip={c} />)}</div>
    </div>
  )
}
