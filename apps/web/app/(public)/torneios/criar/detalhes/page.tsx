"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Upload } from "lucide-react"
import Link from "next/link"

const GAMES = ["FIFA 25", "CS2", "Mobile Legends", "Call of Duty Mobile", "Free Fire", "Valorant", "Outro"]

export default function TorneioCriarDetalhesPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [game, setGame] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [desc, setDesc] = useState("")

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/torneios/criar/tipo"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">2/7 — Detalhes</h1></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Nome *</label><Input value={title} onChange={e => setTitle(e.target.value)} maxLength={150} placeholder="Nome do torneio" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Jogo *</label><div className="flex flex-wrap gap-1.5">{GAMES.map(g => <button key={g} onClick={() => setGame(g)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${game === g ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{g}</button>)}</div></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Data *</label><Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
        <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Hora * (WAT)</label><Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></div>
      </div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Descrição</label><textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} maxLength={2000} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm resize-none" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Banner</label><div className="h-20 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 cursor-pointer hover:border-primary/30"><Upload className="w-4 h-4 text-muted-foreground/40" /><span className="text-[10px] text-muted-foreground">Upload banner (1200×400)</span></div></div>
      <Button className="w-full gap-2" onClick={() => router.push("/torneios/criar/regras")}>Seguinte <ArrowRight className="w-4 h-4" /></Button>
    </div>
  )
}
