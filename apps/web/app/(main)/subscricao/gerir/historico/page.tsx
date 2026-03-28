"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { History } from "lucide-react"

export default function SubscricoesHistoricoPage() {
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/subscriptions/history").then(r => setHistory(r.data?.subscriptions || r.data || [])).catch(() => setHistory([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><History className="w-5 h-5 text-primary" />Histórico de Subscrições</h1>
          <p className="text-sm text-muted-foreground mt-1">Todas as tuas subscrições passadas e activas.</p>
        </div>
        <Link href="/subscricao/gerir/activas" className="text-sm text-primary hover:underline">← Activas</Link>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(5).fill(0).map((_, i) => <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : history.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <History className="w-12 h-12 text-muted-foreground/30 mx-auto" />
          <p className="font-medium">Sem histórico de subscrições</p>
          <p className="text-sm text-muted-foreground">Quando subscreveres um canal, o histórico aparecerá aqui.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((s: any) => (
            <div key={s.id} className="p-3 rounded-xl border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold">{s.channel?.displayName?.slice(0, 2) || "?"}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.channel?.displayName}</p>
                <p className="text-[10px] text-muted-foreground">{new Date(s.startedAt).toLocaleDateString("pt-AO")} — {s.status === "active" ? "Activa" : new Date(s.endedAt).toLocaleDateString("pt-AO")}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${s.status === "active" ? "bg-green-500/10 text-green-500" : "bg-white/5 text-muted-foreground"}`}>{s.status === "active" ? "Activa" : "Expirada"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
