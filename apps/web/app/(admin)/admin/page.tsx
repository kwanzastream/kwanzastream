"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Users, Radio, DollarSign, AlertTriangle, RefreshCw } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchStats = async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true)
    try {
      const [pRes, rRes] = await Promise.allSettled([api.get("/api/analytics/platform"), api.get("/api/analytics/revenue")])
      const p = pRes.status === "fulfilled" ? pRes.value.data : {}
      const r = rRes.status === "fulfilled" ? rRes.value.data : {}
      setStats({ ...p, ...r })
    } catch {} finally { setLoading(false); setRefreshing(false) }
  }

  useEffect(() => { fetchStats(); const t = setInterval(() => fetchStats(true), 60000); return () => clearInterval(t) }, [])

  const formatKz = (n: number) => `${((n || 0) / 100).toLocaleString("pt-AO")} Kz`

  const CARDS = [
    { label: "Utilizadores totais", value: stats?.totalUsers?.toLocaleString("pt-AO") ?? "0", sub: `+${stats?.newUsersToday ?? 0} hoje`, icon: Users, color: "text-blue-400", href: "/admin/utilizadores" },
    { label: "Streams ao vivo", value: stats?.liveStreams?.toLocaleString("pt-AO") ?? "0", sub: `${stats?.totalViewers?.toLocaleString("pt-AO") ?? 0} viewers`, icon: Radio, color: "text-[#CE1126]", href: "/admin/streams" },
    { label: "Receita total", value: formatKz(stats?.totalRevenue ?? 0), sub: `${formatKz(stats?.revenueToday ?? 0)} hoje`, icon: DollarSign, color: "text-green-400", href: "/admin/pagamentos" },
    { label: "Reports pendentes", value: stats?.pendingReports?.toLocaleString("pt-AO") ?? "0", sub: "a aguardar revisão", icon: AlertTriangle, color: (stats?.pendingReports ?? 0) > 0 ? "text-yellow-500" : "text-muted-foreground", href: "/admin/moderacao" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><div><h1 className="text-lg font-bold">Overview</h1><p className="text-xs text-muted-foreground">Estado da plataforma em tempo real</p></div><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => fetchStats(true)} disabled={refreshing}><RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /></Button></div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {CARDS.map((card) => loading ? <Skeleton key={card.label} className="h-24 rounded-xl" /> : (
          <Link key={card.label} href={card.href}><Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer h-24"><CardContent className="pt-3 pb-3"><div className="flex items-start justify-between"><p className="text-[11px] text-muted-foreground">{card.label}</p><card.icon className={`w-3.5 h-3.5 ${card.color}`} /></div><p className="text-xl font-bold mt-1.5">{card.value}</p><p className="text-[10px] text-muted-foreground mt-0.5">{card.sub}</p></CardContent></Card></Link>
        ))}
      </div>
      {!loading && stats?.revenueChart && stats.revenueChart.length > 0 && (
        <Card className="border-border/50"><CardHeader className="pb-2 pt-4"><CardTitle className="text-sm">Receita — últimos 30 dias</CardTitle></CardHeader><CardContent>
          <ResponsiveContainer width="100%" height={180}><AreaChart data={stats.revenueChart}><defs><linearGradient id="adminRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#CE1126" stopOpacity={0.3} /><stop offset="95%" stopColor="#CE1126" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} /><YAxis tick={{ fontSize: 10 }} tickLine={false} tickFormatter={(v) => `${(v / 100).toLocaleString("pt-AO")}Kz`} /><Tooltip formatter={(v: number) => [formatKz(v), "Receita"]} /><Area type="monotone" dataKey="amount" stroke="#CE1126" strokeWidth={2} fill="url(#adminRevenue)" /></AreaChart></ResponsiveContainer>
        </CardContent></Card>
      )}
      <div className="grid grid-cols-3 gap-3">{[{ label: "Ver todos os streams ao vivo", href: "/admin/streams" }, { label: "Reports por resolver", href: "/admin/moderacao" }, { label: "Novos utilizadores hoje", href: "/admin/utilizadores" }].map((a) => <Link key={a.href} href={a.href}><div className="p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-muted/20 transition-all cursor-pointer"><p className="text-xs font-medium leading-snug">{a.label}</p></div></Link>)}</div>
    </div>
  )
}
