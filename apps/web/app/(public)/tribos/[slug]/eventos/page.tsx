"use client"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { EventCard, type EventData } from "@/components/events/event-card"
import { Calendar } from "lucide-react"

const MOCK: EventData[] = [
  { id: "te1", title: "Kuduro Night — Live Session", category: "Música", status: "SCHEDULED", rsvpCount: 340, scheduledAt: new Date(Date.now() + 604800000).toISOString(), organizer: { username: "kuduro_master", displayName: "Kuduro Master" } },
]

export default function TriboEventosPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      {MOCK.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(e => <EventCard key={e.id} event={e} />)}</div> : <div className="text-center py-16"><Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem eventos agendados</p></div>}
    </div>
  )
}
