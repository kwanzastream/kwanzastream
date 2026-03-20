"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function DropsHistoricoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/drops"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Histórico de Drops</h1></div>
      {[{brand:"Coca-Cola Angola",date:"Fev 2026",viewers:450,revenue:"8.000 Kz"},{brand:"BAI",date:"Jan 2026",viewers:320,revenue:"6.500 Kz"}].map(d => <div key={d.brand} className="p-3 rounded-xl border border-white/10"><div className="flex justify-between"><p className="text-xs font-bold">{d.brand}</p><span className="text-xs font-bold text-primary">{d.revenue}</span></div><p className="text-[8px] text-muted-foreground">{d.date} · {d.viewers} viewers participaram</p></div>)}
    </div>
  )
}
