"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Users, Eye, Zap, Clock } from "lucide-react"

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d")
  const [stats, setStats] = useState<any>(null)
  const [earningsChart, setEarningsChart] = useState<any[]>([])
  const [followerGrowth, setFollowerGrowth] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.allSettled([
      api.get("/api/creator/stats"),
      api.get(`/api/creator/earnings-chart?period=${period}`),
      api.get(`/api/creator/followers/growth?period=${period}`),
    ]).then(([statsRes, earningsRes, followersRes]) => {
      if (statsRes.status === "fulfilled") setStats(statsRes.value.data)
      if (earningsRes.status === "fulfilled") setEarningsChart(earningsRes.value.data?.chart || earningsRes.value.data || [])
      if (followersRes.status === "fulfilled") setFollowerGrowth(followersRes.value.data?.growth || followersRes.value.data || [])
    }).finally(() => setLoading(false))
  }, [period])

  const formatKz = (val: number) => `${(val / 100).toLocaleString("pt-AO")} Kz`

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Analytics</h1>
        <Select value={period} onValueChange={setPeriod}><SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7d">Últimos 7 dias</SelectItem><SelectItem value="30d">Últimos 30 dias</SelectItem><SelectItem value="90d">Últimos 3 meses</SelectItem></SelectContent></Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Seguidores", value: stats?.totalFollowers ?? 0, icon: Users, format: (v: number) => v.toLocaleString("pt-AO") },
            { label: "Total Views", value: stats?.totalViewers ?? 0, icon: Eye, format: (v: number) => v.toLocaleString("pt-AO") },
            { label: "Ganhos totais", value: stats?.totalEarnings ?? 0, icon: Zap, format: formatKz },
            { label: "Streams", value: stats?.totalStreams ?? 0, icon: Clock, format: (v: number) => v.toLocaleString("pt-AO") },
          ].map((card) => (
            <Card key={card.label} className="border-border/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-2"><p className="text-xs text-muted-foreground">{card.label}</p><card.icon className="w-4 h-4 text-muted-foreground" /></div>
                <p className="text-xl font-bold">{card.format(card.value)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Tabs defaultValue="ganhos">
        <TabsList><TabsTrigger value="ganhos">Ganhos</TabsTrigger><TabsTrigger value="seguidores">Seguidores</TabsTrigger></TabsList>

        <TabsContent value="ganhos">
          <Card className="border-border/50">
            <CardHeader><CardTitle className="text-base">Ganhos (Salos recebidos)</CardTitle></CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-64 w-full" /> : earningsChart.length === 0 ? (
                <div className="h-64 flex items-center justify-center"><p className="text-sm text-muted-foreground">Sem dados para este período</p></div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={earningsChart}>
                    <defs><linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#CE1126" stopOpacity={0.3} /><stop offset="95%" stopColor="#CE1126" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} tickFormatter={(v) => `${(v / 100).toLocaleString("pt-AO")}Kz`} />
                    <Tooltip formatter={(v: number) => [formatKz(v), "Ganhos"]} />
                    <Area type="monotone" dataKey="amount" stroke="#CE1126" strokeWidth={2} fill="url(#colorEarnings)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguidores">
          <Card className="border-border/50">
            <CardHeader><CardTitle className="text-base">Crescimento de seguidores</CardTitle></CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-64 w-full" /> : followerGrowth.length === 0 ? (
                <div className="h-64 flex items-center justify-center"><p className="text-sm text-muted-foreground">Sem dados para este período</p></div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={followerGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#CE1126" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
