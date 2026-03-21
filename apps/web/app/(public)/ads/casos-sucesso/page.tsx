"use client"

import { Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const CASES = [
  {
    brand: "Unitel", title: "500% de engagement em drops de dados",
    desc: "Campanha de 2 semanas com drops de 500MB para viewers de Gaming. 15.000 participantes, 92% de redemption rate.",
    stats: [{ label: "Participantes", value: "15.000" }, { label: "Redemption", value: "92%" }, { label: "ROI", value: "3.2x" }],
    quote: "Os drops no Kwanza Stream deram-nos acesso directo à audiência jovem de Luanda — algo que nenhum outro canal consegue.",
  },
  {
    brand: "Jumia Angola", title: "3x mais downloads em torneio patrocinado",
    desc: "Patrocínio de torneio de FIFA com prémios em vouchers Jumia. Downloads da app durante o evento triplicaram vs média mensal.",
    stats: [{ label: "Downloads", value: "+300%" }, { label: "Viewers", value: "8.000" }, { label: "Engagement", value: "45min avg" }],
    quote: "O patrocínio do torneio foi a acção de marketing mais eficaz do nosso Q1 2026.",
  },
  {
    brand: "BAI", title: "Awareness de produto financeiro para jovens",
    desc: "Campanha CPM de banners para promover cartão BAI Directo entre 18-25 anos. CTR 3× superior à média da indústria.",
    stats: [{ label: "Impressões", value: "250.000" }, { label: "CTR", value: "4.1%" }, { label: "Conversões", value: "1.200" }],
    quote: "A segmentação por idade e interesses do Kwanza Stream é exactamente o que precisávamos.",
  },
]

export default function CasosSucessoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <Trophy className="w-10 h-10 text-primary" />
      <h1 className="text-2xl font-bold">Casos de Sucesso</h1>
      <p className="text-sm text-muted-foreground">Marcas angolanas que cresceram com o Kwanza Stream</p>

      <div className="space-y-6">
        {CASES.map((c, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div>
              <p className="text-[10px] text-primary uppercase tracking-wider font-semibold">{c.brand} × Kwanza Stream</p>
              <h2 className="text-lg font-bold mt-1">{c.title}</h2>
              <p className="text-xs text-muted-foreground mt-2">{c.desc}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {c.stats.map((s, j) => (
                <div key={j} className="p-3 rounded-xl bg-primary/5 text-center">
                  <p className="text-sm font-bold text-primary">{s.value}</p>
                  <p className="text-[9px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <blockquote className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">"{c.quote}"</blockquote>
          </div>
        ))}
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">Queres ser o próximo caso de sucesso?</p>
        <Link href="/ads/criar-campanha"><Button className="gap-1.5">Criar campanha <ArrowRight className="w-3 h-3" /></Button></Link>
      </div>
    </div>
  )
}
