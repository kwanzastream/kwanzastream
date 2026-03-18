"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { CameraPreview } from "@/components/go-live/camera-preview"
import { StreamLiveControls } from "@/components/go-live/stream-live-controls"
import { Button } from "@/components/ui/button"
import { Loader2, Radio } from "lucide-react"
import { toast } from "sonner"

type StreamPhase = "READY" | "STARTING" | "LIVE" | "ERROR"

export default function GoLiveMobileAoVivoPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [phase, setPhase] = useState<StreamPhase>("READY")
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [viewerCount, setViewerCount] = useState(0)
  const [salosTotal, setSalosTotal] = useState(0)
  const [streamId, setStreamId] = useState("")
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Step guard: require complete setup
  useEffect(() => {
    const state = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    if (!state.privacy || !state.title || !state.category || !state.contentRating) {
      router.replace("/go-live/mobile/titulo")
    }
  }, [router])

  // Duration timer
  useEffect(() => {
    if (phase === "LIVE") {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  // sendBeacon on unload (critical safety net)
  useEffect(() => {
    const handleUnload = () => {
      if (streamId) {
        navigator.sendBeacon(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/streams/${streamId}/end`,
          JSON.stringify({ streamId })
        )
      }
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
    window.addEventListener("beforeunload", handleUnload)
    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [streamId])

  const handleStreamReady = (stream: MediaStream) => {
    streamRef.current = stream
  }

  const handleStartStream = async () => {
    setPhase("STARTING")
    try {
      const setup = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
      const res = await api.post("/api/streams/", {
        title: setup.title,
        category: setup.category,
        tags: setup.tags,
        language: setup.language,
        contentRating: setup.contentRating,
        privacy: setup.privacy,
        saveVod: setup.saveVod,
        allowClips: setup.allowClips,
        chatEnabled: setup.chatEnabled,
      })
      const stream = res.data.stream || res.data
      setStreamId(stream.id)
      setPhase("LIVE")
      toast.success("Estás ao vivo! 🔴")

      // TODO: Start MediaRecorder chunked upload to RTMP server
      // const recorder = new MediaRecorder(streamRef.current!, { mimeType: "video/webm" })
      // recorder.ondataavailable = (e) => { upload chunk to server }
      // recorder.start(2000) // 2s chunks
    } catch (err: any) {
      setPhase("ERROR")
      toast.error(err?.response?.data?.error || "Erro ao iniciar stream")
    }
  }

  const handleEndStream = () => router.push("/go-live/mobile/encerrar")

  const toggleMic = () => {
    const audioTracks = streamRef.current?.getAudioTracks()
    if (audioTracks) {
      audioTracks.forEach(t => { t.enabled = isMuted })
      setIsMuted(!isMuted)
    }
  }

  const toggleCamera = () => {
    // Camera toggle is handled by CameraPreview's own controls
  }

  const handleShare = () => {
    const setup = JSON.parse(sessionStorage.getItem("go-live-setup") || "{}")
    const url = `https://kwanzastream.ao/stream/${user?.username}`
    const text = `Estou ao vivo no Kwanza Stream! ${setup.title} 🔴🇦🇴`
    if (navigator.share) navigator.share({ title: "Kwanza Stream", text, url })
    else window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank")
  }

  const setup = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("go-live-setup") || "{}") : {}

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Camera preview — full height */}
      <div className="flex-1 relative">
        <CameraPreview
          onStream={handleStreamReady}
          orientation={setup.orientation || "portrait"}
          videoQuality={setup.videoQuality || "auto"}
          showControls={phase === "LIVE"}
          className="w-full h-full rounded-none"
        />

        {/* READY state overlay */}
        {phase === "READY" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Radio className="w-12 h-12 text-[#CE1126] mx-auto" />
              <h2 className="text-lg font-bold">Pronto para transmitir</h2>
              <p className="text-xs text-muted-foreground max-w-[200px]">{setup.title}</p>
              <Button
                className="bg-[#CE1126] hover:bg-[#CE1126]/90 text-white font-bold px-8 h-12 text-base"
                onClick={handleStartStream}
              >
                🔴 Iniciar stream
              </Button>
            </div>
          </div>
        )}

        {/* STARTING state overlay */}
        {phase === "STARTING" && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
              <p className="text-sm font-medium">A ligar ao servidor...</p>
            </div>
          </div>
        )}

        {/* ERROR state overlay */}
        {phase === "ERROR" && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center space-y-4">
              <p className="text-lg font-bold text-red-400">Falha na ligação</p>
              <p className="text-xs text-muted-foreground">Não foi possível conectar ao servidor de transmissão</p>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleStartStream}>Tentar novamente</Button>
                <Button variant="outline" onClick={() => router.push("/go-live")}>Cancelar</Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls — only when LIVE */}
      {phase === "LIVE" && (
        <div className="shrink-0 p-4 bg-black/80 backdrop-blur-sm border-t border-white/10">
          <StreamLiveControls
            onToggleCamera={toggleCamera}
            onToggleMic={toggleMic}
            onOpenChat={() => router.push("/go-live/mobile/ao-vivo/chat")}
            onOpenViewers={() => router.push("/go-live/mobile/ao-vivo/viewers")}
            onOpenSalos={() => router.push("/go-live/mobile/ao-vivo/salos")}
            onEndStream={handleEndStream}
            onShare={handleShare}
            isMuted={isMuted}
            viewerCount={viewerCount}
            salosTotal={salosTotal}
            duration={duration}
          />
        </div>
      )}
    </div>
  )
}
