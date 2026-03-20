"use client"
import { StreamListItem } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const SUMMARIES = [
  {title:"FIFA 26 — Torneio Angola",date:"20 Mar 2026",duration:"2h 34min",viewers:234,salos:2300,followers:12},
  {title:"Kuduro Live DJ Set",date:"18 Mar 2026",duration:"1h 45min",viewers:178,salos:1500,followers:8},
  {title:"Call of Duty — Ranked",date:"15 Mar 2026",duration:"3h 10min",viewers:156,salos:900,followers:5},
]
export default function StreamSummaryListPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Stream Summaries</h1></div>
      <p className="text-xs text-muted-foreground">Resumos gerados automaticamente após cada stream.</p>
      <div className="space-y-1.5">{SUMMARIES.map(s => <Link key={s.title} href="/dashboard/analytics/stream-summary/demo"><StreamListItem {...s} /></Link>)}</div>
    </div>
  )
}
