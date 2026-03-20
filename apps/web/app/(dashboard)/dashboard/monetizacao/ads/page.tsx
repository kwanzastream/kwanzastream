"use client"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function AdsOverviewPage() {
  const isPartner = false
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📺 Ads</h1>
      {isPartner ? (
        <><div className="grid grid-cols-3 gap-3"><RevenueMetricCard icon="💰" label="Receita" value="0 Kz" /><RevenueMetricCard icon="📊" label="eCPM" value="—" /><RevenueMetricCard icon="👁" label="Impressões" value="—" /></div><p className="text-xs text-muted-foreground">Ads em beta — receita começará em breve.</p></>
      ) : (
        <div className="p-5 rounded-2xl border border-white/10 text-center space-y-3"><Info className="w-8 h-8 text-primary mx-auto" /><p className="text-sm font-bold">Disponível para Partners</p><p className="text-xs text-muted-foreground">Requisitos: 500+ seguidores · 25+ avg viewers</p><Link href="/dashboard/monetizacao/programa-de-parceiro"><Button size="sm" className="mt-2">Ver requisitos →</Button></Link></div>
      )}
      <div className="space-y-1"><Link href="/dashboard/monetizacao/ads/schedule"><Button variant="outline" size="sm" className="w-full text-xs">Configurar frequência →</Button></Link><Link href="/dashboard/monetizacao/ads/bloqueios"><Button variant="outline" size="sm" className="w-full text-xs">Categorias bloqueadas →</Button></Link></div>
    </div>
  )
}
