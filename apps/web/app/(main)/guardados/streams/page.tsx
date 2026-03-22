"use client"
import { useState, useEffect } from "react"
import { SavedNav } from "@/components/saved/saved-nav"
import { SavedItemCard } from "@/components/saved/saved-item-card"
import api from "@/lib/api"
import { toast } from "sonner"
export default function GuardadosStreamsPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/saved/stream").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "1", title: "Stream de Gaming", channel: "canal1", type: "stream", savedAt: "há 2 horas", isLive: true }, { id: "2", title: "Kuduro Mix", channel: "canal2", type: "stream", savedAt: "há 1 dia" }])) }, [])
  const remove = (id: string) => { api.delete(`/api/saved/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Guardados</h1>
      <SavedNav />
      <h2 className="text-sm font-semibold">Streams guardados</h2>
      {items.length === 0 ? <div className="text-center py-12 space-y-3"><div className="text-4xl">📺</div><p className="text-xs text-muted-foreground">Ainda não guardaste nenhum stream.</p></div> : <div className="space-y-2">{items.map(i => <SavedItemCard key={i.id} {...i} onRemove={remove} />)}</div>}
    </div>
  )
}
