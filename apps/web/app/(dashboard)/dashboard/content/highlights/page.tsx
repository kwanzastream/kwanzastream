"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
const HIGHLIGHTS = [{id:"1",title:"Melhores momentos — Semana 12",from:"FIFA 26 — Torneio",duration:"5min",views:456},{id:"2",title:"Tutorial OBS para iniciantes",from:"Just Talking — 18 Mar",duration:"8min",views:234}]
export default function HighlightsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Highlights</h1><Link href="/dashboard/content/highlights/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar highlight</Button></Link></div>
      <p className="text-xs text-muted-foreground">Momentos editorialmente curados dos teus streams.</p>
      <div className="space-y-1.5">{HIGHLIGHTS.map(h => <div key={h.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20"><div className="w-16 h-10 rounded bg-primary/10 flex items-center justify-center text-xs">⭐</div><div className="flex-1"><p className="text-xs font-bold">{h.title}</p><p className="text-[8px] text-muted-foreground">De: {h.from} · {h.duration} · {h.views} views</p></div></div>)}</div>
    </div>
  )
}
