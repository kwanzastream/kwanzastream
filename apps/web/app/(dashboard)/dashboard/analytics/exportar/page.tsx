"use client"
import { useState } from "react"
import { ArrowLeft, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ExportarPage() {
  const [format, setFormat] = useState("csv")
  const [include, setInclude] = useState({ streams: true, viewers: true, monetizacao: true, chat: false, clips: false })
  const [exporting, setExporting] = useState(false)
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">📥 Exportar Dados</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Formato</p><div className="flex gap-2">{["csv","json","pdf"].map(f => <button key={f} onClick={() => setFormat(f)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${format === f ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{f}</button>)}</div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Dados a incluir</p>{Object.entries(include).map(([k, v]) => <label key={k} className="flex items-center gap-2 py-1"><input type="checkbox" checked={v} onChange={() => setInclude({ ...include, [k]: !v })} /><span className="text-xs capitalize">{k === "monetizacao" ? "Monetização" : k === "chat" ? "Chat (sem PII)" : k}</span></label>)}</div>
        <div className="grid grid-cols-2 gap-2"><div className="space-y-1"><p className="text-[10px] font-bold">De</p><Input type="date" className="bg-white/5" defaultValue="2026-02-20" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Até</p><Input type="date" className="bg-white/5" defaultValue="2026-03-20" /></div></div>
        <Button className="w-full h-12 font-bold gap-2" disabled={exporting} onClick={() => { setExporting(true); setTimeout(() => { setExporting(false); toast.success(`Ficheiro .${format} gerado!`) }, 2000) }}>{exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4" />Gerar e descarregar</>}</Button>
      </div>
    </div>
  )
}
