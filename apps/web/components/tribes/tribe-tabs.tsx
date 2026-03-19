"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface TribeTabsProps {
  slug: string
}

const TABS = [
  { id: "feed", label: "Feed" },
  { id: "streams", label: "Streams" },
  { id: "videos", label: "Vídeos" },
  { id: "clips", label: "Clips" },
  { id: "shorts", label: "Shorts" },
  { id: "membros", label: "Membros" },
  { id: "eventos", label: "Eventos" },
  { id: "torneios", label: "Torneios" },
  { id: "sobre", label: "Sobre" },
]

export function TribeTabs({ slug }: TribeTabsProps) {
  const pathname = usePathname()
  const current = pathname.split("/").pop() || "feed"

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide border-b border-white/10 pb-2">
      {TABS.map(tab => {
        const href = `/tribos/${slug}/${tab.id}`
        const isActive = current === tab.id || (current === slug && tab.id === "feed")
        return (
          <Link key={tab.id} href={href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{tab.label}</Link>
        )
      })}
    </div>
  )
}
