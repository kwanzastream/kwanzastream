import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Wallet, Map, Tv, ArrowRight, Twitter, Instagram, Github, Zap, Users, Gift, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { LiveFeed } from "@/components/live-feed"
import { SaloSystem } from "@/components/salo-system"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background angola-pattern overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-[120px]" />
          <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-secondary rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent rounded-full blur-[100px] opacity-30" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          Lives em Luanda, Benguela e toda Angola
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          A Primeira Plataforma de <span className="text-gradient">Streaming Social</span> de Angola
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          Transmite ao vivo, ganha em Kwanzas, conecta-te com toda Angola. O futuro do entretenimento digital angolano começa aqui.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
          <Link href="/auth">
            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Começar Agora
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-bold border-white/20 hover:bg-white/5 bg-transparent">
              Explorar Plataforma
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-3 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          <div className="space-y-1">
            <p className="text-3xl font-black text-primary">10K+</p>
            <p className="text-xs text-muted-foreground">Creators</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-secondary">1M+</p>
            <p className="text-xs text-muted-foreground">Horas Ao Vivo</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-accent">50M Kz+</p>
            <p className="text-xs text-muted-foreground">Pagos</p>
          </div>
        </div>
      </section>

      {/* Live Feed Preview Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-3">
            Lives Acontecendo Agora
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Vê o que está em tendência, descobre novos creators e conecta-te com a comunidade angolana.
          </p>
        </div>
        <LiveFeed />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Tudo que Precisas para Transmitir
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ferramentas completas para criadores e espectadores, construídas para Angola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Live Streaming */}
          <Card className="bg-card/50 border-white/10 hover:border-primary/50 transition-all group overflow-hidden hover:shadow-2xl">
            <CardContent className="pt-8 pb-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Video className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Transmissão Ao Vivo</h3>
              <p className="text-muted-foreground text-sm">
                HD em tempo real com latência ultra-baixa. Modo vídeo ou rádio para todas as situações.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ RTMP ingestão profissional</li>
                <li>✓ Modo Rádio para áudio</li>
                <li>✓ Chat ao vivo integrado</li>
              </ul>
            </CardContent>
          </Card>

          {/* Wallet & Payments */}
          <Card className="bg-card/50 border-white/10 hover:border-secondary/50 transition-all group overflow-hidden hover:shadow-2xl">
            <CardContent className="pt-8 pb-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Wallet Digital</h3>
              <p className="text-muted-foreground text-sm">
                Saldo em Kwanzas com recargas via Multicaixa e USSD Unitel Money.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Recarga instantânea via MCX</li>
                <li>✓ USSD simples e seguro</li>
                <li>✓ Saques rápidos 24h</li>
              </ul>
            </CardContent>
          </Card>

          {/* Gamification */}
          <Card className="bg-card/50 border-white/10 hover:border-accent/50 transition-all group overflow-hidden hover:shadow-2xl">
            <CardContent className="pt-8 pb-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Sistema Salo</h3>
              <p className="text-muted-foreground text-sm">
                Presentes virtuais culturais com animações, sons e ranking de apoiadores.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ 5 níveis de Salos</li>
                <li>✓ Status social com badges</li>
                <li>✓ Leaderboard em tempo real</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* More Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Analytics */}
          <Card className="bg-card/50 border-white/10 hover:border-primary/50 transition-all group">
            <CardContent className="pt-8 pb-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Dashboard Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Métricas em tempo real de engajamento, receita e espectadores para otimizar tuas transmissões.
              </p>
            </CardContent>
          </Card>

          {/* Community */}
          <Card className="bg-card/50 border-white/10 hover:border-secondary/50 transition-all group">
            <CardContent className="pt-8 pb-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Comunidade Angolana</h3>
              <p className="text-muted-foreground text-sm">
                Segue creators, faz amigos, participa em debates e aproveita conexões genuínas.
              </p>
            </CardContent>
          </Card>

          {/* Safety */}
          <Card className="bg-card/50 border-white/10 hover:border-accent/50 transition-all group">
            <CardContent className="pt-8 pb-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">100% Seguro</h3>
              <p className="text-muted-foreground text-sm">
                Autenticação OTP, criptografia de dados e auditoria total de transações financeiras.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Salo System Showcase */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <SaloSystem receiverId="" />
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
            <Tv className="w-full h-full" />
          </div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white">
              Estás Pronto para Dominar a Cena?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-medium text-white/90">
              Junta-te aos melhores creators de Angola e começa a tua jornada hoje mesmo. Transmite, ganha e cria comunidade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="rounded-full bg-black text-white hover:bg-black/80 px-10 h-14 text-lg font-bold shadow-xl"
                >
                  Criar Conta Grátis
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-10 h-14 text-lg font-bold border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Saber Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-lg text-white">
                K
              </div>
              <span className="font-bold text-xl tracking-tighter uppercase">Kwanza Stream</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A plataforma definitiva de streaming social para criadores de conteúdo angolanos. Transmite, ganha e cria comunidade.
            </p>
            <div className="flex items-center gap-4">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="font-bold mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/feed" className="hover:text-primary transition-colors">
                  Feed Principal
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-primary transition-colors">
                  Explorar
                </Link>
              </li>
              <li>
                <Link href="/stream" className="hover:text-primary transition-colors">
                  Transmitir
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-bold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6">Novidades</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Recebe atualizações sobre a economia criativa angolana.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Teu email"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary/50 w-full"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                OK
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground border-t border-white/5 pt-10">
          <p>© 2025 Kwanza Stream. Todos os direitos reservados.</p>
          <p>
            A Primeira Plataforma de Streaming Social de <span className="text-primary font-bold">Angola</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
