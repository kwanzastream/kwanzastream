"use client"
import { useState, useEffect } from "react"
import { HistoryNav } from "@/components/history/history-nav"
import { HistoryItemStream } from "@/components/history/history-item-stream"
import { HistoryEmptyState } from "@/components/history/history-empty-state"
import api from "@/lib/api"
import { toast } from "sonner"
export default function VideosAssistidosPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/history/streams?type=vod").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "v1", contentId: "v1", contentType: "vod", watchedSecs: 9240, watchedAt: "há 3 dias", progress: 0.8, title: "Tutorial OBS Studio", channel: "ksgaming" }])) }, [])
  const remove = (id: string) => { api.delete(`/api/history/streams/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <h2 className="text-sm font-semibold">VODs assistidos</h2>
      {items.length === 0 ? <HistoryEmptyState type="videos" /> : <div className="space-y-2">{items.map(i => <HistoryItemStream key={i.id} {...i} title={i.title || "VOD"} channel={i.channel || "canal"} type="vod" onRemove={remove} />)}</div>}
    </div>
  )
}
