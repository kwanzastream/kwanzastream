"use client"
import Link from "next/link"
import { MapPin } from "lucide-react"
interface ProvinceCardProps { slug: string; name: string; capital: string; streams?: number; viewers?: number; creators?: number }
export function ProvinceCard({ slug, name, capital, streams = 0, viewers = 0, creators = 0 }: ProvinceCardProps) {
  return (
    <Link href={`/provincias/${slug}`} className="p-4 rounded-xl border border-white/10 hover:border-primary/20 transition-all space-y-1">
      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><p className="text-sm font-semibold">{name}</p></div>
      <p className="text-[10px] text-muted-foreground">Capital: {capital}</p>
      <div className="flex gap-3 text-[9px] text-muted-foreground">
        <span>🔴 {streams} ao vivo</span><span>👁 {viewers}</span><span>🎥 {creators} criadores</span>
      </div>
    </Link>
  )
}
