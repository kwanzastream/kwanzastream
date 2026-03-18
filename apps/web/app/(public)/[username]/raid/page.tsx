"use client"
import { useParams } from "next/navigation"
import { Zap, Users } from "lucide-react"
import { ChannelCard } from "@/components/channel/channel-card"

const MOCK_RAID_TARGETS = [
  { username: "gamer_ao", displayName: "Gamer Angola", followersCount: 5000, isLive: true, category: "Gaming" },
  { username: "dj_kwanza", displayName: "DJ Kwanza", followersCount: 3200, isLive: false, category: "Música" },
  { username: "angola_irl", displayName: "Angola IRL", followersCount: 8100, isLive: true, category: "IRL" },
]

export default function ChannelRaidPage() {
  const { username } = useParams()
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> Raid</h2>
        <p className="text-sm text-muted-foreground mt-1">Quando @{username} termina o stream, pode enviar a audiência para outro canal — isto é um raid!</p>
      </div>

      <div className="rounded-xl border border-border/50 p-4 bg-muted/10">
        <h3 className="text-sm font-medium mb-2">Como funciona o raid?</h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">1.</span> O streamer selecciona um canal para enviar os viewers</li>
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">2.</span> Todos os espectadores são redireccionados automaticamente</li>
          <li className="flex gap-2"><span className="font-bold text-primary shrink-0">3.</span> O canal que recebe o raid vê uma notificação especial</li>
        </ol>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Canais sugeridos para raid</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_RAID_TARGETS.map((c) => (
            <ChannelCard key={c.username} {...c} />
          ))}
        </div>
      </div>
    </div>
  )
}
