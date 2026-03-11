"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("30d")

  useEffect(() => {
    setLoading(true)
    Promise.allSettled([api.get(`/api/analytics/platform?period=${period}`), api.get(`/api/analytics/revenue?period=${period}`)]).then(([pRes, rRes]) => {
      const p = pRes.status === "fulfilled" ? pRes.value.data : {}
      const r = rRes.status === "fulfilled" ? rRes.value.data : {}
      setData({ ...p, ...r })
    }).finally(() => setLoading(false))
  }, [period])

  const formatKz = (v: number) => `${(v / 100).toLocaleString("pt-AO")}Kz`

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-bold">Analytics</h1><Select value={period} onValueChange={setPeriod}><SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7d">7 dias</SelectItem><SelectItem value="30d">30 dias</SelectItem><SelectItem value="90d">3 meses</SelectItem></SelectContent></Select></div>
      {loading ? <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
      : <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{[
          { label: "Novos utilizadores", value: data?.newUsers?.toLocaleString("pt-AO") ?? "0" },
          { label: "Streams realizados", value: data?.totalStreams?.toLocaleString("pt-AO") ?? "0" },
          { label: "Receita período", value: formatKz(data?.periodRevenue ?? 0) },
          { label: "Horas transmitidas", value: `${data?.totalHours ?? 0}h` },
        ].map((s) => <Card key={s.label} className="border-border/50"><CardContent className="pt-3 pb-3"><p className="text-[11px] text-muted-foreground">{s.label}</p><p className="text-xl font-bold mt-1">{s.value}</p></CardContent></Card>)}</div>}
      <Card className="border-border/50"><CardHeader className="pb-2 pt-4"><CardTitle className="text-sm">Crescimento de utilizadores</CardTitle></CardHeader><CardContent>
        {loading ? <Skeleton className="h-48 w-full" /> : <ResponsiveContainer width="100%" height={180}><BarChart data={data?.userGrowth || []}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} /><YAxis tick={{ fontSize: 10 }} tickLine={false} /><Tooltip /><Bar dataKey="count" fill="#CE1126" radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer>}
      </CardContent></Card>
      <Card className="border-border/50"><CardHeader className="pb-2 pt-4"><CardTitle className="text-sm">Receita da plataforma</CardTitle></CardHeader><CardContent>
        {loading ? <Skeleton className="h-48 w-full" /> : <ResponsiveContainer width="100%" height={180}><AreaChart data={data?.revenueChart || []}><defs><linearGradient id="adminRev2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F9D616" stopOpacity={0.3} /><stop offset="95%" stopColor="#F9D616" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} /><YAxis tick={{ fontSize: 10 }} tickLine={false} tickFormatter={formatKz} /><Tooltip formatter={(v: number) => [formatKz(v), "Receita"]} /><Area type="monotone" dataKey="amount" stroke="#F9D616" strokeWidth={2} fill="url(#adminRev2)" /></AreaChart></ResponsiveContainer>}
      </CardContent></Card>
    </div>
  )
}
