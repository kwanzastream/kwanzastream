"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft, Radio, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
export default function ModoRadioPage() {
  const [enabled, setEnabled] = useState(false)
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Radio className="w-5 h-5" />Modo Rádio</h1></div>
      <div className="flex items-center justify-between p-3 rounded-xl border border-white/10"><div><p className="text-xs font-bold">Activar Modo Rádio</p><p className="text-[8px] text-muted-foreground">Permite transmissões áudio-only</p></div><button onClick={() => { setEnabled(!enabled); setDirty(true) }} className={`w-10 h-5 rounded-full transition-all ${enabled ? "bg-primary" : "bg-white/20"}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} /></button></div>
      {enabled && <div className="space-y-3 p-3 rounded-xl border border-white/10"><div className="space-y-1"><p className="text-[10px] font-bold">Artwork padrão</p><div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center"><Radio className="w-8 h-8 text-muted-foreground/20" /></div><Button size="sm" className="text-[9px] gap-1"><Upload className="w-3 h-3" />Carregar</Button></div><div className="space-y-1"><p className="text-[10px] font-bold">Géneros musicais</p><Input placeholder="Kuduro, Semba, Afrobeats..." className="bg-white/5 text-xs" onChange={() => setDirty(true)} /></div></div>}
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
