"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Check, Upload, Lock } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const CATEGORIES = ["Música", "Gaming", "Futebol", "Tecnologia", "Culinária", "Entretenimento", "Educação", "Negócios", "Arte", "Desporto"]
const ACCESS_OPTIONS = [{ id: "open", label: "Aberta — qualquer um pode entrar" }, { id: "approval", label: "Por aprovação — fundador aprova" }, { id: "invite", label: "Por convite — só com link" }]

export default function TriboCriarPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [access, setAccess] = useState("open")
  const [color, setColor] = useState("#CE1126")
  const [rules, setRules] = useState("")
  const [creating, setCreating] = useState(false)

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 50)

  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para criar tribos</p><Button onClick={() => router.push("/entrar?redirectTo=/tribos/criar")}>Entrar</Button></div>

  const handleCreate = () => {
    if (!name.trim()) { toast.error("Nome obrigatório"); return }
    if (!desc.trim()) { toast.error("Descrição obrigatória"); return }
    if (!category) { toast.error("Escolhe uma categoria"); return }
    setCreating(true)
    setTimeout(() => { toast.success("Tribo criada! Pendente aprovação de admin (24–48h)."); router.push("/tribos/minhas") }, 1500)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/tribos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Tribo</h1></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Nome *</label><Input value={name} onChange={e => setName(e.target.value)} maxLength={50} placeholder="Nome da tribo" />{name && <p className="text-[9px] text-muted-foreground">Slug: {slug}</p>}</div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Descrição *</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} maxLength={300} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" /><p className="text-[9px] text-muted-foreground text-right">{desc.length}/300</p></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Categoria *</label><div className="flex flex-wrap gap-1.5">{CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${category === c ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{c}</button>)}</div></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Tags (max 5)</label><Input value={tags} onChange={e => setTags(e.target.value)} placeholder="kuduro, dança, angola..." /></div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Logo * (400×400)</label><div className="h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Upload</span></div></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Banner (1200×300)</label><div className="h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Upload</span></div></div>
      </div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Cor de destaque</label><div className="flex items-center gap-2"><input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-8 h-8 rounded border-none cursor-pointer" /><span className="text-xs text-muted-foreground">{color}</span></div></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Tipo de acesso</label><div className="space-y-1">{ACCESS_OPTIONS.map(a => <button key={a.id} onClick={() => setAccess(a.id)} className={`w-full px-3 py-2 rounded-lg text-xs text-left transition-all ${access === a.id ? "bg-primary/10 border border-primary/30" : "bg-white/[0.04] border border-white/10"}`}>{a.label}</button>)}</div></div>

      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Regras da Tribo</label><textarea value={rules} onChange={e => setRules(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" placeholder="Regras opcionais..." /></div>

      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-yellow-300">⚠️ Tribos ficam pendentes até aprovação de admin (24–48h).</div>

      <Button className="w-full h-12 gap-2 font-bold" onClick={handleCreate} disabled={creating}>{creating ? <><Loader2 className="w-4 h-4 animate-spin" />A criar...</> : <><Check className="w-4 h-4" />Criar Tribo</>}</Button>
    </div>
  )
}
