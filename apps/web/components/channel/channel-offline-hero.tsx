import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Calendar, Clock } from "lucide-react"

interface ChannelOfflineHeroProps {
  username: string
  lastVod?: { id: string; title: string; thumbnailUrl?: string; duration: number; createdAt: string }
  lastOnline?: string
  nextSchedule?: { title: string; date: string }
}

export function ChannelOfflineHero({ username, lastVod, lastOnline, nextSchedule }: ChannelOfflineHeroProps) {
  const timeSince = (date: string) => {
    const diff = Date.now() - new Date(date).getTime()
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return "há menos de 1 hora"
    if (hours < 24) return `há ${hours} hora${hours > 1 ? "s" : ""}`
    const days = Math.floor(hours / 24)
    return `há ${days} dia${days > 1 ? "s" : ""}`
  }

  return (
    <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
      {lastVod ? (
        <Link href={`/videos/${lastVod.id}`} className="block">
          <div className="relative aspect-video max-h-[280px] bg-muted overflow-hidden group">
            {lastVod.thumbnailUrl ? (
              <img src={lastVod.thumbnailUrl} alt={lastVod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-muted">
                <Play className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-semibold text-sm line-clamp-2">{lastVod.title}</p>
              <p className="text-white/70 text-xs mt-1">Último vídeo · {timeSince(lastVod.createdAt)}</p>
            </div>
            <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
              📺 OFFLINE
            </div>
          </div>
        </Link>
      ) : (
        <div className="aspect-video max-h-[200px] bg-muted/30 flex flex-col items-center justify-center text-center p-6">
          <p className="text-3xl mb-2">📺</p>
          <p className="font-medium text-muted-foreground">Canal offline</p>
          {lastOnline && <p className="text-xs text-muted-foreground mt-1">Último online: {timeSince(lastOnline)}</p>}
        </div>
      )}

      {nextSchedule && (
        <div className="px-4 py-3 border-t border-border/50 flex items-center gap-3">
          <Calendar className="w-4 h-4 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{nextSchedule.title}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(nextSchedule.date).toLocaleDateString("pt-AO", { weekday: "long", hour: "2-digit", minute: "2-digit" })}
              {" WAT"}
            </p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 text-xs">Lembrar</Button>
        </div>
      )}
    </div>
  )
}
