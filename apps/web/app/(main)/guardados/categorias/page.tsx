"use client"
import { useState, useEffect } from "react"
import { SavedNav } from "@/components/saved/saved-nav"
import api from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
export default function GuardadosCategoriasPage() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { api.get("/api/saved/category").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "cat1", contentId: "gaming", title: "Gaming", liveCount: 45 }, { id: "cat2", contentId: "kuduro", title: "Kuduro", liveCount: 12 }])) }, [])
  const remove = (id: string) => { api.delete(`/api/saved/${id}`).catch(() => {}); setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Guardados</h1>
      <SavedNav />
      <h2 className="text-sm font-semibold">Categorias guardadas ({items.length})</h2>
      {items.length === 0 ? <div className="text-center py-12"><div className="text-4xl">🏷️</div><p className="text-xs text-muted-foreground mt-2">Nenhuma categoria guardada.</p></div> : <div className="space-y-2">{items.map(i => <div key={i.id} className="flex items-center justify-between p-3 rounded-xl border border-white/10 group"><div><Link href={`/categorias/${i.contentId}`} className="text-xs font-semibold hover:text-primary">{i.title}</Link>{i.liveCount && <span className="text-[9px] text-muted-foreground ml-2">{i.liveCount} streams ao vivo</span>}</div><div className="flex items-center gap-2"><Link href={`/categorias/${i.contentId}`} className="text-[9px] text-primary hover:underline">Ir</Link><button onClick={() => remove(i.id)} className="text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">✕</button></div></div>)}</div>}
    </div>
  )
}
