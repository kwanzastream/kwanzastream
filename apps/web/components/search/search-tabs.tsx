"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Radio, Users, Video, Scissors, Smartphone, Hash, Tag, Users2, Calendar, Swords, User } from "lucide-react"

const TABS = [
  { id: "tudo", label: "Tudo", href: "/pesquisa/tudo", icon: null },
  { id: "streams", label: "Streams", href: "/pesquisa/streams", icon: <Radio className="w-3 h-3" /> },
  { id: "canais", label: "Canais", href: "/pesquisa/canais", icon: <Users className="w-3 h-3" /> },
  { id: "videos", label: "Vídeos", href: "/pesquisa/videos", icon: <Video className="w-3 h-3" /> },
  { id: "clips", label: "Clips", href: "/pesquisa/clips", icon: <Scissors className="w-3 h-3" /> },
  { id: "shorts", label: "Shorts", href: "/pesquisa/shorts", icon: <Smartphone className="w-3 h-3" /> },
  { id: "categorias", label: "Categorias", href: "/pesquisa/categorias", icon: <Hash className="w-3 h-3" /> },
  { id: "tags", label: "Tags", href: "/pesquisa/tags", icon: <Tag className="w-3 h-3" /> },
  { id: "tribos", label: "Tribos", href: "/pesquisa/tribos", icon: <Users2 className="w-3 h-3" /> },
  { id: "eventos", label: "Eventos", href: "/pesquisa/eventos", icon: <Calendar className="w-3 h-3" /> },
  { id: "torneios", label: "Torneios", href: "/pesquisa/torneios", icon: <Swords className="w-3 h-3" /> },
  { id: "utilizadores", label: "Utilizadores", href: "/pesquisa/utilizadores", icon: <User className="w-3 h-3" /> },
]

export function SearchTabs({ query }: { query?: string }) {
  const pathname = usePathname()
  const qParam = query ? `?q=${encodeURIComponent(query)}` : ""

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
      {TABS.map(t => {
        const isActive = pathname === t.href
        return (
          <Link key={t.id} href={`${t.href}${qParam}`}
            className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>
            {t.icon}{t.label}
          </Link>
        )
      })}
    </div>
  )
}
