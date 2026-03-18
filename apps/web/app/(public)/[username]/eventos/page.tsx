"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_EVENTOS = [
  { id: "e1", title: "Kwanza Gaming Night", date: "2026-03-20T20:00:00", location: "Online", status: "upcoming", participants: 45 },
  { id: "e2", title: "Stream Maratona 24h", date: "2026-03-15T00:00:00", location: "Online", status: "past", participants: 120 },
  { id: "e3", title: "Meet & Greet Luanda", date: "2026-04-05T15:00:00", location: "Luanda", status: "upcoming", participants: 30 },
]

export default function ChannelEventosPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Eventos</h2>
      {MOCK_EVENTOS.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Sem eventos</p>
          <p className="text-sm text-muted-foreground mt-1">Este canal não tem eventos agendados</p>
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_EVENTOS.map((ev) => (
            <Link key={ev.id} href={`/${username}/eventos/${ev.id}`}>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs text-primary font-bold">{new Date(ev.date).toLocaleDateString("pt-AO", { month: "short" }).toUpperCase()}</span>
                  <span className="text-lg font-bold text-primary">{new Date(ev.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{ev.title}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ev.participants} participantes</span>
                  </div>
                </div>
                <Badge variant={ev.status === "upcoming" ? "default" : "secondary"} className="text-[10px] shrink-0">
                  {ev.status === "upcoming" ? "Em breve" : "Passado"}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
