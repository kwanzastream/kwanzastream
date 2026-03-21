"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, BarChart3, Settings, CreditCard, ArrowRight } from "lucide-react"

export default function SelfServePage() {
  const steps = [
    { icon: Settings, title: "1. Cria a campanha", desc: "Escolhe objectivo, audiência e criativo em minutos" },
    { icon: CreditCard, title: "2. Define o orçamento", desc: "Mínimo 10.000 Kz. Paga por impressões ou cliques" },
    { icon: Zap, title: "3. Campanha live", desc: "Após aprovação (24-48h), a campanha entra em live" },
    { icon: BarChart3, title: "4. Acompanha resultados", desc: "Analytics em tempo real: impressões, cliques, CTR" },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Self-serve Advertising</h1>
      <p className="text-sm text-muted-foreground">Controlo total da tua campanha, do início ao fim</p>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/10">
            <s.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div><p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-muted-foreground">{s.desc}</p></div>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center space-y-2">
        <p className="text-sm font-semibold">Preços indicativos</p>
        <div className="flex justify-center gap-6 text-xs text-muted-foreground">
          <span>CPM: ~250 Kz</span><span>CPC: ~50 Kz</span><span>Mínimo: 10.000 Kz</span>
        </div>
      </div>
      <Link href="/ads/criar-campanha"><Button className="w-full gap-1.5">Criar campanha <ArrowRight className="w-3 h-3" /></Button></Link>
    </div>
  )
}
