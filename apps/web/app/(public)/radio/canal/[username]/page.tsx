"use client"
import { useParams } from "next/navigation"
import { useRadioPlayer } from "@/components/radio/radio-player-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Bell, MessageCircle, Music, Headphones, Calendar, Clock, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK = {
  channel: "dj_kuduro_ao", displayName: "DJ Kuduro AO", title: "Kuduro Mix — Sexta à Noite 🎵", genre: "Kuduro", listeners: 234, isLive: true,
  description: "O melhor mix de Kuduro todas as sextas-feiras. 3 horas de música sem parar.",
  schedule: "Sextas 21h–00h WAT",
  episodes: [{ title: "Kuduro Mix — Ep. 12", date: "há 7 dias", duration: "2:45:00" }, { title: "Kuduro Mix — Ep. 11", date: "há 14 dias", duration: "3:10:00" }],
}

export default function RadioCanalPage() {
  const { username } = useParams()
  const { isPlaying, currentStation, play, pause } = useRadioPlayer()
  const isThisPlaying = isPlaying && currentStation?.channel === MOCK.channel

  const handlePlay = () => {
    if (isThisPlaying) pause()
    else play({ channel: MOCK.channel, displayName: MOCK.displayName, title: MOCK.title, genre: MOCK.genre, listeners: MOCK.listeners })
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <Link href="/radio/ao-vivo"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>

      {/* Artwork */}
      <div className="mx-auto w-48 h-48 rounded-3xl bg-gradient-to-br from-primary/30 to-purple-500/20 flex items-center justify-center shadow-2xl shadow-primary/10">
        <Music className="w-16 h-16 text-primary/30" />
      </div>

      {/* Info */}
      <div className="text-center space-y-2">
        <h1 className="text-xl font-black">{MOCK.title}</h1>
        <p className="text-sm text-muted-foreground">@{MOCK.channel}</p>
        <div className="flex items-center justify-center gap-3">
          <Badge variant="outline" className="text-[9px]">{MOCK.genre}</Badge>
          {MOCK.isLive && <span className="text-[10px] text-red-400 flex items-center gap-1"><Headphones className="w-3 h-3" />{MOCK.listeners} ouvintes</span>}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <Button size="lg" className={`rounded-full w-16 h-16 ${isThisPlaying ? "bg-primary/20 text-primary" : ""}`} onClick={handlePlay}>
          {isThisPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
        </Button>
      </div>
      <div className="flex justify-center gap-3">
        <Button variant="outline" className="gap-1 text-xs" onClick={() => toast.success("A seguir!")}><Bell className="w-3 h-3" />Seguir</Button>
        <Button variant="outline" className="gap-1 text-xs" onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(`Ouve ${MOCK.title} no Kwanza Stream!\nhttps://kwanzastream.ao/radio/canal/${username}`)}`, "_blank") }}><MessageCircle className="w-3 h-3" />Partilhar</Button>
      </div>

      {/* About */}
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <h3 className="text-sm font-bold">Sobre</h3>
        <p className="text-xs text-muted-foreground">{MOCK.description}</p>
        <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{MOCK.schedule}</p>
      </div>

      {/* Episodes */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold">Episódios anteriores</h3>
        {MOCK.episodes.map((ep, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 cursor-pointer transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Play className="w-4 h-4 text-primary" /></div>
            <div className="flex-1"><p className="text-xs font-bold">{ep.title}</p><p className="text-[9px] text-muted-foreground">{ep.date} · {ep.duration}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}
