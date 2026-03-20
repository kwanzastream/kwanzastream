"use client"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const ACH: Record<string,{emoji:string;name:string;desc:string;progress:number;total:number;unlocked:boolean;date?:string;history:string[]}> = {
  ngola:{emoji:"🏅",name:"Ngola Criador",desc:"Completar 50 streams",progress:35,total:50,unlocked:false,history:["Mar: +5 streams","Fev: +8 streams","Jan: +7 streams"]},
  voz:{emoji:"🎤",name:"Voz de Angola",desc:"Alcançar 1.000 seguidores",progress:567,total:1000,unlocked:false,history:["Mar: +89 seguidores","Fev: +67 seguidores"]},
  mwana:{emoji:"🌟",name:"Mwana wa Angola",desc:"Fazer o primeiro stream",progress:1,total:1,unlocked:true,date:"15 Mar 2026",history:["Desbloqueado a 15 Mar 2026"]},
}
export default function AchievementDetailPage() {
  const { id } = useParams()
  const a = ACH[id as string]
  if (!a) return <div className="text-center py-8 text-muted-foreground">Conquista não encontrada</div>
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3"><Link href="/dashboard/analytics/achievements"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">{a.emoji} {a.name}</h1></div>
      <div className={`p-5 rounded-2xl text-center space-y-2 ${a.unlocked ? "bg-green-500/5 border border-green-500/20" : "bg-primary/5 border border-primary/20"}`}><span className="text-4xl">{a.emoji}</span><p className="text-sm font-bold">{a.name}</p><p className="text-xs text-muted-foreground">{a.desc}</p>{!a.unlocked && <div><div className="h-2 rounded-full bg-white/10 mt-2"><div className="h-2 rounded-full bg-primary" style={{width:`${(a.progress/a.total)*100}%`}} /></div><p className="text-[9px] text-muted-foreground mt-1">{a.progress}/{a.total}</p></div>}{a.unlocked && <p className="text-sm text-green-400 font-bold">✅ Desbloqueado — {a.date}</p>}</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Histórico</p>{a.history.map(h => <p key={h} className="text-[10px] text-muted-foreground">→ {h}</p>)}</div>
    </div>
  )
}
