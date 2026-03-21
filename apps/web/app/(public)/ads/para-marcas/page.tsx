"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Zap, Users } from "lucide-react"

export default function ParaMarcasPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-center">Publicidade no Kwanza Stream</h1>
      <p className="text-sm text-muted-foreground text-center">Escolhe o modelo ideal para a tua marca</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
          <Zap className="w-8 h-8 text-primary" />
          <h2 className="text-lg font-bold">Self-serve</h2>
          <p className="text-sm text-muted-foreground">Crias e geres a tua campanha</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>✓ Pagamento por impressões/cliques</li><li>✓ Controlo total do orçamento</li><li>✓ Analytics em tempo real</li><li>✓ Mínimo: 10.000 Kz</li>
          </ul>
          <Link href="/ads/para-marcas/self-serve"><Button className="w-full gap-1.5">Começar agora <ArrowRight className="w-3 h-3" /></Button></Link>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 space-y-4">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-lg font-bold">Managed</h2>
          <p className="text-sm text-muted-foreground">A nossa equipa gere a campanha</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>✓ Estratégia personalizada</li><li>✓ Account manager dedicado</li><li>✓ Relatórios mensais</li><li>✓ Mínimo: 100.000 Kz</li>
          </ul>
          <Link href="/ads/para-marcas/managed"><Button variant="outline" className="w-full gap-1.5">Falar com a equipa <ArrowRight className="w-3 h-3" /></Button></Link>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <Link href="/ads/para-marcas/drops" className="hover:text-foreground">Drops para marcas</Link>
        <Link href="/ads/para-marcas/reward-campaigns" className="hover:text-foreground">Reward Campaigns</Link>
      </div>
    </div>
  )
}
