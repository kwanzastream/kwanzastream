"use client"
import { useState, useEffect } from "react"
import { FavoritesChannelCard } from "@/components/saved/favorites-channel-card"
import api from "@/lib/api"
import { toast } from "sonner"
export default function FavoritosCanaisPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/favorites/channel").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "f1", targetId: "canal1", channelName: "canal1", category: "Gaming", isLive: true, viewers: 234 }, { id: "f2", targetId: "muzika", channelName: "muzika", category: "Música" }])) }, [])
  const remove = (id: string) => { api.delete(`/api/favorites/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido dos favoritos") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">⭐ Favoritos</h1>
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/10"><p className="text-[10px] text-muted-foreground">Estes canais aparecem no topo das sugestões de raid, co-stream, e com prioridade no feed.</p></div>
      <h2 className="text-sm font-semibold">Canais favoritos ({items.length}/20)</h2>
      {items.length === 0 ? <div className="text-center py-12"><div className="text-4xl">⭐</div><p className="text-xs text-muted-foreground mt-2">Nenhum canal favorito.</p></div> : <div className="space-y-2">{items.map(i => <FavoritesChannelCard key={i.id} id={i.id} channelName={i.channelName || i.targetId} category={i.category} isLive={i.isLive} viewers={i.viewers} onRemove={remove} />)}</div>}
    </div>
  )
}
