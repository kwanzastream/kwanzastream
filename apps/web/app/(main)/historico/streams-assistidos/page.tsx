"use client"
import { useState, useEffect } from "react"
import { HistoryNav } from "@/components/history/history-nav"
import { HistoryItemStream } from "@/components/history/history-item-stream"
import { HistoryEmptyState } from "@/components/history/history-empty-state"
import api from "@/lib/api"
import { toast } from "sonner"
export default function StreamsAssistidosPage() {
  const [items, setItems] = useState<any[]>([])
  const [filter, setFilter] = useState("all")
  useEffect(() => { api.get("/api/history/streams").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "1", contentId: "s1", contentType: "stream", watchedSecs: 4980, watchedAt: "há 2 horas", progress: 0, title: "Stream de Gaming", channel: "canal1" }, { id: "2", contentId: "v1", contentType: "vod", watchedSecs: 2700, watchedAt: "há 5 horas", progress: 0.8, title: "Kuduro Mix", channel: "canal2" }])) }, [])
  const filtered = filter === "all" ? items : items.filter(i => filter === "live" ? i.contentType === "stream" : i.contentType === "vod")
  const remove = (id: string) => { api.delete(`/api/history/streams/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <div className="flex items-center gap-2">{["all","live","vod"].map(f => <button key={f} onClick={() => setFilter(f)} className={`text-[10px] px-2 py-1 rounded-full ${filter === f ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"}`}>{f === "all" ? "Todos" : f === "live" ? "Ao vivo" : "VODs"}</button>)}</div>
      {filtered.length === 0 ? <HistoryEmptyState type="streams" /> : <div className="space-y-2">{filtered.map(i => <HistoryItemStream key={i.id} {...i} title={i.title || "Stream"} channel={i.channel || "canal"} type={i.contentType} onRemove={remove} />)}</div>}
    </div>
  )
}
