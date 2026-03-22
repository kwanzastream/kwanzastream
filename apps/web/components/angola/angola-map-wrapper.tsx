"use client"
import { ANGOLA_PROVINCES } from "@/lib/angola-provinces"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface MapData { slug: string; streams: number; viewers: number }

export function AngolaMapWrapper({ data = [] }: { data?: MapData[] }) {
  const router = useRouter()
  const [hovered, setHovered] = useState<string | null>(null)
  const getColor = (slug: string) => {
    const d = data.find(p => p.slug === slug)
    if (!d || d.streams === 0) return "#1a1a2e"
    if (d.streams < 5) return "#2d1f3d"
    if (d.streams < 10) return "#4a1942"
    if (d.streams < 20) return "#7b2d47"
    if (d.streams < 50) return "#c44536"
    return "#e63946"
  }
  const getData = (slug: string) => data.find(p => p.slug === slug)
  return (
    <div className="relative">
      <svg viewBox="0 0 420 460" className="w-full max-w-lg mx-auto">
        {ANGOLA_PROVINCES.map(p => (
          <g key={p.slug} onClick={() => router.push(`/provincias/${p.slug}`)} onMouseEnter={() => setHovered(p.slug)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
            <circle cx={p.cx} cy={p.cy} r={hovered === p.slug ? 22 : 18} fill={getColor(p.slug)} stroke={hovered === p.slug ? "#e63946" : "#333"} strokeWidth={hovered === p.slug ? 2 : 1} className="transition-all duration-200" />
            <text x={p.cx} y={p.cy + 1} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={hovered === p.slug ? 7 : 5.5} fontWeight={600} className="pointer-events-none select-none">{p.name.length > 7 ? p.name.slice(0, 6) + "." : p.name}</text>
          </g>
        ))}
      </svg>
      {hovered && (() => { const p = ANGOLA_PROVINCES.find(x => x.slug === hovered); const d = getData(hovered); return p ? (
        <div className="absolute top-2 right-2 p-3 rounded-xl bg-black/90 border border-white/10 space-y-0.5 min-w-32">
          <p className="text-xs font-semibold">{p.name}</p>
          <p className="text-[10px] text-muted-foreground">Capital: {p.capital}</p>
          <p className="text-[10px] text-muted-foreground">🔴 {d?.streams || 0} streams ao vivo</p>
          <p className="text-[10px] text-muted-foreground">👁 {d?.viewers || 0} viewers</p>
        </div>
      ) : null })()}
      <div className="flex items-center justify-center gap-3 mt-3 text-[9px] text-muted-foreground">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: "#1a1a2e" }} />0</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: "#4a1942" }} />1-10</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: "#c44536" }} />10-50</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded" style={{ background: "#e63946" }} />50+</div>
      </div>
    </div>
  )
}
