"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, Users, Clock, Headphones, Smartphone, Monitor } from "lucide-react"
import { RadioAnalyticsChart } from "@/components/dashboard/radio/radio-analytics-chart"
import Link from "next/link"
import api from "@/lib/api"

export default function RadioAnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/creator/radio/analytics")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  if (!data) return null

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/dashboard/radio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold">Analytics do Rádio</h2>
      <p className="text-xs text-muted-foreground">Últimos 30 dias</p>

      {/* Top metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Users className="w-4 h-4 mx-auto mb-1 text-blue-400" />
          <p className="text-lg font-bold">{data.uniqueListeners}</p>
          <p className="text-[10px] text-muted-foreground">Ouvintes únicos</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
          <p className="text-lg font-bold">{data.totalHours}h</p>
          <p className="text-[10px] text-muted-foreground">Horas transmitidas</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Headphones className="w-4 h-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold">{data.peakListeners}</p>
          <p className="text-[10px] text-muted-foreground">Pico ({data.peakTime})</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <span className="text-lg">💛</span>
          <p className="text-lg font-bold">{data.salosReceived.toLocaleString()} Kz</p>
          <p className="text-[10px] text-muted-foreground">Salos recebidos</p>
        </div>
      </div>

      {/* Daily chart */}
      <div className="p-4 rounded-xl border border-white/10">
        <RadioAnalyticsChart data={data.dailyListeners} title="Ouvintes por dia" />
      </div>

      {/* Genre breakdown */}
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <h3 className="text-sm font-semibold">Top géneros ouvidos</h3>
        {data.genreBreakdown.map((g: any, i: number) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{i + 1}. {g.genre}</span>
              <span className="text-muted-foreground">{g.percentage}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary" style={{ width: `${g.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Device breakdown */}
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <h3 className="text-sm font-semibold">Dispositivos</h3>
        <div className="grid grid-cols-2 gap-3">
          {data.deviceBreakdown.map((d: any, i: number) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg border border-white/5">
              {d.device === "Mobile" ? <Smartphone className="w-4 h-4 text-muted-foreground" /> : <Monitor className="w-4 h-4 text-muted-foreground" />}
              <span className="text-sm">{d.device}</span>
              <span className="text-sm font-bold ml-auto">{d.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best times */}
      <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
        <p className="text-xs text-muted-foreground">🕐 Melhores horários: <span className="text-foreground">{data.bestTimes}</span></p>
      </div>
    </div>
  )
}
