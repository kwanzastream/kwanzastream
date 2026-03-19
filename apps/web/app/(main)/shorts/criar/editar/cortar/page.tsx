"use client"
import { ShortEditor } from "@/components/shorts/short-editor"
import { useState } from "react"

export default function ShortsEditarCortarPage() {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(30)
  return (
    <div className="py-4 px-4">
      <ShortEditor activeTab="cortar">
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Cortar vídeo</h3>
          <div className="h-12 bg-white/5 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 h-full bg-primary/20 rounded" style={{ left: `${(start / 60) * 100}%`, width: `${((end - start) / 60) * 100}%` }}>
              <div className="absolute left-0 top-0 w-1 h-full bg-primary cursor-ew-resize rounded-l" />
              <div className="absolute right-0 top-0 w-1 h-full bg-primary cursor-ew-resize rounded-r" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <div>Início: <input type="number" value={start} onChange={e => setStart(Math.max(0, +e.target.value))} className="w-12 bg-white/5 border border-white/10 rounded px-1 text-center" />s</div>
            <div className="font-bold text-primary">{end - start}s</div>
            <div>Fim: <input type="number" value={end} onChange={e => setEnd(Math.min(60, +e.target.value))} className="w-12 bg-white/5 border border-white/10 rounded px-1 text-center" />s</div>
          </div>
          <p className="text-[9px] text-muted-foreground text-center">Duração: 5–60 segundos · Processamento via servidor (FFmpeg)</p>
        </div>
      </ShortEditor>
    </div>
  )
}
