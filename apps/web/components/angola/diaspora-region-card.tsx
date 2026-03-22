"use client"
import Link from "next/link"
interface DiasporaRegionCardProps { slug: string; country: string; flag: string; creators: number; desc: string }
export function DiasporaRegionCard({ slug, country, flag, creators, desc }: DiasporaRegionCardProps) {
  return (
    <Link href={`/angola/diaspora/${slug}`} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all space-y-1">
      <span className="text-3xl">{flag}</span>
      <p className="text-sm font-semibold">{country}</p>
      <p className="text-[10px] text-muted-foreground">{desc}</p>
      <p className="text-xs text-primary">{creators} criadores</p>
    </Link>
  )
}
