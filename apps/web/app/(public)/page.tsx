import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Play, Radio, Users, ArrowRight, Tv, DollarSign, Headphones } from "lucide-react"
import { HomeLiveStreams } from "@/components/home/home-live-streams"
import { HomeCategories } from "@/components/home/home-categories"
import { HomeCreators } from "@/components/home/home-creators"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kwanza Stream — A tua plataforma. Angola ao vivo.",
  description: "Descobre criadores angolanos, assiste a gaming, kuduro, futebol e muito mais. Transmite ao vivo para o mundo a partir de Angola.",
  openGraph: {
    title: "Kwanza Stream — A tua plataforma. Angola ao vivo.",
    description: "A plataforma angolana de streaming ao vivo. Gaming, Música, Futebol e muito mais.",
    type: "website",
    locale: "pt_AO",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Kwanza Stream — Angola ao vivo" }],
  },
}

const ANGOLA_CATEGORIES = [
  { slug: "gaming", emoji: "🎮", label: "Gaming Angola", live: 12 },
  { slug: "musica", emoji: "🎵", label: "Música ao Vivo", live: 8 },
  { slug: "futebol", emoji: "⚽", label: "Futebol Angola", live: 5 },
  { slug: "just-talking", emoji: "🎤", label: "Just Talking PT-AO", live: 15 },
  { slug: "irl", emoji: "📍", label: "IRL Angola", live: 4 },
  { slug: "radio", emoji: "📻", label: "Modo Rádio", live: 6 },
  { slug: "negocios", emoji: "💼", label: "Negócios", live: 3 },
  { slug: "criatividade", emoji: "🎨", label: "Criatividade & Arte", live: 2 },
]

const HOW_IT_WORKS = [
  { icon: Tv, title: "Transmite", desc: "Usa o telemóvel, OBS ou o browser. Vai ao vivo em segundos, sem complicações.", color: "from-[#CE1126]/20 to-[#CE1126]/5" },
  { icon: Users, title: "Conecta", desc: "Interage com o teu público via chat, recebe Salos e constrói uma comunidade fiel.", color: "from-[#F9D616]/20 to-[#F9D616]/5" },
  { icon: DollarSign, title: "Ganha", desc: "Monetiza com Salos, subscrições e parcerias com marcas angolanas. Recebe em Kwanzas.", color: "from-[#009739]/20 to-[#009739]/5" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#CE1126]/15 via-background to-background pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9D616]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#CE1126]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary gap-1.5 py-1">
              <span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full animate-pulse" />
              🇦🇴 A plataforma angolana de streaming
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              A tua plataforma.{" "}<span className="text-gradient">Angola ao vivo.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Descobre criadores angolanos. Assiste a gaming, kuduro, futebol e muito mais. Transmite para o mundo a partir de Angola.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/explorar"><Button size="lg" className="gap-2"><Play className="w-4 h-4" />Explorar</Button></Link>
              <Link href="/como-funciona/streamers"><Button size="lg" variant="outline" className="gap-2"><Radio className="w-4 h-4" />Começar a transmitir</Button></Link>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-2 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#CE1126] rounded-full animate-pulse" />
                <span className="font-medium text-foreground">24</span> pessoas ao vivo agora
              </span>
              <span className="text-border">·</span>
              <span><span className="font-medium text-foreground">1.2k</span> a assistir</span>
            </div>
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-border/50">
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

      {/* ============ STREAMS AO VIVO ============ */}
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

      {/* ============ CATEGORIAS ANGOLANAS ============ */}
      <section className="bg-muted/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Categorias Angolanas 🇦🇴</h2>
              <p className="text-sm text-muted-foreground mt-1">Conteúdo feito por angolanos, para angolanos</p>
            </div>
            <Link href="/explorar/categorias" className="text-sm text-primary hover:underline flex items-center gap-1">Ver todas<ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {ANGOLA_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="group">
                <div className="relative rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all bg-gradient-to-br from-[#CE1126]/10 via-background to-[#F9D616]/5 p-4 h-24 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.emoji}</span>
                    {cat.live > 0 && (
                      <span className="flex items-center gap-1 text-[10px] text-[#CE1126]">
                        <span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full animate-pulse" />{cat.live}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EM DESTAQUE (curated) ============ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F9D616]" />
            <h2 className="text-xl font-bold">Em Destaque</h2>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-primary/5 to-muted/30 p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="aspect-video rounded-xl bg-muted relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-transparent">
                <div className="text-center">
                  <Play className="w-12 h-12 text-white/70 mx-auto mb-2" />
                  <p className="text-sm text-white/50">Stream em destaque</p>
                </div>
              </div>
              <Badge className="absolute top-3 left-3 bg-[#CE1126] text-white text-xs">AO VIVO</Badge>
            </div>
            <div>
              <Badge variant="outline" className="mb-3 text-[#F9D616] border-[#F9D616]/30">⭐ Canal curado pelo admin</Badge>
              <h3 className="text-2xl font-bold mb-2">Descobre o melhor de Angola</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Todos os dias selecionamos o conteúdo mais relevante da plataforma. De gaming a kuduro, de futebol a debates — o melhor está aqui.
              </p>
              <Link href="/ao-vivo"><Button className="gap-2"><Play className="w-4 h-4" />Assistir agora</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIAS (global) ============ */}
      <section className="bg-muted/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Explora por Categoria</h2>
            <Link href="/explorar/categorias" className="text-sm text-primary hover:underline flex items-center gap-1">Ver todas<ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <HomeCategories />
        </div>
      </section>

      {/* ============ CRIADORES EM ASCENSÃO ============ */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Criadores em Ascensão 🚀</h2>
            <p className="text-sm text-muted-foreground mt-1">Streamers com menos de 3 meses na plataforma</p>
          </div>
          <Link href="/explorar/canais" className="text-sm text-primary hover:underline flex items-center gap-1">Explorar canais<ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <HomeCreators />
      </section>

      {/* ============ CTA CRIADORES ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#CE1126]/10 via-transparent to-[#F9D616]/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <div className="rounded-2xl border border-primary/20 bg-[var(--surface-1)] p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Começa a transmitir hoje. <span className="text-primary">É grátis.</span></h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Junta-te a centenas de criadores angolanos. Transmite do telemóvel ou do computador, constrói a tua comunidade e começa a ganhar.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/registar"><Button size="lg" className="gap-2"><Radio className="w-4 h-4" />Criar canal grátis</Button></Link>
              <Link href="/como-funciona/streamers"><Button size="lg" variant="outline">Como funciona</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section className="bg-muted/20 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3">Como funciona</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">Três passos simples para começar a tua jornada no Kwanza Stream</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="relative bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-colors group">
                <div className="absolute top-4 right-4 text-4xl font-black text-muted/30">{i + 1}</div>
                <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROPOSTA DE VALOR ============ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-3">Feito para Angola 🇦🇴</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">Não é uma cópia. É uma plataforma construída de raiz para a realidade angolana.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "📱", title: "Mobile primeiro", desc: "Optimizado para redes angolanas. Funciona em 3G. Modo de baixo consumo de dados incluído." },
            { icon: "💳", title: "Pagamentos locais", desc: "Multicaixa Express, E-Kwanza e Unitel Money. Sem cartão internacional." },
            { icon: "📻", title: "Modo Rádio", desc: "Áudio apenas. Ideal para DJs, músicos e podcasters. 10x menos dados." },
            { icon: "💰", title: "Salos — doações", desc: "Apoia os teus criadores favoritos directamente em kwanzas." },
            { icon: "🇦🇴", title: "Categorias angolanas", desc: "Kuduro, Semba, Girabola, Just Talking AO e muito mais." },
            { icon: "🎬", title: "Transmite de qualquer lugar", desc: "Do telemóvel, do computador ou de software profissional como OBS." },
          ].map((feature) => (
            <div key={feature.title} className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-colors">
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
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
