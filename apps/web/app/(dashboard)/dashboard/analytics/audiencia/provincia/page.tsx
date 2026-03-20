"use client"
import { SimpleBarChart } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const PROVINCES = [{label:"Luanda",value:58},{label:"Benguela",value:12},{label:"Huambo",value:7},{label:"Malanje",value:5},{label:"Cabinda",value:4},{label:"Huíla",value:3},{label:"Uíge",value:3},{label:"Outras",value:8}]
export default function ProvinciaPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/audiencia"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Distribuição por Província</h1></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Viewers por província (%)</p><SimpleBarChart data={PROVINCES} color="hsl(142 71% 45%)" /></div>
    </div>
  )
}
