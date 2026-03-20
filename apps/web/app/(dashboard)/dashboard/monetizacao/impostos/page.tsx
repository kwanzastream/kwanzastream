"use client"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function DocumentosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🧾 Documentos Fiscais</h1>
      <p className="text-xs text-muted-foreground">Para declaração de IRT (Imposto sobre Rendimento do Trabalho) em Angola.</p>
      {[{title:"Extracto anual 2025",desc:"Receitas totais Jan-Dez 2025",format:"PDF"},{title:"Extracto anual 2026 (parcial)",desc:"Receitas Jan-Mar 2026",format:"PDF"},{title:"Notas de liquidação — Q1 2026",desc:"Detalhamento de comissões e impostos",format:"PDF"}].map(d => <div key={d.title} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><div className="flex-1"><p className="text-xs font-bold">{d.title}</p><p className="text-[8px] text-muted-foreground">{d.desc}</p></div><Button size="sm" variant="outline" className="text-[9px] gap-1" onClick={() => toast.info("Download iniciado")}><Download className="w-3 h-3" />{d.format}</Button></div>)}
    </div>
  )
}
