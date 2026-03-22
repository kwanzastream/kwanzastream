"use client"
import { useState, useEffect } from "react"
import { HistoryNav } from "@/components/history/history-nav"
import { HistoryItemChannel } from "@/components/history/history-item-channel"
import { HistoryEmptyState } from "@/components/history/history-empty-state"
import api from "@/lib/api"
export default function CanaisVisitadosPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/history/channels").then(r => setItems(r.data || [])).catch(() => setItems([{ channelId: "c1", channelName: "canal1", category: "Gaming", visitedAt: "há 1h", isLive: true }, { channelId: "c2", channelName: "muzika", category: "Música", visitedAt: "há 3h", isLive: false }])) }, [])
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <h2 className="text-sm font-semibold">Canais visitados (últimos 50)</h2>
      {items.length === 0 ? <HistoryEmptyState type="canais" /> : <div>{items.map(i => <HistoryItemChannel key={i.channelId} {...i} />)}</div>}
    </div>
  )
}
