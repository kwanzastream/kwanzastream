"use client"
import { useState, useEffect } from "react"
import { AngolaMapWrapper } from "@/components/angola/angola-map-wrapper"
import { ProvinceCard } from "@/components/angola/province-card"
import { ANGOLA_PROVINCES } from "@/lib/angola-provinces"
import api from "@/lib/api"

export default function MapaAngolaPage() {
  const [data, setData] = useState<any[]>([])
  useEffect(() => { api.get("/api/angola/map-data").then(r => setData(r.data || [])).catch(() => {}) }, [])
  const sorted = [...data].sort((a, b) => b.streams - a.streams)
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2"><h1 className="text-2xl font-bold">🗺️ Angola ao Vivo</h1><p className="text-sm text-muted-foreground">Streams activos por província — clica numa província para explorar</p></div>
      <AngolaMapWrapper data={data} />
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Ranking de províncias</h2>
        {sorted.slice(0, 10).map((d, i) => { const p = ANGOLA_PROVINCES.find(x => x.slug === d.slug); return p ? (
          <div key={d.slug} className="flex items-center gap-3 p-2 rounded-lg border border-white/5">
            <span className="text-sm font-bold text-muted-foreground w-6">{i + 1}</span>
            <ProvinceCard slug={p.slug} name={p.name} capital={p.capital} streams={d.streams} viewers={d.viewers} />
          </div>
        ) : null })}
      </div>
    </div>
  )
}
