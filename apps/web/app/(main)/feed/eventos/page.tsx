"use client"

import { useState, useEffect } from "react"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"
import { FeedEmptyState } from "@/components/feed/feed-empty-state"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Bell, Clock, Flame, Users, Compass, Video, Scissors, Play, UserPlus } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const TABS = [
  { id: "para-ti", label: "Para Ti", href: "/feed/para-ti", icon: <Flame className="w-3.5 h-3.5" /> },
  { id: "a-seguir", label: "A Seguir", href: "/feed/a-seguir", icon: <Users className="w-3.5 h-3.5" /> },
  { id: "explorar", label: "Explorar", href: "/feed/explorar", icon: <Compass className="w-3.5 h-3.5" /> },
  { id: "videos", label: "Vídeos", href: "/feed/videos", icon: <Video className="w-3.5 h-3.5" /> },
  { id: "clips", label: "Clips", href: "/feed/clips", icon: <Scissors className="w-3.5 h-3.5" /> },
  { id: "shorts", label: "Shorts", href: "/feed/shorts", icon: <Play className="w-3.5 h-3.5" /> },
  { id: "eventos", label: "Eventos", href: "/feed/eventos", icon: <CalendarDays className="w-3.5 h-3.5" /> },
  { id: "canais-novos", label: "Novos", href: "/feed/canais-novos", icon: <UserPlus className="w-3.5 h-3.5" /> },
]

const TIME_TABS = ["Hoje", "Esta semana", "Este mês"]

const MOCK_EVENTS = [
  { id: "e1", title: "Torneio FIFA Angola Cup", date: "2026-03-18T20:00:00", category: "Gaming", host: "FIFA Club AO", hostUsername: "fifaclub_ao", attending: 234 },
  { id: "e2", title: "DJ Set Especial — Kuduro Classics", date: "2026-03-19T22:00:00", category: "Música", host: "Kuduro King", hostUsername: "kuduroking", attending: 567 },
  { id: "e3", title: "Workshop: Começar a transmitir", date: "2026-03-20T18:00:00", category: "Educação", host: "Kwanza Stream", hostUsername: "kwanzastream", attending: 89 },
  { id: "e4", title: "Debate: Futuro do Gaming em Angola", date: "2026-03-22T19:00:00", category: "Conversa", host: "Tech Talks AO", hostUsername: "techtalks", attending: 156 },
]

export default function FeedEventosPage() {
  const [timeTab, setTimeTab] = useState("Hoje")
  const [loading, setLoading] = useState(true)
  const [reminded, setReminded] = useState<Set<string>>(new Set())

  useEffect(() => { setTimeout(() => setLoading(false), 600) }, [])

  const handleRemind = async (eventId: string, title: string) => {
    // Check push permission
    if ("Notification" in window && Notification.permission === "default") {
      const perm = await Notification.requestPermission()
      if (perm !== "granted") {
        toast.info("Sem permissão de notificação — vamos enviar lembrete por WhatsApp")
      }
    }
    setReminded(prev => new Set([...prev, eventId]))
    toast.success(`Lembrete activado para "${title}" — 15min antes`)
  }

  const formatDate = (d: string) => {
    const date = new Date(d)
    return `${date.toLocaleDateString("pt-AO", { weekday: "short", day: "numeric", month: "short" })} · ${date.toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}`
  }

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />
      <div className="max-w-screen-xl mx-auto py-4 px-4 space-y-4">
        {/* Time tabs */}
        <div className="flex gap-2">
          {TIME_TABS.map((t) => (
            <button key={t} onClick={() => setTimeTab(t)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${timeTab === t ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{t}</button>
          ))}
        </div>

        {loading ? <FeedSkeleton count={4} /> : MOCK_EVENTS.length === 0 ? (
          <FeedEmptyState emoji="📅" title="Nenhum evento agendado" description="Os teus criadores favoritos ainda não agendaram eventos" />
        ) : (
          <div className="space-y-3">
            {MOCK_EVENTS.map((ev) => (
              <div key={ev.id} className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-lg font-black text-primary">{new Date(ev.date).getDate()}</span>
                  <span className="text-[9px] text-primary font-bold uppercase">{new Date(ev.date).toLocaleDateString("pt-AO", { month: "short" })}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm truncate">{ev.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {formatDate(ev.date)}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-[9px]">{ev.category}</Badge>
                    <span className="text-[10px] text-muted-foreground">{ev.host} · {ev.attending} interessados</span>
                  </div>
                </div>
                <Button size="sm" variant={reminded.has(ev.id) ? "secondary" : "outline"} className="shrink-0 gap-1 text-xs"
                  onClick={() => handleRemind(ev.id, ev.title)} disabled={reminded.has(ev.id)}>
                  <Bell className="w-3 h-3" /> {reminded.has(ev.id) ? "Lembrete ✓" : "Lembrar"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
