'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

/** Mapeamento de categorias para emojis e cores */
const CATEGORY_MAP: Record<string, { emoji: string; colors: string }> = {
    'Gaming': { emoji: '🎮', colors: 'bg-pink-500/10 text-pink-300 border-pink-500/25 hover:bg-pink-500/20' },
    'Gaming AO': { emoji: '🎮', colors: 'bg-pink-500/10 text-pink-300 border-pink-500/25 hover:bg-pink-500/20' },
    'Música': { emoji: '🎵', colors: 'bg-purple-500/10 text-purple-300 border-purple-500/25 hover:bg-purple-500/20' },
    'Música ao Vivo': { emoji: '🎵', colors: 'bg-purple-500/10 text-purple-300 border-purple-500/25 hover:bg-purple-500/20' },
    'Futebol': { emoji: '⚽', colors: 'bg-green-500/10 text-green-300 border-green-500/25 hover:bg-green-500/20' },
    'Girabola & Futebol': { emoji: '⚽', colors: 'bg-green-500/10 text-green-300 border-green-500/25 hover:bg-green-500/20' },
    'Kuduro': { emoji: '💃', colors: 'bg-amber-500/10 text-amber-300 border-amber-500/25 hover:bg-amber-500/20' },
    'Kuduro & Semba': { emoji: '💃', colors: 'bg-amber-500/10 text-amber-300 border-amber-500/25 hover:bg-amber-500/20' },
    'Comédia': { emoji: '😂', colors: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/25 hover:bg-yellow-500/20' },
    'Comédia Angolana': { emoji: '😂', colors: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/25 hover:bg-yellow-500/20' },
    'Educação': { emoji: '📚', colors: 'bg-blue-500/10 text-blue-300 border-blue-500/25 hover:bg-blue-500/20' },
    'Culinária': { emoji: '🍳', colors: 'bg-orange-500/10 text-orange-300 border-orange-500/25 hover:bg-orange-500/20' },
    'Culinária Angolana': { emoji: '🍳', colors: 'bg-orange-500/10 text-orange-300 border-orange-500/25 hover:bg-orange-500/20' },
    'Conversa & IRL': { emoji: '💬', colors: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25 hover:bg-cyan-500/20' },
    'Lifestyle': { emoji: '✨', colors: 'bg-rose-500/10 text-rose-300 border-rose-500/25 hover:bg-rose-500/20' },
    'Tech & Programação': { emoji: '💻', colors: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25 hover:bg-indigo-500/20' },
    'Debate': { emoji: '🗣️', colors: 'bg-teal-500/10 text-teal-300 border-teal-500/25 hover:bg-teal-500/20' },
}

const DEFAULT_CATEGORY = { emoji: '📺', colors: 'bg-white/5 text-white/70 border-border hover:bg-white/10' }

interface CategoryPillProps {
    category: string
    size?: 'sm' | 'md' | 'lg'
    onClick?: () => void
    active?: boolean
    className?: string
}

/**
 * Pill/chip de categoria com emoji e cor dinâmica.
 * Suporta todas as categorias angolanas da Kwanza Stream.
 */
export function CategoryPill({ category, size = 'md', onClick, active, className }: CategoryPillProps) {
    const config = CATEGORY_MAP[category] || DEFAULT_CATEGORY

    const sizeClasses = {
        sm: 'text-[11px] px-2 py-0.5 gap-1',
        md: 'text-xs px-3 py-1.5 gap-1.5',
        lg: 'text-sm px-4 py-2 gap-2',
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                'inline-flex items-center rounded-full border font-semibold transition-all whitespace-nowrap',
                sizeClasses[size],
                active
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                    : config.colors,
                onClick && 'cursor-pointer',
                !onClick && 'cursor-default',
                className
            )}
        >
            <span>{config.emoji}</span>
            <span>{category}</span>
        </button>
    )
}

/** Lista de todas as categorias disponíveis */
export const ALL_CATEGORIES = Object.keys(CATEGORY_MAP)
