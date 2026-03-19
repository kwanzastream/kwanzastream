"use client"

import { ShortPlayer } from "./short-player"
import { ShortActions } from "./short-actions"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Music, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
import type { ShortData } from "./short-card"

interface ShortFeedProps {
  shorts: ShortData[]
}

/**
 * Vertical snap-scroll feed. Each short takes full viewport height.
 * CSS scroll-snap + IntersectionObserver for autoplay.
 */
export function ShortFeed({ shorts }: ShortFeedProps) {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
      {shorts.map((s, i) => (
        <div key={s.id} className="h-screen snap-start relative flex items-center justify-center bg-black">
          <div className="relative w-full max-w-[450px] h-full">
            {/* Player */}
            <ShortPlayer videoUrl={s.videoUrl} thumbnailUrl={s.thumbnailUrl} autoplay fullscreen />

            {/* Actions sidebar */}
            <div className="absolute right-3 bottom-32 z-20">
              <ShortActions likes={s.likes} comments={42} shares={s.viewCount > 100 ? Math.floor(s.viewCount * 0.02) : 5} shortId={s.id} title={s.title} creatorName={s.creator.displayName} />
            </div>

            {/* Bottom info overlay */}
            <div className="absolute bottom-4 left-4 right-16 z-20 space-y-2">
              {/* Creator */}
              <div className="flex items-center gap-2">
                <Link href={`/${s.creator.username}`} className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 border-2 border-white/30">
                    <AvatarFallback className="bg-primary/30 text-white text-[10px]">{s.creator.displayName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm font-bold">@{s.creator.username}</span>
                </Link>
                <Button variant="outline" size="sm" className="h-6 px-2 text-[10px] border-white/30 text-white bg-transparent hover:bg-white/10" onClick={() => toast.success("A seguir!")}>
                  <Check className="w-3 h-3 mr-1" />Seguir
                </Button>
              </div>
              {/* Title/description */}
              <p className="text-white text-sm line-clamp-2">{s.title}</p>
              {/* Music ticker */}
              {s.music && (
                <div className="flex items-center gap-1.5 text-white/70 text-[10px]">
                  <Music className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
                  <span className="truncate">{s.music}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
