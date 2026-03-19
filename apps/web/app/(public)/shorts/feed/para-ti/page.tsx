"use client"
import { ShortFeed } from "@/components/shorts/short-feed"
import type { ShortData } from "@/components/shorts/short-card"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

const TABS = [
  { id: "feed", label: "Para ti", href: "/shorts/feed" },
  { id: "para-ti", label: "Personalizado", href: "/shorts/feed/para-ti" },
  { id: "a-seguir", label: "A seguir", href: "/shorts/feed/a-seguir" },
  { id: "trending", label: "Trending", href: "/shorts/feed/trending" },
  { id: "angola", label: "🇦🇴 Angola", href: "/shorts/feed/angola" },
]

const MOCK: ShortData[] = [
  { id: "s5", title: "Recomendado para ti — Kuduro mix 🎵", duration: 35, viewCount: 180000, likes: 14000, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Música", music: "🎵 Mix Personalizado", creator: { username: "dj_custom", displayName: "DJ Custom" } },
]

export default function ShortsFeedParaTiPage() {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(() => { if (!user) router.replace("/shorts/feed") }, [user, router])

  return (
    <div className="relative">
      <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${t.id === "para-ti" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>{t.label}</Link>)}
      </div>
      <ShortFeed shorts={MOCK} />
    </div>
  )
}
