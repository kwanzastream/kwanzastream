"use client"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
const data = [{ id: "t1", name: "Angola Gamers United", category: "Gaming", members: 234 }, { id: "t2", name: "Kuduro Nation", category: "Música", members: 89 }]
export default function FavoritosTribesPage() {
  const [items, setItems] = useState(data)
  const remove = (id: string) => { setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">⭐ Tribos Favoritas</h1>
      {items.length === 0 ? <div className="text-center py-12"><p className="text-xs text-muted-foreground">Nenhuma tribo favorita.</p></div> : <div className="space-y-2">{items.map(i => <div key={i.id} className="flex items-center justify-between p-3 rounded-xl border border-white/10 group"><div><p className="text-xs font-semibold">{i.name}</p><p className="text-[9px] text-muted-foreground">{i.category} · {i.members} membros</p></div><button onClick={() => remove(i.id)} className="text-[9px] text-muted-foreground hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">Remover</button></div>)}</div>}
    </div>
  )
}
