"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Flame,
  Search,
  Filter,
  Video
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  // Mock data
  const liveEvents = [
    {
      id: "1",
      title: "Festival de Música Angolana 2025",
      date: "15 Mar, 2025",
      time: "20:00",
      location: "Luanda",
      viewers: 2500,
      registered: 1250,
      category: "DJs & Música",
      thumbnail: "/api/placeholder/400/225",
      isLive: true,
      isFree: false,
      price: 5000
    }
  ]

  const upcomingEvents = [
    {
      id: "2",
      title: "Torneio de FIFA 25 - Final",
      date: "20 Mar, 2025",
      time: "18:00",
      location: "Online",
      registered: 890,
      category: "Jogos & eSports",
      thumbnail: "/api/placeholder/400/225",
      isFree: true
    },
    {
      id: "3",
      title: "Workshop de Empreendedorismo",
      date: "25 Mar, 2025",
      time: "14:00",
      location: "Benguela",
      registered: 450,
      category: "Negócios & Empreendedorismo",
      thumbnail: "/api/placeholder/400/225",
      isFree: false,
      price: 2000
    }
  ]

  const allEvents = [...liveEvents, ...upcomingEvents]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar userLoggedIn={true} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">
                Eventos
              </h1>
              <p className="text-muted-foreground">
                Descobre e participa em eventos digitais
              </p>
            </div>
            <Button size="lg">Criar Evento</Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Live Events */}
          {liveEvents.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Flame className="w-5 h-5 text-red-600" />
                <h2 className="text-2xl font-bold">Eventos ao Vivo</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveEvents.map((event) => (
                  <Link key={event.id} href={`/eventos/${event.id}`}>
                    <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer group">
                      <div className="relative aspect-video bg-muted">
                        <Badge className="absolute top-2 left-2 bg-red-600">
                          <span className="flex h-2 w-2 rounded-full bg-white animate-pulse mr-2" />
                          AO VIVO
                        </Badge>
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                          <Users className="w-3 h-3" />
                          {event.viewers?.toLocaleString()}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">{event.category}</Badge>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
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
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.registered} inscritos</span>
                          </div>
                          {event.isFree ? (
                            <Badge>Gratuito</Badge>
                          ) : (
                            <Badge variant="outline">{event.price?.toLocaleString()} Kz</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Events */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Próximos Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/eventos/${event.id}`}>
                  <Card className="overflow-hidden hover:border-primary transition-colors cursor-pointer group">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        <Users className="w-3 h-3" />
                        {event.registered} inscritos
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">{event.category}</Badge>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
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
                      <div className="mt-3 flex items-center justify-between">
                        {event.isFree ? (
                          <Badge>Gratuito</Badge>
                        ) : (
                          <Badge variant="outline">{event.price?.toLocaleString()} Kz</Badge>
                        )}
                        <Button variant="ghost" size="sm" className="group-hover:text-primary">
                          Ver Detalhes
                          <Video className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
