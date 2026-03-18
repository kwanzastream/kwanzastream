"use client"

import { useState, useEffect } from "react"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { FeedCardStream } from "@/components/feed/feed-card-stream"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Flame, Users, Compass, Video, Scissors, Play, CalendarDays, UserPlus, Sparkles, RotateCcw } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

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

const NEW_CREATORS = [
  { username: "gamer_luanda", displayName: "Gamer Luanda", category: "Gaming", streams: 12, followers: 234 },
  { username: "dj_malembe", displayName: "DJ Malembe", category: "Música", streams: 8, followers: 189 },
  { username: "chef_benguela", displayName: "Chef Benguela", category: "Culinária", streams: 6, followers: 156 },
  { username: "tech_ao", displayName: "Tech Angola", category: "Tecnologia", streams: 15, followers: 312 },
]

const RETURNED = [
  { username: "old_streamer", displayName: "Velho Lobo", category: "Conversa", lastStream: "2 semanas", followers: 1200 },
  { username: "musica_clasica", displayName: "Clássicos AO", category: "Música", lastStream: "3 semanas", followers: 890 },
]

const DISCOVER_STREAMS = [
  { id: "d1", title: "FIFA Pro Club Angola", category: "Gaming", viewerCount: 67, startedAt: new Date(Date.now() - 2400000).toISOString(), streamer: { username: "fifaclub_ao", displayName: "FIFA Club AO" } },
  { id: "d2", title: "Debate: Tecnologia em Angola", category: "Educação", viewerCount: 34, startedAt: new Date(Date.now() - 5400000).toISOString(), streamer: { username: "techtalks", displayName: "Tech Talks AO" } },
]

export default function FeedExplorarPage() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { setTimeout(() => setLoading(false), 600) }, [])

  if (loading) return <div className="min-h-screen"><FeedTabs tabs={TABS} /><div className="max-w-screen-xl mx-auto py-4 px-4"><FeedSkeleton count={4} /></div></div>

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />
      <div className="max-w-screen-xl mx-auto py-4 px-4 space-y-8">
        {/* Novos Criadores */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-bold">Novos criadores</h2>
            <Badge variant="secondary" className="text-[9px]">Últimos 30 dias</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {NEW_CREATORS.map((c) => (
              <Link key={c.username} href={`/${c.username}`}>
                <div className="rounded-xl border border-white/10 hover:border-primary/50 p-4 transition-all flex items-center gap-3">
                  <Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/20 text-primary text-xs">{c.displayName.slice(0, 2)}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{c.displayName}</p>
                    <p className="text-[10px] text-muted-foreground">{c.category} · {c.streams} streams · {c.followers} seguidores</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 text-xs h-7" onClick={(e) => { e.preventDefault(); toast.success(`Agora segues ${c.displayName}`) }}>Seguir</Button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Voltou a transmitir */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <h2 className="font-bold">Voltou a transmitir</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RETURNED.map((c) => (
              <Link key={c.username} href={`/${c.username}`}>
                <div className="rounded-xl border border-white/10 hover:border-amber-500/30 p-4 transition-all flex items-center gap-3">
                  <Avatar className="w-10 h-10"><AvatarFallback className="bg-amber-500/20 text-amber-400 text-xs">{c.displayName.slice(0, 2)}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{c.displayName}</p>
                    <p className="text-[10px] text-muted-foreground">{c.category} · Ausente {c.lastStream} · {c.followers} seguidores</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 text-xs h-7" onClick={(e) => { e.preventDefault(); toast.success(`Agora segues ${c.displayName}`) }}>Seguir</Button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Discover streams */}
        <section>
          <h2 className="font-bold mb-4">Descobrir</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DISCOVER_STREAMS.map((s) => <FeedCardStream key={s.id} {...s} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
