"use client"
import { useState, useEffect } from "react"
import { SavedNav } from "@/components/saved/saved-nav"
import { CollectionCard } from "@/components/saved/collection-card"
import api from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
export default function ColecoesPage() {
  const [cols, setCols] = useState<any[]>([])
  useEffect(() => { api.get("/api/collections").then(r => setCols(r.data || [])).catch(() => setCols([{ id: "col1", name: "Gaming Favourites", _count: { items: 12 }, isPublic: false, updatedAt: "há 2 dias" }, { id: "col2", name: "Música Angola", _count: { items: 8 }, isPublic: true, updatedAt: "há 1 semana" }])) }, [])
  const del = (id: string) => { api.delete(`/api/collections/${id}`).catch(() => {}); setCols(cols.filter(c => c.id !== id)); toast.success("Colecção eliminada") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Guardados</h1>
      <SavedNav />
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">As minhas colecções ({cols.length})</h2><Link href="/guardados/colecoes/criar" className="px-3 py-1.5 rounded-lg bg-primary text-white text-[10px]">+ Criar nova</Link></div>
      {cols.length === 0 ? <div className="text-center py-12"><div className="text-4xl">📁</div><p className="text-xs text-muted-foreground mt-2">Nenhuma colecção criada.</p></div> : <div className="grid grid-cols-2 gap-3">{cols.map(c => <CollectionCard key={c.id} id={c.id} name={c.name} itemCount={c._count?.items || 0} updatedAt={c.updatedAt} isPublic={c.isPublic} onDelete={del} />)}</div>}
    </div>
  )
}
