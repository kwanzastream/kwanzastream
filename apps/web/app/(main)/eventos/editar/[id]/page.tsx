"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil, Loader2, Check, Upload } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const CATEGORIES = ["Gaming", "Música", "Futebol", "Negócios", "Educação", "Tecnologia", "Entretenimento", "Culinária"]

export default function EventoEditarPage() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState("Torneio CS2 Angola — Grand Final")
  const [desc, setDesc] = useState("A final do maior torneio de CS2.")
  const [category, setCategory] = useState("Gaming")
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    if (!title.trim()) { toast.error("Título obrigatório"); return }
    setSaving(true)
    setTimeout(() => { setSaving(false); toast.success("Evento atualizado!"); router.push(`/eventos/${id}`) }, 1000)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/eventos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Pencil className="w-5 h-5" />Editar Evento</h1></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Título</label><Input value={title} onChange={e => setTitle(e.target.value)} maxLength={150} /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Descrição</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Categoria</label><div className="flex flex-wrap gap-1.5">{CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${category === c ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{c}</button>)}</div></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Banner</label><div className="h-24 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Alterar banner</span></div></div>

      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-muted-foreground">⏰ Edição disponível até 1 hora antes do início do evento.</div>

      <Button className="w-full gap-2" onClick={handleSave} disabled={saving}>{saving ? <><Loader2 className="w-4 h-4 animate-spin" />A guardar...</> : <><Check className="w-4 h-4" />Guardar alterações</>}</Button>
    </div>
  )
}
