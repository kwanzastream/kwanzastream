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
  { id: "s7", title: "Trending: dança que está a viralizar 🔥", duration: 22, viewCount: 450000, likes: 38000, createdAt: new Date(Date.now() - 1800000).toISOString(), category: "Dança", music: "🎵 Trending Sound", creator: { username: "viral_ao", displayName: "Viral AO" } },
]

export default function ShortsFeedTrendingPage() {
  return (
    <div className="relative">
      <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full">
        {TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${t.id === "trending" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>{t.label}</Link>)}
      </div>
      <ShortFeed shorts={MOCK} />
    </div>
  )
}
