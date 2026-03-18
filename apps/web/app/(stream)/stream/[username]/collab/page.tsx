"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { HlsPlayer } from "@/components/hls-player"
import { StreamChat } from "@/components/stream/stream-chat"
import { useChat } from "@/hooks/use-chat"
import { Loader2, Users, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function StreamCollabPage() {
  const { username } = useParams()
  const searchParams = useSearchParams()
  const withChannel = searchParams.get("with")

  const [streamA, setStreamA] = useState<any>(null)
  const [streamB, setStreamB] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeAudio, setActiveAudio] = useState<"a" | "b">("a")

  // Chat: use stream A's chat
  const { messages, viewerCount, isConnected, sendMessage } = useChat({ streamId: streamA?.id || "", enabled: !!streamA?.id })

  useEffect(() => {
    const fetchStream = async (uname: string) => {
      const res = await api.get(`/api/users/${uname}`)
      const u = res.data.user
      const streamsRes = await api.get(`/api/streams/user/${u.id}`)
      const streams = streamsRes.data?.streams || streamsRes.data || []
      const live = streams.find((s: any) => s.status === "LIVE")
      if (!live) return null
      return {
        ...live, streamer: u,
        hlsUrl: live.streamKey ? `${process.env.NEXT_PUBLIC_HLS_BASE_URL || "http://localhost:8000/live"}/${live.streamKey}/index.m3u8` : ""
      }
    }

    Promise.all([
      fetchStream(username as string),
      withChannel ? fetchStream(withChannel) : Promise.resolve(null),
    ]).then(([a, b]) => {
      setStreamA(a); setStreamB(b)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username, withChannel])

  if (!withChannel) return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center"><Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="font-medium">Sem co-stream activo</p>
        <p className="text-sm text-muted-foreground mt-1">Nenhum canal está em co-stream com @{username} neste momento</p>
        <Link href={`/stream/${username}`}><Button variant="outline" size="sm" className="mt-3">Voltar ao stream</Button></Link>
      </div>
    </div>
  )

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Split players */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Player A */}
        <div className="flex-1 relative">
          <HlsPlayer src={streamA?.hlsUrl || ""} viewerCount={viewerCount || streamA?.viewerCount || 0} autoPlay={true} />
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <Avatar className="w-6 h-6 border border-white/30"><AvatarImage src={streamA?.streamer?.avatarUrl} /><AvatarFallback className="text-[8px]">{(username as string).slice(0, 1)}</AvatarFallback></Avatar>
            <span className="text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded">@{username}</span>
            <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setActiveAudio("a")}>
              {activeAudio === "a" ? <Volume2 className="w-3 h-3 text-primary" /> : <VolumeX className="w-3 h-3 text-muted-foreground" />}
            </Button>
          </div>
        </div>
        {/* Player B */}
        <div className="flex-1 relative border-t border-white/10">
          <HlsPlayer src={streamB?.hlsUrl || ""} viewerCount={streamB?.viewerCount || 0} autoPlay={true} />
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <Avatar className="w-6 h-6 border border-white/30"><AvatarImage src={streamB?.streamer?.avatarUrl} /><AvatarFallback className="text-[8px]">{withChannel.slice(0, 1)}</AvatarFallback></Avatar>
            <span className="text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded">@{withChannel}</span>
            <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => setActiveAudio("b")}>
              {activeAudio === "b" ? <Volume2 className="w-3 h-3 text-primary" /> : <VolumeX className="w-3 h-3 text-muted-foreground" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Shared chat */}
      <div className="w-full lg:w-80 shrink-0">
        <StreamChat
          messages={messages} viewerCount={viewerCount} isConnected={isConnected}
          sendMessage={sendMessage} username={username as string} streamId={streamA?.id || ""}
        />
      </div>
    </div>
  )
}
