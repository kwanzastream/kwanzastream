"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function DelayPage() {
  const [delay, setDelay] = useState("0")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⏱️ Delay</h1>
      {[{id:"0",l:"Sem delay extra (latência ~6-8s)"},{id:"15",l:"15 segundos (stream sniping)"},{id:"30",l:"30 segundos (torneios)"},{id:"300",l:"5 minutos (conteúdo sensível)"}].map(d => <label key={d.id} className="flex items-center gap-2 py-1"><input type="radio" name="delay" checked={delay === d.id} onChange={() => setDelay(d.id)} /><span className="text-xs">{d.l}</span></label>)}
      <p className="text-[8px] text-muted-foreground">⚠️ Maior delay = mais difícil interagir com o chat em tempo real</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Delay guardado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
