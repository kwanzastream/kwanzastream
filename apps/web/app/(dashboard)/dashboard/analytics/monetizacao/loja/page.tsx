"use client"
import { MetricCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const PRODUCTS = [{name:"Overlay Pack Luanda",sold:12,revenue:"3.600 Kz"},{name:"Sound Alert Angola",sold:8,revenue:"1.200 Kz"},{name:"Shoutout 30s",sold:2,revenue:"200 Kz"}]
export default function LojaPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/monetizacao"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🏪 Loja</h1></div>
      <div className="grid grid-cols-2 gap-3"><MetricCard icon="🏪" label="Receita total" value="5.000 Kz" change="+22%" positive /><MetricCard icon="📦" label="Vendas" value="22" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Produtos mais populares</p>{PRODUCTS.map(p => <div key={p.name} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><div><p className="text-xs font-bold">{p.name}</p><p className="text-[8px] text-muted-foreground">{p.sold} vendas</p></div><span className="text-xs font-bold text-primary">{p.revenue}</span></div>)}</div>
    </div>
  )
}
