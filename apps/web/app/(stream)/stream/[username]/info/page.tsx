"use client"
import { useParams } from "next/navigation"
import { StreamInfoPanel } from "@/components/stream/stream-info-panel"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function StreamInfoPage() {
  const { username } = useParams()
  const [stream, setStream] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user
      const streamsRes = await api.get(`/api/streams/user/${u.id}`)
      const streams = streamsRes.data?.streams || streamsRes.data || []
      const live = streams.find((s: any) => s.status === "LIVE")
      if (live) setStream({ ...live, streamer: u })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!stream) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Stream não encontrado</p></div>

  return (
    <div className="min-h-screen max-w-2xl mx-auto">
      <StreamInfoPanel
        title={stream.title} category={stream.category || "Geral"}
        viewerCount={stream.viewerCount || 0}
        tags={stream.tags} description={stream.description}
        startedAt={stream.startedAt} contentRating={stream.contentRating}
        socialLinks={stream.streamer?.socialLinks}
      />
    </div>
  )
}
