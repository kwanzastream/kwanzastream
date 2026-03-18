"use client"

import { useState, useEffect } from "react"
import { FeedTabs } from "@/components/feed/feed-tabs"
import { FeedCardShort } from "@/components/feed/feed-card-short"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"
import { Flame, Users, Compass, Video, Scissors, Play, CalendarDays, UserPlus } from "lucide-react"

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

const MOCK_SHORTS = [
  { id: "sh1", title: "Tutorial dança kuduro em 15s", views: 12000, streamer: { username: "dancer_ao", displayName: "Dancer AO" } },
  { id: "sh2", title: "Trick shot com garrafa de água", views: 8400, streamer: { username: "tricks_ao", displayName: "Tricks AO" } },
  { id: "sh3", title: "Pôr do sol em Luanda 🌅", views: 5600, streamer: { username: "travel_ao", displayName: "Travel AO" } },
  { id: "sh4", title: "Receita rápida de banana frita", views: 3200, streamer: { username: "chefangola", displayName: "Chef Angola" } },
  { id: "sh5", title: "Melhores momentos da semana", views: 9100, streamer: { username: "highlights_ao", displayName: "Highlights AO" } },
  { id: "sh6", title: "Como configurar OBS em 30s", views: 4300, streamer: { username: "tech_ao", displayName: "Tech AO" } },
  { id: "sh7", title: "Gato angolano vs rato", views: 15000, streamer: { username: "pets_ao", displayName: "Pets AO" } },
  { id: "sh8", title: "Beat de semba original", views: 6700, streamer: { username: "producer_ao", displayName: "Producer AO" } },
]

export default function FeedShortsPage() {
  const [loading, setLoading] = useState(true)
  useEffect(() => { setTimeout(() => setLoading(false), 600) }, [])

  if (loading) return <div className="min-h-screen"><FeedTabs tabs={TABS} /><div className="max-w-screen-xl mx-auto py-4 px-4"><FeedSkeleton variant="vertical" count={8} /></div></div>

  return (
    <div className="min-h-screen">
      <FeedTabs tabs={TABS} />

      {/* Mobile: fullscreen vertical scroll | Desktop: 4-column grid */}
      <div className="max-w-screen-xl mx-auto py-4 px-4">
        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {MOCK_SHORTS.map((s) => (
            <FeedCardShort key={s.id} {...s} autoplay />
          ))}
        </div>

        {/* Mobile: vertical scroll, one per screen */}
        <div className="sm:hidden space-y-3">
          {MOCK_SHORTS.map((s) => (
            <FeedCardShort key={s.id} {...s} autoplay className="!h-[80vh]" />
          ))}
        </div>
      </div>
    </div>
  )
}
