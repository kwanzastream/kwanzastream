"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Eye, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const MOCK = [
  { channel: "esports_ao", displayName: "eSports AO", role: "main", viewers: 2100, isLive: true, language: "PT-AO" },
  { channel: "gamer_luanda", displayName: "Gamer Luanda", role: "commentator", viewers: 890, isLive: true, language: "PT-AO" },
  { channel: "fifa_king_ao", displayName: "FIFA King AO", role: "participant", viewers: 340, isLive: true, language: "PT-AO" },
  { channel: "gaming_en", displayName: "Gaming EN", role: "spectator", viewers: 120, isLive: false, language: "EN" },
]

export default function TorneioStreamsPage() {
  const { id } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Streams do Torneio</h1></div>
      <div className="space-y-2">
        {MOCK.map(s => (
          <Link key={s.channel} href={`/${s.channel}`} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{s.displayName[0]}</div>
            <div className="flex-1"><p className="text-sm font-bold">{s.displayName}</p><p className="text-[10px] text-muted-foreground">@{s.channel} · {s.language}</p></div>
            {s.isLive && <Badge className="bg-red-600 text-white text-[9px] gap-1"><Radio className="w-3 h-3 animate-pulse" />LIVE</Badge>}
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" />{s.viewers}</span>
            <Badge className={`text-[9px] ${s.role === "main" ? "bg-primary/10 text-primary" : s.role === "commentator" ? "bg-yellow-500/10 text-yellow-400" : "bg-white/5 text-muted-foreground"}`}>{s.role === "main" ? "Principal" : s.role === "commentator" ? "Comentador" : s.role === "participant" ? "Participante" : "Espectador"}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
