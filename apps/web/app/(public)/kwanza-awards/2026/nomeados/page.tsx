"use client"
import { useState, useEffect } from "react"
import { AwardsNomineeCard } from "@/components/angola/awards-nominee-card"
import api from "@/lib/api"
export default function NomeadosPage() {
  const [nominees, setNominees] = useState<any[]>([])
  useEffect(() => { api.get("/api/awards/2026/nominees").then(r => setNominees(r.data || [])).catch(() => {}) }, [])
  const grouped = nominees.reduce((acc: Record<string, any[]>, n) => { (acc[n.category] = acc[n.category] || []).push(n); return acc }, {})
  const catNames: Record<string, string> = { gaming: "🎮 Melhor Streamer de Gaming", musica: "🎵 Melhor DJ / Músico", futebol: "⚽ Melhor Caster de Futebol" }
  return (<div className="max-w-3xl mx-auto px-4 py-8 space-y-6"><h1 className="text-2xl font-bold">Nomeados 2026</h1>
    {Object.entries(grouped).map(([cat, noms]) => (
      <div key={cat} className="space-y-2"><h2 className="text-sm font-semibold">{catNames[cat] || cat}</h2>{(noms as any[]).map((n: any) => <AwardsNomineeCard key={n.id} {...n} />)}</div>
    ))}
  </div>)
}
