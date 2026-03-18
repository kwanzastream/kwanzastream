"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { X, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const EFFECTS = [
  { id: "none", label: "Sem efeito", filter: "none" },
  { id: "grayscale", label: "Escala de cinzas", filter: "grayscale(1)" },
  { id: "brightness", label: "Aumentar brilho", filter: "brightness(1.3)" },
  { id: "contrast", label: "Alto contraste", filter: "contrast(1.4)" },
  { id: "sepia", label: "Sépia", filter: "sepia(0.7)" },
]

export default function GoLiveMobileEfeitosPage() {
  const router = useRouter()
  const [activeEffect, setActiveEffect] = useState("none")
  const [watermark, setWatermark] = useState(true)

  return (
    <div className="h-screen flex flex-col bg-black/95">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /><h3 className="text-sm font-bold">Efeitos</h3></div>
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => router.back()}><X className="w-4 h-4" /></Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-2">
          {EFFECTS.map((e) => (
            <button key={e.id} onClick={() => setActiveEffect(e.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${activeEffect === e.id ? "border-primary bg-primary/10" : "border-white/10"}`}>
              <p className="text-sm font-medium">{e.label}</p>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl border border-white/10">
          <Label htmlFor="wm" className="text-xs">Marca de água Kwanza Stream</Label>
          <Switch id="wm" checked={watermark} onCheckedChange={setWatermark} />
        </div>

        <p className="text-[10px] text-muted-foreground text-center">Efeitos complexos (AR, filtros faciais) disponíveis em v2</p>
      </div>
    </div>
  )
}
