"use client"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Lock, Clock, Zap } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const MOCK_REWARDS = [
  { id: "r1", name: "Emote no chat", cost: 500, available: true, cooldownLeft: 0 },
  { id: "r2", name: "Escolher música", cost: 2000, available: true, cooldownLeft: 0 },
  { id: "r3", name: "Shoutout no stream", cost: 5000, available: true, cooldownLeft: 0 },
  { id: "r4", name: "VIP por 1 hora", cost: 10000, available: false, cooldownLeft: 1800 },
]

export default function StreamRewardPage() {
  const { username } = useParams()
  const { isAuthenticated } = useAuth()
  const userPoints = 3200 // Mock

  const handleRedeem = (reward: typeof MOCK_REWARDS[0]) => {
    if (userPoints < reward.cost) { toast.error("Pontos insuficientes"); return }
    toast.success(`Resgataste "${reward.name}"! 🎉`)
    // TODO: emit socket event
  }

  return (
    <div className="min-h-screen max-w-lg mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg flex items-center gap-2"><Star className="w-5 h-5 text-[#F9D616]" /> Recompensas</h2>
        {isAuthenticated && (
          <Badge variant="secondary" className="gap-1 text-[#F9D616]">
            <Zap className="w-3 h-3" /> {userPoints.toLocaleString("pt-AO")} pts
          </Badge>
        )}
      </div>

      {!isAuthenticated ? (
        <div className="text-center py-12">
          <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Entra para ver recompensas</p>
          <Link href={`/entrar?redirectTo=/stream/${username}/reward`}>
            <Button size="sm" className="mt-3">Entrar</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_REWARDS.map((r) => (
            <div key={r.id} className={`rounded-xl border p-4 flex items-center gap-3 ${r.available ? "border-white/10" : "border-white/5 opacity-50"}`}>
              <Star className="w-8 h-8 text-[#F9D616] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{r.name}</p>
                <p className="text-xs text-[#F9D616] font-bold">{r.cost.toLocaleString("pt-AO")} pts</p>
              </div>
              {r.cooldownLeft > 0 ? (
                <Badge variant="secondary" className="text-[10px] gap-0.5 shrink-0">
                  <Clock className="w-3 h-3" /> {Math.floor(r.cooldownLeft / 60)}min
                </Badge>
              ) : (
                <Button
                  size="sm" variant="outline" className="text-xs shrink-0"
                  disabled={userPoints < r.cost || !r.available}
                  onClick={() => handleRedeem(r)}
                >
                  Resgatar
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
