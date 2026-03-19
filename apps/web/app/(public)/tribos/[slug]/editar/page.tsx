"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Loader2, Check } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const CATEGORIES = ["Música", "Gaming", "Futebol", "Tecnologia", "Culinária", "Entretenimento", "Educação", "Negócios", "Arte", "Desporto"]

export default function TriboEditarPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [name, setName] = useState("Kuduro Kings")
  const [desc, setDesc] = useState("A tribo do Kuduro.")
  const [category] = useState("Música") // Immutable after approval
  const [rules, setRules] = useState("")
  const [saving, setSaving] = useState(false)

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Tribo</h1></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Nome</label><Input value={name} onChange={e => setName(e.target.value)} maxLength={50} /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Descrição</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} maxLength={300} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Categoria</label><p className="text-sm text-muted-foreground">{category} <span className="text-[9px]">(não editável — contactar admin)</span></p></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Slug</label><p className="text-sm text-muted-foreground">/tribos/{slug} <span className="text-[9px]">(imutável)</span></p></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Logo</label><div className="h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /></div></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Banner</label><div className="h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /></div></div>
      </div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Regras</label><textarea value={rules} onChange={e => setRules(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" /></div>
      <Button className="w-full gap-2" onClick={() => { setSaving(true); setTimeout(() => { setSaving(false); toast.success("Tribo actualizada!") }, 1000) }} disabled={saving}>{saving ? <><Loader2 className="w-4 h-4 animate-spin" />A guardar...</> : <><Check className="w-4 h-4" />Guardar</>}</Button>
    </div>
  )
}
