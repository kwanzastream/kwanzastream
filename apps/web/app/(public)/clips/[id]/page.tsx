"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ClipPlayer } from "@/components/clips/clip-player"
import { ClipCard, type ClipData } from "@/components/clips/clip-card"
import { ClipShareSheet } from "@/components/clips/clip-share-sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, Bookmark, Flag, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK_CLIP = {
  id: "c1", title: "Clutch 1v4 incrível! 🔥", duration: 28, viewCount: 45000, shares: 1200,
  createdAt: new Date(Date.now() - 3600000).toISOString(), category: "Gaming",
  sourceStreamId: "stream-123", sourceTimestamp: 4523,
  creator: { username: "angolangamer", displayName: "Angola Gamer", followers: 12500 },
}

const MOCK_RELATED: ClipData[] = [
  { id: "c2", title: "Dança de kuduro viral", duration: 45, viewCount: 89000, shares: 3400, createdAt: new Date(Date.now() - 7200000).toISOString(), category: "Música", creator: { username: "kuduroking", displayName: "Kuduro King" } },
  { id: "c3", title: "Receita relâmpago", duration: 60, viewCount: 12000, shares: 800, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Culinária", creator: { username: "chef_mwangole", displayName: "Chef Mwangolê" } },
  { id: "c4", title: "Golo de antologia!", duration: 15, viewCount: 120000, shares: 8900, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Desporto", creator: { username: "desporto_ao", displayName: "Desporto AO" } },
]

export default function ClipPage() {
  const { id } = useParams()
  const [saved, setSaved] = useState(false)
  const c = MOCK_CLIP

  return (
    <div className="max-w-7xl mx-auto py-4 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main */}
        <div className="flex-1 space-y-4">
          <ClipPlayer title={c.title} />

          <div className="space-y-3">
            <h1 className="text-lg font-bold">{c.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Link href={`/${c.creator.username}`} className="flex items-center gap-2">
                <Avatar className="w-9 h-9"><AvatarFallback className="bg-primary/20 text-primary text-xs">{c.creator.displayName.slice(0, 2)}</AvatarFallback></Avatar>
                <div><p className="text-sm font-bold">{c.creator.displayName}</p><p className="text-[10px] text-muted-foreground">{(c.creator.followers / 1000).toFixed(1)}k seguidores</p></div>
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.success("A seguir!")}>Seguir</Button>
                <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => { setSaved(!saved); toast.success(saved ? "Removido" : "Guardado") }}>
                  <Bookmark className={`w-3 h-3 ${saved ? "fill-primary text-primary" : ""}`} />{saved ? "Guardado" : "Guardar"}
                </Button>
                <ClipShareSheet clipId={id as string} title={c.title} creatorName={c.creator.displayName} />
                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => toast.success("Denúncia enviada")}><Flag className="w-3 h-3" /></Button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{c.viewCount.toLocaleString()} views</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}s</span>
              <Badge variant="outline" className="text-[9px]">{c.category}</Badge>
            </div>

            {/* Source stream */}
            <Link href={`/videos/${c.sourceStreamId}?t=${c.sourceTimestamp}`}
              className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all text-sm">
              <ExternalLink className="w-4 h-4 text-primary" />
              <span>Ver VOD original no momento <strong className="text-primary font-mono">1:15:23</strong></span>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 shrink-0 space-y-3">
          <div className="flex items-center justify-between"><h3 className="text-sm font-bold">Clips relacionados</h3><Link href={`/clips/${id}/relacionados`} className="text-[10px] text-primary">Ver todos →</Link></div>
          {MOCK_RELATED.map(c => <ClipCard key={c.id} clip={c} />)}
        </div>
      </div>
    </div>
  )
}
