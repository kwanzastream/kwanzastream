"use client"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const TOP = [{rank:1,u:"@superfan",total:"15.000 Kz",count:12,emoji:"🥇"},{rank:2,u:"@loyal",total:"8.500 Kz",count:7,emoji:"🥈"},{rank:3,u:"@supporter",total:"6.000 Kz",count:4,emoji:"🥉"},{rank:4,u:"@generous",total:"4.500 Kz",count:3},{rank:5,u:"@viewer1",total:"2.000 Kz",count:2}]
export default function TopDoadoresPage() {
  const [period, setPeriod] = useState("month")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/salos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🏆 Top Doadores</h1></div>
      <div className="flex gap-1">{[{id:"month",l:"Este mês"},{id:"3m",l:"3 meses"},{id:"all",l:"De sempre"}].map(p => <button key={p.id} onClick={() => setPeriod(p.id)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${period === p.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{p.l}</button>)}</div>
      <div className="space-y-1">{TOP.map(t => <div key={t.rank} className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10"><span className="w-6 text-center text-sm">{t.emoji || t.rank}</span><span className="text-xs font-bold flex-1">{t.u}</span><div className="text-right"><p className="text-xs font-black text-primary">{t.total}</p><p className="text-[8px] text-muted-foreground">{t.count} doações</p></div></div>)}</div>
    </div>
  )
}
