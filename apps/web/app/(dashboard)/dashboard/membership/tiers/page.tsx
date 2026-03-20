"use client"
import { TierSummaryCard } from "@/components/membership/membership-components"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const TABS = [{id:"tiers",l:"Tiers",h:"/dashboard/membership/tiers"},{id:"membros",l:"Membros",h:"/dashboard/membership/membros"},{id:"pagamentos",l:"Pagamentos",h:"/dashboard/membership/pagamentos/proximos"},{id:"analytics",l:"Analytics",h:"/dashboard/membership/analytics/mrr"},{id:"perks",l:"Perks",h:"/dashboard/membership/perks-exclusivos/vods"},{id:"ofertas",l:"Ofertas",h:"/dashboard/membership/ofertas"}]
export default function TiersPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-lg font-black">🏅 Memberships</h1>
      <div className="flex gap-1 overflow-x-auto pb-1">{TABS.map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "tiers" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>{t.l}</button></Link>)}</div>
      <div className="space-y-2">{[{tier:1,name:"Fã",price:"500 Kz",members:67,mrr:"33.500 Kz",benefits:["Badge 🥉","1 Emote","Chat colorido"]},{tier:2,name:"Super Fã",price:"1.500 Kz",members:18,mrr:"27.000 Kz",benefits:["Badge 🥈","5 Emotes","VODs exclusivos","Sem ads"]},{tier:3,name:"VIP Angola",price:"3.000 Kz",members:4,mrr:"12.000 Kz",benefits:["Badge 🥇","10 Emotes","Tudo T2","Acesso antecipado","Streams privados"]}].map(t => <Link key={t.tier} href={`/dashboard/membership/tiers/${t.tier}`}><TierSummaryCard {...t} active /></Link>)}</div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><div className="flex justify-between"><span className="text-xs">Total MRR</span><span className="text-sm font-black text-primary">72.500 Kz bruto · 58.000 Kz líquido</span></div></div>
      <Link href="/dashboard/membership/tiers/criar"><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Plus className="w-3 h-3" />Criar novo tier</Button></Link>
    </div>
  )
}
