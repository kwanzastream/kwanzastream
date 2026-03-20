"use client"
import { OverlayCard } from "@/components/stream-config/stream-config-components"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
export default function OverlaysPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🎨 Overlays</h1>
      <p className="text-xs text-muted-foreground">Elementos visuais para OBS via Browser Source.</p>
      <div className="space-y-2">{[{name:"Alertas de Salos",type:"Alerta",url:"https://kwanzastream.ao/overlay/salos?token=abc123",id:"1"},{name:"Chat overlay",type:"Chat",url:"https://kwanzastream.ao/overlay/chat?token=def456",id:"2"},{name:"Viewer count",type:"Info",url:"https://kwanzastream.ao/overlay/viewers?token=ghi789",id:"3"},{name:"Goals bar",type:"Info",url:"https://kwanzastream.ao/overlay/goals?token=jkl012",id:"4"}].map(o => <Link key={o.id} href={`/dashboard/stream-config/overlays/${o.id}`}><OverlayCard {...o} /></Link>)}</div>
      <Link href="/dashboard/stream-config/overlays/criar"><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Plus className="w-3 h-3" />Criar overlay personalizado</Button></Link>
    </div>
  )
}
