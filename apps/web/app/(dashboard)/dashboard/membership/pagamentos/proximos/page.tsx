"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function ProximosPagamentosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📅 Próximas Renovações</h1>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-xs">Esta semana: <strong>23 renovações</strong></p><p className="text-xs font-black text-primary">14.500 Kz esperado</p></div>
      <div className="flex gap-1"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Próximos</button><Link href="/dashboard/membership/pagamentos/falhos"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Falhos</button></Link></div>
      {[{day:"Amanhã (2 Abr)",count:5,value:"4.500 Kz"},{day:"3 Abr",count:8,value:"6.000 Kz"},{day:"4 Abr",count:4,value:"2.000 Kz"},{day:"5 Abr",count:6,value:"2.000 Kz"}].map(d => <div key={d.day} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><div><p className="text-xs font-bold">📅 {d.day}</p><p className="text-[8px] text-muted-foreground">{d.count} renovações</p></div><span className="text-xs font-bold text-primary">{d.value}</span></div>)}
    </div>
  )
}
