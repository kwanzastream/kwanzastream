"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar, Clock, Users, Flame, Plus, CheckCircle2
} from "lucide-react"
import Link from "next/link"

import { MobileNav } from "@/components/mobile-nav"
import { eventsService } from "@/lib/services"

interface EventItem {
  id: string; title: string; description?: string; coverUrl?: string;
  category?: string; scheduledAt: string; endsAt?: string; status: string;
  rsvpCount: number; hasRsvp: boolean;
  organizer: { id: string; displayName?: string; username?: string; avatarUrl?: string }
}

export default function EventsPage() {
  const [events, setEvents] = React.useState<EventItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [rsvpLoading, setRsvpLoading] = React.useState<string | null>(null)

  React.useEffect(() => { fetchEvents() }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await eventsService.list({ limit: 20 })
      setEvents(res.data.events || [])
    } catch { }
    setLoading(false)
  }

  const handleRsvp = async (eventId: string) => {
    setRsvpLoading(eventId)
    try {
      const res = await eventsService.toggleRsvp(eventId)
      setEvents(prev => prev.map(e =>
        e.id === eventId
          ? { ...e, hasRsvp: res.data.rsvp, rsvpCount: e.rsvpCount + (res.data.rsvp ? 1 : -1) }
          : e
      ))
    } catch { }
    setRsvpLoading(null)
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('pt-AO', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' })
  }

  const isLive = (e: EventItem) => e.status === 'LIVE'
  const liveEvents = events.filter(isLive)
  const upcoming = events.filter(e => e.status === 'SCHEDULED')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">Eventos</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Descobre e participa em eventos digitais</p>
            </div>
            <Link href="/studio/eventos">
              <Button className="bg-primary font-bold">
                <Plus className="w-4 h-4 mr-1" /> Criar Evento
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                  <div className="aspect-video bg-white/5" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-bold text-lg">Sem eventos agendados</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Cria o primeiro evento para a tua comunidade</p>
              <Link href="/studio/eventos">
                <Button>Criar Evento</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Live Events */}
              {liveEvents.length > 0 && (
                <section>
                  <h2 className="text-xl font-black flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-red-500" /> Ao Vivo Agora
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveEvents.map(event => (
                      <EventCard key={event.id} event={event} onRsvp={handleRsvp} rsvpLoading={rsvpLoading} formatDate={formatDate} formatTime={formatTime} />
                    ))}
                  </div>
                </section>
              )}

              {/* Upcoming */}
              {upcoming.length > 0 && (
                <section>
                  <h2 className="text-xl font-black mb-4">Próximos Eventos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming.map(event => (
                      <EventCard key={event.id} event={event} onRsvp={handleRsvp} rsvpLoading={rsvpLoading} formatDate={formatDate} formatTime={formatTime} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  )
}

function EventCard({ event, onRsvp, rsvpLoading, formatDate, formatTime }: {
  event: EventItem; onRsvp: (id: string) => void; rsvpLoading: string | null;
  formatDate: (s: string) => string; formatTime: (s: string) => string
}) {
  const live = event.status === 'LIVE'
  return (
    <Card className="overflow-hidden group hover:border-primary/50 transition-all">
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/10">
        {event.coverUrl && <img src={event.coverUrl} alt={event.title} className="w-full h-full object-cover" />}
        {live && (
          <Badge className="absolute top-2 left-2 bg-red-600 border-none text-white font-bold animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full mr-1.5" /> AO VIVO
          </Badge>
        )}
        {event.category && (
          <Badge variant="outline" className="absolute top-2 right-2 bg-black/50 backdrop-blur border-white/20 text-white text-[10px]">
            {event.category}
          </Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-bold text-base line-clamp-2 group-hover:text-primary transition-colors">{event.title}</h3>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> {formatDate(event.scheduledAt)}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" /> {formatTime(event.scheduledAt)}
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={event.organizer.avatarUrl} />
              <AvatarFallback className="text-[10px]">{(event.organizer.displayName || event.organizer.username || '?')[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">
              {event.organizer.displayName || event.organizer.username}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {event.rsvpCount}
            </span>
            <Button
              size="sm"
              variant={event.hasRsvp ? "secondary" : "default"}
              className={`text-xs h-7 px-3 font-bold ${event.hasRsvp ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : ''}`}
              onClick={(e) => { e.preventDefault(); onRsvp(event.id) }}
              disabled={rsvpLoading === event.id}
            >
              {event.hasRsvp ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Inscrito</> : 'Inscrever'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
