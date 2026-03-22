"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/lib/api"

interface AddToCollectionModalProps { collectionId: string; collectionName: string; onAdded?: () => void; onClose?: () => void }

export function AddToCollectionModal({ collectionId, collectionName, onAdded, onClose }: AddToCollectionModalProps) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const add = async () => {
    setLoading(true)
    try { await api.post(`/api/collections/${collectionId}/items`, { savedItemId: url || "demo" }); toast.success("Adicionado!"); onAdded?.() }
    catch { toast.error("Erro ao adicionar") } finally { setLoading(false) }
  }
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-background max-w-sm mx-auto space-y-4">
      <h2 className="text-sm font-bold">Adicionar a "{collectionName}"</h2>
      <div><label className="text-[10px] text-muted-foreground">Colar URL de conteúdo</label><input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://kwanzastream.ao/..." className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /></div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onClose} className="flex-1 text-xs">Cancelar</Button>
        <Button onClick={add} disabled={loading} className="flex-1 text-xs">{loading ? "A adicionar..." : "Adicionar"}</Button>
      </div>
    </div>
  )
}
