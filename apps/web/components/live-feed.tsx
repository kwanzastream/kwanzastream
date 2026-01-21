'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  MessageCircle,
  Users,
  Zap,
  Play,
  Radio,
  TrendingUp,
} from 'lucide-react'

interface LiveStream {
  id: string
  creator: string
  avatar: string
  title: string
  category: 'Gaming' | 'Música' | 'Lifestyle' | 'Educação' | 'Debate'
  viewers: number
  raised: number
  tags: string[]
  isLive: boolean
  mode: 'video' | 'radio'
  trending?: boolean
}

const mockStreams: LiveStream[] = [
  {
    id: '1',
    creator: 'Ninja Angolano',
    avatar: '🎮',
    title: 'Free Fire Tournament - Grande Final',
    category: 'Gaming',
    viewers: 5420,
    raised: 125000,
    tags: ['frefire', 'torneio', 'ao-vivo'],
    isLive: true,
    mode: 'video',
    trending: true,
  },
  {
    id: '2',
    creator: 'Anselmo Ralph',
    avatar: '🎵',
    title: 'DJ Set - Kizomba Hits',
    category: 'Música',
    viewers: 3210,
    raised: 89500,
    tags: ['musica', 'djset', 'luanda'],
    isLive: true,
    mode: 'radio',
  },
  {
    id: '3',
    creator: 'Tech Angola',
    avatar: '💻',
    title: 'Podcast: Futuro Digital em Angola',
    category: 'Educação',
    viewers: 1850,
    raised: 34200,
    tags: ['podcast', 'tecnologia', 'educacao'],
    isLive: true,
    mode: 'radio',
  },
  {
    id: '4',
    creator: 'Preto Show',
    avatar: '😂',
    title: 'Stand-up Comedy Show',
    category: 'Lifestyle',
    viewers: 2960,
    raised: 67000,
    tags: ['comedia', 'risadas', 'entretenimento'],
    isLive: true,
    mode: 'video',
    trending: true,
  },
]

const categoryColors: Record<string, string> = {
  Gaming: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
  Música: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  Lifestyle: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  Educação: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  Debate: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
}

export function LiveFeed() {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Lives Agora</h2>
          <p className="text-muted-foreground text-sm">
            {mockStreams.length} transmissões acontecendo ao vivo
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <TrendingUp className="w-4 h-4" />
          Tendências
        </Button>
      </div>

      {/* Grid of Live Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {mockStreams.map((stream) => (
          <Card
            key={stream.id}
            className="overflow-hidden border-white/10 hover:border-primary/50 transition-all group cursor-pointer bg-card/50 backdrop-blur"
          >
            {/* Stream Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
              {/* Placeholder Video Background */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {stream.mode === 'video' ? (
                  <Play className="w-12 h-12 text-white/40" />
                ) : (
                  <Radio className="w-12 h-12 text-white/40" />
                )}
              </div>

              {/* Live Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="bg-red-500/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded">
                  AO VIVO
                </span>
              </div>

              {/* Trending Badge */}
              {stream.trending && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-secondary text-secondary-foreground gap-1">
                    <Zap className="w-3 h-3" />
                    Tendência
                  </Badge>
                </div>
              )}

              {/* Mode Badge */}
              <div className="absolute bottom-3 left-3">
                {stream.mode === 'radio' && (
                  <Badge variant="outline" className="gap-1 bg-blue-500/20">
                    <Radio className="w-3 h-3" />
                    Modo Rádio
                  </Badge>
                )}
              </div>

              {/* Viewers Count */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                <Users className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-semibold">
                  {(stream.viewers / 1000).toFixed(1)}k
                </span>
              </div>
            </div>

            {/* Stream Info */}
            <CardContent className="pt-4 pb-4 space-y-3">
              {/* Creator Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg">
                    {stream.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{stream.creator}</p>
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

              {/* Category & Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={`${categoryColors[stream.category]} border`}
                >
                  {stream.category}
                </Badge>
                {stream.tags.slice(0, 1).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Raised & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Arrecadado</span>
                  <span className="font-bold text-accent text-sm">
                    {(stream.raised / 1000).toFixed(0)}k Kz
                  </span>
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
