"use client"
import { useState } from "react"
import { ArrowLeft, Play, Lock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function PredictionsPage() {
  const [question, setQuestion] = useState("")
  const [optA, setOptA] = useState("")
  const [optB, setOptB] = useState("")
  const [time, setTime] = useState("2")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🎲 Predictions</h1></div>
      <div className="space-y-3 p-4 rounded-xl border border-white/10">
        <div className="space-y-1"><p className="text-[10px] font-bold">Pergunta</p><Input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Vou ganhar esta partida?" className="bg-white/5" /></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1"><p className="text-[10px] font-bold text-blue-400">Resultado A</p><Input value={optA} onChange={e => setOptA(e.target.value)} placeholder="Sim" className="bg-white/5" /></div>
          <div className="space-y-1"><p className="text-[10px] font-bold text-red-400">Resultado B</p><Input value={optB} onChange={e => setOptB(e.target.value)} placeholder="Não" className="bg-white/5" /></div>
        </div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Tempo para apostar</p><div className="flex gap-2">{["1","2","5"].map(t => <button key={t} onClick={() => setTime(t)} className={`px-3 py-1 rounded-full text-xs ${time === t ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t} min</button>)}</div></div>
        <Button className="w-full gap-1 font-bold" disabled={!question || !optA || !optB} onClick={() => toast.success("Prediction iniciada!")}><Play className="w-3 h-3" />Iniciar Prediction</Button>
      </div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10"><p className="text-[9px] text-muted-foreground text-center">Fases: <span className="text-green-400">OPEN</span> → <span className="text-yellow-400">LOCKED</span> → <span className="text-primary">RESOLVE</span></p></div>
    </div>
  )
}
