"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const SIZES = [{ id: "small", label: "Pequeno", preview: "text-xs" }, { id: "normal", label: "Normal", preview: "text-sm" }, { id: "large", label: "Grande", preview: "text-base" }]
export default function TamanhoTextoPage() {
  const [size, setSize] = useState("normal")
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/acessibilidade"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Type className="w-5 h-5" />Tamanho de Texto</h1></div>
      <div className="space-y-2">{SIZES.map(s => <button key={s.id} onClick={() => { setSize(s.id); setDirty(true) }} className={`w-full text-left p-3 rounded-xl border transition-all ${size === s.id ? "border-primary/30 bg-primary/5" : "border-white/10"}`}><p className={`font-bold ${s.preview}`}>{s.label}</p><p className={`text-muted-foreground ${s.preview}`}>Preview de texto neste tamanho</p></button>)}</div>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
