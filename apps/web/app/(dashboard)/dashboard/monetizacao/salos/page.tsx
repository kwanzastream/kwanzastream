"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { SimpleBarChart } from "@/components/analytics/analytics-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const SALOS_DATA = [{label:"Stream 1",value:8000},{label:"Stream 2",value:5500},{label:"Stream 3",value:9000},{label:"Stream 4",value:5500}]
export default function SalosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">💛 Salos</h1>
      <div className="grid grid-cols-2 gap-3"><RevenueMetricCard icon="💰" label="Este mês" value="28.000 Kz" change="+8%" positive /><RevenueMetricCard icon="#️⃣" label="Doações" value="47" /><RevenueMetricCard icon="📊" label="Média" value="595 Kz" /><RevenueMetricCard icon="🏆" label="Maior" value="5.000 Kz" sub="@superfan" /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Salos por stream</p><SimpleBarChart data={SALOS_DATA} color="hsl(45 93% 47%)" /></div>
      <div className="space-y-1"><Link href="/dashboard/monetizacao/salos/historico"><Button variant="outline" size="sm" className="w-full text-xs">Histórico completo →</Button></Link><Link href="/dashboard/monetizacao/salos/top-doadores"><Button variant="outline" size="sm" className="w-full text-xs">Top doadores →</Button></Link><Link href="/dashboard/monetizacao/salos/alertas"><Button variant="outline" size="sm" className="w-full text-xs">Configurar alertas →</Button></Link></div>
    </div>
  )
}
