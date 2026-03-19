"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { RewardCard, type RewardData } from "@/components/drops/reward-card"
import { Button } from "@/components/ui/button"
import { Coins, Lock } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Disponíveis", href: "/rewards/activos" },
  { id: "historico", label: "Histórico", href: "/rewards/historico" },
]

const CHANNELS = [
  { channel: "kuduro_master", displayName: "Kuduro Master", points: 1234, rewards: [
    { id: "r1", name: "Escolhe a próxima música", description: "Pede uma música no mix ao vivo", cost: 500, channel: "kuduro_master", channelDisplayName: "Kuduro Master", available: true },
    { id: "r2", name: "Shoutout no stream", description: "O streamer menciona o teu nome", cost: 1000, channel: "kuduro_master", channelDisplayName: "Kuduro Master", available: true },
  ] as RewardData[] },
  { channel: "esports_ao", displayName: "eSports AO", points: 890, rewards: [
    { id: "r3", name: "Emoji VIP desbloqueado", description: "Usa emojis exclusivos no chat", cost: 2000, channel: "esports_ao", channelDisplayName: "eSports AO", available: true },
    { id: "r4", name: "Pergunta ao pro", description: "Faz uma pergunta ao streamer", cost: 300, channel: "esports_ao", channelDisplayName: "eSports AO", available: false, cooldownMinutes: 15 },
  ] as RewardData[] },
]

export default function RewardsActivosPage() {
  const { user } = useAuth()
  const router = useRouter()
  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para ver rewards</p><Button onClick={() => router.push("/entrar?redirectTo=/rewards/activos")}>Entrar</Button></div>

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2"><Coins className="w-5 h-5 text-yellow-400" />Channel Rewards</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "activos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      {CHANNELS.map(ch => (
        <div key={ch.channel} className="space-y-2">
          <div className="flex items-center justify-between"><h2 className="text-sm font-bold">@{ch.channel}</h2><span className="text-xs text-yellow-400 flex items-center gap-1"><Coins className="w-3 h-3" />{ch.points.toLocaleString()} pontos</span></div>
          <div className="space-y-2">{ch.rewards.map(r => <RewardCard key={r.id} reward={r} userPoints={ch.points} />)}</div>
        </div>
      ))}
    </div>
  )
}
