"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { MonitorPlay } from "lucide-react"
export default function QualidadeVideoPage() {
  const [quality, setQuality] = useState("auto")
  const [mobile, setMobile] = useState("auto")
  const [dirty, setDirty] = useState(false)
  const OPTS = [{ id: "auto", label: "Auto (recomendado)" }, { id: "720p", label: "720p" }, { id: "480p", label: "480p" }, { id: "360p", label: "360p" }]
  const MOPTS = [{ id: "auto", label: "Auto" }, { id: "360p", label: "360p (recomendado)" }, { id: "audio", label: "Só áudio" }]
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-lg font-bold flex items-center gap-2"><MonitorPlay className="w-5 h-5" />Qualidade de Vídeo</h1>
      <div className="space-y-2"><p className="text-[10px] font-bold">Qualidade por defeito</p>{OPTS.map(o => <label key={o.id} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${quality === o.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><input type="radio" name="q" checked={quality === o.id} onChange={() => { setQuality(o.id); setDirty(true) }} /><span className="text-xs">{o.label}</span></label>)}</div>
      <div className="space-y-2"><p className="text-[10px] font-bold">Qualidade em dados móveis</p>{MOPTS.map(o => <label key={o.id} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${mobile === o.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><input type="radio" name="mq" checked={mobile === o.id} onChange={() => { setMobile(o.id); setDirty(true) }} /><span className="text-xs">{o.label}</span></label>)}</div>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
