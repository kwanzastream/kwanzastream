"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Eye, Zap, Radio, CheckCircle, Circle, ArrowRight, Play, Activity } from "lucide-react"

interface CreatorStats {
  totalFollowers: number; totalViewers: number; totalEarnings: number; totalStreams: number
  monthlyEarnings: number; newFollowersThisMonth: number
}

interface RecentStream {
  id: string; title: string; category: string; viewerCount: number; peakViewers: number
  startedAt: string; endedAt?: string
}

const SETUP_CHECKLIST = [
  { id: "profile", label: "Completar perfil (avatar + bio)", href: "/definicoes/perfil" },
  { id: "stream-key", label: "Copiar stream key", href: "/dashboard/stream-config" },
  { id: "category", label: "Definir categoria principal", href: "/dashboard/stream-config" },
  { id: "first-stream", label: "Fazer o primeiro stream", href: "/dashboard/stream-manager" },
  { id: "kyc", label: "Verificar identidade (KYC)", href: "/dashboard/kyc" },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<CreatorStats | null>(null)
  const [recentStreams, setRecentStreams] = useState<RecentStream[]>([])
  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(true)

  const completedChecks = [
    !!user?.avatarUrl,
    !!user?.streamKey,
    true,
    (stats?.totalStreams ?? 0) > 0,
    (user as any)?.kycTier > 0,
  ]
  const checklistProgress = Math.round((completedChecks.filter(Boolean).length / SETUP_CHECKLIST.length) * 100)

  useEffect(() => {
    Promise.allSettled([
      api.get("/api/creator/stats"),
      api.get("/api/creator/streams"),
      api.get("/api/streams/live"),
    ]).then(([statsRes, streamsRes, liveRes]) => {
      if (statsRes.status === "fulfilled") setStats(statsRes.value.data)
      if (streamsRes.status === "fulfilled") {
        const streams = streamsRes.value.data?.streams || streamsRes.value.data || []
        setRecentStreams(streams.slice(0, 5))
      }
      if (liveRes.status === "fulfilled") {
        const ls = liveRes.value.data?.streams || liveRes.value.data || []
        setIsLive(ls.some((s: any) => s.streamer?.id === user?.id || s.userId === user?.id))
      }
    }).finally(() => setLoading(false))
  }, [user?.id])

  const formatKz = (amount: number) => `${(amount / 100).toLocaleString("pt-AO")} Kz`

  const formatDuration = (start: string, end?: string) => {
    if (!end) return "—"
    const diff = new Date(end).getTime() - new Date(start).getTime()
    const h = Math.floor(diff / 3600000); const m = Math.floor((diff % 3600000) / 60000)
    return h > 0 ? `${h}h ${m}min` : `${m}min`
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Olá, {user?.displayName || user?.username} 👋</h1><p className="text-sm text-muted-foreground mt-0.5">Bem-vindo ao teu Studio</p></div>
        <Button className="gap-2 bg-[#CE1126] hover:bg-[#CE1126]/90" onClick={() => router.push("/dashboard/stream-manager")}><Radio className="w-4 h-4" />{isLive ? "Gerir Stream" : "Ir ao Vivo"}</Button>
      </div>

      {/* Live Banner */}
      {isLive && (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-[#CE1126]/50 bg-[#CE1126]/5">
          <div className="w-2 h-2 bg-[#CE1126] rounded-full animate-pulse shrink-0" /><p className="text-sm font-medium flex-1">Estás ao vivo agora!</p>
          <Button size="sm" className="bg-[#CE1126] hover:bg-[#CE1126]/90 gap-1.5" onClick={() => router.push("/dashboard/stream-manager")}><Activity className="w-3.5 h-3.5" />Gerir</Button>
        </div>
      )}

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Seguidores", value: stats?.totalFollowers?.toLocaleString("pt-AO") ?? "0", sub: `+${stats?.newFollowersThisMonth ?? 0} este mês`, icon: Users, color: "text-blue-400" },
            { label: "Total Viewers", value: stats?.totalViewers?.toLocaleString("pt-AO") ?? "0", sub: "histórico", icon: Eye, color: "text-green-400" },
            { label: "Salos recebidos", value: stats?.totalEarnings ? formatKz(stats.totalEarnings) : "0 Kz", sub: stats?.monthlyEarnings ? `${formatKz(stats.monthlyEarnings)} este mês` : "este mês", icon: Zap, color: "text-[#F9D616]" },
            { label: "Streams", value: stats?.totalStreams?.toLocaleString("pt-AO") ?? "0", sub: "total", icon: Radio, color: "text-[#CE1126]" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between mb-3"><p className="text-xs text-muted-foreground">{stat.label}</p><stat.icon className={`w-4 h-4 ${stat.color}`} /></div>
                <p className="text-2xl font-bold">{stat.value}</p><p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklist */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between"><CardTitle className="text-base">Setup do canal</CardTitle><span className="text-xs text-muted-foreground">{completedChecks.filter(Boolean).length}/{SETUP_CHECKLIST.length}</span></div>
            <Progress value={checklistProgress} className="h-1.5 mt-2" />
          </CardHeader>
          <CardContent className="space-y-2">
            {SETUP_CHECKLIST.map((item, i) => (
              <Link key={item.id} href={item.href}>
                <div className="flex items-center gap-3 py-1.5 hover:text-primary transition-colors group">
                  {completedChecks[i] ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground shrink-0" />}
                  <span className={`text-sm flex-1 ${completedChecks[i] ? "text-muted-foreground line-through" : ""}`}>{item.label}</span>
                  {!completedChecks[i] && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Streams */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between"><CardTitle className="text-base">Streams recentes</CardTitle><Link href="/dashboard/content/vods"><Button variant="ghost" size="sm" className="text-xs h-7">Ver todos</Button></Link></div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">{Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
            ) : recentStreams.length === 0 ? (
              <div className="text-center py-8"><p className="text-3xl mb-2">🎙️</p><p className="text-sm font-medium">Ainda não fizeste nenhum stream</p><p className="text-xs text-muted-foreground mt-1 mb-4">Vai ao Stream Manager para começar</p>
                <Button size="sm" onClick={() => router.push("/dashboard/stream-manager")}><Radio className="w-3.5 h-3.5 mr-1.5" />Ir ao vivo</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {recentStreams.map((stream) => (
                  <div key={stream.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0"><Play className="w-3.5 h-3.5 text-primary" /></div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{stream.title}</p><p className="text-xs text-muted-foreground">{stream.category} · {new Date(stream.startedAt).toLocaleDateString("pt-AO")}</p></div>
                    <div className="text-right shrink-0"><p className="text-xs font-medium flex items-center gap-1"><Eye className="w-3 h-3 text-muted-foreground" />{stream.peakViewers || stream.viewerCount} peak</p><p className="text-[10px] text-muted-foreground">{formatDuration(stream.startedAt, stream.endedAt)}</p></div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: "🎛️", label: "Stream Manager", href: "/dashboard/stream-manager" },
          { icon: "📊", label: "Analytics", href: "/dashboard/analytics" },
          { icon: "👥", label: "Comunidade", href: "/dashboard/comunidade" },
          { icon: "💰", label: "Monetização", href: "/dashboard/monetizacao" },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <div className="p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all text-center cursor-pointer"><span className="text-2xl">{action.icon}</span><p className="text-xs font-medium mt-2">{action.label}</p></div>
          </Link>
        ))}
      </div>
    </div>
  )
}
