"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function CoresPage() {
  const [contrast, setContrast] = useState(false)
  const [colorblind, setColorblind] = useState("none")
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/acessibilidade"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Cores</h1></div>
      <div className="flex items-center justify-between p-3 rounded-xl border border-white/10"><div><p className="text-xs font-bold">Modo alto contraste</p></div><button onClick={() => { setContrast(!contrast); setDirty(true) }} className={`w-10 h-5 rounded-full transition-all ${contrast ? "bg-primary" : "bg-white/20"}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${contrast ? "translate-x-5" : "translate-x-0.5"}`} /></button></div>
      <div className="space-y-2"><p className="text-[10px] font-bold">Daltonismo</p>{["none","protanopia","deuteranopia","tritanopia"].map(c => <label key={c} className="flex items-center gap-2 p-2 rounded-xl border border-white/10 cursor-pointer"><input type="radio" name="cb" checked={colorblind === c} onChange={() => { setColorblind(c); setDirty(true) }} /><span className="text-xs capitalize">{c === "none" ? "Sem ajuste" : c}</span></label>)}</div>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
