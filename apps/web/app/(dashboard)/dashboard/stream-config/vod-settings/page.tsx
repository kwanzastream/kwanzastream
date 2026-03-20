"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function VODSettingsPage() {
  const [record, setRecord] = useState("always")
  const [duration, setDuration] = useState("forever")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📹 VOD Settings</h1>
      <p className="text-[10px] font-bold">Gravar streams como VOD</p>
      {[{id:"always",l:"Sempre gravar"},{id:"never",l:"Nunca gravar"},{id:"ask",l:"Perguntar antes de cada stream"}].map(r => <label key={r.id} className="flex items-center gap-2 py-1"><input type="radio" name="record" checked={record === r.id} onChange={() => setRecord(r.id)} /><span className="text-xs">{r.l}</span></label>)}
      <p className="text-[10px] font-bold">Expiração do VOD</p>
      {[{id:"forever",l:"Manter para sempre"},{id:"14",l:"Eliminar após 14 dias"},{id:"60",l:"Eliminar após 60 dias"},{id:"90",l:"Eliminar após 90 dias"}].map(d => <label key={d.id} className="flex items-center gap-2 py-1"><input type="radio" name="dur" checked={duration === d.id} onChange={() => setDuration(d.id)} /><span className="text-xs">{d.l}</span></label>)}
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">Qualidade menor (poupa armazenamento)</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">Permitir download de VODs</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("VOD settings guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
