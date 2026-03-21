"use client"

import { useState } from "react"
import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const INTERESTS = [
  { name: "Gaming / Tecnologia", emoji: "🎮" },
  { name: "Música Angolana", emoji: "🎵" },
  { name: "Desporto", emoji: "⚽" },
  { name: "Empreendedorismo", emoji: "💼" },
  { name: "Moda / Estilo de Vida", emoji: "👗" },
  { name: "Educação", emoji: "📚" },
  { name: "Arte / Cultura", emoji: "🎨" },
  { name: "Humor / Entretenimento", emoji: "😂" },
]

export default function InteressesPage() {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (name: string) => setSelected(p => p.includes(name) ? p.filter(n => n !== name) : [...p, name])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={2} />
      <Link href="/ads/criar-campanha/audiencia" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Audiência</Link>
      <h1 className="text-xl font-bold">Interesses dos utilizadores</h1>
      <p className="text-xs text-muted-foreground">Interesses declarados pelos utilizadores no registo</p>
      <div className="grid grid-cols-2 gap-2">
        {INTERESTS.map(i => (
          <button key={i.name} onClick={() => toggle(i.name)}
            className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
              selected.includes(i.name) ? "border-primary bg-primary/5" : "border-white/10"
            }`}>
            <div className={`w-4 h-4 rounded border flex items-center justify-center text-[9px] ${selected.includes(i.name) ? "bg-primary border-primary text-white" : "border-white/20"}`}>
              {selected.includes(i.name) && "✓"}
            </div>
            <span className="text-xs">{i.emoji} {i.name}</span>
          </button>
        ))}
      </div>
      <Link href="/ads/criar-campanha/audiencia"><Button className="w-full">Confirmar</Button></Link>
    </div>
  )
}
