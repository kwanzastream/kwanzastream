"use client"
import { useState } from "react"
import { ArrowLeft, Plus, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function PollsPage() {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""])
  const [duration, setDuration] = useState("2")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">📊 Polls ao Vivo</h1></div>
      <div className="space-y-3 p-4 rounded-xl border border-white/10">
        <div className="space-y-1"><p className="text-[10px] font-bold">Pergunta</p><Input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Qual o melhor jogo?" className="bg-white/5" /></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Opções</p>{options.map((o, i) => <div key={i} className="flex gap-1"><Input value={o} onChange={e => { const n = [...options]; n[i] = e.target.value; setOptions(n) }} placeholder={`Opção ${i + 1}`} className="bg-white/5" />{options.length > 2 && <Button size="icon" variant="ghost" onClick={() => setOptions(options.filter((_, j) => j !== i))}><X className="w-3 h-3" /></Button>}</div>)}{options.length < 5 && <Button variant="outline" size="sm" className="text-[9px] gap-1 w-full" onClick={() => setOptions([...options, ""])}><Plus className="w-3 h-3" />Adicionar opção</Button>}</div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Duração</p><div className="flex gap-2">{["1","2","5","10"].map(d => <button key={d} onClick={() => setDuration(d)} className={`px-3 py-1 rounded-full text-xs ${duration === d ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{d} min</button>)}</div></div>
        <Button className="w-full gap-1 font-bold" disabled={!question || options.filter(Boolean).length < 2} onClick={() => toast.success("Poll iniciada!")}><Play className="w-3 h-3" />Iniciar Poll</Button>
      </div>
    </div>
  )
}
