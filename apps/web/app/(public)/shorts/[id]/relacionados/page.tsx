"use client"
import { useParams } from "next/navigation"
import { ShortCard, type ShortData } from "@/components/shorts/short-card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: ShortData[] = [
  { id: "s2", title: "Golo de bicicleta 🇦🇴⚽", duration: 15, viewCount: 89000, likes: 6700, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Futebol", creator: { username: "futebol_rua", displayName: "Futebol de Rua" } },
  { id: "s3", title: "Receita relâmpago 🍗", duration: 30, viewCount: 156000, likes: 12000, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Culinária", creator: { username: "chef_luanda", displayName: "Chef Luanda" } },
]

export default function ShortRelacionadosPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/shorts/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Shorts relacionados</h1></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{MOCK.map(s => <ShortCard key={s.id} short={s} />)}</div>
    </div>
  )
}
