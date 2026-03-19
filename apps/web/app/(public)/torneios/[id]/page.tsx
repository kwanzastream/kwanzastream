"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { EventCountdown } from "@/components/events/event-countdown"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Gamepad2, Users, Calendar, Clock, Bell, BellOff, MessageCircle, Eye } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK = {
  id: "t1", title: "Torneio FIFA 25 — Luanda Cup", game: "FIFA 25", description: "O maior torneio de FIFA 25 de Angola. 32 jogadores, eliminação simples, prémios em dinheiro. Transmissão ao vivo com comentário em PT-AO.",
  status: "REGISTERING" as string, format: "individual", prize: "50.000 Kz", participantCount: 24, maxParticipants: 32,
  startDate: new Date(Date.now() + 604800000).toISOString(), endDate: new Date(Date.now() + 691200000).toISOString(),
  tags: ["fifa25", "esports", "angola"], viewerCount: 0,
  organizer: { username: "esports_ao", displayName: "eSports AO", followers: 8500 },
  requirements: "Idade mínima: 16 anos · Residência em Angola · Conta PlayStation ou PC",
}

const TABS = [
  { id: "sobre", label: "Sobre", href: "" },
  { id: "participantes", label: "Participantes", href: "participantes" },
  { id: "bracket", label: "Bracket", href: "bracket" },
  { id: "resultados", label: "Resultados", href: "resultados" },
  { id: "premios", label: "Prémios", href: "premios" },
  { id: "regras", label: "Regras", href: "regras" },
  { id: "streams", label: "Streams", href: "streams" },
]

export default function TorneioPage() {
  const { id } = useParams()
  const [reminded, setReminded] = useState(false)
  const t = MOCK
  const isReg = t.status === "REGISTERING"
  const isActive = t.status === "ACTIVE"
  const slotsLeft = (t.maxParticipants || 0) - t.participantCount

  const handleWhatsApp = () => {
    const url = `https://kwanzastream.ao/torneios/${id}`
    window.open(`https://wa.me/?text=${encodeURIComponent(`${t.title} — ${t.prize}\n${url}`)}`, "_blank")
  }

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-6">
      {/* Banner */}
      <div className="relative aspect-[3/1] rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 to-yellow-500/10 border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">Banner do Torneio</div>
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={`text-[9px] ${isReg ? "bg-green-500/10 text-green-400 border-green-500/30" : isActive ? "bg-red-500/10 text-red-400 border-red-500/30" : "bg-white/5 text-muted-foreground"}`}>{isReg ? "Inscrições abertas" : isActive ? "Em curso" : t.status}</Badge>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <h1 className="text-2xl font-black">{t.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Gamepad2 className="w-3.5 h-3.5" />{t.game}</span>
          <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-yellow-400" />{t.prize}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(t.startDate).toLocaleDateString("pt-AO", { day: "numeric", month: "short" })}</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{t.participantCount}/{t.maxParticipants}</span>
          {isReg && slotsLeft > 0 && <Badge variant="outline" className="text-[9px] text-green-400 border-green-500/30">{slotsLeft} vagas restantes</Badge>}
        </div>
      </div>

      {/* Countdown + Actions */}
      {isReg && (
        <div className="text-center space-y-4">
          <EventCountdown targetDate={t.startDate} />
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href={`/torneios/${id}/inscrever`}><Button className="gap-2 font-bold"><Trophy className="w-4 h-4" />Inscrever</Button></Link>
            <Button variant="outline" className="gap-2" onClick={() => { setReminded(!reminded); toast.success(reminded ? "Removido" : "Lembrete definido!") }}>{reminded ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}Lembrar</Button>
            <Button variant="outline" className="gap-2" onClick={handleWhatsApp}><MessageCircle className="w-4 h-4" />WhatsApp</Button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide border-b border-white/10 pb-2">
        {TABS.map(tab => (
          <Link key={tab.id} href={`/torneios/${id}/${tab.href}`} className="px-3 py-1.5 rounded-full text-xs font-bold text-muted-foreground hover:bg-white/10">{tab.label}</Link>
        ))}
      </div>

      {/* About (default) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <p className="text-sm leading-relaxed">{t.description}</p>
          {t.requirements && <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10"><p className="text-xs font-bold mb-1">Requisitos:</p><p className="text-xs text-muted-foreground">{t.requirements}</p></div>}
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-white/10 space-y-2">
            <h3 className="text-sm font-bold">Organizador</h3>
            <Link href={`/${t.organizer.username}`} className="flex items-center gap-2 text-sm hover:text-primary"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{t.organizer.displayName[0]}</div>{t.organizer.displayName}</Link>
          </div>
          <div className="p-4 rounded-xl border border-white/10 space-y-1 text-xs text-muted-foreground">
            <p>🎮 Formato: {t.format === "individual" ? "Individual" : `Equipas de ${t.format.replace("team", "")}`}</p>
            <p>🏆 Prémio: {t.prize}</p>
            <p>📅 Início: {new Date(t.startDate).toLocaleDateString("pt-AO")} WAT</p>
          </div>
        </div>
      </div>
    </div>
  )
}
