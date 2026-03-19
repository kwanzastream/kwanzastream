"use client"

import { useParams } from "next/navigation"
import { ShortPlayer } from "@/components/shorts/short-player"
import { ShortActions } from "@/components/shorts/short-actions"
import { ShortCard, type ShortData } from "@/components/shorts/short-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Eye, Clock, Check } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK = {
  id: "s1", title: "Kuduro dance challenge - quem faz melhor? 🔥💃", description: "O melhor kuduro de Luanda! Quem consegue fazer esta dança? Marca um amigo!", duration: 28, viewCount: 245000, likes: 18000,
  createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Dança", music: "Kuduro Nacional — DJ Malvado", tags: ["kuduro", "danca", "angola", "challenge"],
  creator: { username: "danca_ao", displayName: "Dança AO", followers: 45000 },
}

const RELATED: ShortData[] = [
  { id: "s2", title: "Golo de bicicleta 🇦🇴⚽", duration: 15, viewCount: 89000, likes: 6700, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Futebol", creator: { username: "futebol_rua", displayName: "Futebol de Rua" } },
  { id: "s3", title: "Receita relâmpago 🍗", duration: 30, viewCount: 156000, likes: 12000, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Culinária", creator: { username: "chef_luanda", displayName: "Chef Luanda" } },
]

export default function ShortPage() {
  const { id } = useParams()
  const s = MOCK

  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Player (centred, max 450px) */}
        <div className="relative w-full max-w-[450px] mx-auto lg:mx-0">
          <div className="aspect-[9/16]">
            <ShortPlayer thumbnailUrl={undefined} autoplay />
          </div>
          {/* Actions overlay */}
          <div className="absolute right-3 bottom-32 z-20">
            <ShortActions likes={s.likes} comments={142} shares={891} shortId={s.id} title={s.title} creatorName={s.creator.displayName} />
          </div>
          {/* Creator overlay */}
          <div className="absolute bottom-4 left-4 right-16 z-20 space-y-2">
            <div className="flex items-center gap-2">
              <Link href={`/${s.creator.username}`}><Avatar className="w-8 h-8 border-2 border-white/30"><AvatarFallback className="bg-primary/30 text-white text-[10px]">{s.creator.displayName.slice(0, 2)}</AvatarFallback></Avatar></Link>
              <Link href={`/${s.creator.username}`} className="text-white text-sm font-bold">@{s.creator.username}</Link>
              <Button variant="outline" size="sm" className="h-6 px-2 text-[10px] border-white/30 text-white bg-transparent hover:bg-white/10" onClick={() => toast.success("A seguir!")}><Check className="w-3 h-3 mr-1" />Seguir</Button>
            </div>
            <p className="text-white text-sm line-clamp-3">{s.description}</p>
            {s.music && <div className="flex items-center gap-1.5 text-white/70 text-[10px]"><Music className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} /><span className="truncate">🎵 {s.music}</span></div>}
          </div>
        </div>

        {/* Info + Related */}
        <div className="flex-1 space-y-4 min-w-0">
          <h1 className="text-lg font-bold">{s.title}</h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{s.viewCount.toLocaleString()} views</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.duration}s</span>
            <Badge variant="outline" className="text-[9px]">{s.category}</Badge>
          </div>
          <div className="flex flex-wrap gap-1.5">{s.tags.map(t => <Badge key={t} variant="outline" className="text-[9px]">#{t}</Badge>)}</div>

          <div className="pt-4 border-t border-white/10"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold">Shorts relacionados</h3><Link href={`/shorts/${id}/relacionados`} className="text-[10px] text-primary">Ver todos →</Link></div>
          <div className="grid grid-cols-2 gap-3">{RELATED.map(r => <ShortCard key={r.id} short={r} />)}</div></div>
        </div>
      </div>
    </div>
  )
}
