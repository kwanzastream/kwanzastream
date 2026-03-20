"use client"
import { RewardCard } from "@/components/community/community-components"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const BUILTIN = [{id:"b1",title:"Destaque no chat",cost:100,desc:"A tua mensagem fica destacada",active:true,max:"Ilimitado"},{id:"b2",title:"Emote desbloqueado",cost:500,desc:"Usa um emote premium temporariamente",active:true,max:"1/stream"}]
const CUSTOM = [{id:"c1",title:"Shoutout ao vivo",cost:1000,desc:"O streamer lê o teu nome",active:true,max:"5/stream"},{id:"c2",title:"Escolher categoria",cost:5000,desc:"Escolhe a categoria do próximo stream",active:true,max:"1/stream"},{id:"c3",title:"Jogar contra o streamer",cost:10000,desc:"Uma ronda contra o streamer",active:false,max:"1/stream"}]
export default function RewardsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">🎯 Channel Points</h1><Link href="/dashboard/comunidade/channel-points/rewards/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar reward</Button></Link></div>
      <div className="flex gap-1"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Rewards</button><Link href="/dashboard/comunidade/channel-points/historico"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Histórico</button></Link></div>
      <p className="text-[10px] font-bold text-muted-foreground">Built-in</p>
      <div className="space-y-1">{BUILTIN.map(r => <RewardCard key={r.id} {...r} maxPerStream={r.max} />)}</div>
      <p className="text-[10px] font-bold">Custom</p>
      <div className="space-y-1">{CUSTOM.map(r => <Link key={r.id} href={`/dashboard/comunidade/channel-points/rewards/${r.id}`}><RewardCard {...r} maxPerStream={r.max} /></Link>)}</div>
    </div>
  )
}
