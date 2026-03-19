"use client"
import { useParams } from "next/navigation"
import { EventCard, type EventData } from "@/components/events/event-card"
import { ArrowLeft, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: EventData[] = [
  { id: "e2", title: "Torneio CS2 Angola — Grand Final", category: "Gaming", status: "SCHEDULED", rsvpCount: 890, scheduledAt: new Date(Date.now() + 172800000).toISOString(), organizer: { username: "esports_ao", displayName: "eSports AO" } },
]

export default function EventosCategoriaPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href="/eventos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Hash className="w-5 h-5" />{typeof slug === "string" ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Categoria"}</h1></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(e => <EventCard key={e.id} event={e} />)}</div>
    </div>
  )
}
