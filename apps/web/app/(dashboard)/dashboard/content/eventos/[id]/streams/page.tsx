"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const STREAMS = [{title:"Dia 1 — Eliminação",date:"25 Mar, 18h",status:"Agendado"},{title:"Dia 2 — Semifinais",date:"26 Mar, 18h",status:"Agendado"},{title:"Dia 3 — Final",date:"27 Mar, 20h",status:"Agendado"}]
export default function EventoStreamsPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/content/eventos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Streams do Evento</h1></div>
      <div className="space-y-1">{STREAMS.map(s => <div key={s.title} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><div className="flex-1"><p className="text-xs font-bold">{s.title}</p><p className="text-[8px] text-muted-foreground">{s.date} · {s.status}</p></div></div>)}</div>
      <Button variant="outline" size="sm" className="w-full gap-1 text-xs"><Plus className="w-3 h-3" />Associar stream</Button>
    </div>
  )
}
