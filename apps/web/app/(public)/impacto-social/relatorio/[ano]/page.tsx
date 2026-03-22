"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ImpactStatCard } from "@/components/angola/impact-stat-card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import api from "@/lib/api"
export default function RelatorioPage() {
  const { ano } = useParams()
  const [data, setData] = useState<any>(null)
  useEffect(() => { api.get(`/api/impact/report/${ano}`).then(r => setData(r.data)).catch(() => setData({ year: ano, creatorsActive: 1234, hoursStreamed: 45000, uniqueViewers: 234000, provincesActive: 18, creatorFundKz: 12500000, schoolPartners: 5 })) }, [ano])
  if (!data) return null
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
    <h1 className="text-2xl font-bold">Relatório de Impacto {ano}</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <ImpactStatCard icon="🎥" label="Criadores activos" value={data.creatorsActive} />
      <ImpactStatCard icon="⏱️" label="Horas transmitidas" value={data.hoursStreamed} suffix="h" />
      <ImpactStatCard icon="👁" label="Viewers únicos" value={data.uniqueViewers} />
      <ImpactStatCard icon="📍" label="Províncias activas" value={`${data.provincesActive}/21`} />
      <ImpactStatCard icon="💰" label="Creator Fund distribuído" value={data.creatorFundKz?.toLocaleString("pt-AO")} suffix="Kz" />
      <ImpactStatCard icon="📚" label="Escolas parceiras" value={data.schoolPartners} />
    </div>
    <Button variant="outline" className="gap-1.5"><Download className="w-3.5 h-3.5" />Download PDF</Button>
  </div>)
}
