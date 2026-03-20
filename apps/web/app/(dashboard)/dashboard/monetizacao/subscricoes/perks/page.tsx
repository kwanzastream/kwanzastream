"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PerksPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/subscricoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Benefícios Extra</h1></div>
      {[{perk:"VODs exclusivos",desc:"Subscritores acedem a VODs marcados como exclusivos",tiers:"T1+"},{perk:"Acesso antecipado",desc:"Subscritores vêem novos vídeos 24h antes",tiers:"T2+"},{perk:"Badge especial",desc:"Badge personalizado no chat",tiers:"T3"},{perk:"Sem ads",desc:"Subscritores não vêem anúncios",tiers:"T2+"}].map(p => <div key={p.perk} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><div className="flex-1"><p className="text-xs font-bold">{p.perk}</p><p className="text-[8px] text-muted-foreground">{p.desc}</p></div><span className="text-[8px] font-bold text-primary">{p.tiers}</span></div>)}
    </div>
  )
}
