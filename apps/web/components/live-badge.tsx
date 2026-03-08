'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface LiveBadgeProps {
    variant?: 'default' | 'small' | 'overlay'
    className?: string
    viewerCount?: number
}

/**
 * Badge pulsante de "AO VIVO" com dot animado.
 * Variantes: default (inline), small (compacto), overlay (sobre thumbnails)
 */
export function LiveBadge({ variant = 'default', className, viewerCount }: LiveBadgeProps) {
    if (variant === 'small') {
        return (
            <span className={cn('inline-flex items-center gap-1', className)}>
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-red-400 uppercase">Live</span>
            </span>
        )
    }

    if (variant === 'overlay') {
        return (
            <div className={cn('flex items-center gap-2', className)}>
                <div className="flex items-center gap-1.5 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-lg shadow-red-600/25">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    AO VIVO
                </div>
                {viewerCount !== undefined && (
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-white">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {viewerCount >= 1000 ? `${(viewerCount / 1000).toFixed(1)}K` : viewerCount}
                    </div>
                )}
            </div>
        )
    }

    // Default variant
    return (
        <Badge
            className={cn(
                'bg-red-600 hover:bg-red-600 text-white border-none font-bold text-[11px] px-2.5 py-0.5 rounded-md animate-pulse gap-1.5',
                className
            )}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            AO VIVO
        </Badge>
    )
}
