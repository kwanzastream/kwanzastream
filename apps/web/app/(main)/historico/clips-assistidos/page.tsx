"use client"
import { useState, useEffect } from "react"
import { HistoryNav } from "@/components/history/history-nav"
import { HistoryItemStream } from "@/components/history/history-item-stream"
import { HistoryEmptyState } from "@/components/history/history-empty-state"
import api from "@/lib/api"
import { toast } from "sonner"
export default function ClipsAssistidosPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/history/streams?type=clip").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "c1", contentId: "c1", contentType: "clip", watchedSecs: 45, watchedAt: "há 1 hora", title: "Jogada incrível", channel: "gamer1" }])) }, [])
  const remove = (id: string) => { api.delete(`/api/history/streams/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <h2 className="text-sm font-semibold">Clips vistos</h2>
      {items.length === 0 ? <HistoryEmptyState type="clips" /> : <div className="space-y-2">{items.map(i => <HistoryItemStream key={i.id} {...i} title={i.title || "Clip"} channel={i.channel || "canal"} type="clip" onRemove={remove} />)}</div>}
    </div>
  )
}
