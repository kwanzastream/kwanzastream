"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Check, Upload } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const CATEGORIES = ["Gaming", "Música", "Dança", "Comédia", "Futebol", "Culinária", "Educação", "Tecnologia", "Lifestyle", "Viagens"]
const PRIVACY = [{ id: "public", label: "Público" }, { id: "followers", label: "Só seguidores" }, { id: "private", label: "Privado" }]
const RATINGS = [{ id: "general", label: "Geral" }, { id: "13+", label: "13+" }, { id: "18+", label: "18+" }]

export default function ShortsPublicarPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [rating, setRating] = useState("general")
  const [publishing, setPublishing] = useState(false)

  const handlePublish = () => {
    if (!title.trim()) { toast.error("Título obrigatório"); return }
    if (!category) { toast.error("Escolhe uma categoria"); return }
    setPublishing(true)
    // In production: POST /api/shorts { title, desc, category, tags, privacy, rating }
    setTimeout(() => { toast.success("Short publicado! A processar..."); router.push("/shorts/meus") }, 2000)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/shorts/criar/editar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Publicar Short</h1></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Título *</label><Input value={title} onChange={e => setTitle(e.target.value)} maxLength={100} placeholder="Título do short..." /><p className="text-[9px] text-muted-foreground text-right">{title.length}/100</p></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Descrição</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} maxLength={300} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" placeholder="Descrição..." /><p className="text-[9px] text-muted-foreground text-right">{desc.length}/300</p></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Categoria *</label>
        <div className="flex flex-wrap gap-1.5">{CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${category === c ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{c}</button>)}</div>
      </div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Tags (máximo 5)</label><Input value={tags} onChange={e => setTags(e.target.value)} placeholder="kuduro, dança, angola..." /></div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Privacidade</label>
          <div className="space-y-1">{PRIVACY.map(p => <button key={p.id} onClick={() => setPrivacy(p.id)} className={`w-full px-3 py-1.5 rounded-lg text-xs text-left transition-all ${privacy === p.id ? "bg-primary/10 border border-primary/30" : "bg-white/[0.04] border border-white/10"}`}>{p.label}</button>)}</div>
        </div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Classificação</label>
          <div className="space-y-1">{RATINGS.map(r => <button key={r.id} onClick={() => setRating(r.id)} className={`w-full px-3 py-1.5 rounded-lg text-xs text-left transition-all ${rating === r.id ? "bg-primary/10 border border-primary/30" : "bg-white/[0.04] border border-white/10"}`}>{r.label}</button>)}</div>
        </div>
      </div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Thumbnail</label>
        <div className="h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Escolher frame ou upload</span></div>
      </div>

      <Button className="w-full h-12 gap-2 font-bold" onClick={handlePublish} disabled={publishing}>
        {publishing ? <><Loader2 className="w-4 h-4 animate-spin" />A processar...</> : <><Check className="w-4 h-4" />Publicar Short</>}
      </Button>
      <p className="text-[8px] text-muted-foreground text-center">Processamento pode demorar 30–60 segundos</p>
    </div>
  )
}
