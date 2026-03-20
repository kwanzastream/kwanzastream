"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function AlertasPage() {
  const [active, setActive] = useState(true)
  const [min, setMin] = useState("50")
  const [duration, setDuration] = useState("5s")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/salos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🔔 Alertas de Salos</h1></div>
      <label className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-xs font-bold">Activar alertas</span><input type="checkbox" checked={active} onChange={() => setActive(!active)} /></label>
      <div className="space-y-1"><p className="text-[10px] font-bold">Valor mínimo para alerta</p><div className="flex gap-2">{["Sempre","50","200","500"].map(v => <button key={v} onClick={() => setMin(v)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${min === v ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{v === "Sempre" ? v : `${v} Kz`}</button>)}</div></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Duração do alerta</p><div className="flex gap-2">{["5s","10s","15s"].map(d => <button key={d} onClick={() => setDuration(d)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${duration === d ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{d}</button>)}</div></div>
      <Link href="/dashboard/monetizacao/salos/alertas/editar"><Button variant="outline" size="sm" className="w-full text-xs">Personalizar visual →</Button></Link>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Alertas guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
