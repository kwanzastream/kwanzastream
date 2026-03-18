"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Lock, Clock, Trophy, Ban, Zap, Check } from "lucide-react"
import Link from "next/link"

// Lifecycle phases: OPEN → LOCKED → RESOLVED → CANCELLED
type PredictionPhase = "OPEN" | "LOCKED" | "RESOLVED" | "CANCELLED"

interface PredictionOption {
  id: string
  label: string
  totalSalos: number
  isWinner?: boolean
}

const MOCK_PREDICTION = {
  question: "O streamer vai ganhar este round?",
  phase: "OPEN" as PredictionPhase,
  options: [
    { id: "yes", label: "Vai ganhar! 🏆", totalSalos: 12500 },
    { id: "no", label: "Vai perder 😢", totalSalos: 8700 },
  ] as PredictionOption[],
  endsAt: new Date(Date.now() + 120000).toISOString(), // 2 min
  minBet: 100,
}

export default function StreamPredictionsPage() {
  const { username } = useParams()
  const { isAuthenticated } = useAuth()

  const [prediction] = useState(MOCK_PREDICTION)
  const [selectedOption, setSelectedOption] = useState("")
  const [betAmount, setBetAmount] = useState("")
  const [hasBet, setHasBet] = useState(false)

  const totalPool = prediction.options.reduce((s, o) => s + o.totalSalos, 0)
  const getOdds = (opt: PredictionOption) => totalPool > 0 ? (totalPool / opt.totalSalos).toFixed(2) : "—"

  const timeLeft = (() => {
    const diff = new Date(prediction.endsAt).getTime() - Date.now()
    if (diff <= 0) return "0:00"
    const m = Math.floor(diff / 60000); const s = Math.floor((diff % 60000) / 1000)
    return `${m}:${String(s).padStart(2, "0")}`
  })()

  const handleBet = () => {
    if (!selectedOption || !betAmount || parseInt(betAmount) < prediction.minBet) return
    setHasBet(true)
    // TODO: emit socket event for bet
  }

  const phaseStyles: Record<PredictionPhase, { label: string; color: string; icon: typeof TrendingUp }> = {
    OPEN:      { label: "Apostas abertas", color: "bg-green-500/20 text-green-400", icon: TrendingUp },
    LOCKED:    { label: "Apostas fechadas", color: "bg-amber-500/20 text-amber-400", icon: Lock },
    RESOLVED:  { label: "Resultado", color: "bg-primary/20 text-primary", icon: Trophy },
    CANCELLED: { label: "Cancelada", color: "bg-red-500/20 text-red-400", icon: Ban },
  }

  const ps = phaseStyles[prediction.phase]
  const PhaseIcon = ps.icon

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge className={`${ps.color} border-none text-xs gap-1`}>
            <PhaseIcon className="w-3 h-3" /> {ps.label}
          </Badge>
          {prediction.phase === "OPEN" && (
            <Badge variant="secondary" className="text-[10px] gap-1">
              <Clock className="w-3 h-3" /> {timeLeft}
            </Badge>
          )}
        </div>

        {/* Question */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
          <h2 className="font-bold text-lg text-center">{prediction.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {prediction.options.map((opt) => {
              const pct = totalPool > 0 ? Math.round((opt.totalSalos / totalPool) * 100) : 50
              const isSelected = selectedOption === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => !hasBet && prediction.phase === "OPEN" && setSelectedOption(opt.id)}
                  disabled={hasBet || prediction.phase !== "OPEN"}
                  className={`w-full relative rounded-xl overflow-hidden border-2 transition-all text-left ${
                    opt.isWinner ? "border-green-500 bg-green-500/10" :
                    isSelected ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className={`absolute inset-y-0 left-0 transition-all duration-700 ${isSelected ? "bg-primary/15" : "bg-white/5"}`}
                    style={{ width: `${pct}%` }} />
                  <div className="relative flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isSelected && hasBet && <Check className="w-4 h-4 text-primary" />}
                      {opt.isWinner && <Trophy className="w-4 h-4 text-green-400" />}
                      <span className="font-medium">{opt.label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold">{pct}%</p>
                      <p className="text-[10px] text-muted-foreground">{opt.totalSalos.toLocaleString("pt-AO")} Salos</p>
                      <p className="text-[10px] text-[#F9D616]">×{getOdds(opt)}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Bet input - only in OPEN phase */}
          {prediction.phase === "OPEN" && !hasBet && isAuthenticated && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={`Mín. ${prediction.minBet} Salos`}
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  min={prediction.minBet}
                  className="bg-white/5 border-white/10"
                />
                <Button
                  onClick={handleBet}
                  disabled={!selectedOption || !betAmount || parseInt(betAmount) < prediction.minBet}
                  className="bg-[#F9D616] text-black hover:bg-[#F9D616]/90 gap-1 shrink-0"
                >
                  <Zap className="w-4 h-4" /> Apostar
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Apostas com Salos (moeda virtual). Mínimo: {prediction.minBet} Salos
              </p>
            </div>
          )}

          {prediction.phase === "OPEN" && !isAuthenticated && (
            <div className="text-center py-2">
              <Link href={`/entrar?redirectTo=/stream/${username}/predictions`} className="text-xs text-primary hover:underline flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Entra para apostar
              </Link>
            </div>
          )}

          {hasBet && (
            <div className="text-center bg-primary/10 rounded-lg p-3">
              <p className="text-sm font-medium text-primary">Aposta registada! ✅</p>
              <p className="text-xs text-muted-foreground mt-0.5">Apostaste {betAmount} Salos. Aguarda o resultado.</p>
            </div>
          )}

          {prediction.phase === "CANCELLED" && (
            <div className="text-center bg-red-500/10 rounded-lg p-3">
              <p className="text-sm font-medium text-red-400">Previsão cancelada</p>
              <p className="text-xs text-muted-foreground mt-0.5">Todos os Salos foram devolvidos.</p>
            </div>
          )}

          {/* Pool total */}
          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-white/10">
            Pool total: <span className="font-bold text-[#F9D616]">{totalPool.toLocaleString("pt-AO")} Salos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
