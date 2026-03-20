"use client"
import { useState } from "react"
import { StreamListItem, PeriodSelector } from "@/components/analytics/analytics-components"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const STREAMS = [
  {title:"FIFA 26 — Torneio Angola",date:"20 Mar 2026",duration:"2h 34min",viewers:234,salos:2300,followers:12},
  {title:"Kuduro Live DJ Set",date:"18 Mar 2026",duration:"1h 45min",viewers:178,salos:1500,followers:8},
  {title:"Call of Duty — Ranked",date:"15 Mar 2026",duration:"3h 10min",viewers:156,salos:900,followers:5},
  {title:"Música ao vivo — Semba",date:"12 Mar 2026",duration:"2h 00min",viewers:145,salos:1200,followers:7},
  {title:"Gaming chill — conversa",date:"10 Mar 2026",duration:"1h 20min",viewers:98,salos:400,followers:3},
]
export default function StreamsPage() {
  const [period, setPeriod] = useState("30d")
  const [sort, setSort] = useState("recent")
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Histórico de Streams</h1></div>
      <div className="flex items-center justify-between"><PeriodSelector period={period} onChange={setPeriod} /><div className="flex gap-1">{[{id:"recent",l:"Recente"},{id:"viewers",l:"Viewers"},{id:"salos",l:"Salos"}].map(s => <button key={s.id} onClick={() => setSort(s.id)} className={`px-2 py-1 rounded text-[8px] ${sort === s.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{s.l}</button>)}</div></div>
      <div className="space-y-1.5">{STREAMS.map(s => <Link key={s.title} href="/dashboard/analytics/streams/demo"><StreamListItem {...s} /></Link>)}</div>
    </div>
  )
}
