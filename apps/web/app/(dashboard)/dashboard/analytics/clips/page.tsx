"use client"
import { MetricCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const CLIPS = [{title:"Golo incrível no FIFA",views:1234,follows:12},{title:"Momento cómico no chat",views:890,follows:5},{title:"Vitória clutch",views:567,follows:3}]
export default function ClipsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🎬 Analytics de Clips</h1></div>
      <div className="grid grid-cols-2 gap-3"><MetricCard icon="👁" label="Views totais" value="2.691" change="+34%" positive /><MetricCard icon="👥" label="Seguidores via clips" value="+20" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Top clips</p>{CLIPS.map(c => <div key={c.title} className="flex items-center justify-between p-2 rounded-xl border border-white/10"><div><p className="text-xs font-bold">{c.title}</p><p className="text-[8px] text-muted-foreground">👁 {c.views.toLocaleString()} views</p></div><span className="text-[9px] text-green-400">+{c.follows} seguidores</span></div>)}</div>
    </div>
  )
}
