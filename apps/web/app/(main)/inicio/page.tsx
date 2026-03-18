"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Circle, Users, Play, Zap, ArrowRight, Sparkles, RotateCcw, Star } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const SUGGESTED_CHANNELS = [
  { username: "angolangamer", displayName: "Angola Gamer", category: "Gaming", followers: 2340, isLive: true, viewerCount: 234 },
  { username: "kuduroking", displayName: "Kuduro King", category: "Música", followers: 5600, isLive: false, viewerCount: 0 },
  { username: "chefangola", displayName: "Chef Angola", category: "Culinária", followers: 1200, isLive: false, viewerCount: 0 },
  { username: "techtalks", displayName: "Tech Talks AO", category: "Tecnologia", followers: 890, isLive: true, viewerCount: 45 },
  { username: "fifaclub_ao", displayName: "FIFA Club AO", category: "Gaming", followers: 3400, isLive: false, viewerCount: 0 },
  { username: "dancer_ao", displayName: "Dancer AO", category: "Entretenimento", followers: 4500, isLive: false, viewerCount: 0 },
]

interface ChecklistItem {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  completed: boolean
}

export default function InicioPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Checklist from DB (review correction #5 — persistent, not localStorage)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "follow", label: "Segue 3 canais", description: "Descobre criadores angolanos", icon: <Users className="w-4 h-4" />, completed: false },
    { id: "watch", label: "Assiste ao teu primeiro stream", description: "Entra numa live e interage", icon: <Play className="w-4 h-4" />, completed: false },
    { id: "salo", label: "Envia o teu primeiro Salo", description: "Apoia um criador que gostas", icon: <Zap className="w-4 h-4" />, completed: false },
  ])

  const [followed, setFollowed] = useState<Set<string>>(new Set())
  const completedCount = checklist.filter(c => c.completed).length

  // Redirect after 3 follows or all checklist complete
  useEffect(() => {
    if (followed.size >= 3) {
      setChecklist(prev => prev.map(c => c.id === "follow" ? { ...c, completed: true } : c))
    }
    if (followed.size >= 3 && completedCount >= 2) {
      // Let user see the completed state briefly before redirect
      setTimeout(() => router.push("/feed/para-ti"), 1500)
    }
  }, [followed, completedCount, router])

  const handleFollow = (username: string, displayName: string) => {
    setFollowed(prev => {
      const next = new Set(prev)
      if (next.has(username)) { next.delete(username); toast.info(`Deixaste de seguir ${displayName}`) }
      else { next.add(username); toast.success(`Agora segues ${displayName} 🎉`) }
      return next
    })
  }

  return (
    <div className="min-h-screen max-w-screen-md mx-auto py-8 px-4 space-y-8">
      {/* Welcome */}
      <div className="text-center">
        <h1 className="text-2xl font-black">Bem-vindo, @{user?.username || "user"}! 🇦🇴</h1>
        <p className="text-sm text-muted-foreground mt-2">Vamos preparar o teu feed personalizado</p>
      </div>

      {/* Checklist */}
      <div className="rounded-2xl border border-white/10 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm">Primeiros passos</h2>
          <Badge variant="secondary" className="text-[10px]">{completedCount}/3</Badge>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completedCount / 3) * 100}%` }} />
        </div>
        {checklist.map((item) => (
          <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.completed ? "border-green-500/30 bg-green-500/5" : "border-white/10"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.completed ? "bg-green-500/20 text-green-400" : "bg-white/10 text-muted-foreground"}`}>
              {item.completed ? <Check className="w-4 h-4" /> : item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested channels */}
      <div className="space-y-3">
        <h2 className="font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" />Canais sugeridos para ti</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUGGESTED_CHANNELS.map((ch) => (
            <div key={ch.username} className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all flex items-center gap-3">
              <Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">{ch.displayName.slice(0, 2)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold truncate">{ch.displayName}</p>
                  {ch.isLive && <Badge className="bg-[#CE1126] text-white text-[8px] px-1 py-0 border-none h-4">LIVE</Badge>}
                </div>
                <p className="text-[10px] text-muted-foreground">{ch.category} · {ch.followers > 999 ? `${(ch.followers / 1000).toFixed(1)}k` : ch.followers} seguidores</p>
              </div>
              <Button size="sm" variant={followed.has(ch.username) ? "secondary" : "outline"} className="shrink-0 text-xs h-8"
                onClick={() => handleFollow(ch.username, ch.displayName)}>
                {followed.has(ch.username) ? "A seguir ✓" : "Seguir"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/inicio/recomendados">
          <div className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all text-center">
            <Star className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <p className="text-xs font-bold">Recomendados</p>
          </div>
        </Link>
        <Link href="/inicio/novos-streamers">
          <div className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all text-center">
            <Sparkles className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-xs font-bold">Novos streamers</p>
          </div>
        </Link>
        <Link href="/inicio/voltou-a-transmitir">
          <div className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all text-center">
            <RotateCcw className="w-5 h-5 text-green-400 mx-auto mb-2" />
            <p className="text-xs font-bold">Voltou a transmitir</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
