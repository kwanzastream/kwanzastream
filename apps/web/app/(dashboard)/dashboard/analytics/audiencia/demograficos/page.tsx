"use client"
import { SimpleBarChart } from "@/components/analytics/analytics-components"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const AGE = [{label:"18–24",value:42},{label:"25–34",value:31},{label:"35–44",value:18},{label:"45+",value:9}]
const GENDER = [{label:"Masculino",value:68},{label:"Feminino",value:29},{label:"Outro",value:3}]
const COUNTRIES = [{label:"Angola",value:78},{label:"Portugal",value:8},{label:"Brasil",value:6},{label:"Moçambique",value:4},{label:"Outros",value:4}]
export default function DemograficosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/audiencia"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Demográficos</h1></div>
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Faixa etária (%)</p><SimpleBarChart data={AGE} /></div>
        <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Género (%)</p><SimpleBarChart data={GENDER} color="hsl(280 60% 60%)" /></div>
        <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">País (%)</p><SimpleBarChart data={COUNTRIES} color="hsl(142 71% 45%)" /></div>
      </div>
      <div className="p-2 rounded-xl bg-white/5 text-[8px] text-muted-foreground flex items-center gap-1"><Info className="w-3 h-3 shrink-0" />Dados agregados. Mínimo 10 utilizadores por segmento.</div>
    </div>
  )
}
