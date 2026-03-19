"use client"
import { EventCard, type EventData } from "@/components/events/event-card"
import { Clock, Play } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/eventos/ao-vivo" },
  { id: "proximos", label: "Próximos", href: "/eventos/proximos" },
  { id: "passados", label: "Passados", href: "/eventos/passados" },
]

const MOCK: EventData[] = [
  { id: "e5", title: "Girabola 2026 — Jornada 14", category: "Futebol", status: "ENDED", rsvpCount: 3200, viewerCount: 8900, scheduledAt: new Date(Date.now() - 604800000).toISOString(), organizer: { username: "girabola_oficial", displayName: "Girabola Oficial" } },
  { id: "e6", title: "Noite de Kuduro — Marathon Stream", category: "Música", status: "ENDED", rsvpCount: 1800, viewerCount: 5600, scheduledAt: new Date(Date.now() - 1209600000).toISOString(), organizer: { username: "kuduro_tv", displayName: "Kuduro TV" } },
]

export default function EventosPassadosPage() {
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Eventos Passados</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "passados" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(e => <EventCard key={e.id} event={e} />)}</div>
    </div>
  )
}
