'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Heart,
  MessageCircle,
  Users,
  Zap,
  Play,
  Radio,
  TrendingUp,
  WifiOff,
} from 'lucide-react'
import { streamService } from '@/lib/services'

interface StreamData {
  id: string
  title: string
  category?: string
  status: string
  viewerCount: number
  thumbnailUrl?: string
  streamer: {
    id: string
    displayName?: string
    username?: string
    avatarUrl?: string
  }
}

const categoryColors: Record<string, string> = {
  Gaming: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
  Música: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  Lifestyle: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  Educação: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Debate: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
}

export function LiveFeed() {
  const router = useRouter()
  const [streams, setStreams] = React.useState<StreamData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchStreams = async () => {
      try {
        const res = await streamService.getLive()
        setStreams(res.data.streams || res.data || [])
      } catch (err) {
        console.error('Failed to fetch live streams:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStreams()
    // Poll every 30s
    const interval = setInterval(fetchStreams, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Lives Agora</h2>
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden border-white/10 bg-card/50">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="pt-4 pb-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (streams.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Lives Agora</h2>
            <p className="text-muted-foreground text-sm">Nenhuma transmissão ao vivo</p>
          </div>
        </div>
        <Card className="border-white/10 bg-card/50 backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <WifiOff className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2">Ninguém em live agora</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Sê o primeiro a transmitir! Abre o Studio e começa a tua live para a comunidade angolana.
            </p>
            <Button onClick={() => router.push('/stream')} className="bg-primary hover:bg-primary/90 gap-2">
              <Play className="h-4 w-4" /> Começar a Transmitir
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Lives Agora</h2>
          <p className="text-muted-foreground text-sm">
            {streams.length} transmiss{streams.length === 1 ? 'ão' : 'ões'} ao vivo
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <TrendingUp className="w-4 h-4" />
          Tendências
        </Button>
      </div>

      {/* Grid of Live Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {streams.map((stream) => (
          <Card
            key={stream.id}
            onClick={() => router.push(`/watch/${stream.id}`)}
            className="overflow-hidden border-white/10 hover:border-primary/50 transition-all group cursor-pointer bg-card/50 backdrop-blur"
          >
            {/* Stream Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
              {stream.thumbnailUrl ? (
                <img src={stream.thumbnailUrl} alt={stream.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white/40" />
                </div>
              )}

              {/* Live Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="bg-red-500/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">
                  AO VIVO
                </span>
              </div>

              {/* Viewers Count */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                <Users className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-semibold">
                  {stream.viewerCount >= 1000
                    ? `${(stream.viewerCount / 1000).toFixed(1)}k`
                    : stream.viewerCount}
                </span>
              </div>
            </div>

            {/* Stream Info */}
            <CardContent className="pt-4 pb-4 space-y-3">
              {/* Creator Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                    {(stream.streamer?.displayName || stream.streamer?.username || '?')[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {stream.streamer?.displayName || stream.streamer?.username || 'Streamer'}
                    </p>
                    <p className="text-xs text-muted-foreground">Online agora</p>
                  </div>
                </div>
                <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer" />
              </div>

              {/* Title */}
              <div>
                <p className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {stream.title}
                </p>
              </div>

              {/* Category */}
              {stream.category && (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${categoryColors[stream.category] || 'bg-white/5 text-white/70 border-white/20'} border`}
                  >
                    {stream.category}
                  </Badge>
                </div>
              )}

              {/* Action */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span className="text-xs">{stream.viewerCount} espectadores</span>
                </div>
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                  <MessageCircle className="w-3 h-3" />
                  Assistir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" className="w-full bg-transparent">
          Carregar Mais Lives
        </Button>
      </div>
    </div>
  )
}
