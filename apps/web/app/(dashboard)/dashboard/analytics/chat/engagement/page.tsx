"use client"
import { SimpleLineChart, MetricCard, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const MSG_RATE = [{label:"0m",value:2},{label:"15m",value:5},{label:"30m",value:8},{label:"45m",value:12},{label:"1h",value:15},{label:"1h15",value:11},{label:"1h30",value:9}]
export default function ChatEngagementPage() {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">💬 Chat Engagement</h1></div>
      <div className="grid grid-cols-2 gap-3"><MetricCard icon="💬" label="Msg/minuto (pico)" value="15.2" /><MetricCard icon="👥" label="% viewers que chatam" value="34%" /></div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Mensagens/minuto ao longo do stream</p><SimpleLineChart data={MSG_RATE} color="hsl(280 60% 60%)" /></div>
      <InsightCard icon="💡" text="Pico de engagement aos 45 min — correlacionado com o poll que activaste." />
      <Link href="/dashboard/analytics/chat/top-chatters"><Button variant="outline" size="sm" className="text-xs w-full">Ver top chatters →</Button></Link>
    </div>
  )
}
