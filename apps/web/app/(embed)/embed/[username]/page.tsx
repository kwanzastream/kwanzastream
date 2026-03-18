"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { HlsPlayer } from "@/components/hls-player"
import { StreamChat } from "@/components/stream/stream-chat"
import { useChat } from "@/hooks/use-chat"
import { Loader2 } from "lucide-react"

// Supported embed params:
// ?muted     - boolean, default true
// ?autoplay  - boolean, default true
// ?quality   - 360p|480p|720p|auto, default auto
// ?chat      - boolean, default false
// ?controls  - boolean, default true
// ?theme     - dark|light, default dark

export default function EmbedPlayerPage() {
  const { username } = useParams()
  const searchParams = useSearchParams()

  const muted = searchParams.get("muted") !== "false"
  const autoplay = searchParams.get("autoplay") !== "false"
  const showChat = searchParams.get("chat") === "true"
  const controls = searchParams.get("controls") !== "false"
  const theme = searchParams.get("theme") || "dark"

  const [hlsUrl, setHlsUrl] = useState("")
  const [streamId, setStreamId] = useState("")
  const [viewerCount, setViewerCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  const { messages, viewerCount: liveViewers, isConnected, sendMessage } = useChat({ streamId, enabled: !!streamId && showChat })

  useEffect(() => {
    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user
      const streamsRes = await api.get(`/api/streams/user/${u.id}`)
      const streams = streamsRes.data?.streams || streamsRes.data || []
      const live = streams.find((s: any) => s.status === "LIVE")
      if (!live) { setOffline(true); return }
      setStreamId(live.id)
      setViewerCount(live.viewerCount || 0)
      if (live.streamKey) {
        setHlsUrl(`${process.env.NEXT_PUBLIC_HLS_BASE_URL || "http://localhost:8000/live"}/${live.streamKey}/index.m3u8`)
      }
    }).catch(() => setOffline(true)).finally(() => setLoading(false))
  }, [username])

  const bg = theme === "light" ? "bg-white text-black" : "bg-black text-white"

  if (loading) return <div className={`h-screen flex items-center justify-center ${bg}`}><Loader2 className="w-6 h-6 animate-spin" /></div>

  if (offline) return (
    <div className={`h-screen flex items-center justify-center ${bg}`}>
      <div className="text-center"><p className="text-4xl mb-2">📴</p><p className="text-sm opacity-60">Offline</p></div>
    </div>
  )

  return (
    <div className={`h-screen flex ${bg}`}>
      <div className={`${showChat ? "flex-1" : "w-full"} flex items-center justify-center`}>
        <div className="w-full h-full">
          <HlsPlayer src={hlsUrl} viewerCount={liveViewers || viewerCount} autoPlay={autoplay} />
        </div>
      </div>
      {showChat && (
        <div className="w-72 shrink-0">
          <StreamChat
            messages={messages} viewerCount={liveViewers || viewerCount}
            isConnected={isConnected} sendMessage={sendMessage}
            username={username as string} streamId={streamId} compact
          />
        </div>
      )}
    </div>
  )
}
