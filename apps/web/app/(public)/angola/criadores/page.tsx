"use client"
import { useState, useEffect } from "react"
import { CreatorAngolaCard } from "@/components/angola/creator-angola-card"
import Link from "next/link"
import api from "@/lib/api"

export default function CriadoresAngolaPage() {
  const [creators, setCreators] = useState<any[]>([])
  const [filter, setFilter] = useState("top")
  useEffect(() => { api.get(`/api/angola/creators?filter=${filter}`).then(r => setCreators(r.data || [])).catch(() => {}) }, [filter])
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">🇦🇴 Criadores de Angola</h1>
      <div className="flex gap-2">
        {[{ key: "top", label: "Top" }, { key: "novos", label: "Novos" }].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-lg border text-xs ${filter === f.key ? "border-primary bg-primary/5" : "border-white/10"}`}>{f.label}</button>
        ))}
        <Link href="/angola/criadores/provincia/luanda" className="px-3 py-1.5 rounded-lg border border-white/10 text-xs">Por Província</Link>
      </div>
      <div className="space-y-2">{creators.map((c: any) => <CreatorAngolaCard key={c.id} {...c} />)}</div>
    </div>
  )
}
