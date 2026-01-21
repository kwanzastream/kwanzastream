"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Building2
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function InstitutionDashboardPage() {
  // Mock data
  const activeEvents = 3
  const totalRevenue = 250000
  const totalAudience = 15000
  const impact = {
    events: 25,
    participants: 5000,
    fundsRaised: 500000
  }

  const recentEvents = [
    {
      id: "1",
      title: "Culto de Domingo",
      date: "Hoje, 18:00",
      viewers: 1250,
      revenue: 25000
    },
    {
      id: "2",
      title: "Workshop de Empreendedorismo",
      date: "20 Mar, 14:00",
      viewers: 0,
      revenue: 0
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-6 h-6 text-primary" />
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
                  Dashboard Institucional
                </h1>
              </div>
              <p className="text-muted-foreground">
                Gerencia eventos, receitas e impacto social
              </p>
            </div>
            <Link href="/instituicao/eventos">
              <Button size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Criar Evento
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-primary opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Eventos Ativos</p>
                <p className="text-2xl font-black">{activeEvents}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-secondary opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Receitas Totais</p>
                <p className="text-2xl font-black">{totalRevenue.toLocaleString()} Kz</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-accent opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Audiência Total</p>
                <p className="text-2xl font-black">{totalAudience.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-primary opacity-50" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Crescimento</p>
                <p className="text-2xl font-black text-green-600">+15%</p>
              </CardContent>
            </Card>
          </div>

          {/* Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Impacto Social</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-black mb-2">{impact.events}</p>
                  <p className="text-sm text-muted-foreground">Eventos Realizados</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black mb-2">{impact.participants.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Participantes</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black mb-2">{impact.fundsRaised.toLocaleString()} Kz</p>
                  <p className="text-sm text-muted-foreground">Fundos Arrecadados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Events */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Eventos Recentes</h2>
              <Link href="/instituicao/eventos">
                <Button variant="outline" size="sm">
                  Ver Todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentEvents.map((event) => (
                <Card key={event.id} className="hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{event.title}</CardTitle>
                      {event.viewers > 0 && (
                        <Badge className="bg-red-600">
                          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse mr-2" />
                          AO VIVO
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {event.viewers > 0 ? `${event.viewers} espectadores` : "Agendado"}
                        </span>
                        {event.revenue > 0 && (
                          <span className="font-bold">{event.revenue.toLocaleString()} Kz</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/instituicao/eventos">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Gerir Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cria e gerencia todos os teus eventos
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/instituicao/financeiro">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-secondary" />
                    Financeiro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Relatórios financeiros e saques
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/instituicao/membros">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Membros & Equipe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Gerencia permissões e convites
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
