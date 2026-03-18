"use client"
import { useParams } from "next/navigation"
import { Trophy, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_ACHIEVEMENTS = [
  { id: "a1", name: "Mwana wa Angola", icon: "🇦🇴", description: "Primeiro stream realizado", unlocked: true, date: "2025-06-15" },
  { id: "a2", name: "Luanda ao Vivo", icon: "🌆", description: "10 streams realizados", unlocked: true, date: "2025-08-20" },
  { id: "a3", name: "Voz do Povo", icon: "📢", description: "100 seguidores", unlocked: true, date: "2025-09-10" },
  { id: "a4", name: "Estrela de Kwanza", icon: "⭐", description: "1.000 seguidores", unlocked: false, date: null },
  { id: "a5", name: "Diamante Angolano", icon: "💎", description: "10.000 seguidores", unlocked: false, date: null },
  { id: "a6", name: "Maratona", icon: "🏃", description: "Stream de 12+ horas", unlocked: false, date: null },
  { id: "a7", name: "Rei do Raid", icon: "⚡", description: "50 raids enviados", unlocked: false, date: null },
  { id: "a8", name: "Comunidade Unida", icon: "🤝", description: "500 subscritores activos", unlocked: false, date: null },
]

export default function ChannelAchievementsPage() {
  const { username } = useParams()
  const unlocked = MOCK_ACHIEVEMENTS.filter(a => a.unlocked)
  const locked = MOCK_ACHIEVEMENTS.filter(a => !a.unlocked)

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg">Conquistas</h2>

      {unlocked.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Desbloqueadas ({unlocked.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {unlocked.map((a) => (
              <div key={a.id} className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center space-y-2">
                <span className="text-3xl block">{a.icon}</span>
                <p className="text-sm font-bold">{a.name}</p>
                <p className="text-[10px] text-muted-foreground">{a.description}</p>
                {a.date && <p className="text-[9px] text-muted-foreground">{new Date(a.date).toLocaleDateString("pt-AO")}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {locked.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Por desbloquear ({locked.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {locked.map((a) => (
              <div key={a.id} className="rounded-xl border border-border/50 p-4 text-center space-y-2 opacity-60">
                <span className="text-3xl block grayscale">{a.icon}</span>
                <p className="text-sm font-medium flex items-center justify-center gap-1"><Lock className="w-3 h-3" />{a.name}</p>
                <p className="text-[10px] text-muted-foreground">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
