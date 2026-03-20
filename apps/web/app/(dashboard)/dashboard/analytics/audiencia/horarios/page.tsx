"use client"
import { HeatmapGrid, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const HEATMAP = [[1,1,1,1,1,2,2],[2,2,2,2,3,4,5],[3,3,4,4,5,6,7],[5,6,6,7,8,9,10],[8,8,9,9,10,10,9],[6,7,7,7,8,8,7],[3,3,3,4,5,5,4],[1,1,1,1,2,2,2]]
export default function HorariosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/audiencia"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Horários dos Seguidores</h1></div>
      <p className="text-xs text-muted-foreground">Quando os teus seguidores estão online (WAT).</p>
      <HeatmapGrid data={HEATMAP} />
      <InsightCard icon="⏰" text="Os teus seguidores estão mais activos às sextas e sábados 18h–22h." />
    </div>
  )
}
