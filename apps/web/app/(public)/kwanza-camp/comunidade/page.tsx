"use client"

import { MessageSquare, Plus, TrendingUp, Wrench, DollarSign, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const TOPICS = [
  { title: "Como melhorei o áudio com R1.000", replies: 23, category: "Técnico", hot: false },
  { title: "Streams de Gaming em Angola: onde estão os viewers?", replies: 15, category: "Crescimento", hot: false },
  { title: "Consegui o Afiliado! Aqui está o que fiz", replies: 67, category: "Sucessos", hot: true },
  { title: "Dicas para poupar dados em stream mobile", replies: 31, category: "Técnico", hot: false },
  { title: "Primeiro drop com marca — vale a pena?", replies: 19, category: "Monetização", hot: false },
  { title: "Setup básico para stream em Luanda", replies: 42, category: "Técnico", hot: true },
]

export default function ComunidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fórum do Kwanza Camp</h1>
        <Button size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Novo tópico</Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {[{ n: "Técnico", I: Wrench, c: "text-blue-400" }, { n: "Crescimento", I: TrendingUp, c: "text-green-400" },
          { n: "Monetização", I: DollarSign, c: "text-yellow-400" }, { n: "Sucessos", I: Trophy, c: "text-purple-400" }
        ].map(c => (
          <button key={c.n} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-xs transition-colors">
            <c.I className={`w-3 h-3 ${c.c}`} />{c.n}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {TOPICS.map((t, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors cursor-pointer flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.title}</p>
              <p className="text-[10px] text-muted-foreground">{t.replies} respostas · {t.category}</p>
            </div>
            {t.hot && <Badge className="bg-red-500/10 text-red-400 text-[9px]">🔥</Badge>}
          </div>
        ))}
      </div>
    </div>
  )
}
