"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Wallet, 
  Video, 
  TrendingUp,
  Users,
  Gift,
  Calendar,
  ArrowRight,
  Radio,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function StudioDashboardPage() {
  // Mock data
  const earnings = 125000
  const isLive = false
  const activeEvents = 2
  const totalViewers = 12500
  const totalSalos = 450

  const stats = [
    { label: "Total de Ganhos", value: `${earnings.toLocaleString()} Kz`, icon: Wallet, color: "text-primary" },
    { label: "Salos Recebidos", value: totalSalos.toString(), icon: Gift, color: "text-secondary" },
    { label: "Total de Visualizações", value: totalViewers.toLocaleString(), icon: Users, color: "text-accent" },
    { label: "Eventos Ativos", value: activeEvents.toString(), icon: Calendar, color: "text-primary" }
  ]

  const topDonors = [
    { name: "Usuário 1", amount: 5000, avatar: "/abstract-profile.png" },
    { name: "Usuário 2", amount: 3000, avatar: "/abstract-profile.png" },
    { name: "Usuário 3", amount: 2000, avatar: "/abstract-profile.png" }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Studio
              </h1>
              <p className="text-muted-foreground">
                Gerencia o teu canal e acompanha o teu crescimento
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/studio/live/criar">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Radio className="w-5 h-5 mr-2" />
                  Iniciar Live
                </Button>
              </Link>
            </div>
          </div>

          {/* Live Status */}
          {isLive ? (
            <Card className="border-red-600 bg-red-600/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-3 w-3 rounded-full bg-red-600 animate-pulse" />
                    <div>
                      <p className="font-bold text-lg">Estás ao vivo!</p>
                      <p className="text-sm text-muted-foreground">125 espectadores</p>
                    </div>
                  </div>
                  <Button variant="outline">Gerir Live</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg mb-1">Não estás ao vivo</p>
                    <p className="text-sm text-muted-foreground">Inicia uma live para começar a ganhar</p>
                  </div>
                  <Link href="/studio/live/criar">
                    <Button>Iniciar Live</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-muted rounded-lg`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/studio/lives">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Gerir Lives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visualiza, edita e gerencia todas as tuas lives
                  </p>
                  <Button variant="ghost" className="w-full justify-between">
                    Ver Todas
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/studio/eventos">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cria e gerencia eventos digitais
                  </p>
                  <Button variant="ghost" className="w-full justify-between">
                    Ver Eventos
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/studio/ganhos">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Monetização
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Acompanha ganhos e solicita saques
                  </p>
                  <Button variant="ghost" className="w-full justify-between">
                    Ver Ganhos
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Top Donors */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Doadores</h2>
              <Link href="/studio/comunidade">
                <Button variant="outline" size="sm">
                  Ver Comunidade Completa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {topDonors.map((donor, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                          {i + 1}
                        </Badge>
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">{donor.amount.toLocaleString()} Kz em Salos</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Analytics Preview */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Estatísticas
              </h2>
              <Button variant="outline" size="sm">Ver Relatório Completo</Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Crescimento</p>
                    <p className="text-2xl font-bold text-green-600">+12%</p>
                    <p className="text-xs text-muted-foreground">vs mês anterior</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Média de Visualizações</p>
                    <p className="text-2xl font-bold">1.2K</p>
                    <p className="text-xs text-muted-foreground">por live</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Taxa de Conversão</p>
                    <p className="text-2xl font-bold">8.5%</p>
                    <p className="text-xs text-muted-foreground">viewers → doadores</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tempo Médio</p>
                    <p className="text-2xl font-bold">45min</p>
                    <p className="text-xs text-muted-foreground">por live</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
