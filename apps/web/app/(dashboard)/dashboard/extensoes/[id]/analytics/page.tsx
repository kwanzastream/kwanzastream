"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RevenueMetricCard } from "@/components/monetization/monetization-components"
import Link from "next/link"
export default function ExtensionAnalyticsPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/extensoes/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">📊 Analytics</h1></div>
      <div className="grid grid-cols-3 gap-3"><RevenueMetricCard icon="👁" label="Visualizações" value="1.456" sub="30 dias" /><RevenueMetricCard icon="👆" label="Cliques" value="234" /><RevenueMetricCard icon="💬" label="Interacções" value="89" /></div>
      <div className="p-3 rounded-xl border border-primary/20 bg-primary/5"><p className="text-[10px] font-bold">Contribuição</p><ul className="text-[9px] text-muted-foreground mt-1 space-y-0.5"><li>→ 12 novos seguidores via objectivo de seguidores</li><li>→ 3.400 Kz em Salos após mostrar objectivo de Salos</li></ul></div>
    </div>
  )
}
