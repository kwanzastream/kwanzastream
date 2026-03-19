"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2, Upload, Radio } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const GENRES = ["Kuduro", "Semba", "Kizomba", "Afrohouse", "Hip-Hop AO", "Gospel", "Música Tradicional", "Notícias", "Podcasts", "Debates", "Desporto", "Afrobeats", "Reggae", "R&B"]
const QUALITY = [{ id: "64", label: "64kbps — Economia de dados" }, { id: "128", label: "128kbps — Padrão" }, { id: "320", label: "320kbps — Alta qualidade" }]

export default function RadioCriarConfigurarPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [quality, setQuality] = useState("128")
  const [desc, setDesc] = useState("")
  const [schedule, setSchedule] = useState("")
  const [creating, setCreating] = useState(false)

  const handleCreate = () => {
    if (!title.trim()) { toast.error("Nome obrigatório"); return }
    if (!genre) { toast.error("Escolhe um género"); return }
    setCreating(true)
    setTimeout(() => { toast.success("Rádio configurada! Podes ir ao vivo."); router.push("/go-live/audio-only") }, 1500)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/radio/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Configurar Rádio</h1></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Nome do programa *</label><Input value={title} onChange={e => setTitle(e.target.value)} maxLength={100} placeholder="Ex: Kuduro Mix Noturno" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Género *</label><div className="flex flex-wrap gap-1.5">{GENRES.map(g => <button key={g} onClick={() => setGenre(g)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${genre === g ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{g}</button>)}</div></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Artwork * (obrigatório para Rádio)</label><div className="h-24 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Upload artwork (400×400)</span></div></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Qualidade de áudio</label><div className="space-y-1">{QUALITY.map(q => <button key={q.id} onClick={() => setQuality(q.id)} className={`w-full px-3 py-2 rounded-lg text-xs text-left transition-all ${quality === q.id ? "bg-primary/10 border border-primary/30" : "bg-white/[0.04] border border-white/10"}`}>{q.label}</button>)}</div></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Descrição</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Horário habitual (para a programação)</label><Input value={schedule} onChange={e => setSchedule(e.target.value)} placeholder="Ex: Sextas 21h–00h WAT" /></div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={handleCreate} disabled={creating}>{creating ? <><Loader2 className="w-4 h-4 animate-spin" />A configurar...</> : <><Check className="w-4 h-4" />Configurar e Ir ao Vivo</>}</Button>
    </div>
  )
}
