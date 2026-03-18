"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Bell, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { TabPills } from "@/components/public/content-filters"

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

const MOCK_SCHEDULED = Array.from({ length: 12 }, (_, i) => ({
  id: `sched-${i}`, title: `Stream Agendado #${i + 1}`,
  streamer: `Creator ${i + 1}`, username: `creator${i}`,
  category: ["Gaming", "Música", "Futebol", "Just Talking", "IRL", "Kuduro"][i % 6],
  date: new Date(Date.now() + i * 3600000 * (i < 4 ? 3 : 24)),
  notified: i === 0,
}))

export default function SchedulePage() {
  const [view, setView] = useState("semana")
  const today = new Date()

  const todayStreams = MOCK_SCHEDULED.filter(s => s.date.toDateString() === today.toDateString())
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return d
  })

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Calendário de Streams 📅</h1>
        <p className="text-sm text-muted-foreground">Todos os streams agendados da plataforma — hora de Angola (WAT, UTC+1)</p>
      </div>

      {/* View tabs */}
      <div className="flex items-center justify-between mb-6">
        <TabPills
          tabs={[
            { value: "hoje", label: "Hoje" },
            { value: "semana", label: "Semana" },
          ]}
          activeTab={view}
          onTabChange={setView}
        />
        <Button variant="outline" size="sm" className="gap-1.5 text-xs hidden sm:flex">
          <Download className="w-3 h-3" />Exportar .ics
        </Button>
      </div>

      {view === "hoje" ? (
        /* Today View */
        <div className="space-y-2">
          {todayStreams.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📅</p>
              <p className="font-medium">Nenhum stream agendado para hoje</p>
              <p className="text-sm text-muted-foreground">Os criadores podem agendar streams no seu dashboard</p>
            </div>
          ) : todayStreams.map((stream) => (
            <ScheduleCard key={stream.id} stream={stream} />
          ))}
        </div>
      ) : (
        /* Week View */
        <div className="space-y-6">
          {weekDays.map((day) => {
            const dayStreams = MOCK_SCHEDULED.filter(s => s.date.toDateString() === day.toDateString())
            const isToday = day.toDateString() === today.toDateString()
            return (
              <div key={day.toISOString()}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-3 py-1 rounded-lg text-sm font-medium ${isToday ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {DAYS[day.getDay()]} {day.getDate()}/{day.getMonth() + 1}
                  </div>
                  {isToday && <Badge variant="outline" className="text-[10px]">Hoje</Badge>}
                  <span className="text-xs text-muted-foreground">{dayStreams.length} stream{dayStreams.length !== 1 ? "s" : ""}</span>
                </div>
                {dayStreams.length === 0 ? (
                  <p className="text-sm text-muted-foreground pl-4">Sem streams agendados</p>
                ) : (
                  <div className="space-y-2">
                    {dayStreams.map((stream) => (
                      <ScheduleCard key={stream.id} stream={stream} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ScheduleCard({ stream }: { stream: any }) {
  const [reminded, setReminded] = useState(stream.notified)

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all bg-card">
      <div className="text-center shrink-0 w-14">
        <p className="text-lg font-bold">{stream.date.getHours().toString().padStart(2, "0")}:{stream.date.getMinutes().toString().padStart(2, "0")}</p>
        <p className="text-[10px] text-muted-foreground">WAT</p>
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/${stream.username}`} className="text-sm font-medium truncate hover:text-primary transition-colors block">{stream.title}</Link>
        <p className="text-xs text-muted-foreground">@{stream.username} · {stream.category}</p>
      </div>
      <Badge variant="outline" className="text-[10px] shrink-0">{stream.category}</Badge>
      <Button variant={reminded ? "secondary" : "outline"} size="sm" className="gap-1 text-xs shrink-0" onClick={() => setReminded(!reminded)}>
        <Bell className={`w-3 h-3 ${reminded ? "text-primary" : ""}`} />{reminded ? "Lembrado" : "Lembrar"}
      </Button>
    </div>
  )
}
