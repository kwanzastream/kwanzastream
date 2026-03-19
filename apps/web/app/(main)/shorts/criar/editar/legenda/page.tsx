"use client"
import { ShortEditor } from "@/components/shorts/short-editor"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"

export default function ShortsEditarLegendaPage() {
  const [legenda, setLegenda] = useState("")
  return (
    <div className="py-4 px-4">
      <ShortEditor activeTab="legenda">
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Legendas</h3>
          <textarea value={legenda} onChange={e => setLegenda(e.target.value)} rows={4} placeholder="Escreve a legenda do teu short..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" maxLength={300} />
          <p className="text-[9px] text-muted-foreground text-right">{legenda.length}/300</p>
          <Button variant="outline" size="sm" className="w-full gap-2 text-xs" disabled><Mic className="w-3 h-3" />Legendas automáticas (em breve — Whisper API)</Button>
          <p className="text-[9px] text-muted-foreground text-center">v2: geração automática de legendas em PT-AO via Whisper</p>
        </div>
      </ShortEditor>
    </div>
  )
}
