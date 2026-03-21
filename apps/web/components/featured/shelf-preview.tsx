"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { FeaturedChannel } from "./featured-channel-row"

interface ShelfPreviewProps {
  channels: FeaturedChannel[]
  type: "channels" | "team" | "disabled"
}

export function ShelfPreview({ channels, type }: ShelfPreviewProps) {
  if (type === "disabled") {
    return (
      <div className="p-6 rounded-xl border border-dashed border-white/10 text-center">
        <p className="text-sm text-muted-foreground">Shelf desactivada</p>
        <p className="text-[10px] text-muted-foreground mt-1">A tua página de canal não mostra shelf.</p>
      </div>
    )
  }

  if (channels.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-dashed border-white/10 text-center">
        <p className="text-sm text-muted-foreground">Sem canais na shelf</p>
        <p className="text-[10px] text-muted-foreground mt-1">Adiciona canais para aparecerem no teu perfil.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
        Preview — como aparece no teu perfil
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {channels.slice(0, 6).map((ch) => (
          <div
            key={ch.id}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors"
          >
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={ch.avatarUrl || undefined} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {ch.displayName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {ch.isLive && (
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
                  <Badge variant="destructive" className="text-[7px] px-1 py-0 h-3">
                    LIVE
                  </Badge>
                </div>
              )}
            </div>
            <p className="text-[10px] font-medium truncate w-full text-center">@{ch.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
