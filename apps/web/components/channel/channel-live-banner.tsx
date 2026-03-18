"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Eye } from "lucide-react"

interface ChannelLiveBannerProps {
  username: string
  title: string
  category?: string
  viewerCount: number
  thumbnailUrl?: string
}

export function ChannelLiveBanner({ username, title, category, viewerCount, thumbnailUrl }: ChannelLiveBannerProps) {
  return (
    <Link href={`/stream/${username}`}>
      <div className="rounded-xl overflow-hidden border-2 border-[#CE1126]/50 bg-[#CE1126]/5 hover:bg-[#CE1126]/10 transition-all flex items-center gap-4 p-4 group">
        {/* Thumbnail */}
        <div className="w-28 sm:w-36 aspect-video bg-muted rounded-lg overflow-hidden shrink-0 relative">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#CE1126]/30 to-muted">
              <Play className="w-8 h-8 text-[#CE1126] group-hover:scale-110 transition-transform" />
            </div>
          )}
          <Badge className="absolute top-1 left-1 bg-[#CE1126] text-white text-[9px] px-1 py-0.5 animate-pulse">
            AO VIVO
          </Badge>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate group-hover:text-primary transition-colors">{title}</p>
          {category && <p className="text-sm text-muted-foreground mt-0.5">{category}</p>}
          <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />
            <span>{viewerCount.toLocaleString("pt-AO")} espectadores</span>
          </div>
        </div>

        <Button size="sm" className="bg-[#CE1126] hover:bg-[#CE1126]/90 shrink-0 hidden sm:flex gap-1.5">
          <Play className="w-3.5 h-3.5 fill-current" /> Assistir
        </Button>
      </div>
    </Link>
  )
}
