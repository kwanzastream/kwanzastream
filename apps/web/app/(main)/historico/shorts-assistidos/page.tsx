"use client"
import { useState, useEffect } from "react"
import { HistoryNav } from "@/components/history/history-nav"
import { HistoryItemStream } from "@/components/history/history-item-stream"
import { HistoryEmptyState } from "@/components/history/history-empty-state"
import api from "@/lib/api"
import { toast } from "sonner"
export default function ShortsAssistidosPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/history/streams?type=short").then(r => setItems(r.data || [])).catch(() => setItems([])) }, [])
  const remove = (id: string) => { api.delete(`/api/history/streams/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <h2 className="text-sm font-semibold">Shorts vistos</h2>
      {items.length === 0 ? <HistoryEmptyState type="shorts" /> : <div className="grid grid-cols-3 gap-2">{items.map(i => <div key={i.id} className="rounded-xl border border-white/10 p-2 group relative"><div className="aspect-[9/16] bg-white/5 rounded-lg flex items-center justify-center text-2xl">📱</div><p className="text-[10px] mt-1 truncate">{i.title || "Short"}</p><button onClick={() => remove(i.id)} className="absolute top-1 right-1 text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100">✕</button></div>)}</div>}
    </div>
  )
}
