"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, MessageSquare, FileText, Video, Wallet, Users, Calendar } from "lucide-react"
import Link from "next/link"


const faqCategories = [
  {
    title: "Começar",
    icon: HelpCircle,
    questions: [
      {
        q: "Como criar uma conta?",
        a: "Podes criar uma conta clicando em 'Criar Conta' no canto superior direito. Serás guiado através de um processo simples de registo com verificação por OTP."
      },
      {
        q: "Quais são os tipos de conta disponíveis?",
        a: "Existem três tipos: Espectador (para assistir e interagir), Criador (para fazer lives e ganhar dinheiro) e Instituição (para igrejas, escolas, marcas)."
      },
      {
        q: "Como funciona o onboarding?",
        a: "O onboarding ajuda-te a personalizar a tua experiência escolhendo interesses, seguindo criadores e aprendendo sobre o sistema Salo e Wallet."
      }
    ]
  },
  {
    title: "Lives e Streaming",
    icon: Video,
    questions: [
      {
        q: "Como fazer uma live?",
        a: "Vai para o Studio, clica em 'Criar Live', preenche os detalhes e usa as credenciais RTMP fornecidas no teu software de streaming (OBS, Streamlabs, etc.)."
      },
      {
        q: "Posso fazer lives apenas com áudio?",
        a: "Sim! Ao criar uma live, podes escolher o modo 'Rádio' para transmitir apenas áudio, sem vídeo."
      },
      {
        q: "Como funciona o chat ao vivo?",
        a: "O chat aparece ao lado da transmissão. Espectadores podem enviar mensagens e Salos durante a live."
      }
    ]
  },
  {
    title: "Wallet e Pagamentos",
    icon: Wallet,
    questions: [
      {
        q: "Como depositar dinheiro na wallet?",
        a: "Vai para a página Wallet e clica em 'Depositar'. Podes usar Multicaixa Express ou USSD (Unitel Money)."
      },
      {
        q: "Como funcionam os Salos?",
        a: "Salos são presentes digitais que podes enviar para criadores durante lives. Cada Salo tem um valor em Kwanzas e o criador recebe 95% do valor (5% é taxa da plataforma)."
      },
      {
        q: "Como solicitar um saque?",
        a: "Vai para Studio > Ganhos, verifica o teu saldo disponível e clica em 'Solicitar Saque'. O valor será transferido para a tua conta bancária ou Multicaixa."
      },
      {
        q: "Quais são as taxas?",
        a: "A plataforma cobra 5% sobre cada Salo enviado. Os saques têm uma taxa adicional de 2% (mínimo 500 Kz)."
      }
    ]
  },
  {
    title: "Eventos",
    icon: Calendar,
    questions: [
      {
        q: "Como criar um evento?",
        a: "Vai para Studio > Eventos e clica em 'Criar Evento'. Preenche os detalhes, define se é gratuito ou pago, e promove o teu evento."
      },
      {
        q: "Como me inscrever num evento?",
        a: "Navega até à página do evento e clica em 'Inscrever-se' ou 'Comprar Ingresso' se for pago."
      },
      {
        q: "Os eventos podem ser monetizados?",
        a: "Sim! Podes definir um preço para ingressos e também receber Salos durante o evento."
      }
    ]
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Central de Ajuda
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encontra respostas para as tuas perguntas ou contacta o nosso suporte
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Pesquisar ajuda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/ajuda/ticket">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <MessageSquare className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Abrir Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Precisa de ajuda personalizada? Abre um ticket de suporte.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/legal/termos">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <FileText className="w-8 h-8 text-secondary mb-2" />
                  <CardTitle>Termos de Uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lê os nossos termos e condições de uso da plataforma.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/status">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <HelpCircle className="w-8 h-8 text-accent mb-2" />
                  <CardTitle>Status da Plataforma</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Verifica o status dos nossos serviços e sistemas.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* FAQ by Category */}
          <div className="space-y-8">
            {faqCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ainda precisas de ajuda?</h2>
              <p className="text-muted-foreground mb-6">
                A nossa equipa de suporte está pronta para ajudar
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ajuda/ticket">
                  <Button size="lg">Abrir Ticket de Suporte</Button>
                </Link>
                <Button variant="outline" size="lg">
                  Email: suporte@kwanza-stream.ao
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
