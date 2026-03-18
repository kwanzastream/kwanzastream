"use client"
import { useParams } from "next/navigation"
import { useChat } from "@/hooks/use-chat"
import { StreamChat } from "@/components/stream/stream-chat"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"

export default function StreamChatPage() {
  const { username } = useParams()
  const [streamId, setStreamId] = useState("")

  useEffect(() => {
    api.get(`/api/users/${username}`).then(async (res) => {
      const u = res.data.user
      const streamsRes = await api.get(`/api/streams/user/${u.id}`)
      const streams = streamsRes.data?.streams || streamsRes.data || []
      const live = streams.find((s: any) => s.status === "LIVE")
      if (live) setStreamId(live.id)
    }).catch(() => {})
  }, [username])

  const { messages, viewerCount, isConnected, sendMessage } = useChat({ streamId, enabled: !!streamId })

  return (
    <div className="h-screen">
      <StreamChat
        messages={messages} viewerCount={viewerCount} isConnected={isConnected}
        sendMessage={sendMessage} username={username as string} streamId={streamId}
      />
    </div>
  )
}
