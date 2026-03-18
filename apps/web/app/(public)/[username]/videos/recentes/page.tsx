"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { VideoGrid } from "../page"

export default function ChannelVideosRecentesPage() {
  const { username } = useParams()
  const [vods, setVods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user; if (!u) return
      const r = await api.get(`/api/vods/?creatorId=${u.id}&sort=recent`)
      setVods(r.data?.vods || r.data || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="py-12 text-center text-muted-foreground">A carregar...</div>
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Vídeos recentes</h2>
      <VideoGrid vods={vods} emptyMessage="Sem vídeos recentes" />
    </div>
  )
}
