"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Printer, Download, ChevronRight, Scale, Info, ShieldCheck, CreditCard, UserX } from "lucide-react"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "intro", title: "Introdução", icon: Info },
  { id: "account", title: "Termos de Conta", icon: Scale },
  { id: "content", title: "Diretrizes de Conteúdo", icon: ShieldCheck },
  { id: "money", title: "Regras de Monetização", icon: CreditCard },
  { id: "termination", title: "Cessação", icon: UserX },
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = React.useState("intro")

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg">K</div>
            <h1 className="font-bold text-lg hidden sm:block">Centro Jurídico</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-white"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-2" /> <span className="hidden sm:inline">Imprimir</span>
            </Button>
            <Button variant="outline" size="sm" className="border-white/10 bg-transparent font-bold">
              <Download className="h-4 w-4 mr-2" /> PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 p-6 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Navegação</h3>
              <nav className="space-y-1">
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <section.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            <Separator className="bg-white/10" />

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
              <h4 className="text-xs font-bold text-primary flex items-center gap-2">
                <ShieldCheck className="h-3 w-3" /> Actualização Recente
              </h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Actualizámos a nossa política de levantamentos via Multicaixa Express. Por favor, reveja a secção 4.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 space-y-16">
          <div className="max-w-3xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Termos e Condições</h2>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <p>Última actualização: 15 de Março de 2025</p>
                <span>•</span>
                <p>Data efectiva: 1 de Abril de 2025</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Bem-vindo à Kwanza Stream. Estes Termos e Condições regem o seu acesso e uso da nossa plataforma. Ao
              utilizar os nossos serviços, concorda em cumprir estes termos integralmente.
            </p>
          </div>

          {/* Section 1: Intro */}
          <section id="intro" className="max-w-3xl space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                01
              </div>
              <h3 className="text-2xl font-bold">Introdução</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A Kwanza Stream é a primeira rede social angolana focada em creators, operada por{" "}
                <span className="text-foreground font-medium">Elsio Costa</span>, registado em Angola.
              </p>
              <p>
                Para utilizar a plataforma, deve ter pelo menos 18 anos de idade ou ter o consentimento explícito dos
                seus pais ou tutores legais. Ao criar uma conta, garante que as informações fornecidas são precisas e
                completas.
              </p>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Section 2: Account */}
          <section id="account" className="max-w-3xl space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                02
              </div>
              <h3 className="text-2xl font-bold">Termos de Conta</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <ul className="list-disc pl-5 space-y-3">
                <li>É responsável por manter a segurança da sua conta e senha.</li>
                <li>Cada indivíduo só pode possuir uma conta activa na plataforma.</li>
                <li>Não pode utilizar a plataforma para fins ilegais ou não autorizados em Angola.</li>
                <li>
                  A Kwanza Stream reserva-se o direito de recusar o serviço a qualquer pessoa por qualquer motivo a
                  qualquer momento.
                </li>
              </ul>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Section 3: Content */}
          <section id="content" className="max-w-3xl space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                03
              </div>
              <h3 className="text-2xl font-bold">Diretrizes de Conteúdo</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Mantém a propriedade total do conteúdo que publica, mas concede à Kwanza Stream uma licença mundial para
                hospedar e exibir esse conteúdo.
              </p>
              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 space-y-3">
                <h4 className="font-bold text-destructive">Actividades Proibidas:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" /> Discurso de ódio ou assédio
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" /> Conteúdo sexual explícito
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" /> Promoção de violência ou actividades criminosas
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" /> Violação de direitos de autor (Copyright)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Section 4: Monetization */}
          <section id="money" className="max-w-3xl space-y-6 scroll-mt-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                04
              </div>
              <h3 className="text-2xl font-bold">Regras de Monetização</h3>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Os pagamentos são processados via{" "}
                <span className="text-foreground font-medium">Multicaixa Express</span>. É responsável por garantir que
                os seus dados bancários estão correctos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white mb-1">Limite de Levantamento</h4>
                  <p className="text-xs">Mínimo de 5.000 Kz para solicitar transferência.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-white mb-1">Taxas</h4>
                  <p className="text-xs">Taxa operacional de 2% sobre o valor levantado.</p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Footer Info */}
          <section className="max-w-3xl pb-20 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Dúvidas Jurídicas?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Se tiver alguma dúvida sobre estes termos, contacte-nos através do email:
                <br />
                <span className="text-primary font-bold">legal@kwanzastream.ao</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-bold h-12">
                Concordo com os Termos
              </Button>
              <Button variant="ghost" className="h-12 text-muted-foreground">
                Prefiro Não Concordar
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
