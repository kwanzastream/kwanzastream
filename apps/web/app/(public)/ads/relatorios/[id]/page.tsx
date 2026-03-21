"use client"

import { useParams } from "next/navigation"
import { ChevronLeft, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RelatorioDetailPage() {
  const { id } = useParams()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/ads/relatorios" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Relatórios</Link>
      <h1 className="text-xl font-bold">Relatório #{id}</h1>
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Campanha</span><span>Unitel Spring 2026</span></div>
        <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Período</span><span className="flex items-center gap-1"><Calendar className="w-3 h-3" />25 Mar — 31 Mar</span></div>
        <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Impressões totais</span><span className="font-bold">18.400</span></div>
        <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Cliques totais</span><span className="font-bold">423</span></div>
        <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">CTR médio</span><span className="font-bold text-primary">2.3%</span></div>
        <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Gasto total</span><span className="font-bold">12.340 Kz</span></div>
        <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">CPC médio</span><span className="font-bold">29 Kz</span></div>
      </div>
      <div className="flex gap-2">
        <Button className="gap-1.5"><Download className="w-3.5 h-3.5" />Download PDF</Button>
        <Button variant="outline" className="gap-1.5"><Download className="w-3.5 h-3.5" />Download CSV</Button>
      </div>
    </div>
  )
}
