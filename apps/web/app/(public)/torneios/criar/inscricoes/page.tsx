"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

const TEAM_SIZES = [{ id: "individual", label: "Individual" }, { id: "team2", label: "Equipas de 2" }, { id: "team5", label: "Equipas de 5" }]

export default function TorneioCriarInscricoesPage() {
  const router = useRouter()
  const [maxPart, setMaxPart] = useState("32")
  const [teamSize, setTeamSize] = useState("individual")
  const [fee, setFee] = useState("")
  const [deadline, setDeadline] = useState("")

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/torneios/criar/premios"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">5/7 — Inscrições</h1></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Máximo de participantes</label><Input type="number" value={maxPart} onChange={e => setMaxPart(e.target.value)} /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Formato</label><div className="flex gap-2">{TEAM_SIZES.map(t => <button key={t.id} onClick={() => setTeamSize(t.id)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${teamSize === t.id ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{t.label}</button>)}</div></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Taxa de inscrição (Kz, vazio = grátis)</label><Input value={fee} onChange={e => setFee(e.target.value)} placeholder="0" /></div>
      <div className="space-y-1.5"><label className="text-xs font-bold text-muted-foreground">Prazo de inscrição</label><Input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} /></div>
      <Button className="w-full gap-2" onClick={() => router.push("/torneios/criar/streams")}>Seguinte <ArrowRight className="w-4 h-4" /></Button>
    </div>
  )
}
