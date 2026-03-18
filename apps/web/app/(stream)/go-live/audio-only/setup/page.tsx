"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { AudioLevelMeter, useAudioTest } from "@/components/go-live/audio-level-meter"
import { Button } from "@/components/ui/button"
import { Mic, Play, Loader2 } from "lucide-react"

export default function GoLiveAudioOnlySetupPage() {
  const router = useRouter()
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState("")
  const { recording, playbackUrl, startTest } = useAudioTest()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
      .then(setStream).catch(() => setError("Não foi possível aceder ao microfone"))
    return () => { stream?.getTracks().forEach(t => t.stop()) }
  }, [])

  const handleContinue = () => {
    stream?.getTracks().forEach(t => t.stop())
    router.push("/go-live/audio-only/ao-vivo")
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <Mic className="w-12 h-12 text-red-400 mx-auto" />
          <p className="font-bold">{error}</p>
          <Button onClick={() => router.push("/go-live/mobile/permissoes")}>Ver como activar permissões</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6 text-center">
        <div>
          <Mic className="w-10 h-10 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-bold">Teste de microfone</h2>
          <p className="text-sm text-muted-foreground mt-1">Fala ou toca algo — verifica o nível</p>
        </div>

        {/* VU Meter */}
        <div className="p-6 rounded-xl border border-white/10 bg-white/5">
          <AudioLevelMeter stream={stream} barCount={24} className="h-12" />
          <p className="text-[10px] text-muted-foreground mt-3">Fala normalmente — as barras devem chegar ao amarelo sem ficar no vermelho</p>
        </div>

        {/* Test recording */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full gap-2" onClick={() => stream && startTest(stream)} disabled={recording || !stream}>
            {recording ? <><Loader2 className="w-4 h-4 animate-spin" />A gravar (5s)...</> : <><Play className="w-4 h-4" />Gravar teste de 5 segundos</>}
          </Button>
          {playbackUrl && (
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-muted-foreground mb-2">Ouve o teu teste:</p>
              <audio src={playbackUrl} controls className="w-full h-8" />
            </div>
          )}
        </div>

        <Button className="w-full h-11" onClick={handleContinue}>Tudo bom — começar a transmitir</Button>
      </div>
    </div>
  )
}
