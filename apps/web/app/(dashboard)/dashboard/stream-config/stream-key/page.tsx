"use client"
import { StreamKeyCard } from "@/components/stream-config/stream-config-components"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"
import Link from "next/link"
export default function StreamKeyPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🔑 Stream Key</h1>
      <StreamKeyCard serverUrl="rtmp://live.kwanzastream.ao/live" />
      <Link href="/dashboard/stream-config/stream-key/rotacionar"><Button variant="outline" size="sm" className="w-full text-xs gap-1 text-yellow-400"><RotateCw className="w-3 h-3" />Rotacionar key</Button></Link>
      <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Configuração recomendada (OBS)</p><div className="space-y-0.5">{[{l:"Bitrate",v:"2.500 kbps"},{l:"Resolução",v:"1280×720 (720p)"},{l:"FPS",v:"30"},{l:"Keyframe",v:"2 segundos"},{l:"Encoder",v:"x264"}].map(c => <div key={c.l} className="flex justify-between"><span className="text-[9px] text-muted-foreground">{c.l}</span><span className="text-[9px] font-bold">{c.v}</span></div>)}</div></div>
    </div>
  )
}
