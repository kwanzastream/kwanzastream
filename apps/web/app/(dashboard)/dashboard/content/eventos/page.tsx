"use client"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"
import Link from "next/link"
const EVENTS = [{id:"1",name:"Torneio FIFA Angola",date:"25 Mar 2026",streams:3,status:"upcoming"},{id:"2",name:"Maratona de Caridade",date:"15 Mar 2026",streams:1,status:"past"}]
export default function EventosPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Eventos do Canal</h1><Link href="/dashboard/content/eventos/criar"><Button size="sm" className="gap-1 text-xs"><Plus className="w-3 h-3" />Criar evento</Button></Link></div>
      <div className="space-y-1.5">{EVENTS.map(e => <Link key={e.id} href={`/dashboard/content/eventos/${e.id}`}><div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20"><Calendar className="w-5 h-5 text-primary shrink-0" /><div className="flex-1"><p className="text-xs font-bold">{e.name}</p><p className="text-[8px] text-muted-foreground">{e.date} · {e.streams} streams · {e.status === "upcoming" ? "🟢 Próximo" : "⚫ Passado"}</p></div></div></Link>)}</div>
    </div>
  )
}
