"use client"
import { useParams } from "next/navigation"
import { EventScheduleItem, type ScheduleItem } from "@/components/events/event-schedule-item"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: ScheduleItem[] = [
  { time: "14:00 WAT", title: "Abertura + cerimónia de entrada", status: "completed" },
  { time: "14:30 WAT", title: "Round 1: @team_alpha vs @team_beta", status: "completed", channels: ["esports_ao"] },
  { time: "16:00 WAT", title: "Round 1: @team_gamma vs @team_delta", status: "live", channels: ["esports_ao", "gamer_luanda"] },
  { time: "18:00 WAT", title: "Intervalo + análise", status: "pending" },
  { time: "19:00 WAT", title: "Semi-final", status: "pending", channels: ["esports_ao"] },
  { time: "21:00 WAT", title: "FINAL", status: "pending", channels: ["esports_ao", "gamer_luanda"] },
]

export default function EventSchedulePage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/eventos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><CalendarDays className="w-5 h-5" />Agenda</h1></div>
      <div className="space-y-2">{MOCK.map((item, i) => <EventScheduleItem key={i} item={item} />)}</div>
    </div>
  )
}
