"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { SavedItemCard } from "@/components/saved/saved-item-card"
import api from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"
export default function ColecaoDetailPage() {
  const { id } = useParams()
  const [col, setCol] = useState<any>(null)
  useEffect(() => { api.get(`/api/collections/${id}`).then(r => setCol(r.data)).catch(() => setCol({ id, name: "Gaming Favourites", description: "Os meus streams favoritos de gaming", isPublic: false, items: [{ id: "i1", savedItem: { id: "s1", contentId: "v1", contentType: "video", title: "VOD incrível", channel: "gamer1", savedAt: "há 2 dias" } }] })) }, [id])
  if (!col) return <div className="max-w-3xl mx-auto px-4 py-8"><p className="text-xs">A carregar...</p></div>
  const removeItem = (itemId: string) => { api.delete(`/api/collections/${id}/items/${itemId}`).catch(() => {}); setCol({ ...col, items: col.items.filter((i: any) => i.id !== itemId) }); toast.success("Removido da colecção") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <Link href="/guardados/colecoes" className="text-[10px] text-muted-foreground hover:text-foreground">← Colecções</Link>
      <div className="flex items-center justify-between"><h1 className="text-lg font-bold">{col.name}</h1><div className="flex gap-2"><Link href={`/guardados/colecoes/${id}/adicionar`} className="px-3 py-1.5 rounded-lg bg-primary text-white text-[10px]">+ Adicionar</Link><Link href={`/guardados/colecoes/${id}/editar`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px]">Editar</Link></div></div>
      {col.description && <p className="text-xs text-muted-foreground">{col.description}</p>}
      <p className="text-[9px] text-muted-foreground">{col.items?.length || 0} itens · {col.isPublic ? "Pública" : "Privada"}</p>
      {(!col.items || col.items.length === 0) ? <div className="text-center py-12"><p className="text-xs text-muted-foreground">Colecção vazia. Adiciona conteúdo!</p></div> : <div className="space-y-2">{col.items.map((i: any) => <SavedItemCard key={i.id} id={i.id} title={i.savedItem?.title || "Conteúdo"} channel={i.savedItem?.channel} type={i.savedItem?.contentType || "stream"} savedAt="" onRemove={removeItem} />)}</div>}
    </div>
  )
}
