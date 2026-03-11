"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Play, Eye, Trash2, Clock, Upload } from "lucide-react"
import Link from "next/link"

interface Vod {
  id: string; title: string; thumbnailUrl?: string; duration: number
  viewCount: number; isPublic: boolean; createdAt: string
}

export default function VodsPage() {
  const [vods, setVods] = useState<Vod[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/vods/me/list")
      .then((res) => setVods(res.data?.vods || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleTogglePublic = async (vod: Vod) => {
    try {
      await api.put(`/api/vods/${vod.id}`, { isPublic: !vod.isPublic })
      setVods((prev) => prev.map((v) => v.id === vod.id ? { ...v, isPublic: !v.isPublic } : v))
      toast.success(!vod.isPublic ? "VOD tornado público" : "VOD tornado privado")
    } catch { toast.error("Erro ao actualizar VOD") }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Apagar este VOD permanentemente?")) return
    try { await api.delete(`/api/vods/${id}`); setVods((prev) => prev.filter((v) => v.id !== id)); toast.success("VOD apagado") }
    catch { toast.error("Erro ao apagar VOD") }
  }

  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60)
    return h > 0 ? `${h}h ${m}min` : `${m}min`
  }

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold">VODs</h1><Button size="sm" variant="outline" className="gap-1.5"><Upload className="w-3.5 h-3.5" />Upload</Button></div>

      {loading ? (
        <div className="space-y-3">{Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div>
      ) : vods.length === 0 ? (
        <div className="text-center py-16"><p className="text-3xl mb-3">🎬</p><p className="font-medium">Sem VODs ainda</p><p className="text-sm text-muted-foreground mt-1">Os teus streams ficam gravados aqui automaticamente</p></div>
      ) : (
        <div className="space-y-3">
          {vods.map((vod) => (
            <Card key={vod.id} className="border-border/50 p-4 flex gap-4">
              <div className="w-32 aspect-video bg-muted rounded-lg overflow-hidden shrink-0 relative">
                {vod.thumbnailUrl ? <img src={vod.thumbnailUrl} alt={vod.title} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center"><Play className="w-6 h-6 text-muted-foreground" /></div>}
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">{formatDuration(vod.duration)}</div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{vod.title}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{vod.viewCount} views</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(vod.createdAt).toLocaleDateString("pt-AO")}</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2"><Switch id={`public-${vod.id}`} checked={vod.isPublic} onCheckedChange={() => handleTogglePublic(vod)} /><Label htmlFor={`public-${vod.id}`} className="text-xs">{vod.isPublic ? "Público" : "Privado"}</Label></div>
                  <Link href={`/videos/${vod.id}`}><Button variant="ghost" size="sm" className="h-7 text-xs"><Play className="w-3 h-3 mr-1" />Ver</Button></Link>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => handleDelete(vod.id)}><Trash2 className="w-3 h-3 mr-1" />Apagar</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
