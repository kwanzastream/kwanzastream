"use client"
import { useParams } from "next/navigation"
import { Gift, Clock, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MOCK_DROPS = [
  { id: "d1", title: "Badge Exclusivo Março", type: "badge", timeLeft: "2 dias", requirement: "Assiste 30min" },
  { id: "d2", title: "Emote Animado 🔥", type: "emote", timeLeft: "5 dias", requirement: "Assiste 1h" },
]

export default function ChannelDropsPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Drops activos</h2>
      {MOCK_DROPS.length === 0 ? (
        <div className="text-center py-16"><Gift className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="font-medium">Sem drops activos</p><p className="text-sm text-muted-foreground mt-1">Não há drops activos neste canal de momento</p></div>
      ) : (
        <div className="space-y-3">
          {MOCK_DROPS.map((d) => (
            <div key={d.id} className="rounded-xl border border-border/50 p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Gift className="w-6 h-6 text-primary" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{d.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.requirement}</p>
              </div>
              <div className="text-right shrink-0">
                <Badge variant="secondary" className="text-[10px]"><Clock className="w-3 h-3 mr-0.5" />{d.timeLeft}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
