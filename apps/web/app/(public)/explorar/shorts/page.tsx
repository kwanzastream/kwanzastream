"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Play, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { WhatsAppShareButton } from "@/components/public/whatsapp-share-button"

const MOCK_SHORTS = Array.from({ length: 20 }, (_, i) => ({
  id: `short-${i}`, title: `Short viral #${i + 1}`, views: Math.floor(Math.random() * 50000),
  username: `creator${i}`, displayName: `Criador ${i + 1}`,
}))

export default function ExplorarShortsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/explorar" className="hover:text-foreground">Explorar</Link>
          <span>/</span><span className="text-foreground">Shorts</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Shorts</h1>
        <p className="text-sm text-muted-foreground">Conteúdo curto vertical — menos de 60 segundos. Som desligado por defeito.</p>
      </div>

      {/* Desktop: Grid 4 cols */}
      <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-3">
        {MOCK_SHORTS.map((short) => (
          <ShortCard key={short.id} {...short} />
        ))}
      </div>

      {/* Mobile: Full-screen vertical scroll */}
      <div className="md:hidden space-y-3">
        {MOCK_SHORTS.map((short) => (
          <ShortCard key={short.id} {...short} mobile />
        ))}
      </div>
    </div>
  )
}

function ShortCard({ id, title, views, username, displayName, mobile }: any) {
  const [muted, setMuted] = useState(true)

  return (
    <Link href={`/shorts/${id}`} className="block group">
      <div className={`relative rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all bg-muted ${mobile ? "aspect-[9/16]" : "aspect-[9/14]"}`}>
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-secondary/10">
          <Play className="w-10 h-10 text-muted-foreground/40" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
          <Badge className="bg-primary/80 text-white text-[9px]">SHORT</Badge>
          <button onClick={(e) => { e.preventDefault(); setMuted(!muted) }} className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center text-white">
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-sm font-medium truncate">{title}</p>
          <p className="text-white/70 text-xs mt-0.5">@{username}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/50 text-[10px]">{views > 999 ? `${(views / 1000).toFixed(1)}k` : views} views</span>
            <WhatsAppShareButton url={`/shorts/${id}`} text={`${title} — Short no Kwanza Stream`} variant="ghost" size="icon" className="w-6 h-6 text-white hover:text-white" />
          </div>
        </div>
      </div>
    </Link>
  )
}
