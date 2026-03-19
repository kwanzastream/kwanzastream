"use client"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { TournamentCard, type TournamentData } from "@/components/tournaments/tournament-card"
import { Trophy } from "lucide-react"

const MOCK: TournamentData[] = [
  { id: "tt1", title: "Kuduro Dance Battle — Season 2", game: "Dança", status: "REGISTERING", format: "individual", prize: "Reconhecimento + 10.000 Salos", participantCount: 8, maxParticipants: 16, startDate: new Date(Date.now() + 1209600000).toISOString(), organizer: { username: "kuduro_master", displayName: "Kuduro Master" } },
]

export default function TriboTorneiosPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      {MOCK.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(t => <TournamentCard key={t.id} t={t} />)}</div> : <div className="text-center py-16"><Trophy className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem torneios activos</p></div>}
    </div>
  )
}
