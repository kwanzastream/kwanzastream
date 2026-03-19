"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, BarChart3, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"

const MOCK_MATCHES = [
  { id: "m1", p1: "Team Alpha", p2: "Team Beta", status: "pending" },
  { id: "m2", p1: "Team Gamma", p2: "Team Delta", status: "pending" },
]

export default function TorneioAdminResultadosPage() {
  const { id } = useParams()
  const [matches, setMatches] = useState(MOCK_MATCHES.map(m => ({ ...m, score1: "", score2: "" })))

  const submitResult = (matchId: string) => {
    const m = matches.find(x => x.id === matchId)
    if (!m || !m.score1 || !m.score2) { toast.error("Preenche as pontuações"); return }
    setMatches(prev => prev.map(x => x.id === matchId ? { ...x, status: "completed" } : x))
    toast.success(`Resultado registado: ${m.p1} ${m.score1} - ${m.score2} ${m.p2}`)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}/admin`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><BarChart3 className="w-5 h-5" />Introduzir Resultados</h1></div>
      <div className="space-y-4">
        {matches.map((m, i) => (
          <div key={m.id} className={`p-4 rounded-xl border ${m.status === "completed" ? "border-green-500/20 bg-green-500/5" : "border-white/10"}`}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold flex-1">{m.p1}</span>
              <Input value={m.score1} onChange={e => setMatches(prev => prev.map((x, j) => j === i ? { ...x, score1: e.target.value } : x))} className="w-12 h-8 text-center bg-white/5 text-sm" disabled={m.status === "completed"} />
              <span className="text-xs text-muted-foreground">vs</span>
              <Input value={m.score2} onChange={e => setMatches(prev => prev.map((x, j) => j === i ? { ...x, score2: e.target.value } : x))} className="w-12 h-8 text-center bg-white/5 text-sm" disabled={m.status === "completed"} />
              <span className="text-sm font-bold flex-1 text-right">{m.p2}</span>
            </div>
            {m.status === "completed" ? <Badge className="mt-2 bg-green-500/10 text-green-400 text-[9px]"><Check className="w-3 h-3 mr-1" />Registado</Badge> : <Button size="sm" className="mt-2 text-xs w-full gap-1" onClick={() => submitResult(m.id)}><Check className="w-3 h-3" />Registar resultado</Button>}
          </div>
        ))}
      </div>
    </div>
  )
}
