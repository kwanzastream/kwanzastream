"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Flame, Play } from "lucide-react"

export default function ShortsTrendingGamingPage() {
  const [shorts, setShorts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/shorts/trending?category=gaming").then(r => setShorts(r.data?.shorts || r.data || [])).catch(() => setShorts([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><span className="text-2xl">🎮</span>Shorts — Gaming<Flame className="w-4 h-4 text-orange-500" /></h1>
          <p className="text-sm text-muted-foreground">Clips e highlights de gaming.</p>
        </div>
        <Link href="/shorts" className="text-sm text-primary hover:underline">Todos os shorts →</Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">{Array(10).fill(0).map((_, i) => <div key={i} className="aspect-[9/16] rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : shorts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-5xl">🎮</p>
          <p className="font-medium text-lg">Nenhum short de gaming disponível</p>
          <p className="text-sm text-muted-foreground">Os criadores estão a preparar conteúdo. Volta em breve!</p>
          <Link href="/shorts/criar" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mt-2"><Play className="w-3.5 h-3.5" />Criar short</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {shorts.map((s: any) => (
            <Link key={s.id} href={"/shorts/" + s.id} className="group">
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all bg-muted">
                {s.thumbnailUrl && <img src={s.thumbnailUrl} alt={s.title} className="w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-medium text-white truncate">{s.title}</p>
                  <p className="text-[10px] text-white/70">{s.views || 0} views</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}