"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function LojaOverviewPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🛒 Loja</h1>
      <div className="grid grid-cols-2 gap-3"><RevenueMetricCard icon="💰" label="Receita total" value="5.000 Kz" change="+45%" positive /><RevenueMetricCard icon="📦" label="Pedidos" value="12" sub="este mês" /><RevenueMetricCard icon="🏆" label="Mais vendido" value="Overlay OBS" sub="8 vendas" /><RevenueMetricCard icon="⭐" label="Avaliação" value="4.7" /></div>
      <div className="space-y-1"><Link href="/dashboard/monetizacao/loja/produtos"><Button variant="outline" size="sm" className="w-full text-xs">Produtos →</Button></Link><Link href="/dashboard/monetizacao/loja/pedidos"><Button variant="outline" size="sm" className="w-full text-xs">Pedidos →</Button></Link><Link href="/dashboard/monetizacao/loja/financeiro"><Button variant="outline" size="sm" className="w-full text-xs">Financeiro →</Button></Link><Link href="/dashboard/monetizacao/loja/configuracoes/entrega"><Button variant="outline" size="sm" className="w-full text-xs">Config entrega →</Button></Link><Link href="/dashboard/monetizacao/loja/configuracoes/pagamento"><Button variant="outline" size="sm" className="w-full text-xs">Config pagamento →</Button></Link></div>
    </div>
  )
}
