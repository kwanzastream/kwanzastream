"use client"
import Link from "next/link"
interface CultureCategoryCardProps { slug: string; name: string; emoji: string; streams?: number; desc: string }
export function CultureCategoryCard({ slug, name, emoji, streams = 0, desc }: CultureCategoryCardProps) {
  return (
    <Link href={`/angola/cultura/${slug}`} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all text-center space-y-1">
      <span className="text-2xl">{emoji}</span>
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-[10px] text-muted-foreground">{desc}</p>
      {streams > 0 && <p className="text-[9px] text-primary">{streams} ao vivo</p>}
    </Link>
  )
}
