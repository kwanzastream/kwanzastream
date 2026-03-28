"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Calendar, Clock, Radio } from "lucide-react"

interface ScheduleEvent {
  id: string; title: string; startTime: string; category: string
  streamer: { username: string; displayName: string }
}

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export default function ScheduleSemanaPage() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/streams/schedule?range=week").then(r => setEvents(r.data?.events || [])).catch(() => setEvents([])).finally(() => setLoading(false))
  }, [])

  const grouped = events.reduce<Record<string, ScheduleEvent[]>>((acc, ev) => {
    const day = new Date(ev.startTime).toLocaleDateString("pt-AO", { weekday: "long", day: "numeric", month: "short" })
    if (!acc[day]) acc[day] = []
    acc[day].push(ev)
    return acc
  }, {})

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Calendário — Semana</h1>
          <p className="text-sm text-muted-foreground mt-1">Streams agendados para os próximos 7 dias</p>
        </div>
        <Link href="/schedule/hoje" className="text-sm text-primary hover:underline">← Só hoje</Link>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(6).fill(0).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-4xl">📅</p>
          <p className="font-medium">Nenhum stream agendado esta semana</p>
          <p className="text-sm text-muted-foreground">Os creators vão aparecendo! Vê o que está ao vivo agora.</p>
          <Link href="/ao-vivo" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mt-2"><Radio className="w-3.5 h-3.5" />Ver ao vivo</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([day, dayEvents]) => (
            <div key={day}>
              <h2 className="text-sm font-semibold text-primary mb-2 capitalize">{day}</h2>
              <div className="space-y-2">
                {dayEvents.map((ev) => (
                  <div key={ev.id} className="p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-colors flex items-center gap-3">
                    <div className="text-center shrink-0 w-12">
                      <p className="text-sm font-bold">{new Date(ev.startTime).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{ev.title}</p>
                      <p className="text-xs text-muted-foreground">{ev.streamer.displayName} · {ev.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
