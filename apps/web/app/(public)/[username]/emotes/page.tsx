"use client"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Smile, Star, Lock } from "lucide-react"

const MOCK_EMOTES = [
  { id: "e1", name: "kwanzaHype", code: ":kwanzaHype:", tier: 0, image: "🎉" },
  { id: "e2", name: "kwanzaLove", code: ":kwanzaLove:", tier: 0, image: "❤️" },
  { id: "e3", name: "kwanzaGG", code: ":kwanzaGG:", tier: 1, image: "🏆" },
  { id: "e4", name: "kwanzaFire", code: ":kwanzaFire:", tier: 1, image: "🔥" },
  { id: "e5", name: "kwanzaDance", code: ":kwanzaDance:", tier: 2, image: "💃" },
  { id: "e6", name: "kwanzaCrown", code: ":kwanzaCrown:", tier: 2, image: "👑" },
  { id: "e7", name: "kwanzaDiamond", code: ":kwanzaDiamond:", tier: 3, image: "💎" },
  { id: "e8", name: "kwanzaAngola", code: ":kwanzaAngola:", tier: 3, image: "🇦🇴" },
]

const TIER_LABELS: Record<number, string> = { 0: "Gratuito", 1: "Tier 1", 2: "Tier 2", 3: "Tier 3" }
const TIER_COLORS: Record<number, string> = { 0: "bg-green-500/10 text-green-500", 1: "bg-blue-400/10 text-blue-400", 2: "bg-purple-400/10 text-purple-400", 3: "bg-amber-400/10 text-amber-400" }

export default function ChannelEmotesPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Emotes</h2>
      <p className="text-sm text-muted-foreground">Emotes personalizados de @{username}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {MOCK_EMOTES.map((e) => (
          <div key={e.id} className="rounded-xl border border-border/50 p-3 text-center space-y-1.5 hover:bg-muted/30 transition-colors">
            <span className="text-3xl block">{e.image}</span>
            <p className="text-[10px] font-medium truncate">{e.name}</p>
            <Badge className={`text-[8px] ${TIER_COLORS[e.tier] || ""}`}>
              {e.tier > 0 && <Lock className="w-2.5 h-2.5 mr-0.5" />}
              {TIER_LABELS[e.tier]}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
