"use client"
import { useParams } from "next/navigation"
import { EventParticipantCard, type Participant } from "@/components/events/event-participant-card"
import { ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: Participant[] = [
  { username: "team_alpha", displayName: "Team Alpha", role: "participant", country: "Luanda", result: "Semifinalista" },
  { username: "team_beta", displayName: "Team Beta", role: "participant", country: "Benguela" },
  { username: "esports_ao", displayName: "eSports AO", role: "organizer", country: "Luanda" },
  { username: "gamer_luanda", displayName: "Gamer Luanda", role: "commentator", country: "Luanda" },
]

export default function EventParticipantesPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/eventos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Users className="w-5 h-5" />Participantes</h1></div>
      <div className="space-y-2">{MOCK.map(p => <EventParticipantCard key={p.username} p={p} />)}</div>
    </div>
  )
}
