"use client"
import { useParams } from "next/navigation"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: VodData[] = [
  { id: "v2", title: "Valorant Ranked Angola", duration: 7200, viewCount: 1500, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Gaming", creator: { username: "angolangamer", displayName: "Angola Gamer" } },
  { id: "v3", title: "Culinária Angolana", duration: 2400, viewCount: 890, createdAt: new Date(Date.now() - 259200000).toISOString(), category: "Culinária", creator: { username: "chef_mwangole", displayName: "Chef Mwangolê" } },
]

export default function VideoRelacionadosPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/videos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Vídeos relacionados</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{MOCK.map(v => <VodCard key={v.id} vod={v} />)}</div>
    </div>
  )
}
