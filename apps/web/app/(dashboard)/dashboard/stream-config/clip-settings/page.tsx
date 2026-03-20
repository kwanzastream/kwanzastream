"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ClipSettingsPage() {
  const [when, setWhen] = useState("always")
  const [dur, setDur] = useState("90")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">✂️ Clip Settings</h1>
      <p className="text-[10px] font-bold">Viewers podem criar clips</p>
      {[{id:"always",l:"Sempre"},{id:"never",l:"Nunca"},{id:"live",l:"Só durante streams"}].map(w => <label key={w.id} className="flex items-center gap-2 py-1"><input type="radio" name="when" checked={when === w.id} onChange={() => setWhen(w.id)} /><span className="text-xs">{w.l}</span></label>)}
      <p className="text-[10px] font-bold">Duração máxima</p>
      {[{id:"30",l:"30 segundos"},{id:"60",l:"60 segundos"},{id:"90",l:"90 segundos ← padrão"}].map(d => <label key={d.id} className="flex items-center gap-2 py-1"><input type="radio" name="dur" checked={dur === d.id} onChange={() => setDur(d.id)} /><span className="text-xs">{d.l}</span></label>)}
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Clips públicos automaticamente</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Permitir download de clips</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Clip settings guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
