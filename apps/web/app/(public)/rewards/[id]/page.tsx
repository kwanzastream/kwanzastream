"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Coins, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function RewardDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/rewards/activos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Reward</h1></div>
      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center space-y-3">
        <p className="text-3xl">🎵</p>
        <h2 className="text-lg font-bold">Escolhe a próxima música</h2>
        <p className="text-xs text-muted-foreground">Pede uma música no mix ao vivo do @kuduro_master</p>
        <Badge className="bg-yellow-500/10 text-yellow-400 text-sm gap-1"><Coins className="w-4 h-4" />500 pontos</Badge>
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs font-bold">Canal</p>
        <Link href="/kuduro_master" className="text-sm text-primary hover:underline">@kuduro_master — Kuduro Master</Link>
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <p className="text-xs font-bold">Disponibilidade</p>
        <Badge className="bg-green-500/10 text-green-400 text-[9px]">Disponível agora</Badge>
      </div>
      <Link href={`/rewards/${id}/resgatar`}><Button className="w-full h-12 gap-2 font-bold"><Coins className="w-4 h-4" />Resgatar (500 pontos)</Button></Link>
    </div>
  )
}
