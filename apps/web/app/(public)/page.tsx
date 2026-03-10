import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Play, Shield, Smartphone, Radio, Users, ArrowRight } from "lucide-react"
import { HomeLiveStreams } from "@/components/home/home-live-streams"
import { HomeCategories } from "@/components/home/home-categories"
import { HomeCreators } from "@/components/home/home-creators"

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#CE1126]/20 via-background to-background pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9D616]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">🇦🇴 A plataforma angolana de streaming</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Angola ao vivo,{" "}<span className="text-primary">a qualquer hora</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Descobre criadores angolanos. Assiste a gaming, kuduro, futebol e muito mais. Transmite para o mundo a partir de Angola.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/registar"><Button size="lg" className="gap-2"><Zap className="w-4 h-4" />Criar conta grátis</Button></Link>
              <Link href="/ao-vivo"><Button size="lg" variant="outline" className="gap-2"><Play className="w-4 h-4" />Ver streams ao vivo</Button></Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-border/50">
              {[
                { label: "Criadores activos", value: "500+" },
                { label: "Streams por dia", value: "50+" },
                { label: "Espectadores únicos", value: "10k+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STREAMS AO VIVO */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CE1126] rounded-full animate-pulse" />
            <h2 className="text-xl font-bold">Ao Vivo Agora</h2>
          </div>
          <Link href="/ao-vivo" className="text-sm text-primary hover:underline flex items-center gap-1">Ver todos<ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <HomeLiveStreams />
      </section>

      {/* CATEGORIAS */}
      <section className="bg-muted/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Explora por Categoria</h2>
            <Link href="/explorar/categorias" className="text-sm text-primary hover:underline flex items-center gap-1">Ver todas<ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <HomeCategories />
        </div>
      </section>

      {/* CRIADORES */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Criadores Angolanos</h2>
          <Link href="/explorar/canais" className="text-sm text-primary hover:underline flex items-center gap-1">Explorar canais<ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <HomeCreators />
      </section>

      {/* PROPOSTA DE VALOR */}
      <section className="bg-muted/20 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3">Feito para Angola</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">Não é uma cópia. É uma plataforma construída de raiz para a realidade angolana.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: "Mobile primeiro", desc: "Optimizado para redes angolanas. Funciona em 3G. Modo de baixo consumo de dados incluído." },
              { icon: Shield, title: "Pagamentos locais", desc: "Multicaixa Express, E-Kwanza e Unitel Money. Sem cartão internacional." },
              { icon: Radio, title: "Modo Rádio", desc: "Áudio apenas. Ideal para DJs, músicos e podcasters. 10x menos dados." },
              { icon: Users, title: "Salos — doações", desc: "Apoia os teus criadores favoritos directamente em kwanzas." },
              { icon: Zap, title: "Categorias angolanas", desc: "Kuduro, Semba, Girabola, Just Talking AO e muito mais." },
              { icon: Play, title: "Transmite de qualquer lugar", desc: "Do telemóvel, do computador ou de software profissional como OBS." },
            ].map((feature) => (
              <div key={feature.title} className="bg-background rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar? 🇦🇴</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">Junta-te a milhares de angolanos que já estão a transmitir e assistir na Kwanza Stream.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/registar"><Button size="lg">Criar conta grátis<ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
          <Link href="/ao-vivo"><Button size="lg" variant="outline">Explorar sem conta</Button></Link>
        </div>
      </section>

    </div>
  )
}
