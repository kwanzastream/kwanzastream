"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const LOG = [{viewer:"@fan1",reward:"Shoutout ao vivo",pts:1000,date:"20 Mar, 21:34",status:"✅ Completo"},{viewer:"@fan2",reward:"Escolher categoria",pts:5000,date:"18 Mar, 20:15",status:"⏳ Pendente"},{viewer:"@fan3",reward:"Destaque no chat",pts:100,date:"18 Mar, 20:00",status:"✅ Completo"},{viewer:"@fan4",reward:"Jogar contra o streamer",pts:10000,date:"15 Mar, 21:00",status:"❌ Rejeitado"}]
export default function HistoricoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/channel-points"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Histórico de Rewards</h1></div>
      <div className="space-y-1">{LOG.map((l,i) => <div key={i} className="flex items-center gap-3 p-2 rounded-xl border border-white/10"><div className="flex-1"><p className="text-xs font-bold">{l.viewer} → {l.reward}</p><p className="text-[8px] text-muted-foreground">{l.pts.toLocaleString()} pts · {l.date}</p></div><span className="text-[8px]">{l.status}</span></div>)}</div>
    </div>
  )
}
