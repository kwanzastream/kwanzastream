"use client"
import { useState, useEffect } from "react"
import { SavedNav } from "@/components/saved/saved-nav"
import api from "@/lib/api"
import { toast } from "sonner"
export default function GuardadosClipsPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/saved/clip").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "c1", title: "Jogada incrível", channel: "gamer1", savedAt: "há 1h" }])) }, [])
  const remove = (id: string) => { api.delete(`/api/saved/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Guardados</h1>
      <SavedNav />
      <h2 className="text-sm font-semibold">Clips guardados ({items.length})</h2>
      {items.length === 0 ? <div className="text-center py-12"><div className="text-4xl">✂️</div><p className="text-xs text-muted-foreground mt-2">Nenhum clip guardado.</p></div> : <div className="grid grid-cols-3 gap-2">{items.map(i => <div key={i.id} className="rounded-xl border border-white/10 p-2 group relative"><div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center text-lg">✂️</div><p className="text-[10px] mt-1 truncate">{i.title}</p><p className="text-[9px] text-muted-foreground">@{i.channel}</p><button onClick={() => remove(i.id)} className="absolute top-1 right-1 text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100">✕</button></div>)}</div>}
    </div>
  )
}
