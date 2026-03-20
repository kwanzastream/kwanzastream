"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function GerirEquipaPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⚙️ Gerir Equipa</h1>
      <div className="grid grid-cols-2 gap-3"><RevenueMetricCard icon="👥" label="Membros" value="4/10" /><RevenueMetricCard icon="📩" label="Candidaturas" value="2" /><RevenueMetricCard icon="📺" label="Streams semana" value="12" /><RevenueMetricCard icon="👁" label="Viewers" value="1.234" /></div>
      <div className="space-y-1"><Link href="/dashboard/colaboracoes/equipa/membros"><Button variant="outline" size="sm" className="w-full text-xs">Ver membros</Button></Link><Link href="/dashboard/colaboracoes/equipa/membros/convidar"><Button variant="outline" size="sm" className="w-full text-xs">Convidar membro</Button></Link><Link href="/dashboard/colaboracoes/equipa/definicoes"><Button variant="outline" size="sm" className="w-full text-xs">Definições</Button></Link></div>
    </div>
  )
}
