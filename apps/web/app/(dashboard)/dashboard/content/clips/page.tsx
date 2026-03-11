"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Play, Eye, Trash2, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Clip {
  id: string; title: string; thumbnailUrl?: string; duration: number
  viewCount: number; createdAt: string; stream?: { title: string }
}

export default function ClipsPage() {
  const [clips, setClips] = useState<Clip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/clips/me/clips")
      .then((res) => setClips(res.data?.clips || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Apagar este clip permanentemente?")) return
    try { await api.delete(`/api/clips/${id}`); setClips((prev) => prev.filter((c) => c.id !== id)); toast.success("Clip apagado") }
    catch { toast.error("Erro ao apagar clip") }
  }

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60); const sec = s % 60
    return `${m}:${String(sec).padStart(2, "0")}`
  }

  return (
    <div className="max-w-5xl space-y-4">
      <h1 className="text-xl font-bold">Clips</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div>
      ) : clips.length === 0 ? (
        <div className="text-center py-16"><p className="text-3xl mb-3">✂️</p><p className="font-medium">Sem clips ainda</p><p className="text-sm text-muted-foreground mt-1">Os teus espectadores podem criar clips dos teus streams</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clips.map((clip) => (
            <div key={clip.id} className="rounded-xl overflow-hidden border border-border/50 group">
              <div className="relative aspect-video bg-muted">
                {clip.thumbnailUrl ? <img src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center"><Play className="w-8 h-8 text-muted-foreground" /></div>}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{formatDuration(clip.duration)}</div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{clip.title}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{clip.viewCount}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(clip.createdAt).toLocaleDateString("pt-AO")}</span>
                </div>
                <div className="flex items-center gap-2 mt-2.5">
                  <Link href={`/clips/${clip.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full h-7 text-xs gap-1"><ExternalLink className="w-3 h-3" />Ver no canal</Button></Link>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleDelete(clip.id)}><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
