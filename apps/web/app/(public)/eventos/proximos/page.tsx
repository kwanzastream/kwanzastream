"use client"
import { useState } from "react"
import { EventCard, type EventData } from "@/components/events/event-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Calendar } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/eventos/ao-vivo" },
  { id: "proximos", label: "Próximos", href: "/eventos/proximos" },
  { id: "passados", label: "Passados", href: "/eventos/passados" },
]
const CAT_FILTERS = [{ id: "all", label: "Todas" }, { id: "gaming", label: "Gaming" }, { id: "musica", label: "Música" }, { id: "futebol", label: "Futebol" }, { id: "negocios", label: "Negócios" }]
const DATE_FILTERS = [{ id: "all", label: "Qualquer" }, { id: "today", label: "Hoje" }, { id: "week", label: "Esta semana" }, { id: "month", label: "Este mês" }]

const MOCK: EventData[] = [
  { id: "e2", title: "Torneio CS2 Angola — Grand Final", category: "Gaming", status: "SCHEDULED", rsvpCount: 890, scheduledAt: new Date(Date.now() + 172800000).toISOString(), organizer: { username: "esports_ao", displayName: "eSports AO" } },
  { id: "e3", title: "Concerto Anselmo Ralph Live", category: "Música", status: "SCHEDULED", rsvpCount: 5600, scheduledAt: new Date(Date.now() + 604800000).toISOString(), organizer: { username: "anselmo", displayName: "Anselmo Ralph" } },
  { id: "e4", title: "Angola Tech Summit 2026", category: "Negócios", status: "SCHEDULED", rsvpCount: 2300, scheduledAt: new Date(Date.now() + 1209600000).toISOString(), organizer: { username: "tech_ao", displayName: "Angola Tech" } },
]

export default function EventosProximosPage() {
  const [cat, setCat] = useState("all")
  const [date, setDate] = useState("all")
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Próximos Eventos</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "proximos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="flex flex-wrap gap-4"><SearchFilters filters={CAT_FILTERS} active={cat} onChange={setCat} /><SearchFilters filters={DATE_FILTERS} active={date} onChange={setDate} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(e => <EventCard key={e.id} event={e} />)}</div>
    </div>
  )
}
