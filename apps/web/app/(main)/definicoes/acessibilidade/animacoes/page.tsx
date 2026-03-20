"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function AnimacoesPage() {
  const [reduced, setReduced] = useState(false)
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/acessibilidade"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Sparkles className="w-5 h-5" />Animações</h1></div>
      <div className="flex items-center justify-between p-3 rounded-xl border border-white/10"><div><p className="text-xs font-bold">Reduzir movimento</p><p className="text-[8px] text-muted-foreground">Respeita prefers-reduced-motion do sistema</p></div><button onClick={() => { setReduced(!reduced); setDirty(true) }} className={`w-10 h-5 rounded-full transition-all ${reduced ? "bg-primary" : "bg-white/20"}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${reduced ? "translate-x-5" : "translate-x-0.5"}`} /></button></div>
      <p className="text-[10px] text-muted-foreground">Quando activo: sem transições de página, sem confetti, sem animações de Salos.</p>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
