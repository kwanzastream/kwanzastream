"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RotateCcw, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const RETURNED = [
  { username: "old_streamer", displayName: "Velho Lobo", category: "Conversa", absent: "2 semanas", followers: 1200 },
  { username: "musica_clasica", displayName: "Clássicos AO", category: "Música", absent: "3 semanas", followers: 890 },
  { username: "retro_gamer", displayName: "Retro Gamer AO", category: "Gaming", absent: "1 mês", followers: 560 },
  { username: "debate_ao", displayName: "Debate Angola", category: "Conversa", absent: "2 semanas", followers: 2100 },
]

export default function InicioVoltouPage() {
  const [followed, setFollowed] = useState<Set<string>>(new Set())

  return (
    <div className="min-h-screen max-w-screen-md mx-auto py-8 px-4 space-y-6">
      <Link href="/inicio" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar</Link>
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2"><RotateCcw className="w-5 h-5 text-green-400" />Voltou a transmitir</h1>
        <p className="text-sm text-muted-foreground mt-1">Canais que retomaram actividade recentemente</p>
      </div>
      <div className="space-y-3">
        {RETURNED.map((ch) => (
          <div key={ch.username} className="rounded-xl border border-white/10 hover:border-green-500/30 p-4 transition-all flex items-center gap-3">
            <Avatar className="w-11 h-11"><AvatarFallback className="bg-green-500/20 text-green-400 text-sm font-bold">{ch.displayName.slice(0, 2)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{ch.displayName}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-[9px]">{ch.category}</Badge>
                <span className="text-[10px] text-muted-foreground">Ausente {ch.absent} · {ch.followers} seguidores</span>
              </div>
            </div>
            <Button size="sm" variant={followed.has(ch.username) ? "secondary" : "outline"} className="shrink-0 text-xs h-8"
              onClick={() => { setFollowed(p => { const n = new Set(p); n.has(ch.username) ? n.delete(ch.username) : n.add(ch.username); return n }); toast.success(`Agora segues ${ch.displayName}`) }}>
              {followed.has(ch.username) ? "A seguir ✓" : "Seguir"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
