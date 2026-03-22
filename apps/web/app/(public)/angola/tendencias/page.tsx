"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import api from "@/lib/api"

export default function TendenciasPage() {
  const [data, setData] = useState<any>(null)
  const [period, setPeriod] = useState("hoje")
  useEffect(() => { api.get(`/api/angola/trending?period=${period}`).then(r => setData(r.data)).catch(() => {}) }, [period])
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">📈 Tendências Angola</h1>
      <div className="flex gap-2">
        {[{ key: "hoje", label: "Hoje" }, { key: "semana", label: "Esta semana" }].map(p => (
          <button key={p.key} onClick={() => setPeriod(p.key)} className={`px-3 py-1.5 rounded-lg border text-xs ${period === p.key ? "border-primary bg-primary/5" : "border-white/10"}`}>{p.label}</button>
        ))}
      </div>
      {data?.streams && <div className="space-y-2"><h2 className="text-sm font-semibold">Top Streams AO</h2>
        {data.streams.map((s: any, i: number) => (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
            <span className="text-lg font-bold text-muted-foreground">{i + 1}</span>
            <div className="flex-1"><p className="text-sm font-semibold">{s.title}</p><p className="text-[10px] text-muted-foreground">@{s.username} · {s.category} · {s.province}</p></div>
            <span className="text-sm font-bold text-primary">{s.viewers} 👁</span>
          </div>
        ))}</div>}
      {data?.categories && <div className="space-y-2"><h2 className="text-sm font-semibold">Categorias em Alta</h2>
        <div className="flex gap-2 flex-wrap">{data.categories.map((c: any) => (
          <span key={c.name} className="px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-xs">{c.name} <span className="text-green-400">{c.change}</span></span>
        ))}</div></div>}
    </div>
  )
}
