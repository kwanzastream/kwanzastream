"use client"
import { ApplicationStatusCard } from "@/components/programs/program-components"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function EstadoFundPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/creator-fund"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Estado da Candidatura</h1></div>
      <ApplicationStatusCard status="pending" date="Submetida: 20 Março 2026" detail="Resultados do ciclo anunciados em Abril 2026." />
      <div className="p-3 rounded-xl border border-white/10 space-y-2"><p className="text-xs font-bold flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" />Histórico de ciclos</p>{[{ciclo:"Ciclo Jan 2026",estado:"Encerrado — 15 criadores seleccionados"},{ciclo:"Ciclo Out 2025",estado:"Encerrado — 12 criadores seleccionados"}].map(c => <div key={c.ciclo} className="flex items-center justify-between text-[10px] text-muted-foreground"><span>{c.ciclo}</span><span>{c.estado}</span></div>)}</div>
    </div>
  )
}
