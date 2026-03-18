import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, Radio, DollarSign, Users, Smartphone, MessageSquare, Gift, Headphones } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Como Funciona — Kwanza Stream",
  description: "Descobre como funciona o Kwanza Stream. Para viewers, streamers e criadores de conteúdo angolano.",
}

const SECTIONS = [
  {
    href: "/como-funciona/viewers",
    icon: Eye, title: "Para Viewers", emoji: "👀",
    desc: "Descobre como ver streams, seguir criadores e interagir com a comunidade.",
  },
  {
    href: "/como-funciona/streamers",
    icon: Radio, title: "Para Streamers", emoji: "📡",
    desc: "Aprende a criar o teu canal, transmitir ao vivo e construir a tua audiência.",
  },
  {
    href: "/como-funciona/monetizacao",
    icon: DollarSign, title: "Monetização", emoji: "💰",
    desc: "Conhece todas as formas de ganhar dinheiro como criador no Kwanza Stream.",
  },
  {
    href: "/como-funciona/salos",
    icon: Gift, title: "O que são Salos", emoji: "🎁",
    desc: "A moeda virtual da plataforma. Compra, envia e apoia os teus criadores favoritos.",
  },
  {
    href: "/como-funciona/subscricoes",
    icon: Users, title: "Subscrições", emoji: "⭐",
    desc: "Subscreve canais, recebe badges exclusivas e apoia criadores todos os meses.",
  },
  {
    href: "/como-funciona/clips",
    icon: MessageSquare, title: "Clips", emoji: "✂️",
    desc: "Cria clips de momentos épicos e partilha no WhatsApp.",
  },
  {
    href: "/como-funciona/shorts",
    icon: Smartphone, title: "Shorts", emoji: "📱",
    desc: "Conteúdo curto vertical. Menos de 60 segundos. Mobile-first.",
  },
  {
    href: "/como-funciona/mobile",
    icon: Smartphone, title: "Mobile", emoji: "📲",
    desc: "Transmite e assiste directamente do teu telemóvel. Optimizado para redes angolanas.",
  },
]

export default function ComoFuncionaPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Como funciona o Kwanza Stream</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Tudo o que precisas de saber sobre a plataforma. Desde criar conta até começar a ganhar.</p>
      </div>

      {/* Quick steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { step: "1", title: "Cria conta", desc: "Regista-te com o teu número angolano. É grátis e demora 30 segundos.", color: "from-[#CE1126]/20 to-[#CE1126]/5" },
          { step: "2", title: "Explora ou transmite", desc: "Descobre conteúdo angolano ou vai ao vivo com o teu próprio canal.", color: "from-[#F9D616]/20 to-[#F9D616]/5" },
          { step: "3", title: "Interage e ganha", desc: "Envia Salos, subscreve canais, ou monetiza o teu conteúdo.", color: "from-[#009739]/20 to-[#009739]/5" },
        ].map((item) => (
          <div key={item.step} className="relative rounded-xl p-6 border border-border/50 bg-card">
            <div className="absolute top-4 right-4 text-4xl font-black text-muted/30">{item.step}</div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
              <span className="text-2xl">{item.step === "1" ? "👤" : item.step === "2" ? "📺" : "💰"}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Section grid */}
      <h2 className="text-xl font-bold mb-6 text-center">Explora por tópico</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} className="group block">
            <div className="rounded-xl border border-border/50 hover:border-primary/40 transition-all p-5 bg-card card-hover h-full">
              <span className="text-3xl block mb-3">{section.emoji}</span>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{section.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
              <span className="text-xs text-primary mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Saber mais <ArrowRight className="w-3 h-3" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
