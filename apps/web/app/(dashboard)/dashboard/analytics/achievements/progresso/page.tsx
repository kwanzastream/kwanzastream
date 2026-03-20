"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const IN_PROGRESS = [
  { emoji: "🏅", name: "Ngola Criador", desc: "50 streams", progress: 35, total: 50 },
  { emoji: "🎤", name: "Voz de Angola", desc: "1.000 seguidores", progress: 567, total: 1000 },
  { emoji: "🎵", name: "Ritmo de Kizomba", desc: "10h de stream de Música", progress: 6, total: 10 },
]
export default function ProgressoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/achievements"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Em Progresso</h1></div>
      <div className="space-y-2">{IN_PROGRESS.map(a => <div key={a.name} className="flex items-center gap-3 p-3 rounded-xl border border-white/10"><span className="text-2xl">{a.emoji}</span><div className="flex-1"><p className="text-xs font-bold">{a.name}</p><p className="text-[8px] text-muted-foreground">{a.desc}</p><div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-primary" style={{width:`${(a.progress/a.total)*100}%`}} /></div><p className="text-[7px] text-muted-foreground mt-0.5">{a.progress}/{a.total}</p></div></div>)}</div>
    </div>
  )
}
