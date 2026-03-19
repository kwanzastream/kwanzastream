"use client"
import { EventCard, type EventData } from "@/components/events/event-card"
import { EventCountdown } from "@/components/events/event-countdown"
import { Flame, Calendar } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/eventos/ao-vivo" },
  { id: "proximos", label: "Próximos", href: "/eventos/proximos" },
  { id: "passados", label: "Passados", href: "/eventos/passados" },
]

const LIVE: EventData[] = [
  { id: "e1", title: "Girabola 2026 — Jornada 15: Petro vs 1º de Agosto", category: "Futebol", status: "LIVE", viewerCount: 12500, rsvpCount: 4500, scheduledAt: new Date(Date.now() - 3600000).toISOString(), organizer: { username: "girabola_oficial", displayName: "Girabola Oficial" } },
]

const NEXT_EVENT: EventData = { id: "e2", title: "Torneio CS2 Angola — Grand Final", category: "Gaming", status: "SCHEDULED", rsvpCount: 890, scheduledAt: new Date(Date.now() + 172800000).toISOString(), organizer: { username: "esports_ao", displayName: "eSports AO" } }

export default function EventosAoVivoPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2"><Flame className="w-5 h-5 text-red-500" />Eventos ao Vivo</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "ao-vivo" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>

      {LIVE.length > 0 ? (
        <>
          {/* Hero event */}
          <div className="rounded-2xl overflow-hidden border border-red-500/30 bg-red-500/5">
            <div className="aspect-video bg-black flex items-center justify-center text-white/20 text-sm">Player embed do evento principal</div>
            <div className="p-4"><h2 className="text-lg font-bold">{LIVE[0].title}</h2><p className="text-xs text-muted-foreground">{LIVE[0].viewerCount?.toLocaleString()} a ver agora</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{LIVE.slice(1).map(e => <EventCard key={e.id} event={e} />)}</div>
        </>
      ) : (
        <div className="text-center py-16 space-y-4">
          <Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto" />
          <p className="text-sm text-muted-foreground">Sem eventos ao vivo agora</p>
          <div className="space-y-2"><p className="text-xs font-bold">Próximo evento:</p><p className="text-sm">{NEXT_EVENT.title}</p><EventCountdown targetDate={NEXT_EVENT.scheduledAt} /></div>
        </div>
      )}
    </div>
  )
}
