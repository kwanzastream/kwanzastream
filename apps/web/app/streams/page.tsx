'use client'

import * as React from 'react'
import { Navbar } from '@/components/navbar'
import { StreamCard } from '@/components/stream-card'
import { CategoryPill, ALL_CATEGORIES } from '@/components/category-pill'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { streamService } from '@/lib/services'
import { Radio } from 'lucide-react'

interface LiveStream {
    id: string
    title: string
    category?: string
    viewerCount: number
    thumbnailUrl?: string
    streamer: {
        id: string
        displayName?: string
        username?: string
        avatarUrl?: string
    }
}

export default function StreamsPage() {
    const [streams, setStreams] = React.useState<LiveStream[]>([])
    const [loading, setLoading] = React.useState(true)
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

    React.useEffect(() => {
        const fetchStreams = async () => {
            try {
                const res = await streamService.getLive(1, 50, selectedCategory || undefined)
                setStreams(res.data.streams || res.data || [])
            } catch (err) {
                console.error('Erro ao carregar streams:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchStreams()
        const interval = setInterval(fetchStreams, 30000)
        return () => clearInterval(interval)
    }, [selectedCategory])

    return (
        <div className="min-h-dvh bg-background pb-mobile-nav">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                        Streams Ao Vivo
                    </h1>
                    <p className="text-muted-foreground">
                        Descobre o que está a acontecer na comunidade angolana agora mesmo.
                    </p>
                </div>

                {/* Category Filters — horizontal scroll on mobile */}
                <div className="mb-8">
                    <div className="scroll-tabs gap-2 pb-2">
                        <CategoryPill
                            category="Todos"
                            active={selectedCategory === null}
                            onClick={() => setSelectedCategory(null)}
                        />
                        {ALL_CATEGORIES.map((cat) => (
                            <CategoryPill
                                key={cat}
                                category={cat}
                                active={selectedCategory === cat}
                                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                            />
                        ))}
                    </div>
                </div>

                {/* Stream Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-2xl card-surface overflow-hidden">
                                <Skeleton className="aspect-video w-full" />
                                <div className="p-4 space-y-3">
                                    <div className="flex gap-3">
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-3 w-3/4" />
                                            <Skeleton className="h-2.5 w-1/2" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : streams.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                            <Radio className="h-9 w-9 text-primary/60" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                            {selectedCategory ? `Nenhuma live de ${selectedCategory}` : 'Nenhuma live agora'}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                            {selectedCategory
                                ? `Ainda não há streams nesta categoria. Experimenta outra ou volta mais tarde!`
                                : 'Sê o primeiro a transmitir para a comunidade angolana! 🇦🇴'}
                        </p>
                        {selectedCategory && (
                            <Button
                                variant="outline"
                                className="rounded-xl"
                                onClick={() => setSelectedCategory(null)}
                            >
                                Ver todas as categorias
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {streams.map((stream) => (
                            <StreamCard
                                key={stream.id}
                                id={stream.id}
                                title={stream.title}
                                thumbnailUrl={stream.thumbnailUrl}
                                category={stream.category}
                                viewerCount={stream.viewerCount}
                                streamer={stream.streamer}
                                isLive
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
