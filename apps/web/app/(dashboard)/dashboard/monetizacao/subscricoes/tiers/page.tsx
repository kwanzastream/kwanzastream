"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const TIERS = [{id:1,price:"500",name:"Fã",benefits:["Badge 🥉","1 emote","Chat colorido"]},{id:2,price:"1.500",name:"Super Fã",benefits:["Badge 🥈","5 emotes","VODs exclusivos","Sem ads"]},{id:3,price:"3.000",name:"VIP Angola",benefits:["Badge 🥇","10 emotes","Tudo do T2","Acesso antecipado"]}]
export default function TiersPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/subscricoes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Tiers</h1></div>
      {TIERS.map(t => <Link key={t.id} href={`/dashboard/monetizacao/subscricoes/tiers/${t.id}`}><div className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><div className="flex items-center justify-between"><p className="text-xs font-bold">Tier {t.id} — {t.name}</p><span className="text-xs font-black text-primary">{t.price} Kz/mês</span></div><div className="flex gap-1 mt-1 flex-wrap">{t.benefits.map(b => <span key={b} className="px-2 py-0.5 rounded-full bg-primary/10 text-[8px] text-primary">{b}</span>)}</div></div></Link>)}
    </div>
  )
}
