"use client"
import { useState } from "react"
import { ArrowLeft, Download, Loader2, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function ExportarDadosPage() {
  const [format, setFormat] = useState("json")
  const [exporting, setExporting] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/privacidade"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Download className="w-5 h-5" />Exportar Dados</h1></div>
      <p className="text-xs text-muted-foreground">Download de todos os dados da tua conta.</p>
      <div className="space-y-1"><p className="text-[10px] font-bold">Formato</p><div className="flex gap-2">{["json","csv"].map(f => <button key={f} onClick={() => setFormat(f)} className={`px-4 py-2 rounded-lg text-xs font-bold ${format === f ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{f.toUpperCase()}</button>)}</div></div>
      <div className="p-3 rounded-xl border border-white/10 text-[10px] text-muted-foreground space-y-1"><p className="flex items-center gap-1"><Clock className="w-3 h-3" />Processamento assíncrono (pode demorar horas)</p><p className="flex items-center gap-1"><Mail className="w-3 h-3" />Recebes email quando pronto</p><p className="flex items-center gap-1"><Download className="w-3 h-3" />Link válido 48h</p></div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={exporting} onClick={() => { setExporting(true); setTimeout(() => { toast.success("Pedido de exportação submetido! Recebes email quando pronto."); setExporting(false) }, 2000) }}>{exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4" />Exportar dados ({format.toUpperCase()})</>}</Button>
    </div>
  )
}
