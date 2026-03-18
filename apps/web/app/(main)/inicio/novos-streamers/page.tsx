"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, ArrowLeft, Clock } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const NEW_STREAMERS = [
  { username: "gamer_luanda", displayName: "Gamer Luanda", category: "Gaming", streams: 12, followers: 234, daysAgo: 15 },
  { username: "dj_malembe", displayName: "DJ Malembe", category: "Música", streams: 8, followers: 189, daysAgo: 22 },
  { username: "chef_benguela", displayName: "Chef Benguela", category: "Culinária", streams: 6, followers: 156, daysAgo: 10 },
  { username: "tech_cabinda", displayName: "Tech Cabinda", category: "Tecnologia", streams: 15, followers: 312, daysAgo: 5 },
  { username: "arte_huila", displayName: "Arte Huíla", category: "Arte", streams: 4, followers: 78, daysAgo: 28 },
]

export default function InicioNovosStreamersPage() {
  const [followed, setFollowed] = useState<Set<string>>(new Set())

  return (
    <div className="min-h-screen max-w-screen-md mx-auto py-8 px-4 space-y-6">
      <Link href="/inicio" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar</Link>
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" />Novos streamers</h1>
        <p className="text-sm text-muted-foreground mt-1">Canais com menos de 3 meses — apoia desde o início!</p>
      </div>
      <div className="space-y-3">
        {NEW_STREAMERS.map((ch) => (
          <div key={ch.username} className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all flex items-center gap-3">
            <Avatar className="w-11 h-11"><AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">{ch.displayName.slice(0, 2)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{ch.displayName}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-[9px]">{ch.category}</Badge>
                <span className="text-[10px] text-muted-foreground">{ch.streams} streams · {ch.followers} seguidores</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />Começou há {ch.daysAgo} dias</p>
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
