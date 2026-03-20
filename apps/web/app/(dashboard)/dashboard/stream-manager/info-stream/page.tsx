"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
const CATS = ["Gaming","Música","Comédia","Desporto","Educação","Arte","Culinária","Tecnologia","Lifestyle","Outro"]
export default function InfoStreamPage() {
  const [title, setTitle] = useState("Gaming ao vivo — FIFA 26 com a comunidade 🎮")
  const [cat, setCat] = useState("Gaming")
  const [tags, setTags] = useState(["angola","fps","fifa"])
  const [rating, setRating] = useState("geral")
  const [newTag, setNewTag] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Info do Stream</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Título</p><div className="flex gap-1"><Input value={title} onChange={e => setTitle(e.target.value)} className="bg-white/5" /><Button size="sm" onClick={() => toast.success("Título actualizado!")} className="gap-1"><Save className="w-3 h-3" />Guardar</Button></div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Categoria</p><div className="flex gap-1"><select value={cat} onChange={e => setCat(e.target.value)} className="flex-1 h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{CATS.map(c => <option key={c}>{c}</option>)}</select><Button size="sm" onClick={() => toast.success("Categoria actualizada!")} className="gap-1"><Save className="w-3 h-3" />Guardar</Button></div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Tags</p><div className="flex gap-1 flex-wrap">{tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center gap-1">{t}<button onClick={() => setTags(tags.filter(x => x !== t))} className="hover:text-red-400">×</button></span>)}<div className="flex gap-1"><Input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Adicionar tag..." className="bg-white/5 h-6 w-24 text-[9px]" /><Button size="sm" className="h-6 text-[8px]" onClick={() => { if (newTag) { setTags([...tags, newTag]); setNewTag("") } }}>+</Button></div></div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Classificação</p><div className="flex gap-3">{[{id:"geral",l:"Geral"},{id:"13",l:"13+"},{id:"18",l:"18+"}].map(r => <label key={r.id} className="flex items-center gap-1 text-xs"><input type="radio" name="rating" checked={rating === r.id} onChange={() => setRating(r.id)} />{r.l}</label>)}</div></div>
      </div>
      <p className="text-[8px] text-muted-foreground text-center">Alterações aplicadas imediatamente — viewers vêem sem reload.</p>
    </div>
  )
}
