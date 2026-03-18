"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"

interface LiveChannel {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  thumbnailUrl?: string
  viewerCount: number
  category?: string
}

interface LiveNowRailProps {
  channels: LiveChannel[]
  className?: string
}

export function LiveNowRail({ channels, className = "" }: LiveNowRailProps) {
  const [visible, setVisible] = useState<LiveChannel[]>(channels.slice(0, 10))

  // Update with fade-out for channels that went offline (review correction #6)
  useEffect(() => {
    setVisible((prev) => {
      const newIds = new Set(channels.map(c => c.id))
      // Keep channels that are still live, update viewer counts
      const updated = prev
        .filter(p => newIds.has(p.id))
        .map(p => channels.find(c => c.id === p.id) || p)
      // Add new channels
      const existingIds = new Set(updated.map(c => c.id))
      const added = channels.filter(c => !existingIds.has(c.id))
      return [...updated, ...added].slice(0, 10)
    })
  }, [channels])

  // Don't render if no live channels
  if (visible.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2 px-4">
        <div className="w-2 h-2 rounded-full bg-[#CE1126] animate-pulse" />
        <h3 className="text-sm font-bold">Ao Vivo Agora</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
        {visible.map((ch) => (
          <Link key={ch.id} href={`/stream/${ch.username}`} className="shrink-0">
            <div className="w-28 group">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all">
                {ch.thumbnailUrl ? (
                  <img src={ch.thumbnailUrl} alt={ch.displayName} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-muted" />
                )}
                <Badge className="absolute top-1 left-1 bg-[#CE1126] text-white text-[8px] px-1 py-0 font-bold border-none h-4">LIVE</Badge>
                <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1 py-0 flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5 text-white" />
                  <span className="text-[9px] text-white font-bold">{ch.viewerCount > 999 ? `${(ch.viewerCount / 1000).toFixed(1)}k` : ch.viewerCount}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Avatar className="w-5 h-5">
                  <AvatarImage src={ch.avatarUrl} />
                  <AvatarFallback className="text-[8px] bg-primary/20 text-primary">{ch.displayName?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="text-[10px] font-medium truncate">{ch.displayName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
