"use client"
import { useState } from "react"
import { ArrowLeft, Download, RefreshCw, AlertTriangle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const CODES = ["A1B2-C3D4","E5F6-G7H8","I9J0-K1L2","M3N4-O5P6","Q7R8-S9T0","U1V2-W3X4","Y5Z6-A7B8","C9D0-E1F2"]
export default function BackupCodesPage() {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/seguranca/duas-etapas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Backup Codes</h1></div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-muted-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />Guarda estes códigos num lugar seguro. Cada código só pode ser usado uma vez.</div>
      <div className="grid grid-cols-2 gap-2">{CODES.map(c => <div key={c} className="p-2 rounded-lg bg-white/5 border border-white/10 text-center font-mono text-sm font-bold">{c}</div>)}</div>
      <div className="flex gap-2"><Button variant="outline" className="flex-1 gap-1 text-xs" onClick={() => { navigator.clipboard.writeText(CODES.join("\n")); toast.success("Copiados!") }}><Copy className="w-3 h-3" />Copiar</Button><Button variant="outline" className="flex-1 gap-1 text-xs"><Download className="w-3 h-3" />Descarregar .txt</Button><Button variant="outline" className="flex-1 gap-1 text-xs"><RefreshCw className="w-3 h-3" />Regenerar</Button></div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} className="rounded" /><span className="text-xs">Confirmo que guardei os códigos</span></label>
    </div>
  )
}
