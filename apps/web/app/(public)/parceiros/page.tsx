import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, BarChart3, Megaphone, Target } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Parceiros — Kwanza Stream",
  description: "Torna-te parceiro do Kwanza Stream. Marcas, agências, publishers e tecnologia.",
}

const PARTNER_TYPES = [
  { href: "/parceiros/marcas", emoji: "🏢", title: "Para Marcas Angolanas", desc: "Unitel, BAI, Jumia, Refriango, TAAG — chega à audiência jovem angolana com formatos nativos.", badge: "Popular" },
  { href: "/parceiros/agencias", emoji: "📊", title: "Para Agências", desc: "Campanhas de influência e brand awareness com criadores angolanos verificados.", badge: null },
  { href: "/parceiros/publishers", emoji: "🎮", title: "Para Publishers", desc: "Lança jogos, eventos e torneios na comunidade gaming angolana.", badge: null },
  { href: "/parceiros/tecnologia", emoji: "⚡", title: "Para Parceiros Tecnológicos", desc: "Integrações, APIs e parcerias de infraestrutura para crescer juntos.", badge: null },
]

const STATS = [
  { value: "65%", label: "Audiência mobile" },
  { value: "18-34", label: "Faixa etária dominante" },
  { value: "10k+", label: "Utilizadores activos" },
  { value: "50+", label: "Streams por dia" },
]

export default function ParceirosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#CE1126]/10 via-background to-[#F9D616]/5 py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">🤝 Parcerias</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Cresce com o Kwanza Stream</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">A plataforma angolana de streaming ao vivo. Audiência jovem, engajada e 100% angolana.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-card border border-border/50">
                <p className="text-xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner types */}
      <section className="max-w-screen-xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Tipos de parceria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARTNER_TYPES.map((p) => (
            <Link key={p.href} href={p.href} className="group block">
              <div className="rounded-xl border border-border/50 hover:border-primary/40 transition-all p-6 bg-card card-hover h-full relative">
                {p.badge && <Badge className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px]">{p.badge}</Badge>}
                <span className="text-3xl block mb-3">{p.emoji}</span>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
                <span className="text-xs text-primary flex items-center gap-1">Saber mais <ArrowRight className="w-3 h-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/20 py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Queres ser parceiro?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Entra em contacto connosco e vamos construir algo grande para Angola.</p>
          <Link href="/contacto"><Button size="lg" className="gap-2">Fala connosco <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </section>
    </div>
  )
}
