"use client"
import { SimpleBarChart } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const DEVICES = [{label:"Android",value:68},{label:"Desktop Chrome",value:15},{label:"iOS",value:12},{label:"Firefox",value:3},{label:"PWA",value:2}]
export default function DispositivosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/audiencia"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Dispositivos</h1></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Distribuição (%)</p><SimpleBarChart data={DEVICES} color="hsl(200 60% 50%)" /></div>
    </div>
  )
}
