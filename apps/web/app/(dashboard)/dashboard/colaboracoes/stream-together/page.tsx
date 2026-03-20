"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function StreamTogetherPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📺 Stream Together</h1>
      <div className="p-3 rounded-xl border border-white/10"><p className="text-xs">Co-stream activo: <span className="text-red-400">❌ Não estás em co-stream</span></p></div>
      <p className="text-[10px] font-bold">Últimas colaborações</p>
      {[{ch:"@canal1",date:"15 Mar",dur:"2h",viewers:450},{ch:"@canal2",date:"8 Mar",dur:"1h30",viewers:280}].map(c => <div key={c.ch} className="p-2.5 rounded-xl border border-white/10"><p className="text-xs font-bold">{c.ch}</p><p className="text-[8px] text-muted-foreground">{c.date} · {c.dur} · {c.viewers} viewers combinados</p></div>)}
      <div className="space-y-1"><Link href="/dashboard/colaboracoes/stream-together/configurar"><Button size="sm" className="w-full text-xs">Convidar para co-stream →</Button></Link><Link href="/dashboard/colaboracoes/stream-together/browser-source"><Button variant="outline" size="sm" className="w-full text-xs">Browser Source URL</Button></Link></div>
    </div>
  )
}
