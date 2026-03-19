"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { RadioCard, type RadioStationData } from "@/components/radio/radio-card"
import { useRadioPlayer } from "@/components/radio/radio-player-context"
import { Button } from "@/components/ui/button"
import { Bookmark, Lock } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "ao-vivo", label: "Ao Vivo", href: "/radio/ao-vivo" },
  { id: "generos", label: "Géneros", href: "/radio/generos" },
  { id: "schedule", label: "Programação", href: "/radio/schedule" },
  { id: "top", label: "Top", href: "/radio/top" },
  { id: "recentes", label: "Recentes", href: "/radio/recentes" },
  { id: "guardados", label: "Guardados", href: "/radio/guardados" },
]

const SAVED: RadioStationData[] = [
  { channel: "dj_kuduro_ao", displayName: "DJ Kuduro AO", title: "Kuduro Mix — Ep. 10 (guardado)", genre: "Kuduro", listeners: 0, isLive: false },
]

export default function RadioGuardadosPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { isPlaying, currentStation, play, pause } = useRadioPlayer()
  const handlePlay = (s: RadioStationData) => {
    if (isPlaying && currentStation?.channel === s.channel) pause()
    else play({ channel: s.channel, displayName: s.displayName, title: s.title, genre: s.genre, listeners: s.listeners })
  }

  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para ver guardados</p><Button onClick={() => router.push("/entrar?redirectTo=/radio/guardados")}>Entrar</Button></div>

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Bookmark className="w-5 h-5" />Rádios Guardados</h1>
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">{TABS.map(t => <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "guardados" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      {SAVED.length > 0 ? <div className="space-y-2">{SAVED.map(s => <RadioCard key={s.channel} station={s} onPlay={handlePlay} isPlaying={isPlaying && currentStation?.channel === s.channel} />)}</div> : <div className="text-center py-16"><Bookmark className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem rádios guardados</p></div>}
    </div>
  )
}
