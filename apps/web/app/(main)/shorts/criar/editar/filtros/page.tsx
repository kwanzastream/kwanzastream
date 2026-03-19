"use client"
import { ShortEditor } from "@/components/shorts/short-editor"
import { useState } from "react"

const FILTERS = [
  { id: "normal", label: "Normal", css: "" },
  { id: "vivo", label: "Vivo", css: "saturate(1.4) contrast(1.1)" },
  { id: "vintage", label: "Vintage", css: "sepia(0.4) contrast(0.9) brightness(1.1)" },
  { id: "escuro", label: "Escuro", css: "brightness(0.7) contrast(1.2)" },
  { id: "brilhante", label: "Brilhante", css: "brightness(1.3) saturate(1.2)" },
  { id: "pb", label: "P&B", css: "grayscale(1)" },
]

export default function ShortsEditarFiltrosPage() {
  const [active, setActive] = useState("normal")
  return (
    <div className="py-4 px-4">
      <ShortEditor activeTab="filtros">
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Filtros visuais</h3>
          <div className="grid grid-cols-3 gap-3">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setActive(f.id)}
                className={`aspect-[9/16] rounded-xl overflow-hidden border-2 transition-all ${active === f.id ? "border-primary" : "border-white/10"}`}>
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-purple-500/20" style={{ filter: f.css }} />
                <p className="text-[9px] font-bold mt-1 text-center">{f.label}</p>
              </button>
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground text-center">CSS filters + canvas · Sem biblioteca pesada</p>
        </div>
      </ShortEditor>
    </div>
  )
}
