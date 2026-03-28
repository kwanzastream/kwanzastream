"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Calendar, Clock, Radio } from "lucide-react"

interface ScheduleEvent {
  id: string; title: string; startTime: string; category: string
  streamer: { username: string; displayName: string }
}

export default function ScheduleHojePage() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [loading, setLoading] = useState(true)
  const today = new Date().toLocaleDateString("pt-AO", { weekday: "long", day: "numeric", month: "long" })

  useEffect(() => {
    api.get("/api/streams/schedule?range=today").then(r => setEvents(r.data?.events || [])).catch(() => setEvents([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Calendário — Hoje</h1>
          <p className="text-sm text-muted-foreground mt-1 capitalize">{today}</p>
        </div>
        <Link href="/schedule/semana" className="text-sm text-primary hover:underline">Ver semana →</Link>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-4xl">📅</p>
          <p className="font-medium">Nenhum stream agendado para hoje</p>
          <p className="text-sm text-muted-foreground">Os creators vão aparecendo! Verifica mais tarde ou vê o que está ao vivo.</p>
          <Link href="/ao-vivo" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mt-2"><Radio className="w-3.5 h-3.5" />Ver ao vivo</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors flex items-center gap-4">
              <div className="text-center shrink-0 w-14">
                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                <p className="text-sm font-bold">{new Date(ev.startTime).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{ev.title}</p>
                <p className="text-xs text-muted-foreground">{ev.streamer.displayName} · {ev.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
