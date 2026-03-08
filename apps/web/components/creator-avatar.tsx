'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface CreatorAvatarProps {
    src?: string | null
    name?: string
    username?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    isLive?: boolean
    kycTier?: number // 0, 1, or 2
    className?: string
    onClick?: () => void
}

/**
 * Avatar de creator com ring ao vivo (verde pulsante) e badge de KYC tier.
 * Usado em cards de stream, perfis, sidebars e chat.
 */
export function CreatorAvatar({
    src,
    name,
    username,
    size = 'md',
    isLive = false,
    kycTier,
    className,
    onClick,
}: CreatorAvatarProps) {
    const initials = (name || username || '??').substring(0, 2).toUpperCase()

    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-14 w-14',
        xl: 'h-20 w-20',
    }

    const ringClasses = {
        sm: 'ring-[2px] ring-offset-1',
        md: 'ring-2 ring-offset-2',
        lg: 'ring-[3px] ring-offset-2',
        xl: 'ring-[3px] ring-offset-3',
    }

    const kycBadgeSizes = {
        sm: 'h-3 w-3 text-[6px] -bottom-0.5 -right-0.5',
        md: 'h-4 w-4 text-[7px] -bottom-0.5 -right-0.5',
        lg: 'h-5 w-5 text-[8px] -bottom-0.5 -right-0.5',
        xl: 'h-6 w-6 text-[9px] -bottom-1 -right-1',
    }

    const kycColors: Record<number, string> = {
        0: 'bg-muted text-muted-foreground border-border',
        1: 'bg-blue-500 text-white border-blue-400',
        2: 'bg-amber-500 text-white border-amber-400',
    }

    const kycLabels: Record<number, string> = {
        0: '0',
        1: '✓',
        2: '★',
    }

    return (
        <div className={cn('relative inline-flex shrink-0', onClick && 'cursor-pointer', className)} onClick={onClick}>
            <Avatar
                className={cn(
                    sizeClasses[size],
                    isLive && ringClasses[size],
                    isLive && 'ring-green-500 ring-offset-background',
                    'transition-all'
                )}
            >
                <AvatarImage src={src || undefined} alt={name || username || 'Creator'} />
                <AvatarFallback className="bg-gradient-to-br from-primary/30 to-secondary/30 text-foreground font-bold text-xs">
                    {initials}
                </AvatarFallback>
            </Avatar>

            {/* Live dot indicator */}
            {isLive && (
                <span
                    className={cn(
                        'absolute top-0 right-0 rounded-full bg-green-500 border-2 border-background animate-pulse',
                        size === 'sm' ? 'h-2.5 w-2.5' : size === 'md' ? 'h-3 w-3' : 'h-3.5 w-3.5'
                    )}
                />
            )}

            {/* KYC tier badge */}
            {kycTier !== undefined && kycTier > 0 && (
                <span
                    className={cn(
                        'absolute rounded-full flex items-center justify-center font-bold border-2 border-background',
                        kycBadgeSizes[size],
                        kycColors[kycTier] || kycColors[0]
                    )}
                >
                    {kycLabels[kycTier]}
                </span>
            )}
        </div>
    )
}
