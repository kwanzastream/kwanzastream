"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useChat } from "@/hooks/use-chat"
import { CameraPreview } from "@/components/go-live/camera-preview"
import { StreamChat } from "@/components/stream/stream-chat"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import {
  Mic, MicOff, VideoOff, Video, Square, Eye, Clock, Zap, Share2, Loader2
} from "lucide-react"
import { toast } from "sonner"

type Phase = "READY" | "STARTING" | "LIVE" | "ERROR"

export default function GoLiveDesktopBrowserAoVivoPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [phase, setPhase] = useState<Phase>("READY")
  const [isMuted, setIsMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [duration, setDuration] = useState(0)
  const [viewerCount, setViewerCount] = useState(0)
  const [streamId, setStreamId] = useState("")
  const streamRef = useRef<MediaStream | null>(null)

  const { messages, viewerCount: chatViewers, isConnected, sendMessage } = useChat({ streamId, enabled: !!streamId })

  useEffect(() => {
    if (phase === "LIVE") {
      const t = setInterval(() => setDuration(d => d + 1), 1000)
      return () => clearInterval(t)
    }
  }, [phase])

  // sendBeacon
  useEffect(() => {
    const handleUnload = () => {
      if (streamId) navigator.sendBeacon(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/streams/${streamId}/end`, JSON.stringify({ streamId }))
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
    window.addEventListener("beforeunload", handleUnload)
    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [streamId])

  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = s % 60
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
  }

  const handleStart = async () => {
    setPhase("STARTING")
    try {
      const setup = JSON.parse(sessionStorage.getItem("go-live-desktop-setup") || "{}")
      const res = await api.post("/api/streams/", { title: setup.title || "Stream desktop", category: "Geral" })
      setStreamId(res.data.stream?.id || res.data.id)
      setPhase("LIVE")
      toast.success("Estás ao vivo! 🔴")
    } catch { setPhase("ERROR"); toast.error("Erro ao iniciar") }
  }

  const handleEnd = () => router.push("/go-live/desktop/browser/encerrar")

  return (
    <div className="h-screen flex">
      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Status bar */}
        <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            {phase === "LIVE" && (
              <>
                <Badge className="bg-[#CE1126] border-none animate-pulse text-[10px] font-bold gap-1"><div className="w-1.5 h-1.5 rounded-full bg-white" />AO VIVO</Badge>
                <span className="text-xs font-mono text-muted-foreground"><Clock className="w-3 h-3 inline mr-1" />{formatDuration(duration)}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" />{chatViewers || viewerCount}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => { streamRef.current?.getAudioTracks().forEach(t => { t.enabled = isMuted }); setIsMuted(!isMuted) }}>
              {isMuted ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setCameraOff(!cameraOff)}>
              {cameraOff ? <VideoOff className="w-4 h-4 text-red-400" /> : <Video className="w-4 h-4" />}
            </Button>
            {phase === "LIVE" && (
              <Button variant="ghost" size="sm" className="text-red-400 text-xs gap-1" onClick={handleEnd}>
                <Square className="w-3 h-3" />Encerrar
              </Button>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 relative">
          <CameraPreview onStream={(s) => { streamRef.current = s }} orientation="landscape" showControls={false} className="w-full h-full rounded-none" />
          {phase === "READY" && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button className="bg-[#CE1126] hover:bg-[#CE1126]/90 font-bold px-8 h-12" onClick={handleStart}>🔴 Iniciar stream</Button>
            </div>
          )}
          {phase === "STARTING" && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          )}
          {phase === "ERROR" && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center space-y-3"><p className="text-red-400 font-bold">Falha na ligação</p>
                <div className="flex gap-2"><Button onClick={handleStart}>Retry</Button><Button variant="outline" onClick={() => router.push("/go-live")}>Cancelar</Button></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat sidebar */}
      <div className="w-80 shrink-0 hidden lg:flex">
        <StreamChat messages={messages} viewerCount={chatViewers} isConnected={isConnected} sendMessage={sendMessage} username={user?.username || ""} streamId={streamId} />
      </div>
    </div>
  )
}
