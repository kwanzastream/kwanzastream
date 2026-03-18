"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { TabPills } from "@/components/public/content-filters"

const MOCK_EVENTS = Array.from({ length: 8 }, (_, i) => ({
  id: `event-${i}`, title: `Evento Especial #${i + 1}`,
  description: "Maratona de streaming ao vivo com os melhores criadores angolanos",
  date: new Date(Date.now() + (i - 2) * 86400000 * 3).toLocaleDateString("pt-AO"),
  time: `${18 + (i % 4)}:00 WAT`,
  category: ["Gaming", "Música", "Futebol", "Especial"][i % 4],
  attendees: Math.floor(Math.random() * 500) + 50,
  status: i < 2 ? "hoje" : i < 5 ? "semana" : i < 7 ? "mes" : "passado",
  type: ["Maratona", "Torneio", "Evento Especial", "Livestream Colectiva"][i % 4],
}))

export default function ExplorarEventosPage() {
  const [period, setPeriod] = useState("semana")

  const filtered = MOCK_EVENTS.filter(e => period === "tudo" || e.status === period || (period === "semana" && (e.status === "hoje" || e.status === "semana")))

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Eventos</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Eventos Públicos</h1>
        <p className="text-sm text-muted-foreground">Torneios, maratonas e eventos especiais da comunidade</p>
      </div>

      <div className="mb-6">
        <TabPills
          tabs={[
            { value: "hoje", label: "Hoje" }, { value: "semana", label: "Esta semana" },
            { value: "mes", label: "Este mês" }, { value: "passado", label: "Passados" },
            { value: "tudo", label: "Todos" },
          ]}
          activeTab={period}
          onTabChange={setPeriod}
        />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-medium">Nenhum evento neste período</p>
            <p className="text-sm text-muted-foreground mt-1">Volta mais tarde ou explora outras tabs</p>
          </div>
        ) : filtered.map((event) => (
          <Link key={event.id} href={`/eventos/${event.id}`} className="block group">
            <div className="rounded-xl border border-border/50 hover:border-primary/40 transition-all p-4 md:p-5 flex flex-col md:flex-row gap-4 bg-card card-hover">
              {/* Date box */}
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-primary mb-0.5" />
                <span className="text-xs font-bold text-primary">{event.date.split("/")[0]}/{event.date.split("/")[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>
                  </div>
                  <Badge variant={event.status === "hoje" ? "default" : "outline"} className="shrink-0 text-[10px]">
                    {event.type}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.attendees} interessados</span>
                  <Badge variant="outline" className="text-[10px]">{event.category}</Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
