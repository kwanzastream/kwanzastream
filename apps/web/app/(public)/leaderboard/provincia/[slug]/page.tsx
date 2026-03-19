"use client"
import { useParams } from "next/navigation"
import { LeaderboardTable, type LeaderboardEntry } from "@/components/leaderboard/leaderboard-table"
import { ArrowLeft, Radio, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK_STREAMERS: LeaderboardEntry[] = [
  { rank: 1, username: "voz-angola", displayName: "Voz de Angola", value: 1234, valueLabel: "viewers", change: 0, badge: "🇦🇴" },
  { rank: 2, username: "kuduro-king", displayName: "Kuduro King", value: 987, valueLabel: "viewers", change: 1, badge: "🇦🇴" },
]
const MOCK_VIEWERS: LeaderboardEntry[] = [
  { rank: 1, username: "super-fan-ao", displayName: "Super Fan AO", value: 25000, valueLabel: "Salos", change: 0 },
]

export default function ProvinciaLeaderboardPage() {
  const { slug } = useParams()
  const name = typeof slug === "string" ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ") : "Província"

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/leaderboard/angola"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" />{name}</h1></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">Top 10 Streamers</h2><LeaderboardTable entries={MOCK_STREAMERS} /></div>
      <div className="space-y-2"><h2 className="text-sm font-bold">Top 5 Viewers</h2><LeaderboardTable entries={MOCK_VIEWERS} /></div>
      <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Radio className="w-4 h-4 text-red-400 animate-pulse" />Ao Vivo Agora</h2><p className="text-xs text-muted-foreground">Sem streams ao vivo de {name} agora.</p></div>
      <Link href={`/provincias/${slug}`} className="block text-xs text-primary hover:underline text-center">Ver página da província →</Link>
    </div>
  )
}
