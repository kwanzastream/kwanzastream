"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Loader2, Check, Upload } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const CATEGORIES = ["Gaming", "Música", "Futebol", "Negócios", "Educação", "Tecnologia", "Entretenimento", "Culinária"]
const VISIBILITY = [{ id: "public", label: "Público" }, { id: "followers", label: "Só seguidores" }, { id: "private", label: "Privado" }]
const RATINGS = [{ id: "general", label: "Geral" }, { id: "13+", label: "13+" }, { id: "18+", label: "18+" }]

export default function EventoCriarPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [rating, setRating] = useState("general")
  const [creating, setCreating] = useState(false)

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Calendar className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para criar eventos</p><Button onClick={() => router.push("/entrar?redirectTo=/eventos/criar")}>Entrar</Button></div>
  )

  const handleCreate = () => {
    if (!title.trim()) { toast.error("Título obrigatório"); return }
    if (!startDate || !startTime) { toast.error("Data e hora de início obrigatórios"); return }
    if (!category) { toast.error("Escolhe uma categoria"); return }
    setCreating(true)
    // In production: POST /api/events { title, desc, startDate, startTime, endDate, endTime, category, tags, visibility, rating }
    setTimeout(() => { toast.success("Evento criado! Pendente aprovação de admin."); router.push("/eventos/proximos") }, 1500)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/eventos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Calendar className="w-5 h-5" />Criar Evento</h1></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Título *</label><Input value={title} onChange={e => setTitle(e.target.value)} maxLength={150} placeholder="Nome do evento" /><p className="text-[9px] text-muted-foreground text-right">{title.length}/150</p></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Descrição</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} maxLength={2000} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" placeholder="Descrição do evento..." /></div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Data início *</label><Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Hora início * (WAT)</label><Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Data fim</label><Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Hora fim</label><Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} /></div>
      </div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Categoria *</label><div className="flex flex-wrap gap-1.5">{CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${category === c ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{c}</button>)}</div></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Tags (máximo 10)</label><Input value={tags} onChange={e => setTags(e.target.value)} placeholder="esports, cs2, angola..." /></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Banner (1200×400px)</label><div className="h-24 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Fazer upload do banner</span></div></div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Visibilidade</label><div className="space-y-1">{VISIBILITY.map(v => <button key={v.id} onClick={() => setVisibility(v.id)} className={`w-full px-3 py-1.5 rounded-lg text-xs text-left transition-all ${visibility === v.id ? "bg-primary/10 border border-primary/30" : "bg-white/[0.04] border border-white/10"}`}>{v.label}</button>)}</div></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Classificação</label><div className="space-y-1">{RATINGS.map(r => <button key={r.id} onClick={() => setRating(r.id)} className={`w-full px-3 py-1.5 rounded-lg text-xs text-left transition-all ${rating === r.id ? "bg-primary/10 border border-primary/30" : "bg-white/[0.04] border border-white/10"}`}>{r.label}</button>)}</div></div>
      </div>

      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-300">⚠️ Eventos ficam pendentes até aprovação de um administrador.</div>

      <Button className="w-full h-12 gap-2 font-bold" onClick={handleCreate} disabled={creating}>
        {creating ? <><Loader2 className="w-4 h-4 animate-spin" />A criar...</> : <><Check className="w-4 h-4" />Criar Evento</>}
      </Button>
    </div>
  )
}
