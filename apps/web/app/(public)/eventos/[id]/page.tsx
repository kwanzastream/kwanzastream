"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { EventCountdown } from "@/components/events/event-countdown"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BellOff, MessageCircle, Users, Calendar, Clock, Trophy, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK = {
  id: "e2", title: "Torneio CS2 Angola — Grand Final", description: "A final do maior torneio de Counter-Strike 2 de Angola. 8 equipas, 3 dias de competição. Transmissão em PT-AO com comentário especializado.",
  category: "Gaming", status: "SCHEDULED" as string, scheduledAt: new Date(Date.now() + 172800000).toISOString(), endsAt: new Date(Date.now() + 259200000).toISOString(),
  rsvpCount: 890, tags: ["cs2", "esports", "angola", "gaming"], language: "PT-AO", contentRating: "Geral",
  prizes: "1º: 500.000 Kz · 2º: 250.000 Kz · 3º: 100.000 Kz",
  sponsors: [{ name: "Unitel", url: "#" }, { name: "BAI", url: "#" }],
  organizer: { username: "esports_ao", displayName: "eSports AO", followers: 8500 },
  streams: [{ channel: "esports_ao", role: "main" }, { channel: "gamer_luanda", role: "commentator" }],
}

const TABS = [
  { id: "sobre", label: "Sobre" },
  { id: "schedule", label: "Agenda", href: `/eventos/${MOCK.id}/schedule` },
  { id: "streams", label: "Streams", href: `/eventos/${MOCK.id}/streams` },
  { id: "participantes", label: "Participantes", href: `/eventos/${MOCK.id}/participantes` },
  { id: "clips", label: "Clips", href: `/eventos/${MOCK.id}/clips` },
  { id: "galeria", label: "Galeria", href: `/eventos/${MOCK.id}/galeria` },
]

export default function EventoPage() {
  const { id } = useParams()
  const [reminded, setReminded] = useState(false)
  const [tab, setTab] = useState("sobre")
  const e = MOCK
  const isFuture = e.status === "SCHEDULED"
  const isLive = e.status === "LIVE"

  const handleWhatsApp = () => {
    const url = `https://kwanzastream.ao/eventos/${id}`
    window.open(`https://wa.me/?text=${encodeURIComponent(`${e.title} — ${new Date(e.scheduledAt).toLocaleDateString("pt-AO")}\n${url}`)}`, "_blank")
  }

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-6">
      {/* Banner */}
      <div className="relative aspect-[3/1] rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-purple-500/20 border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-white/20 text-sm">Banner 1200×400</span></div>
        {isLive && <Badge className="absolute top-4 left-4 bg-red-600 text-white font-bold animate-pulse">AO VIVO</Badge>}
        <Badge variant="outline" className="absolute top-4 right-4 bg-black/50 backdrop-blur border-white/20 text-white">{e.category}</Badge>
      </div>

      {/* Live: player embed OR Future: countdown */}
      {isLive ? (
        <div className="rounded-2xl overflow-hidden border border-red-500/30">
          <div className="aspect-video bg-black flex items-center justify-center text-white/20">Player principal</div>
        </div>
      ) : isFuture ? (
        <div className="text-center py-6 space-y-4">
          <EventCountdown targetDate={e.scheduledAt} />
          <div className="flex gap-3 justify-center">
            <Button className={`gap-2 ${reminded ? "bg-primary/20 text-primary" : ""}`} onClick={() => { setReminded(!reminded); toast.success(reminded ? "Lembrete removido" : "Lembrete definido! 1h e 15min antes") }}>
              {reminded ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}Lembrar
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleWhatsApp}><MessageCircle className="w-4 h-4" />WhatsApp</Button>
          </div>
        </div>
      ) : null}

      {/* Title + meta */}
      <div className="space-y-3">
        <h1 className="text-2xl font-black">{e.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(e.scheduledAt).toLocaleDateString("pt-AO", { weekday: "long", day: "numeric", month: "long" })}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(e.scheduledAt).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })} WAT</span>
          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{e.rsvpCount} interessados</span>
        </div>
        <div className="flex flex-wrap gap-1.5">{e.tags?.map(t => <Badge key={t} variant="outline" className="text-[9px]">#{t}</Badge>)}</div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide border-b border-white/10 pb-2">
        {TABS.map(t => t.href ? (
          <Link key={t.id} href={t.href} className="px-3 py-1.5 rounded-full text-xs font-bold text-muted-foreground hover:bg-white/10">{t.label}</Link>
        ) : (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-full text-xs font-bold ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</button>
        ))}
      </div>

      {/* About tab */}
      {tab === "sobre" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm leading-relaxed">{e.description}</p>
            {e.prizes && <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20"><p className="text-xs font-bold text-yellow-400 flex items-center gap-1.5 mb-1"><Trophy className="w-4 h-4" />Prémios</p><p className="text-sm">{e.prizes}</p></div>}
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold">Organizador</h3>
              <Link href={`/${e.organizer.username}`} className="flex items-center gap-2 hover:text-primary text-sm"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{e.organizer.displayName[0]}</div>{e.organizer.displayName}</Link>
            </div>
            <div className="p-4 rounded-xl border border-white/10 space-y-2">
              <h3 className="text-sm font-bold">Detalhes</h3>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>🌐 Idioma: {e.language}</p>
                <p>📋 Classificação: {e.contentRating}</p>
                {e.sponsors && <p>🤝 Patrocínios: {e.sponsors.map(s => s.name).join(", ")}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
