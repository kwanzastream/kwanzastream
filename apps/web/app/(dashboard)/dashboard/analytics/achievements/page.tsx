"use client"
import { ArrowLeft, Trophy, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const ACHIEVEMENTS = [
  { id: "ngola", emoji: "🏅", name: "Ngola Criador", desc: "50 streams", progress: 35, total: 50, unlocked: false },
  { id: "voz", emoji: "🎤", name: "Voz de Angola", desc: "1.000 seguidores", progress: 567, total: 1000, unlocked: false },
  { id: "mwana", emoji: "🌟", name: "Mwana wa Angola", desc: "Primeiro stream", progress: 1, total: 1, unlocked: true, date: "15 Mar 2026" },
  { id: "kiambote", emoji: "💬", name: "Kiambote", desc: "100 mensagens no chat", progress: 100, total: 100, unlocked: true, date: "10 Mar 2026" },
  { id: "kizomba", emoji: "🎵", name: "Ritmo de Kizomba", desc: "10h de stream de Música", progress: 6, total: 10, unlocked: false },
  { id: "mukanda", emoji: "📜", name: "Mukanda Digital", desc: "Bio completa", progress: 1, total: 1, unlocked: true, date: "1 Mar 2026" },
]
export default function AchievementsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/overview"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🏆 Conquistas</h1></div>
      <div className="flex gap-2"><Link href="/dashboard/analytics/achievements/progresso"><Button variant="outline" size="sm" className="text-[9px]">Só em progresso</Button></Link></div>
      <div className="space-y-2">{ACHIEVEMENTS.map(a => <Link key={a.id} href={`/dashboard/analytics/achievements/${a.id}`}><div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${a.unlocked ? "border-green-500/20 bg-green-500/5" : "border-white/10 hover:border-primary/20"}`}><span className="text-2xl">{a.emoji}</span><div className="flex-1"><p className="text-xs font-bold">{a.name}</p><p className="text-[8px] text-muted-foreground">{a.desc}</p>{!a.unlocked && <div className="mt-1"><div className="h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-primary" style={{width:`${(a.progress/a.total)*100}%`}} /></div><p className="text-[7px] text-muted-foreground mt-0.5">{a.progress}/{a.total}</p></div>}{a.unlocked && <p className="text-[8px] text-green-400">✅ {a.date}</p>}</div></div></Link>)}</div>
    </div>
  )
}
