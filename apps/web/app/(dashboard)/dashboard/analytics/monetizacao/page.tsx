"use client"
import { MetricCard, SimpleBarChart } from "@/components/analytics/analytics-components"
import { ArrowLeft, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const BREAKDOWN = [{label:"Salos",value:28000},{label:"Subscrições",value:12600},{label:"Loja",value:5000},{label:"Ads",value:0},{label:"Drops",value:0}]
export default function MonetizacaoHubPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><DollarSign className="w-5 h-5" />Monetização</h1></div>
      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 text-center"><p className="text-[10px] text-muted-foreground">Total este mês</p><p className="text-2xl font-black">45.600 Kz</p></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Receita por fonte (Kz)</p><SimpleBarChart data={BREAKDOWN} /></div>
      <div className="grid grid-cols-2 gap-2">
        <Link href="/dashboard/analytics/monetizacao/salos" className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><p className="text-xs font-bold">💛 Salos</p><p className="text-[8px] text-muted-foreground">28.000 Kz (61%)</p></Link>
        <Link href="/dashboard/analytics/monetizacao/subscricoes" className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><p className="text-xs font-bold">⭐ Subscrições</p><p className="text-[8px] text-muted-foreground">12.600 Kz (28%)</p></Link>
        <Link href="/dashboard/analytics/monetizacao/loja" className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><p className="text-xs font-bold">🏪 Loja</p><p className="text-[8px] text-muted-foreground">5.000 Kz (11%)</p></Link>
        <Link href="/dashboard/analytics/monetizacao/ads" className="p-3 rounded-xl border border-white/10 hover:border-primary/20"><p className="text-xs font-bold">📺 Ads</p><p className="text-[8px] text-muted-foreground">Em breve</p></Link>
        <Link href="/dashboard/analytics/monetizacao/drops" className="p-3 rounded-xl border border-white/10 hover:border-primary/20 col-span-2"><p className="text-xs font-bold">🎁 Drops</p><p className="text-[8px] text-muted-foreground">Drops com marcas</p></Link>
      </div>
    </div>
  )
}
