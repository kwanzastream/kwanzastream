"use client"
import { useChat } from "@/hooks/use-chat"
import { StreamChat } from "@/components/stream/stream-chat"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function GoLiveMobileChatPage() {
  const router = useRouter()
  // TODO: get streamId from parent context or sessionStorage
  const streamId = ""
  const { messages, viewerCount, isConnected, sendMessage } = useChat({ streamId, enabled: !!streamId })
  return (
    <div className="h-screen flex flex-col bg-black/95">
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <h3 className="text-sm font-bold">Chat do stream</h3>
        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => router.back()}><X className="w-4 h-4" /></Button>
      </div>
      <div className="flex-1"><StreamChat messages={messages} viewerCount={viewerCount} isConnected={isConnected} sendMessage={sendMessage} username="" streamId={streamId} compact /></div>
    </div>
  )
}
