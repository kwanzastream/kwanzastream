"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Plus, Users, DollarSign, Eye, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function StudioEventsPage() {
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
      revenue: 0,
      status: "scheduled"
    },
    {
      id: "3",
      title: "Conferência de Tecnologia",
      date: "25 Mar, 10:00",
      registered: 320,
      revenue: 0,
      status: "scheduled"
    }
  ]

  const pastEvents = [
    {
      id: "4",
      title: "Evento Passado 1",
      date: "10 Mar",
      registered: 800,
      revenue: 15000,
      views: 3200
    },
    {
      id: "5",
      title: "Evento Passado 2",
      date: "5 Mar",
      registered: 600,
      revenue: 12000,
      views: 2500
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/studio">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-black tracking-tighter">Eventos</h1>
                <p className="text-muted-foreground">Cria e gerencia os teus eventos digitais</p>
              </div>
            </div>
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Criar Evento
            </Button>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active">
                Ativos ({activeEvents.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Agendados ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Passados ({pastEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeEvents.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mb-4">Não tens eventos ativos</p>
                    <Button>Criar Evento</Button>
                  </CardContent>
                </Card>
              ) : (
                activeEvents.map((event) => (
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
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/eventos/${event.id}`}>
                            <Button>Ver Evento</Button>
                          </Link>
                          <Button variant="outline">Editar</Button>
                          <Button variant="outline">Métricas</Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Não tens eventos agendados</p>
                  </CardContent>
                </Card>
              ) : (
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
              )}
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
                          {event.registered} inscritos
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
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Ver Relatório
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Replay
                        </Button>
                      </div>
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
