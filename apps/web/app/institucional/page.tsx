"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  TrendingUp,
  Shield,
  DollarSign,
  Globe,
  Mail,
  Phone,
  MapPin
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function InstitutionalPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={false} />

      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Sobre a <span className="text-gradient">Kwanza Stream</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            A primeira plataforma de streaming social angolana, construída para fortalecer a cultura e economia local.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-16">
          {/* Missão, Visão, Valores */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Criar uma plataforma que valorize e monetize o talento angolano, conectando criadores com sua audiência através de tecnologia de streaming de última geração.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ser a principal plataforma de entretenimento digital angolana, onde cada criador pode construir uma carreira sustentável e cada espectador encontra conteúdo autêntico e relevante.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Transparência financeira</li>
                  <li>• Valorização da cultura angolana</li>
                  <li>• Inclusão e acessibilidade</li>
                  <li>• Inovação tecnológica</li>
                  <li>• Responsabilidade social</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Estrutura da Plataforma */}
          <section>
            <h2 className="text-3xl font-black mb-8">Estrutura da Plataforma</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Para Criadores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Transmissão ao vivo em vídeo e áudio</li>
                    <li>• Sistema de monetização com Salos</li>
                    <li>• Dashboard completo de analytics</li>
                    <li>• Gestão de eventos digitais</li>
                    <li>• Comunidade e seguidores</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-secondary" />
                    Para Espectadores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Acesso a conteúdo ao vivo e replays</li>
                    <li>• Sistema de Salos para apoiar criadores</li>
                    <li>• Feed personalizado</li>
                    <li>• Participação em eventos</li>
                    <li>• Comunidade e interação social</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Para Instituições
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Gestão de eventos institucionais</li>
                    <li>• Relatórios financeiros completos</li>
                    <li>• Equipe e permissões</li>
                    <li>• Verificação institucional</li>
                    <li>• Ferramentas de marketing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Economia Circular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Sistema Salo (presentes digitais)</li>
                    <li>• Wallet integrada</li>
                    <li>• Integração Multicaixa e USSD</li>
                    <li>• Transparência total de taxas</li>
                    <li>• Saques rápidos e seguros</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Transparência Financeira */}
          <section>
            <h2 className="text-3xl font-black mb-8">Transparência Financeira</h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Taxas da Plataforma
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="font-bold">Taxa de Transação</p>
                        <p className="text-2xl font-black text-primary">5%</p>
                        <p className="text-sm text-muted-foreground">Por cada Salo enviado</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="font-bold">Taxa de Saque</p>
                        <p className="text-2xl font-black text-primary">2%</p>
                        <p className="text-sm text-muted-foreground">Mínimo 500 Kz</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-xl font-bold mb-4">Como Funciona</h3>
                    <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
                      <li>Espectador envia Salo para criador (ex: 1000 Kz)</li>
                      <li>Plataforma retém 5% (50 Kz) para manutenção e desenvolvimento</li>
                      <li>Criador recebe 95% (950 Kz) na sua wallet</li>
                      <li>Criador pode sacar a qualquer momento (taxa de 2% no saque)</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Impacto Social */}
          <section>
            <h2 className="text-3xl font-black mb-8">Impacto Social</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-3xl font-black mb-2">1,000+</p>
                  <p className="text-muted-foreground">Criadores Ativos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-secondary" />
                  <p className="text-3xl font-black mb-2">500K+</p>
                  <p className="text-muted-foreground">Kz Circulados</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <p className="text-3xl font-black mb-2">50K+</p>
                  <p className="text-muted-foreground">Usuários Registrados</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator />

          {/* Contato */}
          <section>
            <h2 className="text-3xl font-black mb-8">Contato Oficial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contato@kwanza-stream.ao</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-sm text-muted-foreground">+244 923 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-sm text-muted-foreground">Luanda, Angola</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Suporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Precisa de ajuda? Entre em contato através da nossa central de suporte.
                  </p>
                  <Link href="/ajuda">
                    <Button className="w-full">Abrir Ticket de Suporte</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
