"use client"

import { Radio } from "lucide-react"
import Link from "next/link"

export interface RadioGenre {
  slug: string
  name: string
  emoji: string
  liveCount: number
  color?: string
}

export function RadioGenreCard({ genre }: { genre: RadioGenre }) {
  return (
    <Link href={`/radio/generos/${genre.slug}`} className="group block">
      <div className="p-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all bg-card" style={genre.color ? { borderColor: `${genre.color}30` } : undefined}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{genre.emoji}</span>
          <div className="flex-1">
            <p className="text-sm font-bold group-hover:text-primary transition-colors">{genre.name}</p>
            {genre.liveCount > 0 && <p className="text-[10px] text-red-400 flex items-center gap-1"><Radio className="w-3 h-3 animate-pulse" />{genre.liveCount} ao vivo</p>}
          </div>
        </div>
      </div>
    </Link>
  )
}
