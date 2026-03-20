"use client"
import { useState } from "react"
import { MetricCard, PeriodSelector, SimpleLineChart, SimpleBarChart, InsightCard, StreamListItem } from "@/components/analytics/analytics-components"
import { SettingsRow } from "@/components/settings/settings-components"
import Link from "next/link"
import { BarChart2, Users, Clock, DollarSign, TrendingUp, Film, Mic2, FileDown } from "lucide-react"

const VIEWERS_DATA = [{label:"Seg",value:89},{label:"Ter",value:120},{label:"Qua",value:95},{label:"Qui",value:145},{label:"Sex",value:234},{label:"Sáb",value:189},{label:"Dom",value:156}]
const HOURS_DATA = [{label:"S1",value:8},{label:"S2",value:12},{label:"S3",value:10},{label:"S4",value:14}]
const TOP_STREAMS = [
  {title:"FIFA 26 — Torneio Angola",date:"20 Mar",duration:"2h 34min",viewers:234,salos:2300,followers:12},
  {title:"Kuduro Live DJ Set",date:"18 Mar",duration:"1h 45min",viewers:178,salos:1500,followers:8},
  {title:"Call of Duty — Ranked",date:"15 Mar",duration:"3h 10min",viewers:156,salos:900,followers:5},
]

export default function OverviewPage() {
  const [period, setPeriod] = useState("7d")
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Analytics Overview</h1><PeriodSelector period={period} onChange={setPeriod} /></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard icon="👁" label="Viewers únicos" value="1.234" change="+12%" positive />
        <MetricCard icon="⏱" label="Horas transmitidas" value="42h" change="+5%" positive />
        <MetricCard icon="💛" label="Salos recebidos" value="15.600 Kz" change="-3%" positive={false} />
        <MetricCard icon="👥" label="Seguidores ganhos" value="+89" change="+23%" positive />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Viewers por dia</p><SimpleLineChart data={VIEWERS_DATA} /></div>
        <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Horas por semana</p><SimpleBarChart data={HOURS_DATA} color="hsl(142 71% 45%)" /></div>
      </div>
      <div className="space-y-2"><p className="text-sm font-bold">Top 3 Streams</p>{TOP_STREAMS.map(s => <StreamListItem key={s.title} {...s} />)}</div>

      {/* Nav to sub-sections */}
      <div className="grid grid-cols-2 gap-2">
        <Link href="/dashboard/analytics/streams" className="p-3 rounded-xl border border-white/10 hover:border-primary/20 flex items-center gap-2"><Film className="w-4 h-4 text-primary" /><span className="text-xs font-bold">Histórico de Streams</span></Link>
        <Link href="/dashboard/analytics/research" className="p-3 rounded-xl border border-white/10 hover:border-primary/20 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-primary" /><span className="text-xs font-bold">Research Heatmap</span></Link>
        <Link href="/dashboard/analytics/audiencia" className="p-3 rounded-xl border border-white/10 hover:border-primary/20 flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><span className="text-xs font-bold">Audiência</span></Link>
        <Link href="/dashboard/analytics/monetizacao" className="p-3 rounded-xl border border-white/10 hover:border-primary/20 flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary" /><span className="text-xs font-bold">Monetização</span></Link>
        <Link href="/dashboard/analytics/crescimento" className="p-3 rounded-xl border border-white/10 hover:border-primary/20 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /><span className="text-xs font-bold">Crescimento</span></Link>
        <Link href="/dashboard/analytics/exportar" className="p-3 rounded-xl border border-white/10 hover:border-primary/20 flex items-center gap-2"><FileDown className="w-4 h-4 text-primary" /><span className="text-xs font-bold">Exportar</span></Link>
      </div>
    </div>
  )
}
