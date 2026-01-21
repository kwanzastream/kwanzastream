"use client"

import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Rocket,
  Video,
  DollarSign,
  Wallet,
  Wrench,
  Shield,
  MessageCircle,
  ChevronRight,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

const HELP_CATEGORIES = [
  { id: "start", title: "Começar na Kwanza Stream", icon: Rocket, color: "text-blue-500" },
  { id: "live", title: "Fazer a tua primeira Live", icon: Video, color: "text-red-500" },
  { id: "money", title: "Ganhar Dinheiro", icon: DollarSign, color: "text-green-500" },
  { id: "multicaixa", title: "Multicaixa Express", icon: Wallet, color: "text-secondary" },
  { id: "technical", title: "Resolver Problemas", icon: Wrench, color: "text-orange-500" },
  { id: "security", title: "Segurança e Privacidade", icon: Shield, color: "text-purple-500" },
]

const FAQS = [
  {
    category: "Para Novos Utilizadores",
    items: [
      {
        q: "Como criar uma conta?",
        a: "Podes criar uma conta clicando no botão 'Começar Agora' na página inicial ou usando as tuas redes sociais.",
      },
      { q: "É grátis usar Kwanza Stream?", a: "Sim! Assistir e criar conteúdo básico é totalmente gratuito." },
      { q: "Como funciona o feed?", a: "O feed mostra conteúdo baseado nos teos interesses e nas pessoas que segues." },
    ],
  },
  {
    category: "Para Creators",
    items: [
      {
        q: "Quais os requisitos para monetização?",
        a: "Precisas de pelo menos 500 seguidores e ter transmitido 10 horas nos últimos 30 dias.",
      },
      {
        q: "Como recebo meus ganhos?",
        a: "Os pagamentos são feitos via Multicaixa Express assim que atingires o limite mínimo de 5.000 Kz.",
      },
    ],
  },
  {
    category: "Pagamentos e Multicaixa",
    items: [
      {
        q: "Quanto é a taxa de levantamento?",
        a: "A Kwanza Stream cobra uma taxa fixa de 2% para cobrir custos operacionais de transferência.",
      },
      {
        q: "O que fazer se levantamento falhar?",
        a: "Verifica se os dados do teu IBAN/Multicaixa Express estão correctos nas definições.",
      },
    ],
  },
]

function HelpCenterContent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col angola-pattern">
      {/* Search Hero */}
      <section className="relative py-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Como podemos ajudar?</h1>
            <p className="text-muted-foreground text-lg">
              Encontra respostas rápidas e tutoriais para tirares o máximo proveito da Kwanza Stream.
            </p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <Input
              className="w-full h-14 pl-12 pr-4 bg-white/5 border-white/10 rounded-2xl text-lg shadow-xl"
              placeholder="Pesquisa por temas, ex: 'levantar dinheiro'..."
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
            <span>Links rápidos:</span>
            <Link href="/support" className="text-primary hover:underline">
              Contactar Suporte
            </Link>
            <span className="opacity-20">|</span>
            <Link href="/status" className="text-primary hover:underline">
              Estado do Sistema
            </Link>
            <span className="opacity-20">|</span>
            <Link href="/terms" className="text-primary hover:underline">
              Políticas
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HELP_CATEGORIES.map((cat) => (
            <Card
              key={cat.id}
              className="group border-white/10 bg-white/5 hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
            >
              <CardContent className="p-6 flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform",
                    cat.color,
                  )}
                >
                  <cat.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-lg">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">Explora tutoriais e guias passo a passo.</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 md:px-6 max-w-4xl mx-auto w-full space-y-12">
        <h2 className="text-3xl font-black tracking-tight text-center">Perguntas Frequentes</h2>

        <div className="space-y-8">
          {FAQS.map((section) => (
            <div key={section.category} className="space-y-4">
              <h3 className="text-xl font-bold border-b border-white/10 pb-2">{section.category}</h3>
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                    <AccordionTrigger className="text-base hover:text-primary transition-colors py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                      {item.a}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                        <span className="text-xs">Foi útil?</span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-3 text-[10px] border-white/10 bg-transparent"
                          >
                            Sim
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-3 text-[10px] border-white/10 bg-transparent"
                          >
                            Não
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 px-4 md:px-6 text-center max-w-4xl mx-auto w-full">
        <div className="p-8 md:p-12 rounded-3xl bg-linear-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-primary" />
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-primary/20 rotate-3">
            <MessageCircle className="h-8 w-8 text-white -rotate-3" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black">Não encontraste o que procuras?</h2>
            <p className="text-muted-foreground">A nossa equipa de suporte está disponível 24/7 para te ajudar.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 font-bold">
              Enviar Mensagem
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 font-bold border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
            >
              <HelpCircle className="h-5 w-5 mr-2" /> WhatsApp Suporte
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Ou envia um email para: <span className="text-foreground font-medium">suporte@kwanzastream.ao</span>
          </p>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="mt-auto py-8 border-t border-white/10 text-center">
        <p className="text-xs text-muted-foreground">© 2025 Kwanza Stream. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default function HelpCenterPage() {
  return (
    <Suspense fallback={null}>
      <HelpCenterContent />
    </Suspense>
  )
}
