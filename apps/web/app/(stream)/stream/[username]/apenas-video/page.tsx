"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/lib/api"
import { HlsPlayer } from "@/components/hls-player"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ApenasVideoPage() {
  const { username } = useParams()
  const [hlsUrl, setHlsUrl] = useState("")
  const [viewerCount, setViewerCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user
      const streamsRes = await api.get(`/api/streams/user/${u.id}`)
      const streams = streamsRes.data?.streams || streamsRes.data || []
      const live = streams.find((s: any) => s.status === "LIVE")
      if (!live) { setOffline(true); return }
      setViewerCount(live.viewerCount || 0)
      if (live.streamKey) {
        setHlsUrl(`${process.env.NEXT_PUBLIC_HLS_BASE_URL || "http://localhost:8000/live"}/${live.streamKey}/index.m3u8`)
      }
    }).catch(() => setOffline(true)).finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>

  if (offline) return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center"><p className="text-6xl mb-4">📴</p><h1 className="text-xl font-bold mb-2">@{username} offline</h1>
        <Link href={`/${username}`}><Button variant="outline" size="sm">Ver canal</Button></Link>
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="w-full max-h-screen">
        <HlsPlayer src={hlsUrl} viewerCount={viewerCount} />
      </div>
    </div>
  )
}
