"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { AudioLevelMeter } from "@/components/go-live/audio-level-meter"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, MessageSquare, Eye, Clock, Zap, Square, Loader2 } from "lucide-react"
import { toast } from "sonner"

type Phase = "READY" | "STARTING" | "LIVE" | "ERROR"

export default function GoLiveAudioOnlyAoVivoPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [phase, setPhase] = useState<Phase>("READY")
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [viewerCount, setViewerCount] = useState(0)
  const [streamId, setStreamId] = useState("")
  const streamRef = useRef<MediaStream | null>(null)

  const setup = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("go-live-audio-setup") || "{}") : {}

  // Get mic
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
      .then(s => { streamRef.current = s }).catch(() => {})
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()) }
  }, [])

  // Timer
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
      const res = await api.post("/api/streams/", { title: setup.title || "Rádio ao vivo", category: setup.category || "radio", streamType: "AUDIO_ONLY" })
      setStreamId(res.data.stream?.id || res.data.id)
      setPhase("LIVE")
      toast.success("Rádio ao vivo! 🔴🎵")
    } catch { setPhase("ERROR"); toast.error("Erro ao iniciar") }
  }

  const toggleMic = () => {
    streamRef.current?.getAudioTracks().forEach(t => { t.enabled = isMuted })
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6 text-center">
        {/* Status */}
        {phase === "LIVE" && (
          <div className="flex items-center justify-center gap-3">
            <Badge className="bg-[#CE1126] border-none animate-pulse text-[10px] font-bold gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-white" /> AO VIVO
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">{formatDuration(duration)}</span>
          </div>
        )}

        {/* Artwork */}
        <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5">
          {user?.avatarUrl ? (
            <img src={user.avatarUrl} alt="Artwork" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <Mic className="w-16 h-16 text-primary/40" />
            </div>
          )}
        </div>

        <div>
          <h2 className="font-bold text-lg">{setup.title || "Rádio"}</h2>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Eye className="w-3 h-3" /> {viewerCount} ouvintes
          </p>
        </div>

        {/* VU Meter */}
        {phase === "LIVE" && (
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <AudioLevelMeter stream={streamRef.current} barCount={20} className="h-8" />
          </div>
        )}

        {/* Controls */}
        {phase === "READY" && (
          <Button className="bg-[#CE1126] hover:bg-[#CE1126]/90 font-bold px-8 h-12" onClick={handleStart}>
            🔴 Iniciar rádio
          </Button>
        )}

        {phase === "STARTING" && <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />}

        {phase === "ERROR" && (
          <div className="space-y-2"><p className="text-red-400 font-bold text-sm">Falha na ligação</p>
            <Button onClick={handleStart}>Retry</Button>
          </div>
        )}

        {phase === "LIVE" && (
          <div className="flex items-center justify-center gap-4">
            <Button size="icon" variant="ghost"
              className={`w-14 h-14 rounded-full ${isMuted ? "bg-red-600 hover:bg-red-700" : "bg-white/10 hover:bg-white/20"}`}
              onClick={toggleMic}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            <Button size="icon" variant="ghost" className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => {}}>
              <MessageSquare className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="ghost" className="w-14 h-14 rounded-full bg-[#F9D616]/20 hover:bg-[#F9D616]/30 text-[#F9D616]"
              onClick={() => {}}>
              <Zap className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="ghost" className="w-14 h-14 rounded-full bg-red-600/20 hover:bg-red-600/30 text-red-400"
              onClick={() => router.push("/go-live/audio-only/encerrar")}>
              <Square className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
