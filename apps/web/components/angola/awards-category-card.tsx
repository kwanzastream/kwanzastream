"use client"
import Link from "next/link"
interface AwardsCategoryCardProps { id: string; name: string; emoji: string; year: number }
export function AwardsCategoryCard({ id, name, emoji, year }: AwardsCategoryCardProps) {
  return (
    <Link href={`/kwanza-awards/${year}/categorias`} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all text-center space-y-1">
      <span className="text-3xl">{emoji}</span>
      <p className="text-xs font-semibold">{name}</p>
    </Link>
  )
}
