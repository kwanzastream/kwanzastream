"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Gift,
  Share2,
  CheckCircle2,
  Video,
  Radio,
  ArrowLeft,
  MessageCircle
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventPage() {
  const params = useParams()
  const eventId = params?.id as string

  // Mock data
  const event = {
    id: eventId,
    title: "Festival de Música Angolana 2025",
    description: "O maior festival de música angolana do ano. Junta-te a nós para uma noite inesquecível com os melhores artistas do país.",
    date: "15 de Março, 2025",
    time: "20:00 - 02:00",
    location: "Luanda, Angola",
    creator: {
      name: "Festival Angola",
      avatar: "/abstract-profile.png",
      verified: true
    },
    status: "upcoming", // upcoming, live, ended
    viewers: 0,
    registered: 1250,
    category: "DJs & Música",
    thumbnail: "/api/placeholder/800/450",
    sponsors: [
      { name: "Multicaixa", logo: "/api/placeholder/100/50" },
      { name: "Unitel", logo: "/api/placeholder/100/50" }
    ],
    isFree: false,
    price: 5000
  }

  const isLive = event.status === "live"
  const isUpcoming = event.status === "upcoming"
  const isEnded = event.status === "ended"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        {/* Banner */}
        <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20">
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-8">
            <Link href="/eventos">
              <Button variant="ghost" size="sm" className="gap-2 mb-4 text-white hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4" />
                Voltar para Eventos
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="flex-1">
                <Badge className="mb-3 bg-primary">{event.category}</Badge>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                {isLive && (
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold">
                    <Video className="w-5 h-5 mr-2" />
                    Assistir ao Vivo
                  </Button>
                )}
                {isUpcoming && (
                  <>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold">
                      {event.isFree ? "Inscrever-se Grátis" : `Comprar Ingresso - ${event.price.toLocaleString()} Kz`}
                    </Button>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </>
                )}
                {isEnded && (
                  <Button size="lg" variant="outline" disabled>
                    Evento Finalizado
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Evento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{event.registered.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Inscritos</p>
                  </CardContent>
                </Card>
                {isLive && (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Video className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <p className="text-2xl font-bold">{event.viewers.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Assistindo</p>
                    </CardContent>
                  </Card>
                )}
                <Card>
                  <CardContent className="p-6 text-center">
                    <Gift className="w-8 h-8 mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold">12.5K</p>
                    <p className="text-sm text-muted-foreground">Salos Enviados</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chat (if live) */}
              {isLive && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Chat ao Vivo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] overflow-y-auto space-y-2">
                      {/* Mock chat messages */}
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <span className="font-bold text-sm">Usuário {i}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              Mensagem de exemplo do chat {i}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Escrever mensagem..."
                        className="flex-1 bg-muted px-4 py-2 rounded-lg border border-border"
                      />
                      <Button>Enviar</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Creator/Institution */}
              <Card>
                <CardHeader>
                  <CardTitle>Organizador</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={event.creator.avatar} />
                      <AvatarFallback>{event.creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{event.creator.name}</p>
                        {event.creator.verified && (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Instituição Verificada</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Seguir</Button>
                </CardContent>
              </Card>

              {/* Sponsors */}
              {event.sponsors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Patrocinadores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.sponsors.map((sponsor, i) => (
                        <div key={i} className="flex items-center justify-center p-4 bg-muted rounded-lg">
                          <span className="text-sm font-medium">{sponsor.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Data</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Horário</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Localização</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Categoria</p>
                    <Badge>{event.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
