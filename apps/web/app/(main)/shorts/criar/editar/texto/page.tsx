"use client"
import { ShortEditor } from "@/components/shorts/short-editor"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const FONTS = ["Rajdhani", "Inter", "Outfit", "Poppins"]
const COLORS = ["#CE1126", "#FCD116", "#000000", "#FFFFFF", "#FF6B6B", "#4ECDC4", "#A855F7"]

export default function ShortsEditarTextoPage() {
  const [texts, setTexts] = useState<{ text: string; font: string; color: string }[]>([])
  const [current, setCurrent] = useState({ text: "", font: "Rajdhani", color: "#FFFFFF" })

  const addText = () => { if (current.text.trim()) { setTexts([...texts, current]); setCurrent({ text: "", font: "Rajdhani", color: "#FFFFFF" }) } }

  return (
    <div className="py-4 px-4">
      <ShortEditor activeTab="texto">
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Adicionar texto</h3>
          <Input value={current.text} onChange={e => setCurrent({ ...current, text: e.target.value })} placeholder="Escreve aqui..." maxLength={100} />
          <div className="flex gap-2">
            <div className="space-y-1.5 flex-1">
              <label className="text-[9px] text-muted-foreground">Fonte</label>
              <div className="flex gap-1 flex-wrap">{FONTS.map(f => <button key={f} onClick={() => setCurrent({ ...current, font: f })} className={`px-2 py-1 rounded text-[10px] border ${current.font === f ? "border-primary bg-primary/10" : "border-white/10"}`} style={{ fontFamily: f }}>{f}</button>)}</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] text-muted-foreground">Cor</label>
            <div className="flex gap-2">{COLORS.map(c => <button key={c} onClick={() => setCurrent({ ...current, color: c })} className={`w-6 h-6 rounded-full border-2 ${current.color === c ? "border-primary scale-125" : "border-white/20"}`} style={{ backgroundColor: c }} />)}</div>
          </div>
          <Button size="sm" className="w-full gap-1 text-xs" onClick={addText} disabled={!current.text.trim()}><Plus className="w-3 h-3" />Adicionar texto</Button>
          {texts.length > 0 && <div className="space-y-1">{texts.map((t, i) => <div key={i} className="flex items-center gap-2 px-2 py-1 bg-white/[0.04] rounded text-xs" style={{ fontFamily: t.font, color: t.color }}>{t.text}<button onClick={() => setTexts(texts.filter((_, j) => j !== i))} className="ml-auto text-muted-foreground text-[9px]">✕</button></div>)}</div>}
          <p className="text-[9px] text-muted-foreground text-center">Cores da bandeira AO incluídas · Drag para posicionar (em breve)</p>
        </div>
      </ShortEditor>
    </div>
  )
}
