"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "@/lib/api"

interface CollectionFormProps { initial?: { name: string; description: string; isPublic: boolean }; collectionId?: string; onSaved?: (c: any) => void }

export function CollectionForm({ initial, collectionId, onSaved }: CollectionFormProps) {
  const [name, setName] = useState(initial?.name || "")
  const [desc, setDesc] = useState(initial?.description || "")
  const [pub, setPub] = useState(initial?.isPublic || false)
  const [loading, setLoading] = useState(false)
  const isEdit = !!collectionId
  const submit = async () => {
    if (!name) return toast.error("Nome obrigatório")
    setLoading(true)
    try {
      const r = isEdit ? await api.patch(`/api/collections/${collectionId}`, { name, description: desc, isPublic: pub }) : await api.post("/api/collections", { name, description: desc, isPublic: pub })
      toast.success(isEdit ? "Colecção actualizada!" : "Colecção criada!"); onSaved?.(r.data)
    } catch { toast.error("Erro ao guardar") } finally { setLoading(false) }
  }
  return (
    <div className="space-y-3">
      <div><label className="text-[10px] text-muted-foreground">Nome</label><input value={name} onChange={e => setName(e.target.value)} placeholder="Nome da colecção" maxLength={50} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" /><p className="text-[9px] text-muted-foreground text-right">{name.length}/50</p></div>
      <div><label className="text-[10px] text-muted-foreground">Descrição (opcional)</label><textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descrição..." maxLength={200} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[60px]" /></div>
      <div className="space-y-1"><label className="text-[10px] text-muted-foreground">Visibilidade</label>{[{ v: false, l: "Privada — só eu vejo" }, { v: true, l: "Pública — qualquer um pode ver" }].map(o => <label key={String(o.v)} className="flex items-center gap-2 text-xs cursor-pointer"><input type="radio" checked={pub === o.v} onChange={() => setPub(o.v)} />{o.l}</label>)}</div>
      <Button onClick={submit} disabled={loading} className="w-full">{loading ? "A guardar..." : isEdit ? "Guardar alterações" : "Criar colecção"}</Button>
    </div>
  )
}
