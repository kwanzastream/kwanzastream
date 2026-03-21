"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CampaignWizardSteps } from "@/components/ads/campaign-wizard-steps"
import { Button } from "@/components/ui/button"
import { ArrowRight, Megaphone, Gift, Target, Users } from "lucide-react"

const OBJECTIVES = [
  { id: "awareness", icon: Megaphone, title: "Awareness", desc: "Aumentar reconhecimento da marca" },
  { id: "drops", icon: Gift, title: "Drops", desc: "Entregar recompensas físicas/digitais" },
  { id: "conversion", icon: Target, title: "Conversão", desc: "Levar viewers a uma acção específica" },
  { id: "sponsorship", icon: Users, title: "Patrocínio de canal", desc: "Associar marca a criador específico" },
]

export default function ObjectivoPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const router = useRouter()

  const handleNext = () => {
    if (!selected) return
    sessionStorage.setItem("ads_objective", selected)
    router.push("/ads/criar-campanha/audiencia")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <CampaignWizardSteps currentStep={1} />
      <h1 className="text-xl font-bold">Qual é o teu objectivo?</h1>
      <div className="space-y-3">
        {OBJECTIVES.map(o => (
          <button key={o.id} onClick={() => setSelected(o.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
              selected === o.id ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20"
            }`}>
            <o.icon className={`w-6 h-6 shrink-0 ${selected === o.id ? "text-primary" : "text-muted-foreground"}`} />
            <div><p className="text-sm font-semibold">{o.title}</p><p className="text-xs text-muted-foreground">{o.desc}</p></div>
          </button>
        ))}
      </div>
      <Button onClick={handleNext} disabled={!selected} className="w-full gap-1.5">Seguinte <ArrowRight className="w-3 h-3" /></Button>
    </div>
  )
}
