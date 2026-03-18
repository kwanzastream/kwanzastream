import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, BarChart3, Megaphone, Gift } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Para Marcas Angolanas — Kwanza Stream", description: "Proposta de valor para marcas angolanas no Kwanza Stream." }

const FORMATS = [
  { icon: Gift, title: "Drops", desc: "Campanhas de reward. Os viewers ganham prémios da tua marca por assistirem a streams." },
  { icon: Megaphone, title: "Reward Campaigns", desc: "Desafios e missões patrocinadas. Engagement real com audiência jovem." },
  { icon: Target, title: "Patrocínios de canal", desc: "Patrocina criadores angolanos específicos. Branding integrado no canal e nas lives." },
  { icon: BarChart3, title: "Ads", desc: "Pre-roll e mid-roll ads em streams e VODs. Segmentação por categoria e localização." },
]

export default function ParceirosMarcastPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/parceiros" className="hover:text-foreground">Parceiros</Link>
        <span>/</span><span className="text-foreground">Para Marcas</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">Para Marcas Angolanas 🏢</h1>
      <p className="text-muted-foreground mb-10">Chega à audiência jovem angolana. Mais de 65% do tráfego é mobile. 18-34 anos. 100% Angola.</p>

      <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 mb-10">
        <h2 className="font-bold mb-3">A tua audiência está aqui</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><p className="text-2xl font-bold text-primary">65%</p><p className="text-xs text-muted-foreground">Mobile</p></div>
          <div><p className="text-2xl font-bold text-primary">18-34</p><p className="text-xs text-muted-foreground">Faixa etária</p></div>
          <div><p className="text-2xl font-bold text-primary">4.5h</p><p className="text-xs text-muted-foreground">Tempo médio/dia</p></div>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-4">Formatos disponíveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {FORMATS.map((f) => (
          <div key={f.title} className="p-4 rounded-xl border border-border/50 bg-card">
            <f.icon className="w-5 h-5 text-primary mb-2" />
            <h3 className="font-bold text-sm mb-1">{f.title}</h3>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-primary/20 bg-[var(--surface-1)] text-center">
        <h3 className="font-bold text-lg mb-2">Fala connosco 🤝</h3>
        <p className="text-sm text-muted-foreground mb-4">Queremos ajudar a tua marca a crescer com o conteúdo angolano.</p>
        <Link href="/contacto"><Button className="gap-2">Contactar equipa de parcerias <ArrowRight className="w-4 h-4" /></Button></Link>
      </div>
    </div>
  )
}
