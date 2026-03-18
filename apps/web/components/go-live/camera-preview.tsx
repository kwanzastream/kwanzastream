"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { SwitchCamera, VideoOff } from "lucide-react"

interface CameraPreviewProps {
  onStream?: (stream: MediaStream) => void
  facingMode?: "user" | "environment"
  videoQuality?: "360p" | "480p" | "auto"
  orientation?: "portrait" | "landscape"
  className?: string
  showControls?: boolean
}

const QUALITY_CONSTRAINTS: Record<string, MediaTrackConstraints> = {
  "360p": { width: { ideal: 640 }, height: { ideal: 360 } },
  "480p": { width: { ideal: 854 }, height: { ideal: 480 } },
  "auto":  { width: { ideal: 1280 }, height: { ideal: 720 } },
}

export function CameraPreview({
  onStream, facingMode: initialFacing = "user", videoQuality = "auto",
  orientation = "landscape", className = "", showControls = true,
}: CameraPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [facing, setFacing] = useState(initialFacing)
  const [cameraOff, setCameraOff] = useState(false)
  const [error, setError] = useState("")

  const startCamera = useCallback(async (mode: "user" | "environment") => {
    // Stop existing tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
    }

    try {
      const constraints = QUALITY_CONSTRAINTS[videoQuality] || QUALITY_CONSTRAINTS.auto
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { ...constraints, facingMode: mode },
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      onStream?.(stream)
      setError("")
    } catch (err: any) {
      setError(err.name === "NotAllowedError" ? "Permissão negada" :
               err.name === "NotFoundError" ? "Câmara não encontrada" : "Erro ao aceder à câmara")
    }
  }, [videoQuality, onStream])

  useEffect(() => {
    if (!cameraOff) startCamera(facing)
    return () => {
      // CRITICAL: stop all tracks on unmount
      streamRef.current?.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }, [facing, cameraOff, startCamera])

  // Stop camera on page unload
  useEffect(() => {
    const handleUnload = () => {
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
    window.addEventListener("beforeunload", handleUnload)
    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [])

  const toggleCamera = () => setFacing(f => f === "user" ? "environment" : "user")
  const toggleOff = () => {
    if (!cameraOff) {
      streamRef.current?.getVideoTracks().forEach(t => t.stop())
    }
    setCameraOff(c => !c)
  }

  const aspectClass = orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"

  if (error) {
    return (
      <div className={`${aspectClass} bg-black/80 rounded-xl flex items-center justify-center ${className}`}>
        <div className="text-center p-4"><p className="text-sm text-red-400 mb-2">{error}</p>
          <Button size="sm" variant="outline" onClick={() => startCamera(facing)}>Tentar novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${aspectClass} bg-black rounded-xl overflow-hidden ${className}`}>
      <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${facing === "user" ? "scale-x-[-1]" : ""}`} />

      {cameraOff && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <VideoOff className="w-10 h-10 text-muted-foreground" />
        </div>
      )}

      {showControls && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          <Button size="icon" variant="secondary" className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80" onClick={toggleCamera}>
            <SwitchCamera className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className={`w-10 h-10 rounded-full backdrop-blur-sm ${cameraOff ? "bg-red-600 hover:bg-red-700" : "bg-black/60 hover:bg-black/80"}`} onClick={toggleOff}>
            <VideoOff className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
