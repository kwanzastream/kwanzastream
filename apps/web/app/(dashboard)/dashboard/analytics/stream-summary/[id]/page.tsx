"use client"
import { useParams } from "next/navigation"
import { MetricCard, InsightCard } from "@/components/analytics/analytics-components"
import { ArrowLeft, Share2, Play, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function StreamSummaryDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/stream-summary"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🎉 O teu stream foi fantástico!</h1></div>
      <p className="text-[10px] text-muted-foreground">FIFA 26 — Torneio Angola · 20 Mar 2026</p>
      <div className="grid grid-cols-2 gap-3">
        <MetricCard icon="⏱" label="Duração" value="2h 34min" />
        <MetricCard icon="👁" label="Peak viewers" value="234" change="às 21:34 — quiz" />
        <MetricCard icon="👤" label="Viewers únicos" value="89" />
        <MetricCard icon="👥" label="Novos seguidores" value="+12" />
        <MetricCard icon="💛" label="Salos" value="2.300 Kz" change="4 doadores" />
        <MetricCard icon="🎬" label="Clips criados" value="3" />
      </div>
      <InsightCard icon="💡" text="Os teus viewers ficaram mais tempo quando activaste o poll às 21h15. Experimenta mais polls nos próximos streams!" />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-xs gap-1 flex-1" onClick={() => toast.success("Partilhado no WhatsApp!")}><Share2 className="w-3 h-3" />WhatsApp</Button>
        <Link href="/dashboard/content/vods" className="flex-1"><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Play className="w-3 h-3" />Ver VOD</Button></Link>
        <Link href="/dashboard/analytics/streams/demo" className="flex-1"><Button variant="outline" size="sm" className="w-full text-xs gap-1"><BarChart2 className="w-3 h-3" />Analytics</Button></Link>
      </div>
    </div>
  )
}
