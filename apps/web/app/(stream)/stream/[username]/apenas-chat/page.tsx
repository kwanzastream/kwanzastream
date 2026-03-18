"use client"
import { useParams } from "next/navigation"
import { useChat } from "@/hooks/use-chat"
import { StreamChat } from "@/components/stream/stream-chat"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ApenasChatPage() {
  const { username } = useParams()
  const [streamId, setStreamId] = useState("")
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user
      const streamsRes = await api.get(`/api/streams/user/${u.id}`)
      const streams = streamsRes.data?.streams || streamsRes.data || []
      const live = streams.find((s: any) => s.status === "LIVE")
      if (live) setStreamId(live.id)
      else setOffline(true)
    }).catch(() => setOffline(true))
  }, [username])

  const { messages, viewerCount, isConnected, sendMessage } = useChat({ streamId, enabled: !!streamId })

  if (offline) return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Stream offline</p>
        <p className="text-sm text-muted-foreground mt-1">O chat não está activo</p>
        <Link href={`/${username}`} className="text-xs text-primary hover:underline mt-3 inline-block">Ver canal</Link>
      </div>
    </div>
  )

  return (
    <div className="h-screen">
      <StreamChat
        messages={messages} viewerCount={viewerCount} isConnected={isConnected}
        sendMessage={sendMessage} username={username as string} streamId={streamId}
      />
    </div>
  )
}
