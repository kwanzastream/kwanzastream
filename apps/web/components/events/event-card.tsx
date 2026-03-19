"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Users, Bell, BellOff, MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

export interface EventData {
  id: string
  title: string
  description?: string
  coverUrl?: string
  category?: string
  scheduledAt: string
  endsAt?: string
  status: "SCHEDULED" | "LIVE" | "ENDED"
  viewerCount?: number
  rsvpCount: number
  tags?: string[]
  organizer: { username: string; displayName: string; avatarUrl?: string }
}

function timeAgo(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString("pt-AO", { day: "numeric", month: "short" }) + " · " + d.toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })
}

export function EventCard({ event }: { event: EventData }) {
  const [reminded, setReminded] = useState(false)
  const isLive = event.status === "LIVE"
  const isPast = event.status === "ENDED"

  return (
    <Link href={`/eventos/${event.id}`} className="group block">
      <div className="rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all bg-card">
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-purple-500/10">
          {event.coverUrl && <img src={event.coverUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
          {isLive && <Badge className="absolute top-2 left-2 bg-red-600 border-none text-white font-bold animate-pulse"><span className="w-2 h-2 bg-white rounded-full mr-1.5 inline-block" />AO VIVO</Badge>}
          {event.category && <Badge variant="outline" className="absolute top-2 right-2 bg-black/50 backdrop-blur border-white/20 text-white text-[10px]">{event.category}</Badge>}
          {isLive && event.viewerCount && <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1"><Users className="w-3 h-3" />{event.viewerCount.toLocaleString()}</div>}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">{event.title}</h3>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{timeAgo(event.scheduledAt)}</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.rsvpCount} interessados</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">{event.organizer.displayName[0]}</div>
              <span className="text-[10px] text-muted-foreground truncate">{event.organizer.displayName}</span>
            </div>
            {!isPast && (
              <Button size="sm" variant={reminded ? "secondary" : "outline"} className={`text-[10px] h-6 px-2 ${reminded ? "text-primary" : ""}`}
                onClick={(e) => { e.preventDefault(); setReminded(!reminded); toast.success(reminded ? "Lembrete removido" : "Lembrete definido! Notificação 1h e 15min antes") }}>
                {reminded ? <><BellOff className="w-3 h-3 mr-1" />Lembrar</> : <><Bell className="w-3 h-3 mr-1" />Lembrar</>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
