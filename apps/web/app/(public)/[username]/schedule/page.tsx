"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronLeft, ChevronRight, Bell } from "lucide-react"

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]

// Mock schedule events
const MOCK_EVENTS = [
  { id: "1", title: "Gaming Night", category: "Gaming", day: 2, hour: 20, duration: 3 },
  { id: "2", title: "Kuduro & Chill", category: "Música", day: 4, hour: 21, duration: 2 },
  { id: "3", title: "Q&A com a comunidade", category: "IRL", day: 5, hour: 19, duration: 1.5 },
]

export default function ChannelSchedulePage() {
  const { username } = useParams()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Schedule semanal</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
          <span className="text-sm font-medium">Esta semana</span>
          <Button variant="ghost" size="icon" className="w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Weekly grid */}
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day, i) => (
          <div key={day} className="text-center">
            <p className="text-xs text-muted-foreground font-medium mb-2">{day}</p>
            <div className="min-h-[120px] rounded-lg border border-border/50 bg-muted/10 p-1.5 space-y-1.5">
              {MOCK_EVENTS.filter(e => e.day === i).map((event) => (
                <div key={event.id} className="rounded-md bg-primary/10 border border-primary/20 p-1.5 text-[10px] cursor-pointer hover:bg-primary/20 transition-colors">
                  <p className="font-medium truncate">{event.title}</p>
                  <p className="text-muted-foreground">{event.hour}:00 WAT</p>
                  <p className="text-muted-foreground">{event.duration}h</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Events list for mobile */}
      <div className="sm:hidden space-y-2">
        <h3 className="font-medium text-sm">Próximos streams</h3>
        {MOCK_EVENTS.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {DAYS[event.day]} {event.hour}:00 WAT · {event.duration}h
              </p>
              <p className="text-xs text-muted-foreground">{event.category}</p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 text-xs gap-1">
              <Bell className="w-3 h-3" /> Lembrar
            </Button>
          </div>
        ))}
      </div>

      {MOCK_EVENTS.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Sem streams agendados</p>
          <p className="text-sm text-muted-foreground mt-1">Segue o canal para seres notificado quando houver novos streams</p>
        </div>
      )}
    </div>
  )
}
