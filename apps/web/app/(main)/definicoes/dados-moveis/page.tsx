"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { Wifi } from "lucide-react"
export default function DadosMoveisPag() {
  const [mode, setMode] = useState("auto")
  const [dirty, setDirty] = useState(false)
  const MODES = [{ id: "off", label: "Desactivado" }, { id: "auto", label: "Automático (activa em 3G)" }, { id: "always", label: "Sempre activo" }]
  return (
    <div className="max-w-lg space-y-5">
      <h1 className="text-lg font-bold flex items-center gap-2"><Wifi className="w-5 h-5" />Poupança de Dados</h1>
      <div className="space-y-2">{MODES.map(m => <label key={m.id} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${mode === m.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><input type="radio" name="mode" checked={mode === m.id} onChange={() => { setMode(m.id); setDirty(true) }} /><span className="text-xs font-bold">{m.label}</span></label>)}</div>
      {mode !== "off" && <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 text-[10px] text-muted-foreground space-y-0.5"><p className="font-bold text-green-400">Quando activo:</p><p>→ Vídeo em 360p por defeito</p><p>→ Sem autoplay</p><p>→ Thumbnails em baixa resolução</p><p>→ Streams em 360p máximo</p></div>}
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
