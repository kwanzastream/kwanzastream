"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Target, ArrowRight } from "lucide-react"

export default function RewardCampaignsPage() {
  const mechanics = [
    { title: "Assiste + partilha", desc: "Viewer assiste stream e partilha no WhatsApp → ganha prémio" },
    { title: "Subscreve + assiste", desc: "Subscreve canal + assiste X minutos → prémio maior" },
    { title: "Torneio patrocinado", desc: "Participa em torneio da marca → prémios para vencedores" },
    { title: "Hashtag no chat", desc: "Usa hashtag da marca no chat → entra no sorteio" },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <Target className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">Reward Campaigns</h1>
      <p className="text-sm text-muted-foreground">Campanhas de engagement premium para marcas que querem interacção real</p>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Mecânicas disponíveis</h2>
        {mechanics.map((m, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 space-y-1">
            <p className="text-sm font-medium">{m.title}</p>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
        <p className="text-sm font-semibold">Investimento</p>
        <p className="text-xs text-muted-foreground">Revenue share: 70% criador / 30% plataforma</p>
        <p className="text-xs text-muted-foreground">Mínimo de investimento: 50.000 Kz</p>
      </div>

      <Link href="/ads/criar-campanha"><Button className="w-full gap-1.5">Criar Reward Campaign <ArrowRight className="w-3 h-3" /></Button></Link>
    </div>
  )
}
