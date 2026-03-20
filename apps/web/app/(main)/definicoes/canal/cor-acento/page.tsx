"use client"
import { useState } from "react"
import { SettingsSaveBar } from "@/components/settings/settings-components"
import { ArrowLeft, Palette, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
const AO_PALETTE = ["#CE1126","#000000","#F9D616","#009739","#1E90FF","#FF6B35","#8B5CF6","#EF4444","#22C55E","#F59E0B"]
export default function CorAcentoPage() {
  const [color, setColor] = useState("#1E90FF")
  const [dirty, setDirty] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/canal"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Palette className="w-5 h-5" />Cor de Destaque</h1></div>
      <div className="flex items-center gap-3"><div className="w-16 h-16 rounded-2xl border-2 border-white/20" style={{ backgroundColor: color }} /><Input value={color} onChange={e => { setColor(e.target.value); setDirty(true) }} className="bg-white/5 font-mono flex-1" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Paleta sugerida</p><div className="flex gap-2 flex-wrap">{AO_PALETTE.map(c => <button key={c} onClick={() => { setColor(c); setDirty(true) }} className={`w-8 h-8 rounded-lg transition-all ${color === c ? "ring-2 ring-white scale-110" : ""}`} style={{ backgroundColor: c }} />)}</div></div>
      <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-2">Preview</p><div className="flex items-center gap-2"><div className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: color }}>Subscrever</div><div className="px-3 py-1 rounded-full text-xs border" style={{ borderColor: color, color }}>Seguir</div></div></div>
      <Button variant="ghost" className="text-xs gap-1"><RotateCcw className="w-3 h-3" />Resetar para cor padrão</Button>
      <SettingsSaveBar dirty={dirty} onSave={() => setDirty(false)} />
    </div>
  )
}
