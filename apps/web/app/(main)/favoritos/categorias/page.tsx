"use client"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
const data = [{ id: "c1", name: "Gaming", liveCount: 45 }, { id: "c2", name: "Kuduro", liveCount: 12 }, { id: "c3", name: "Girabola", liveCount: 3 }, { id: "c4", name: "Kizomba", liveCount: 8 }]
export default function FavoritosCategoriasPage() {
  const [items, setItems] = useState(data)
  const remove = (id: string) => { setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">⭐ Categorias Favoritas</h1>
      <p className="text-[10px] text-muted-foreground">Conteúdo destas categorias tem +30% de peso no algoritmo de personalização.</p>
      {items.length === 0 ? <div className="text-center py-12"><p className="text-xs text-muted-foreground">Nenhuma categoria favorita.</p></div> : <div className="grid grid-cols-2 gap-2">{items.map(i => <div key={i.id} className="p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group"><div className="flex items-center justify-between"><Link href={`/categorias/${i.name.toLowerCase()}`} className="text-xs font-semibold hover:text-primary">{i.name}</Link><button onClick={() => remove(i.id)} className="text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100">✕</button></div><p className="text-[9px] text-muted-foreground mt-1">{i.liveCount} streams ao vivo</p></div>)}</div>}
    </div>
  )
}
