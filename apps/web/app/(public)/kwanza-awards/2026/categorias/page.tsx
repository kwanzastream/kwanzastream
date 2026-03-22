"use client"
import { useState, useEffect } from "react"
import { AwardsCategoryCard } from "@/components/angola/awards-category-card"
import api from "@/lib/api"
export default function CategoriasPage() {
  const [cats, setCats] = useState<any[]>([])
  useEffect(() => { api.get("/api/awards/2026/categories").then(r => setCats(r.data || [])).catch(() => {}) }, [])
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">Categorias 2026</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{cats.map((c: any) => <AwardsCategoryCard key={c.id} {...c} year={2026} />)}</div>
    <div className="space-y-3">{cats.map((c: any) => <div key={c.id} className="p-3 rounded-xl border border-white/10"><p className="text-sm font-semibold">{c.emoji} {c.name}</p><p className="text-[10px] text-muted-foreground">Critério: contribuição excepcional na categoria, impacto na comunidade angolana, consistência durante 2026.</p></div>)}</div>
  </div>)
}
