'use client'

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
    icon: React.ReactNode
    label: string
    value: string | number
    trend?: {
        value: string | number
        direction: 'up' | 'down' | 'neutral'
    }
    accentColor?: string // Tailwind bg class, e.g. "bg-primary/10"
    iconColor?: string   // Tailwind text class, e.g. "text-primary"
    className?: string
}

/**
 * Card de estatística para dashboards (Creator Studio, Admin Panel).
 * Mostra ícone, label, valor principal, e tendência com seta direcional.
 */
export function StatCard({
    icon,
    label,
    value,
    trend,
    accentColor = 'bg-primary/10',
    iconColor = 'text-primary',
    className,
}: StatCardProps) {
    const trendColor = {
        up: 'text-green-400',
        down: 'text-red-400',
        neutral: 'text-muted-foreground',
    }

    const TrendIcon = {
        up: TrendingUp,
        down: TrendingDown,
        neutral: Minus,
    }

    return (
        <div className={cn('p-4 md:p-5 rounded-2xl card-surface space-y-3 group', className)}>
            <div className="flex items-center justify-between">
                <div
                    className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
                        accentColor,
                        iconColor
                    )}
                >
                    {icon}
                </div>
                {trend && (
                    <div className={cn('flex items-center gap-1 text-xs font-semibold', trendColor[trend.direction])}>
                        {(() => {
                            const Icon = TrendIcon[trend.direction]
                            return <Icon className="h-3.5 w-3.5" />
                        })()}
                        <span>{trend.value}</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
        </div>
    )
}
