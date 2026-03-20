"use client"
import { useParams } from "next/navigation"
import { HeatmapGrid, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const HEATMAP = [[1,1,1,1,2,3,3],[2,2,2,2,3,4,5],[3,3,4,4,5,6,6],[5,5,6,6,7,8,9],[8,8,8,9,10,10,10],[7,7,7,8,9,9,8],[4,4,4,5,6,6,5],[2,2,2,2,3,3,3]]
export default function ResearchCategoriaPage() {
  const { categoria } = useParams()
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/research"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold capitalize">Research: {categoria}</h1></div>
      <HeatmapGrid data={HEATMAP} />
      <InsightCard icon="📊" text={`Melhores horários para ${categoria}: Sexta e Sábado 20h–22h WAT.`} />
    </div>
  )
}
