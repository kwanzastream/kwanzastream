"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function SlowModePage() {
  const [mode, setMode] = useState("off")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/settings"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Slow Mode</h1></div>
      {[{id:"off",l:"Desactivado"},{id:"3",l:"3 segundos"},{id:"10",l:"10 segundos"},{id:"30",l:"30 segundos"},{id:"60",l:"1 minuto"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="slow" checked={mode === o.id} onChange={() => setMode(o.id)} /><span className="text-xs">{o.l}</span></label>)}
      <p className="text-[10px] font-bold">Aplicar a:</p>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Viewers normais</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">Subscritores</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">VIPs</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Slow mode guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
