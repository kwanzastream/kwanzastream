"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit2, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const TIERS: Record<string, {name:string;price:string;members:number;mrr:string;benefits:string[]}> = {"1":{name:"Fã",price:"500 Kz",members:67,mrr:"33.500 Kz",benefits:["Badge 🥉","1 Emote","Chat colorido"]},"2":{name:"Super Fã",price:"1.500 Kz",members:18,mrr:"27.000 Kz",benefits:["Badge 🥈","5 Emotes","VODs exclusivos","Sem ads"]},"3":{name:"VIP Angola",price:"3.000 Kz",members:4,mrr:"12.000 Kz",benefits:["Badge 🥇","10 Emotes","Tudo T2","Streams privados"]}}
export default function TierDetailPage() {
  const { id } = useParams()
  const t = TIERS[id as string] || TIERS["1"]
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/membership/tiers"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Tier {id} — "{t.name}"</h1></div>
      <div className="grid grid-cols-3 gap-3">{[{l:"Preço",v:t.price},{l:"Membros",v:String(t.members)},{l:"MRR",v:t.mrr}].map(m => <div key={m.l} className="p-2 rounded-xl border border-white/10 text-center"><p className="text-[8px] text-muted-foreground">{m.l}</p><p className="text-xs font-bold">{m.v}</p></div>)}</div>
      <div className="flex gap-1 flex-wrap">{t.benefits.map(b => <span key={b} className="px-2 py-0.5 rounded-full bg-primary/10 text-[8px] text-primary">{b}</span>)}</div>
      <div className="space-y-1"><Link href={`/dashboard/membership/tiers/${id}/editar`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Edit2 className="w-3 h-3" />Editar</Button></Link><Link href={`/dashboard/membership/tiers/${id}/beneficios`}><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Gift className="w-3 h-3" />Gerir benefícios</Button></Link><Link href="/dashboard/membership/membros/activos"><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Users className="w-3 h-3" />Ver membros</Button></Link></div>
    </div>
  )
}
