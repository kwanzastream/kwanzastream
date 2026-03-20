"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function DropInsConfigurarPage() {
  const [accept, setAccept] = useState("favs")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🎤 Drop-ins</h1>
      <p className="text-xs text-muted-foreground">Permite que outros canais entrem no teu stream como convidados.</p>
      <p className="text-[10px] font-bold">Aceitar drop-ins</p>
      {[{id:"favs",l:"Só de favoritos"},{id:"verified",l:"De qualquer canal verificado"},{id:"off",l:"Desactivado"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="accept" checked={accept === o.id} onChange={() => setAccept(o.id)} /><span className="text-xs">{o.l}</span></label>)}
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Aprovação manual</span></label>
      <div className="space-y-1"><p className="text-[10px] font-bold">Duração máxima</p><select className="h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>15 min</option><option>30 min</option><option>1 hora</option><option>Sem limite</option></select></div>
      <p className="text-[10px] font-bold">Notificações</p>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Push</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">WhatsApp</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Drop-ins guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
