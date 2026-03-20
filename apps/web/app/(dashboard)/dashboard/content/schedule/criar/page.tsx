"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
const CATS = ["Gaming","Música","Comédia","Desporto","Just Talking","Educação"]
export default function CriarSchedulePage() {
  const [title, setTitle] = useState("")
  const [cat, setCat] = useState("Gaming")
  const [notify, setNotify] = useState(true)
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/content/schedule"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Agendar Stream</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Título</p><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Gaming Friday" className="bg-white/5" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Categoria</p><select value={cat} onChange={e => setCat(e.target.value)} className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm">{CATS.map(c => <option key={c}>{c}</option>)}</select></div>
        <div className="grid grid-cols-2 gap-2"><div className="space-y-1"><p className="text-[10px] font-bold">Data</p><Input type="date" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Hora (WAT)</p><Input type="time" className="bg-white/5" defaultValue="20:00" /></div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Duração estimada</p><div className="flex gap-2">{["1h","2h","3h","4h+"].map(d => <button key={d} className="px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground">{d}</button>)}</div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
        <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={notify} onChange={() => setNotify(!notify)} />Notificar seguidores (WhatsApp + Push 15min antes)</label>
        <Button className="w-full font-bold gap-1" disabled={!title} onClick={() => toast.success("Stream agendado!")}><Save className="w-3 h-3" />Agendar</Button>
      </div>
    </div>
  )
}
