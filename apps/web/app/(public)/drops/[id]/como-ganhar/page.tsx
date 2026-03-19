"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Eye, Radio, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DropComoGanharPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href={`/drops/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Como Ganhar</h1></div>
      <div className="space-y-4">
        {[{ step: "1", title: "Encontra um stream elegível", desc: "Streams de Gaming com o badge 🎁 no título contam para este drop." },
          { step: "2", title: "Assiste 120 minutos", desc: "O progresso é automático e guardado. Podes pausar e continuar mais tarde." },
          { step: "3", title: "Recebe notificação", desc: "Quando chegares aos 120 min, recebes uma notificação por email e/ou WhatsApp." },
          { step: "4", title: "Resgata o prémio", desc: "Vai a /drops e clica 'Resgatar'. Recebes um código para usar na App Unitel." },
        ].map(s => (
          <div key={s.step} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-black text-primary shrink-0">{s.step}</div>
            <div><p className="text-sm font-bold">{s.title}</p><p className="text-[10px] text-muted-foreground">{s.desc}</p></div>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-bold flex items-center gap-1"><Radio className="w-4 h-4 text-red-400 animate-pulse" />Streams recomendados (ao vivo)</p>
        {[{ channel: "esports_ao", title: "FIFA 25 — Torneio", viewers: 890 }].map(s => <Link key={s.channel} href={`/${s.channel}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all"><div className="flex-1"><p className="text-xs font-bold">{s.title}</p><p className="text-[9px] text-muted-foreground">@{s.channel}</p></div><span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Eye className="w-3 h-3" />{s.viewers}</span></Link>)}
      </div>
    </div>
  )
}
