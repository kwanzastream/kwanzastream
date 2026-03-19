"use client"
import { ShortFeed } from "@/components/shorts/short-feed"
import type { ShortData } from "@/components/shorts/short-card"
import Link from "next/link"

const TABS = [
  { id: "feed", label: "Para ti", href: "/shorts/feed" },
  { id: "a-seguir", label: "A seguir", href: "/shorts/feed/a-seguir" },
  { id: "trending", label: "Trending", href: "/shorts/feed/trending" },
  { id: "angola", label: "🇦🇴 Angola", href: "/shorts/feed/angola" },
]

const MOCK: ShortData[] = [
  { id: "s6", title: "Stream recap do canal que segues 📺", duration: 40, viewCount: 12000, likes: 980, createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Gaming", creator: { username: "canal_seguido", displayName: "Canal Seguido" } },
]

export default function ShortsFeedASeguirPage() {
  return (
    <div className="relative">
      <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${t.id === "a-seguir" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>{t.label}</Link>)}
      </div>
      <ShortFeed shorts={MOCK} />
    </div>
  )
}
