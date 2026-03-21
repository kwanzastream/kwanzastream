"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gift, ArrowRight } from "lucide-react"

export default function DropsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <Gift className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">Drops para Marcas</h1>
      <p className="text-sm text-muted-foreground">Viewers ganham recompensas da tua marca ao assistir streams</p>

      <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-3">
        <h2 className="text-sm font-semibold">Exemplo: Unitel × Kwanza Stream</h2>
        <p className="text-xs text-muted-foreground">"Assiste 2h de Gaming → ganha 500MB"</p>
        <div className="flex gap-4 text-[10px] text-muted-foreground">
          <span>🎫 5.000 codes</span><span>📅 2 semanas</span><span>👥 3.000–8.000 viewers</span>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Como funciona</h2>
        {["Defines o prémio (dados, voucher, desconto)", "Forneces os códigos de resgate", "A plataforma distribui automaticamente", "Recebes relatório de participação"].map((s, i) => (
          <div key={i} className="flex gap-3 text-xs text-muted-foreground"><span className="text-primary font-bold">{i + 1}.</span>{s}</div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/ads/criar-campanha"><Button className="gap-1.5">Criar Drop <ArrowRight className="w-3 h-3" /></Button></Link>
        <Link href="/ads/casos-sucesso"><Button variant="outline">Ver case studies</Button></Link>
      </div>
    </div>
  )
}
