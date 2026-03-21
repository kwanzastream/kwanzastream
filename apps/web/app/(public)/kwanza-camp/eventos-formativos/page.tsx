"use client"

import { Calendar, Users, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const UPCOMING = [
  { date: "28 Mar 2026", time: "19h WAT", title: "Workshop: O teu Primeiro Stream — ao Vivo", host: "@kwanza-stream-team", spots: 50 },
  { date: "5 Abr 2026", time: "20h WAT", title: "Webinar: Como ganhar com Drops em Angola", host: "@embaixador-gaming", spots: 100 },
]

const PAST = [
  { date: "15 Mar", title: "Workshop OBS", hasRecording: true },
  { date: "8 Mar", title: "Setup básico para streaming mobile", hasRecording: true },
]

export default function EventosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Eventos Formativos</h1>
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Próximos</h2>
        {UPCOMING.map((e, i) => (
          <div key={i} className="p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="w-3.5 h-3.5" />{e.date} · {e.time}</div>
            <h3 className="text-base font-semibold">{e.title}</h3>
            <p className="text-xs text-muted-foreground">Com {e.host}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px]">🎫 Gratuito</Badge>
              <span className="text-[10px] text-muted-foreground"><Users className="w-3 h-3 inline" /> {e.spots} vagas</span>
            </div>
            <Button size="sm">Inscrever</Button>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Passados</h2>
        {PAST.map((e, i) => (
          <div key={i} className="p-3 rounded-xl border border-white/10 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <p className="text-sm flex-1">{e.date} · {e.title}</p>
            {e.hasRecording && <Button variant="outline" size="sm" className="text-[10px] gap-1"><Video className="w-3 h-3" />Gravação</Button>}
          </div>
        ))}
      </div>
    </div>
  )
}
