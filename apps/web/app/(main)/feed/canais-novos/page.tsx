"use client"

import { useState, useEffect } from "react"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Flame, Users, Compass, Video, Scissors, Play, CalendarDays, UserPlus, MapPin, TrendingUp, Clock, Radio } from "lucide-react"
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

const SORT_OPTS = ["Mais activos", "Mais seguidores", "Mais recentes"]

const MOCK_NEW_CREATORS = [
  { username: "gamer_luanda", displayName: "Gamer Luanda", category: "Gaming", streams: 12, followers: 234, province: "Luanda", createdDaysAgo: 15 },
  { username: "dj_malembe", displayName: "DJ Malembe", category: "Música", streams: 8, followers: 189, province: "Luanda", createdDaysAgo: 22 },
  { username: "chef_benguela", displayName: "Chef Benguela", category: "Culinária", streams: 6, followers: 156, province: "Benguela", createdDaysAgo: 10 },
  { username: "tech_cabinda", displayName: "Tech Cabinda", category: "Tecnologia", streams: 15, followers: 312, province: "Cabinda", createdDaysAgo: 5 },
  { username: "arte_huila", displayName: "Arte Huíla", category: "Arte", streams: 4, followers: 78, province: "Huíla", createdDaysAgo: 28 },
  { username: "futebol_malanje", displayName: "Futebol Malanje", category: "Desporto", streams: 9, followers: 201, province: "Malanje", createdDaysAgo: 18 },
]

const PROVINCE_CREATORS = MOCK_NEW_CREATORS.filter(c => c.province === "Luanda")

export default function FeedCanaisNovosPage() {
  const [sort, setSort] = useState("Mais activos")
  const [loading, setLoading] = useState(true)

  useEffect(() => { setTimeout(() => setLoading(false), 600) }, [])

  const sorted = [...MOCK_NEW_CREATORS].sort((a, b) => {
    if (sort === "Mais activos") return b.streams - a.streams
    if (sort === "Mais seguidores") return b.followers - a.followers
    return a.createdDaysAgo - b.createdDaysAgo
  })

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />
      <div className="max-w-screen-xl mx-auto py-4 px-4 space-y-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2"><UserPlus className="w-5 h-5 text-primary" />Novos criadores</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Canais criados nos últimos 30 dias</p>
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          {SORT_OPTS.map((s) => (
            <button key={s} onClick={() => setSort(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${sort === s ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>{s}</button>
          ))}
        </div>

        {/* Province section */}
        {PROVINCE_CREATORS.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold">Criadores da tua província</h3>
              <Badge variant="secondary" className="text-[9px]">Luanda</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {PROVINCE_CREATORS.map((c) => (
                <CreatorCard key={c.username} creator={c} />
              ))}
            </div>
          </section>
        )}

        {/* All new creators */}
        {loading ? <FeedSkeleton count={6} /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sorted.map((c) => <CreatorCard key={c.username} creator={c} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function CreatorCard({ creator: c }: { creator: any }) {
  return (
    <Link href={`/${c.username}`}>
      <div className="rounded-xl border border-white/10 hover:border-primary/50 p-4 transition-all flex items-center gap-3">
        <Avatar className="w-11 h-11"><AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">{c.displayName.slice(0, 2)}</AvatarFallback></Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">{c.displayName}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <Badge variant="secondary" className="text-[9px]">{c.category}</Badge>
            <span className="text-[10px] text-muted-foreground">{c.streams} streams · {c.followers} seguidores</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />Há {c.createdDaysAgo} dias</p>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 text-xs h-8" onClick={(e) => { e.preventDefault(); toast.success(`Agora segues ${c.displayName}`) }}>Seguir</Button>
      </div>
    </Link>
  )
}
