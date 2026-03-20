"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Plus, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function VodChaptersPage() {
  const { id } = useParams()
  const [chapters, setChapters] = useState([{ ts: "00:00:00", label: "Início do stream" }, { ts: "00:23:45", label: "" }, { ts: "01:02:30", label: "Round final" }])
  const [editing, setEditing] = useState<number | null>(null)
  const [newTs, setNewTs] = useState("")
  const [newLabel, setNewLabel] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href={`/dashboard/content/vods/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Capítulos</h1></div>
      <div className="space-y-1">{chapters.map((c, i) => <div key={i} className="flex items-center gap-2 p-2 rounded-xl border border-white/10"><span className="text-xs font-mono text-primary shrink-0">{c.ts}</span>{editing === i ? <Input value={c.label} onChange={e => { const n = [...chapters]; n[i].label = e.target.value; setChapters(n) }} onBlur={() => setEditing(null)} autoFocus className="bg-white/5 h-7 text-xs" /> : <span className="text-xs text-muted-foreground flex-1">{c.label || <em className="opacity-50">sem label</em>}</span>}<Button size="icon" variant="ghost" onClick={() => setEditing(i)}><Edit2 className="w-3 h-3" /></Button><Button size="icon" variant="ghost" onClick={() => setChapters(chapters.filter((_, j) => j !== i))}><Trash2 className="w-3 h-3 text-red-400" /></Button></div>)}</div>
      <div className="flex gap-1"><Input value={newTs} onChange={e => setNewTs(e.target.value)} placeholder="HH:MM:SS" className="bg-white/5 w-24 text-xs" /><Input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label do capítulo" className="bg-white/5 flex-1 text-xs" /><Button size="sm" className="gap-1 text-xs" onClick={() => { if (newTs) { setChapters([...chapters, { ts: newTs, label: newLabel }]); setNewTs(""); setNewLabel(""); toast.success("Capítulo adicionado") } }}><Plus className="w-3 h-3" />Adicionar</Button></div>
    </div>
  )
}
