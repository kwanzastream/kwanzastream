import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
export const metadata: Metadata = { title: "Para Agências — Kwanza Stream" }
export default function ParceirosAgenciasPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/parceiros" className="hover:text-foreground">Parceiros</Link>
        <span>/</span><span className="text-foreground">Para Agências</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Para Agências 📊</h1>
      <p className="text-muted-foreground mb-10">Campanhas de influência e brand awareness com criadores angolanos verificados.</p>
      <div className="space-y-4 mb-10">
        {[
          { emoji: "📋", title: "Briefing personalizado", desc: "Recebemos o teu briefing e selecionamos os criadores ideais para a tua campanha." },
          { emoji: "📊", title: "Relatórios detalhados", desc: "Métricas de visualizações, engagement, cliques e conversões — tudo no dashboard de parceiros." },
          { emoji: "🎯", title: "Audiência segmentada", desc: "Segmentação por categoria, localização, idade e interesses. Audiência 100% angolana." },
          { emoji: "🤝", title: "Gestão dedicada", desc: "Account manager dedicado para acompanhar toda a campanha do início ao fim." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card">
            <span className="text-2xl shrink-0">{item.emoji}</span>
            <div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-sm text-muted-foreground">{item.desc}</p></div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-xl border border-primary/20 bg-[var(--surface-1)] text-center">
        <h3 className="font-bold text-lg mb-2">Vamos trabalhar juntos</h3>
        <Link href="/contacto"><Button className="gap-2">Contactar<ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  )
}
