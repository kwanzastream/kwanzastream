"use client"

import { useState } from "react"
import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const PROVINCES = [
  { name: "Luanda", pct: 58 }, { name: "Benguela", pct: 12 }, { name: "Huambo", pct: 7 },
  { name: "Cabinda", pct: 5 }, { name: "Lunda Norte", pct: 3 }, { name: "Lunda Sul", pct: 2 },
  { name: "Malanje", pct: 2 }, { name: "Uíge", pct: 2 }, { name: "Kwanza Norte", pct: 1 },
  { name: "Kwanza Sul", pct: 1 }, { name: "Bengo", pct: 1 }, { name: "Zaire", pct: 1 },
  { name: "Moxico", pct: 1 }, { name: "Bié", pct: 1 }, { name: "Cuando Cubango", pct: 0.5 },
  { name: "Cunene", pct: 0.5 }, { name: "Huíla", pct: 0.5 }, { name: "Namibe", pct: 0.3 },
  { name: "Icolo e Bengo", pct: 0.2 }, { name: "Cuanza Norte", pct: 0.1 }, { name: "Luanda Sul", pct: 0.1 },
]

export default function ProvinciaPage() {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (name: string) => setSelected(p => p.includes(name) ? p.filter(n => n !== name) : [...p, name])
  const totalPct = PROVINCES.filter(p => selected.includes(p.name)).reduce((s, p) => s + p.pct, 0)
  const reach = Math.round(45000 * totalPct / 100)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={2} />
      <Link href="/ads/criar-campanha/audiencia" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Audiência</Link>
      <h1 className="text-xl font-bold">Províncias alvo</h1>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-[10px]" onClick={() => setSelected(PROVINCES.map(p => p.name))}>Seleccionar todas</Button>
        <Button variant="outline" size="sm" className="text-[10px]" onClick={() => setSelected([])}>Limpar</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {PROVINCES.map(p => (
          <button key={p.name} onClick={() => toggle(p.name)}
            className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
              selected.includes(p.name) ? "border-primary bg-primary/5" : "border-white/10"
            }`}>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border flex items-center justify-center text-[9px] ${selected.includes(p.name) ? "bg-primary border-primary text-white" : "border-white/20"}`}>
                {selected.includes(p.name) && "✓"}
              </div>
              <span className="text-xs">{p.name}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{p.pct}%</span>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center text-xs">
          Alcance estimado: <span className="font-bold text-primary">{reach.toLocaleString()}</span> utilizadores
        </div>
      )}

      <Link href="/ads/criar-campanha/audiencia"><Button className="w-full">Confirmar selecção</Button></Link>
    </div>
  )
}
