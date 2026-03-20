"use client"
import { SmPanel, SmLiveBadge } from "@/components/stream-manager/sm-components"
import { ArrowLeft, Maximize2, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PreviewPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Preview do Stream</h1><SmLiveBadge isLive={true} /></div>
      <div className="aspect-video bg-black rounded-xl flex items-center justify-center border border-white/10"><p className="text-sm text-muted-foreground">Stream preview (HLS player)</p></div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-[10px] text-muted-foreground"><span className="flex items-center gap-1"><Wifi className="w-3 h-3" />Latência: 6.2s</span><span>Qualidade: 720p</span><span>Bitrate: 2.4 Mbps</span></div>
        <Button variant="outline" size="sm" className="text-[9px] gap-1"><Maximize2 className="w-3 h-3" />Fullscreen</Button>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">{[{l:"Estado",v:"🔴 AO VIVO"},{l:"FPS",v:"30"},{l:"Dropped Frames",v:"0"}].map(s => <div key={s.l} className="p-3 rounded-xl border border-white/10"><p className="text-[9px] text-muted-foreground">{s.l}</p><p className="text-xs font-bold">{s.v}</p></div>)}</div>
    </div>
  )
}
