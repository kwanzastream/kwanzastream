"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const CURATED = [
  { username: "angolangamer", displayName: "Angola Gamer", category: "Gaming", followers: 2340, bio: "O maior canal de gaming de Angola" },
  { username: "kuduroking", displayName: "Kuduro King", category: "Música", followers: 5600, bio: "Kuduro, semba e kizomba ao vivo" },
  { username: "chefangola", displayName: "Chef Angola", category: "Culinária", followers: 1200, bio: "Receitas tradicionais angolanas" },
  { username: "techtalks", displayName: "Tech Talks AO", category: "Tecnologia", followers: 890, bio: "Debate sobre tecnologia em Angola" },
  { username: "fifaclub_ao", displayName: "FIFA Club AO", category: "Gaming", followers: 3400, bio: "Torneios de FIFA e Pro Clubs" },
  { username: "dancer_ao", displayName: "Dancer AO", category: "Entretenimento", followers: 4500, bio: "Dança kuduro e afrobeat" },
  { username: "comedy_luanda", displayName: "Comedy Luanda", category: "Comédia", followers: 7800, bio: "Humor angolano de qualidade" },
  { username: "news_angola", displayName: "News Angola", category: "Notícias", followers: 12000, bio: "Notícias e debate actualizado" },
]

export default function InicioRecomendadosPage() {
  const [followed, setFollowed] = useState<Set<string>>(new Set())

  return (
    <div className="min-h-screen max-w-screen-md mx-auto py-8 px-4 space-y-6">
      <Link href="/inicio" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="w-3 h-3" />Voltar</Link>
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-amber-400" />Canais recomendados</h1>
        <p className="text-sm text-muted-foreground mt-1">Curados pela equipa Kwanza Stream para novos utilizadores</p>
      </div>
      <div className="space-y-3">
        {CURATED.map((ch) => (
          <div key={ch.username} className="rounded-xl border border-white/10 hover:border-primary/30 p-4 transition-all flex items-center gap-3">
            <Avatar className="w-11 h-11"><AvatarFallback className="bg-gradient-to-br from-amber-500/30 to-primary/30 text-foreground text-sm font-bold">{ch.displayName.slice(0, 2)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{ch.displayName}</p>
              <p className="text-[10px] text-muted-foreground truncate">{ch.bio}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-[9px]">{ch.category}</Badge>
                <span className="text-[10px] text-muted-foreground">{ch.followers > 999 ? `${(ch.followers / 1000).toFixed(1)}k` : ch.followers} seguidores</span>
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
