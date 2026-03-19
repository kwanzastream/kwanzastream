"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { VodCard, type VodData } from "@/components/videos/vod-card"
import { VodComments, type Comment } from "@/components/videos/vod-comments"
import { VodChapters } from "@/components/videos/vod-chapters"
import { VodShareButton } from "@/components/videos/vod-share-button"
import { VideoProgressTracker } from "@/components/videos/video-progress-tracker"
import { Play, Heart, Bookmark, ChevronDown, ChevronUp, Clock, Eye } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const MOCK_VOD = {
  id: "v1", title: "Kuduro Session #45 — 5 horas de música ao vivo 🇦🇴", description: "Stream de kuduro ao vivo com DJ sets e convidados especiais. Kuduro, semba, kizomba e muito mais!\n\nCapítulos:\n0:00 - Intro\n0:15:00 - DJ Set 1\n1:00:00 - Convidado especial\n2:30:00 - Set final", duration: 18000, viewCount: 4200, createdAt: new Date(Date.now() - 86400000).toISOString(), category: "Música",
  tags: ["kuduro", "Angola", "semba", "ao-vivo"],
  chapters: [{ time: 0, label: "Intro" }, { time: 900, label: "DJ Set 1" }, { time: 3600, label: "Convidado especial" }, { time: 9000, label: "Set final" }],
  creator: { username: "kuduroking", displayName: "Kuduro King", followers: 8900 },
}

const MOCK_RELATED: VodData[] = [
  { id: "v2", title: "Valorant Ranked — Angola", duration: 7200, viewCount: 1500, createdAt: new Date(Date.now() - 172800000).toISOString(), category: "Gaming", creator: { username: "angolangamer", displayName: "Angola Gamer" } },
  { id: "v3", title: "Culinária Angolana", duration: 2400, viewCount: 890, createdAt: new Date(Date.now() - 259200000).toISOString(), category: "Culinária", creator: { username: "chef_mwangole", displayName: "Chef Mwangolê" } },
]

const MOCK_COMMENTS: Comment[] = [
  { id: "c1", content: "Stream incrível! Adoro a energia 🔥", createdAt: new Date().toISOString(), likes: 12, author: { username: "viewer_001", displayName: "Viewer" }, replies: [{ id: "r1", content: "Concordo 100%!", createdAt: new Date().toISOString(), likes: 3, author: { username: "fan123", displayName: "Fan" } }] },
  { id: "c2", content: "Alguém sabe o nome da música aos 1:23:45?", createdAt: new Date().toISOString(), likes: 5, author: { username: "music_fan", displayName: "Music Fan" } },
]

function formatDuration(s: number) { const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:00` : `${m}:00` }

export default function VideoPage() {
  const params = useParams()
  const id = params.id as string
  const [showDesc, setShowDesc] = useState(false)
  const [saved, setSaved] = useState(false)

  const v = MOCK_VOD

  return (
    <div className="max-w-7xl mx-auto py-4 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main */}
        <div className="flex-1 space-y-4">
          {/* Player */}
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
            <Play className="w-16 h-16 text-white/60" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
              <div className="w-full h-1 bg-white/20 rounded-full"><div className="h-full bg-primary rounded-full" style={{ width: "35%" }} /></div>
              <div className="flex items-center justify-between mt-2 text-xs text-white/80">
                <span>1:15:23</span><span>{formatDuration(v.duration)}</span>
              </div>
            </div>
          </div>

          {/* Progress tracker */}
          <VideoProgressTracker videoId={id} duration={v.duration} />

          {/* Info */}
          <div className="space-y-3">
            <h1 className="text-lg font-bold">{v.title}</h1>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Link href={`/${v.creator.username}`} className="flex items-center gap-2">
                <Avatar className="w-9 h-9"><AvatarFallback className="bg-primary/20 text-primary text-xs">{v.creator.displayName.slice(0, 2)}</AvatarFallback></Avatar>
                <div><p className="text-sm font-bold">{v.creator.displayName}</p><p className="text-[10px] text-muted-foreground">{(v.creator.followers / 1000).toFixed(1)}k seguidores</p></div>
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.success("A seguir!")}>Seguir</Button>
                <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => toast.success("Salos enviados!")}><Heart className="w-3 h-3" />Salos</Button>
                <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => { setSaved(!saved); toast.success(saved ? "Removido" : "Guardado") }}><Bookmark className={`w-3 h-3 ${saved ? "fill-primary text-primary" : ""}`} />{saved ? "Guardado" : "Guardar"}</Button>
                <VodShareButton videoId={id} title={v.title} currentTime={4523} />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{v.viewCount.toLocaleString()} views</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />há 1 dia</span>
              <Badge variant="outline" className="text-[9px]">{v.category}</Badge>
            </div>

            {/* Description */}
            <div className={`bg-white/[0.03] rounded-xl p-3 ${!showDesc ? "max-h-20 overflow-hidden" : ""}`}>
              <pre className="text-xs whitespace-pre-wrap font-sans text-muted-foreground">{v.description}</pre>
            </div>
            <button onClick={() => setShowDesc(!showDesc)} className="text-xs text-primary flex items-center gap-1">
              {showDesc ? <><ChevronUp className="w-3 h-3" />Menos</> : <><ChevronDown className="w-3 h-3" />Mais</>}
            </button>

            {/* Chapters */}
            <VodChapters chapters={v.chapters} duration={v.duration} />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">{v.tags.map(t => <Badge key={t} variant="outline" className="text-[9px]">#{t}</Badge>)}</div>

            {/* Links to sub-pages */}
            <div className="flex gap-2">
              <Link href={`/videos/${id}/clips`} className="text-xs text-primary hover:underline">Clips deste VOD →</Link>
              <Link href={`/videos/${id}/relacionados`} className="text-xs text-primary hover:underline">Relacionados →</Link>
            </div>

            {/* Comments */}
            <VodComments comments={MOCK_COMMENTS} videoId={id} />
          </div>
        </div>

        {/* Sidebar — Related */}
        <div className="lg:w-80 shrink-0 space-y-3">
          <h3 className="text-sm font-bold">Vídeos relacionados</h3>
          {MOCK_RELATED.map(v => <VodCard key={v.id} vod={v} />)}
        </div>
      </div>
    </div>
  )
}
