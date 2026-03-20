"use client"
import { useState } from "react"
import { Save, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function RaidSettingsPage() {
  const [receive, setReceive] = useState("all")
  const [auto, setAuto] = useState("off")
  const [favs, setFavs] = useState(["@canal1","@canal2"])
  const [newF, setNewF] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⚔️ Raid Settings</h1>
      <p className="text-[10px] font-bold">Receber raids</p>
      {[{id:"all",l:"Aceitar todos"},{id:"following",l:"Só de canais que sigo"},{id:"none",l:"Não aceitar raids"}].map(r => <label key={r.id} className="flex items-center gap-2 py-1"><input type="radio" name="recv" checked={receive === r.id} onChange={() => setReceive(r.id)} /><span className="text-xs">{r.l}</span></label>)}
      <p className="text-[10px] font-bold">Raid automático ao terminar</p>
      {[{id:"off",l:"Não fazer ← padrão"},{id:"random",l:"Canal aleatório da mesma categoria"},{id:"favs",l:"Lista de favoritos (rotação)"}].map(a => <label key={a.id} className="flex items-center gap-2 py-1"><input type="radio" name="auto" checked={auto === a.id} onChange={() => setAuto(a.id)} /><span className="text-xs">{a.l}</span></label>)}
      {auto === "favs" && <><p className="text-[10px] font-bold">Favoritos</p><div className="flex gap-2"><Input value={newF} onChange={e => setNewF(e.target.value)} placeholder="@canal" className="bg-white/5" /><Button size="sm" onClick={() => { if(newF) { setFavs([...favs, newF]); setNewF("") }}}><Plus className="w-3 h-3" /></Button></div>{favs.map(f => <div key={f} className="flex items-center justify-between p-1.5 border-b border-white/5"><span className="text-xs">{f}</span><Button size="sm" variant="ghost" className="h-6 text-red-400" onClick={() => setFavs(favs.filter(x => x !== f))}><X className="w-3 h-3" /></Button></div>)}</>}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Raid settings guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
