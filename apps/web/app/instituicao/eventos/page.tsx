"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Plus, Users, DollarSign, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function InstitutionEventsPage() {
  // Mock data
  const activeEvents = [
    {
      id: "1",
      title: "Culto de Domingo",
      date: "Hoje, 18:00",
      registered: 1250,
      revenue: 25000,
      status: "live"
    }
  ]

  const upcomingEvents = [
    {
      id: "2",
      title: "Workshop de Empreendedorismo",
      date: "20 Mar, 14:00",
      registered: 450,
      revenue: 0
    }
  ]

  const pastEvents = [
    {
      id: "3",
      title: "Evento Passado",
      date: "10 Mar",
      registered: 800,
      revenue: 15000,
      views: 3200
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/instituicao">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-black tracking-tighter">Gestão de Eventos</h1>
                <p className="text-muted-foreground">Cria e gerencia eventos institucionais</p>
              </div>
            </div>
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Criar Evento
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total de Eventos</p>
                <p className="text-2xl font-black">{activeEvents.length + upcomingEvents.length + pastEvents.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Participantes Totais</p>
                <p className="text-2xl font-black">
                  {[...activeEvents, ...upcomingEvents, ...pastEvents].reduce((sum, e) => sum + e.registered, 0).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Receitas Totais</p>
                <p className="text-2xl font-black">
                  {[...activeEvents, ...upcomingEvents, ...pastEvents].reduce((sum, e) => sum + e.revenue, 0).toLocaleString()} Kz
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Taxa de Conversão</p>
                <p className="text-2xl font-black text-green-600">12.5%</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active">Ativos ({activeEvents.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Agendados ({upcomingEvents.length})</TabsTrigger>
              <TabsTrigger value="past">Passados ({pastEvents.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-64 h-48 bg-muted flex-shrink-0 relative">
                      {event.status === "live" && (
                        <Badge className="absolute top-2 left-2 bg-red-600">
                          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse mr-2" />
                          AO VIVO
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.registered} inscritos
                            </div>
                            {event.revenue > 0 && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {event.revenue.toLocaleString()} Kz
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/eventos/${event.id}`}>
                          <Button>Ver Evento</Button>
                        </Link>
                        <Button variant="outline">Editar</Button>
                        <Button variant="outline">Relatório</Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="hover:border-primary transition-colors">
                    <div className="aspect-video bg-muted mb-4" />
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.registered} inscritos
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Ver
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="hover:border-primary transition-colors">
                    <div className="aspect-video bg-muted mb-4" />
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.registered} participantes
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {event.views.toLocaleString()} visualizações
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {event.revenue.toLocaleString()} Kz
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Ver Relatório Completo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
