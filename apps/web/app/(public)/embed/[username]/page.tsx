"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { HlsPlayer } from "@/components/hls-player"
import { Loader2 } from "lucide-react"

export default function EmbedPage() {
  const params = useParams()
  const username = params.username as string
  const [hlsUrl, setHlsUrl] = useState("")
  const [viewerCount, setViewerCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    if (!username) return
    api.get(`/api/users/${username}`)
      .then(async (res) => {
        const channelUser = res.data.user
        const streamsRes = await api.get(`/api/streams/user/${channelUser.id}`)
        const streams = streamsRes.data?.streams || streamsRes.data || []
        const liveStream = streams.find((s: any) => s.status === "LIVE")
        if (!liveStream) { setOffline(true); return }
        setViewerCount(liveStream.viewerCount || 0)
        if (liveStream.streamKey) {
          setHlsUrl(`${process.env.NEXT_PUBLIC_HLS_BASE_URL || "http://localhost:8000/live"}/${liveStream.streamKey}/index.m3u8`)
        }
      })
      .catch(() => setOffline(true))
      .finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="w-full h-screen bg-black flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-white" /></div>

  if (offline) return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-center"><p className="text-white text-lg mb-1">@{username}</p><p className="text-white/60 text-sm">Offline</p></div>
    </div>
  )

  return (
    <div className="w-full h-screen bg-black">
      <HlsPlayer src={hlsUrl} viewerCount={viewerCount} />
    </div>
  )
}
