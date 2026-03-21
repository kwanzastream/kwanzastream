"use client"

import { useState } from "react"
import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const CATEGORIES = [
  { name: "Gaming", pct: 45, emoji: "🎮" },
  { name: "Música ao Vivo", pct: 20, emoji: "🎵" },
  { name: "Futebol / Girabola", pct: 15, emoji: "⚽" },
  { name: "Just Talking", pct: 10, emoji: "💬" },
  { name: "IRL Angola", pct: 5, emoji: "📸" },
  { name: "Educação / Tech", pct: 3, emoji: "💻" },
  { name: "Culinária", pct: 2, emoji: "🍳" },
]

export default function CategoriaPage() {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (name: string) => setSelected(p => p.includes(name) ? p.filter(n => n !== name) : [...p, name])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={2} />
      <Link href="/ads/criar-campanha/audiencia" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Audiência</Link>
      <h1 className="text-xl font-bold">Categorias de conteúdo</h1>
      <p className="text-xs text-muted-foreground">O teu anúncio aparece em streams destas categorias</p>
      <div className="space-y-2">
        {CATEGORIES.map(c => (
          <button key={c.name} onClick={() => toggle(c.name)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
              selected.includes(c.name) ? "border-primary bg-primary/5" : "border-white/10"
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center text-[10px] ${selected.includes(c.name) ? "bg-primary border-primary text-white" : "border-white/20"}`}>
                {selected.includes(c.name) && "✓"}
              </div>
              <span className="text-sm">{c.emoji} {c.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{c.pct}% dos streams</span>
          </button>
        ))}
      </div>
      <Link href="/ads/criar-campanha/audiencia"><Button className="w-full">Confirmar</Button></Link>
    </div>
  )
}
