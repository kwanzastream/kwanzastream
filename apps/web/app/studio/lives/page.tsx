"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Video, Radio, Clock, Eye, Gift, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function ManageLivesPage() {
  // Mock data
  const activeLives = [
    {
      id: "1",
      title: "Torneio de FIFA 25 - Final",
      category: "Jogos & eSports",
      viewers: 1250,
      salos: 12500,
      started: "2h atrás",
      thumbnail: "/api/placeholder/300/200"
    }
  ]

  const scheduledLives = [
    {
      id: "2",
      title: "Live de Música - Noite Angolana",
      category: "DJs & Música",
      scheduled: "15 Mar, 20:00",
      thumbnail: "/api/placeholder/300/200"
    }
  ]

  const finishedLives = [
    {
      id: "3",
      title: "Tutorial de Programação",
      category: "Educação",
      views: 3200,
      salos: 8500,
      duration: "1h 25min",
      date: "10 Mar",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: "4",
      title: "Podcast sobre Empreendedorismo",
      category: "Podcasts & Conversas",
      views: 1800,
      salos: 4500,
      duration: "45min",
      date: "8 Mar",
      thumbnail: "/api/placeholder/300/200"
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

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
                <h1 className="text-3xl font-black tracking-tighter">Gerir Lives</h1>
                <p className="text-muted-foreground">Visualiza e gerencia todas as tuas transmissões</p>
              </div>
            </div>
            <Link href="/studio/live/criar">
              <Button size="lg">
                <Video className="w-5 h-5 mr-2" />
                Nova Live
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList>
              <TabsTrigger value="active">
                Ativas ({activeLives.length})
              </TabsTrigger>
              <TabsTrigger value="scheduled">
                Agendadas ({scheduledLives.length})
              </TabsTrigger>
              <TabsTrigger value="finished">
                Finalizadas ({finishedLives.length})
              </TabsTrigger>
              <TabsTrigger value="replays">
                Replays
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeLives.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mb-4">Não tens lives ativas no momento</p>
                    <Link href="/studio/live/criar">
                      <Button>Iniciar Live</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                activeLives.map((live) => (
                  <Card key={live.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-64 h-48 bg-muted flex-shrink-0 relative">
                        <Badge className="absolute top-2 left-2 bg-red-600">
                          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse mr-2" />
                          AO VIVO
                        </Badge>
                      </div>
                      <CardContent className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{live.title}</h3>
                            <Badge variant="outline" className="mb-2">{live.category}</Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {live.viewers.toLocaleString()} espectadores
                              </div>
                              <div className="flex items-center gap-1">
                                <Gift className="w-4 h-4" />
                                {live.salos.toLocaleString()} Kz
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {live.started}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/stream/${live.id}`}>
                            <Button>Ver Live</Button>
                          </Link>
                          <Button variant="outline">Gerir</Button>
                          <Button variant="outline">Terminar</Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              {scheduledLives.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Não tens lives agendadas</p>
                  </CardContent>
                </Card>
              ) : (
                scheduledLives.map((live) => (
                  <Card key={live.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-64 h-48 bg-muted flex-shrink-0" />
                      <CardContent className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{live.title}</h3>
                            <Badge variant="outline" className="mb-2">{live.category}</Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                              <Clock className="w-4 h-4" />
                              {live.scheduled}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button>Editar</Button>
                          <Button variant="outline">Cancelar</Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="finished" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {finishedLives.map((live) => (
                  <Card key={live.id} className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        {live.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 line-clamp-1">{live.title}</h3>
                      <Badge variant="outline" className="mb-2 text-xs">{live.category}</Badge>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {live.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Gift className="w-3 h-3" />
                          {live.salos.toLocaleString()} Kz
                        </div>
                        <span>{live.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="replays" className="space-y-4">
              <Card>
                <CardContent className="p-12 text-center">
                  <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Os teus replays aparecerão aqui</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
