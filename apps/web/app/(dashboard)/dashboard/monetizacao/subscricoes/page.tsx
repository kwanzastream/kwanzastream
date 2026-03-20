"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function SubscricoesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⭐ Subscrições</h1>
      <div className="grid grid-cols-2 gap-3"><RevenueMetricCard icon="⭐" label="Activos" value="89" change="+3" positive /><RevenueMetricCard icon="💰" label="MRR" value="44.500 Kz" /></div>
      <div className="p-3 rounded-xl border border-white/10 text-xs space-y-1"><p className="font-bold">Breakdown por tier:</p>{[{t:"Tier 1 (500 Kz)",n:67,r:"33.500"},{t:"Tier 2 (1.500 Kz)",n:18,r:"27.000"},{t:"Tier 3 (3.000 Kz)",n:4,r:"12.000"}].map(t => <div key={t.t} className="flex justify-between"><span className="text-muted-foreground">{t.t} × {t.n}</span><span className="font-bold">{t.r} Kz</span></div>)}<hr className="border-white/10 my-1" /><div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>72.500 Kz</span></div><div className="flex justify-between text-red-400"><span>Plataforma (20%)</span><span>-14.500 Kz</span></div><div className="flex justify-between font-black"><span>Recebido</span><span className="text-primary">58.000 Kz</span></div></div>
      <div className="space-y-1"><Link href="/dashboard/monetizacao/subscricoes/tiers"><Button variant="outline" size="sm" className="w-full text-xs">Configurar tiers →</Button></Link><Link href="/dashboard/monetizacao/subscricoes/perks"><Button variant="outline" size="sm" className="w-full text-xs">Benefícios extras →</Button></Link><Link href="/dashboard/monetizacao/subscricoes/historico"><Button variant="outline" size="sm" className="w-full text-xs">Histórico →</Button></Link><Link href="/dashboard/monetizacao/subscricoes/gift"><Button variant="outline" size="sm" className="w-full text-xs">Gift subs →</Button></Link></div>
    </div>
  )
}
