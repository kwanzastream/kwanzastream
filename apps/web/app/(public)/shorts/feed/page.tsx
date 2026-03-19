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
  { id: "s1", title: "Kuduro dance challenge - quem faz melhor? 🔥💃", duration: 28, viewCount: 245000, likes: 18000, createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Dança", music: "🎵 Kuduro Nacional — DJ Malvado", creator: { username: "danca_ao", displayName: "Dança AO" } },
  { id: "s2", title: "Golo de bicicleta no pelado de Luanda 🇦🇴⚽", duration: 15, viewCount: 89000, likes: 6700, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Futebol", music: "🎵 Hino do Petro", creator: { username: "futebol_rua", displayName: "Futebol de Rua" } },
  { id: "s3", title: "Receita de muamba em 30 segundos 🍗", duration: 30, viewCount: 156000, likes: 12000, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Culinária", creator: { username: "chef_luanda", displayName: "Chef Luanda" } },
  { id: "s4", title: "Comédia: quando a mãe descobre o telefone novo 😂", duration: 45, viewCount: 320000, likes: 28000, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Comédia", creator: { username: "humor_ao", displayName: "Humor AO" } },
]

export default function ShortsFeedPage() {
  return (
    <div className="relative">
      {/* Tab navigation overlay */}
      <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-full">
        {TABS.map(t => (
          <Link key={t.id} href={t.href} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${t.id === "feed" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}>
            {t.label}
          </Link>
        ))}
      </div>
      <ShortFeed shorts={MOCK} />
    </div>
  )
}
