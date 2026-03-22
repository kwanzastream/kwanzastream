"use client"
import { useState, useEffect } from "react"
import { SavedNav } from "@/components/saved/saved-nav"
import api from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
export default function GuardadosCanaisPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/saved/channel").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "ch1", contentId: "canal1", title: "canal1", savedAt: "há 2h" }, { id: "ch2", contentId: "muzika", title: "muzika", savedAt: "há 2 dias" }])) }, [])
  const remove = (id: string) => { api.delete(`/api/saved/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Guardados</h1>
      <SavedNav />
      <h2 className="text-sm font-semibold">Canais guardados ({items.length})</h2>
      <p className="text-[9px] text-muted-foreground">Canais guardados são para acesso rápido. Para notificações, segue o canal.</p>
      {items.length === 0 ? <div className="text-center py-12"><div className="text-4xl">👤</div><p className="text-xs text-muted-foreground mt-2">Nenhum canal guardado.</p></div> : <div className="space-y-2">{items.map(i => <div key={i.id} className="flex items-center justify-between p-3 rounded-xl border border-white/10 group"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">👤</div><div><Link href={`/canal/${i.contentId || i.title}`} className="text-xs font-semibold hover:text-primary">@{i.contentId || i.title}</Link><p className="text-[9px] text-muted-foreground">Guardado {i.savedAt}</p></div></div><button onClick={() => remove(i.id)} className="text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">✕</button></div>)}</div>}
    </div>
  )
}
