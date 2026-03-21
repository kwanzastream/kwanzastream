"use client"

import { Button } from "@/components/ui/button"
import { Users, Mail, Phone, ArrowRight } from "lucide-react"

export default function ManagedPage() {
  const benefits = [
    "Account manager dedicado para a tua marca",
    "Estratégia de campanha personalizada",
    "Criativos desenhados pela nossa equipa",
    "Relatórios mensais detalhados",
    "Acesso a formatos premium (patrocínio de canal, torneios)",
    "Integração com eventos e Kwanza Awards",
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <Users className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">Managed Service</h1>
      <p className="text-sm text-muted-foreground">A nossa equipa gere toda a campanha por ti</p>
      <div className="space-y-2">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-2 text-xs"><span className="text-primary mt-0.5">✓</span><span className="text-muted-foreground">{b}</span></div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
        <p className="text-sm font-semibold">Investimento mínimo: 100.000 Kz</p>
        <p className="text-xs text-muted-foreground">Inclui estratégia, execução e relatório</p>
      </div>
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Contacta-nos</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="w-3.5 h-3.5" />ads@kwanzastream.ao</div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Phone className="w-3.5 h-3.5" />+244 923 456 789</div>
        <Button className="w-full gap-1.5">Solicitar proposta <ArrowRight className="w-3 h-3" /></Button>
      </div>
    </div>
  )
}
