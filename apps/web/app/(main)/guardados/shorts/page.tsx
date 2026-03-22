"use client"
import { useState, useEffect } from "react"
import { SavedNav } from "@/components/saved/saved-nav"
import api from "@/lib/api"
import { toast } from "sonner"
export default function GuardadosShortsPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/saved/short").then(r => setItems(r.data || [])).catch(() => setItems([])) }, [])
  const remove = (id: string) => { api.delete(`/api/saved/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Guardados</h1>
      <SavedNav />
      <h2 className="text-sm font-semibold">Shorts guardados ({items.length})</h2>
      {items.length === 0 ? <div className="text-center py-12"><div className="text-4xl">📱</div><p className="text-xs text-muted-foreground mt-2">Nenhum short guardado.</p></div> : <div className="grid grid-cols-4 gap-2">{items.map(i => <div key={i.id} className="rounded-xl border border-white/10 p-1 group relative"><div className="aspect-[9/16] bg-white/5 rounded-lg flex items-center justify-center text-lg">📱</div><button onClick={() => remove(i.id)} className="absolute top-1 right-1 text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100">✕</button></div>)}</div>}
    </div>
  )
}
