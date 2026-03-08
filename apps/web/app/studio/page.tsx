'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { MobileNav } from '@/components/mobile-nav'
import {
  BarChart3, DollarSign, Users, Radio, TrendingUp, Eye,
  Play, ChevronRight, Wallet, ArrowUpRight, ArrowDownRight,
  Gift, Video, Palette, Shield, Settings2, CheckCircle2, Circle, X
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface CreatorStats {
  profile: { displayName: string; username: string; avatarUrl: string; kycTier: number }
  balance: number
  earnings: { total: number; thisMonth: number; thisWeek: number; platformFeePercent: number }
  stats: { totalStreams: number; totalViewers: number; followers: number; totalDonations: number }
  liveStream: { id: string; title: string; viewerCount: number; startedAt: string } | null
  topDonations: { id: string; amount: number; saloType: string; message: string; sender: { displayName: string; username: string }; createdAt: string }[]
  recentTransactions: { id: string; amount: number; type: string; description: string; createdAt: string }[]
}

interface ChartData {
  chartData: { date: string; earnings: number }[]
  days: number
}

interface StreamItem {
  id: string; title: string; category: string; status: string;
  viewerCount: number; peakViewers: number; donationCount: number;
  clipCount: number; startedAt: string; endedAt: string; createdAt: string
}

export default function StudioPage() {
  const [stats, setStats] = useState<CreatorStats | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [streams, setStreams] = useState<StreamItem[]>([])
  const [loading, setLoading] = useState(true)
  const [chartDays, setChartDays] = useState(30)
  const [checklistDismissed, setChecklistDismissed] = useState(false)

  useEffect(() => { fetchData() }, [])
  useEffect(() => { fetchChart() }, [chartDays])

  const fetchData = async () => {
    try {
      const [statsRes, streamsRes] = await Promise.all([
        fetch(`${API_URL}/api/creator/stats`, { credentials: 'include' }),
        fetch(`${API_URL}/api/creator/streams?limit=5`, { credentials: 'include' }),
      ])
      if (statsRes.ok) setStats(await statsRes.json())
      if (streamsRes.ok) {
        const data = await streamsRes.json()
        setStreams(data.streams || [])
      }
    } catch { }
    setLoading(false)
  }

  const fetchChart = async () => {
    try {
      const res = await fetch(`${API_URL}/api/creator/earnings-chart?days=${chartDays}`, { credentials: 'include' })
      if (res.ok) setChartData(await res.json())
    } catch { }
  }

  const formatKz = (amount: number) =>
    new Intl.NumberFormat('pt-AO', { minimumFractionDigits: 0 }).format(amount) + ' Kz'

  const timeAgo = (dateStr: string) => {
    const secs = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
    if (secs < 60) return 'agora'
    if (secs < 3600) return `${Math.floor(secs / 60)}m`
    if (secs < 86400) return `${Math.floor(secs / 3600)}h`
    return `${Math.floor(secs / 86400)}d`
  }

  const maxEarning = chartData ? Math.max(...chartData.chartData.map(d => d.earnings), 1) : 1

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">A carregar estúdio...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">Estúdio do Creator</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {stats?.profile.displayName || 'Creator'} · @{stats?.profile.username}
              </p>
            </div>
            <a href="/stream"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-red-500/20">
              <Radio className="w-4 h-4" /> Ir Live
            </a>
          </div>

          {/* Live Now Banner */}
          {stats?.liveStream && (
            <a href={`/stream/${stats.liveStream.id}`}
              className="block p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/10 border border-red-500/30 hover:border-red-500/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{stats.liveStream.title}</p>
                  <p className="text-xs text-red-300">{stats.liveStream.viewerCount} a assistir</p>
                </div>
                <ChevronRight className="w-5 h-5 text-red-300" />
              </div>
            </a>
          )}

          {/* Creator Activation Checklist */}
          {stats && !checklistDismissed && (() => {
            const items = [
              { label: 'Perfil configurado', done: !!stats.profile.displayName, href: '/studio/channel' },
              { label: 'Username definido', done: !!stats.profile.username, href: '/studio/channel' },
              { label: 'Telefone verificado', done: true, href: undefined }, // Already verified to be here
              { label: 'Stream key gerada', done: stats.stats.totalStreams > 0 || !!stats.liveStream, href: '/studio/stream' },
              { label: 'Primeira stream realizada', done: stats.stats.totalStreams > 0, href: '/studio/stream' },
              { label: 'KYC Nível 1 aprovado', done: stats.profile.kycTier >= 1, href: '/studio/kyc' },
              { label: 'Primeira doação recebida', done: stats.stats.totalDonations > 0, href: '/studio/salos' },
            ]
            const completed = items.filter(i => i.done).length
            const allDone = completed === items.length
            if (allDone) return null
            const progress = Math.round((completed / items.length) * 100)
            return (
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-bold text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" /> Activação do Creator
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{completed}/{items.length} passos · {progress}% completo</p>
                  </div>
                  <button
                    onClick={() => setChecklistDismissed(true)}
                    className="text-muted-foreground hover:text-white transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((item) => (
                    <a
                      key={item.label}
                      href={item.done ? undefined : item.href}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${item.done
                          ? 'bg-green-500/5 border border-green-500/10'
                          : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10 cursor-pointer'
                        }`}
                    >
                      {item.done
                        ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        : <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      }
                      <span className={`text-sm ${item.done ? 'text-green-400 line-through' : 'text-white font-medium'
                        }`}>
                        {item.label}
                      </span>
                      {!item.done && item.href && <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />}
                    </a>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={<DollarSign className="w-4 h-4" />} label="Saldo" value={formatKz(stats?.balance ?? 0)} color="text-green-400" bg="bg-green-500/10" />
            <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Este Mês" value={formatKz(stats?.earnings.thisMonth ?? 0)} color="text-blue-400" bg="bg-blue-500/10" />
            <StatCard icon={<Users className="w-4 h-4" />} label="Seguidores" value={String(stats?.stats.followers ?? 0)} color="text-purple-400" bg="bg-purple-500/10" />
            <StatCard icon={<Gift className="w-4 h-4" />} label="Doações" value={String(stats?.stats.totalDonations ?? 0)} color="text-amber-400" bg="bg-amber-500/10" />
          </div>

          {/* Earnings Chart */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" /> Ganhos
              </h2>
              <div className="flex gap-1">
                {[7, 30, 90].map(d => (
                  <button key={d} onClick={() => setChartDays(d)}
                    className={`text-xs px-3 py-1 rounded-lg transition-all ${chartDays === d ? 'bg-primary/20 text-primary font-bold' : 'text-muted-foreground hover:bg-white/5'}`}>
                    {d}d
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-[2px] h-32 md:h-40">
              {chartData?.chartData.map((d) => {
                const height = maxEarning > 0 ? (d.earnings / maxEarning) * 100 : 0
                return (
                  <div key={d.date} className="flex-1 group relative" title={`${d.date}: ${formatKz(d.earnings)}`}>
                    <div className="w-full rounded-t-sm transition-all duration-300 group-hover:opacity-100"
                      style={{
                        height: `${Math.max(height, 2)}%`,
                        background: height > 0 ? 'linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.6))' : 'hsl(var(--muted) / 0.2)',
                        opacity: height > 0 ? 0.7 : 0.3,
                      }} />
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-muted-foreground">{chartData?.chartData[0]?.date}</span>
              <span className="text-[10px] text-muted-foreground">{chartData?.chartData[chartData.chartData.length - 1]?.date}</span>
            </div>
          </div>

          {/* Two Column: Streams + Donations/Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stream History */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h2 className="font-bold text-white flex items-center gap-2 mb-4">
                <Video className="w-4 h-4 text-primary" /> Streams Recentes
              </h2>
              <div className="space-y-3">
                {streams.map(s => (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.status === 'LIVE' ? 'bg-red-500/20' : 'bg-white/5'}`}>
                      {s.status === 'LIVE' ? <Radio className="w-4 h-4 text-red-400" /> : <Play className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{s.title}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" /> {s.peakViewers}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Gift className="w-3 h-3" /> {s.donationCount}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{timeAgo(s.createdAt)}</span>
                  </div>
                ))}
                {!streams.length && <p className="text-sm text-muted-foreground text-center py-8">Nenhuma stream ainda</p>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Top Donations */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
                <h2 className="font-bold text-white flex items-center gap-2 mb-4">
                  <Gift className="w-4 h-4 text-amber-400" /> Top Doações
                </h2>
                <div className="space-y-2.5">
                  {stats?.topDonations.map((d, i) => (
                    <div key={d.id} className="flex items-center gap-3">
                      <span className={`text-sm font-bold w-5 text-center ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-300' : 'text-orange-400'}`}>{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{d.sender.displayName || d.sender.username}</p>
                        {d.message && <p className="text-[10px] text-muted-foreground truncate">"{d.message}"</p>}
                      </div>
                      <span className="text-sm font-bold text-green-400">{formatKz(d.amount)}</span>
                    </div>
                  ))}
                  {!stats?.topDonations.length && <p className="text-sm text-muted-foreground text-center py-4">Sem doações</p>}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
                <h2 className="font-bold text-white flex items-center gap-2 mb-4">
                  <Wallet className="w-4 h-4 text-blue-400" /> Movimentos
                </h2>
                <div className="space-y-2">
                  {stats?.recentTransactions.map(t => (
                    <div key={t.id} className="flex items-center gap-3 py-1.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${t.type === 'DEPOSIT' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {t.type === 'DEPOSIT' ? <ArrowDownRight className="w-3.5 h-3.5 text-green-400" /> : <ArrowUpRight className="w-3.5 h-3.5 text-red-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white">{t.description || t.type}</p>
                        <p className="text-[10px] text-muted-foreground">{timeAgo(t.createdAt)}</p>
                      </div>
                      <span className={`text-xs font-bold ${t.type === 'DEPOSIT' ? 'text-green-400' : 'text-red-400'}`}>
                        {t.type === 'DEPOSIT' ? '+' : '-'}{formatKz(Math.abs(t.amount))}
                      </span>
                    </div>
                  ))}
                  {!stats?.recentTransactions.length && <p className="text-sm text-muted-foreground text-center py-4">Sem movimentos</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/studio/stream', icon: <Radio className="w-5 h-5" />, label: 'Nova Stream' },
              { href: '/studio/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
              { href: '/studio/wallet', icon: <Wallet className="w-5 h-5" />, label: 'Carteira' },
              { href: '/studio/salos', icon: <Gift className="w-5 h-5" />, label: 'Salos' },
              { href: '/studio/channel', icon: <Palette className="w-5 h-5" />, label: 'Meu Canal' },
              { href: '/studio/kyc', icon: <Shield className="w-5 h-5" />, label: 'Programa Creator' },
              { href: '/profile', icon: <Users className="w-5 h-5" />, label: 'Perfil' },
              { href: '/settings', icon: <Settings2 className="w-5 h-5" />, label: 'Definições' },
            ].map(a => (
              <a key={a.href} href={a.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all group">
                <span className="text-muted-foreground group-hover:text-primary transition-colors">{a.icon}</span>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">{a.label}</span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}

function StatCard({ icon, label, value, color, bg }: { icon: React.ReactNode; label: string; value: string; color: string; bg: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-2">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-lg font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  )
}
