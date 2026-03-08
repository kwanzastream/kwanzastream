'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { LiveBadge } from '@/components/live-badge'
import { CategoryPill } from '@/components/category-pill'
import { CreatorAvatar } from '@/components/creator-avatar'
import { cn } from '@/lib/utils'
import { Play, Share2 } from 'lucide-react'

interface StreamCardProps {
    id: string
    title: string
    thumbnailUrl?: string | null
    category?: string | null
    viewerCount: number
    streamer: {
        id: string
        displayName?: string | null
        username?: string | null
        avatarUrl?: string | null
    }
    isLive?: boolean
    className?: string
}

/**
 * Card de stream reutilizável com thumbnail, live badge, viewer count,
 * info do creator e categoria. Usado na landing page, feed, explore e /streams.
 */
export function StreamCard({
    id,
    title,
    thumbnailUrl,
    category,
    viewerCount,
    streamer,
    isLive = true,
    className,
}: StreamCardProps) {
    const router = useRouter()
    const creatorName = streamer.displayName || streamer.username || 'Streamer'

    const handleClick = () => {
        router.push(`/watch/${id}`)
    }

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation()
        const url = `${window.location.origin}/watch/${id}`
        if (navigator.share) {
            navigator.share({ title, url }).catch(() => { })
        } else {
            navigator.clipboard.writeText(url)
        }
    }

    return (
        <Card
            onClick={handleClick}
            className={cn(
                'overflow-hidden border-border hover:border-primary/40 transition-all group cursor-pointer card-surface rounded-2xl',
                className
            )}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-surface-2 to-surface-3 overflow-hidden">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Play className="w-12 h-12 text-white/20" />
                    </div>
                )}

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Live badge + viewers */}
                {isLive && (
                    <div className="absolute top-3 left-3">
                        <LiveBadge variant="overlay" viewerCount={viewerCount} />
                    </div>
                )}

                {/* Share button on hover */}
                <button
                    onClick={handleShare}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                    aria-label="Partilhar stream"
                >
                    <Share2 className="h-4 w-4" />
                </button>
            </div>

            {/* Info */}
            <CardContent className="p-4 space-y-3">
                {/* Creator row */}
                <div className="flex items-center gap-3">
                    <CreatorAvatar
                        src={streamer.avatarUrl}
                        name={creatorName}
                        size="sm"
                        isLive={isLive}
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                            {title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {creatorName}
                        </p>
                    </div>
                </div>

                {/* Category */}
                {category && (
                    <CategoryPill category={category} size="sm" />
                )}
            </CardContent>
        </Card>
    )
}
