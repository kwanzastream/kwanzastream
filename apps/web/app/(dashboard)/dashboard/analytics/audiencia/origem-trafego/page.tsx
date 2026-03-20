"use client"
import { SimpleBarChart } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const SOURCES = [{label:"Directo",value:45},{label:"Feed",value:32},{label:"Pesquisa",value:8},{label:"WhatsApp",value:7},{label:"Raid",value:5},{label:"Google",value:3}]
export default function OrigemTrafegoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/audiencia"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Origem de Tráfego</h1></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">De onde vêm os viewers (%)</p><SimpleBarChart data={SOURCES} /></div>
    </div>
  )
}
