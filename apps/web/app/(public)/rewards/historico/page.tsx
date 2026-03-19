"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Coins, Lock, Clock } from "lucide-react"
import Link from "next/link"

const TABS = [
  { id: "activos", label: "Disponíveis", href: "/rewards/activos" },
  { id: "historico", label: "Histórico", href: "/rewards/historico" },
]

const HISTORY = [
  { reward: "Escolhe a próxima música", channel: "kuduro_master", points: 500, date: "há 2 dias" },
  { reward: "Shoutout no stream", channel: "kuduro_master", points: 1000, date: "há 1 semana" },
  { reward: "Emoji VIP", channel: "esports_ao", points: 2000, date: "há 2 semanas" },
]

export default function RewardsHistoricoPage() {
  const { user } = useAuth()
  const router = useRouter()
  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login</p><Button onClick={() => router.push("/entrar?redirectTo=/rewards/historico")}>Entrar</Button></div>

  const totalSpent = HISTORY.reduce((s, h) => s + h.points, 0)
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Histórico de Rewards</h1>
      <div className="flex gap-1">{TABS.map(t => <Link key={t.id} href={t.href} className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "historico" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>)}</div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center"><p className="text-sm font-bold flex items-center justify-center gap-1"><Coins className="w-4 h-4 text-yellow-400" />Total gastos: {totalSpent.toLocaleString()} pontos</p></div>
      <div className="space-y-2">{HISTORY.map((h, i) => <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><div className="flex-1"><p className="text-sm font-bold">{h.reward}</p><p className="text-[10px] text-muted-foreground">@{h.channel} · {h.date}</p></div><span className="text-xs text-yellow-400 font-bold">-{h.points}</span></div>)}</div>
    </div>
  )
}
