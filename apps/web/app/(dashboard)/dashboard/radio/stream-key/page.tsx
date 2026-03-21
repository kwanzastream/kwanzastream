"use client"

import { useState, useEffect } from "react"
import { Loader2, ChevronLeft, Eye, EyeOff, Copy, RefreshCw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function RadioStreamKeyPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [showKey, setShowKey] = useState(false)
  const [rotating, setRotating] = useState(false)

  useEffect(() => {
    api.get("/api/creator/radio/stream-key")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copiado!`)
  }

  const handleRotate = async () => {
    if (!confirm("Tens a certeza? A key actual deixará de funcionar.")) return
    setRotating(true)
    try {
      const res = await api.post("/api/creator/radio/stream-key/rotate")
      setData({ ...data, streamKey: res.data.streamKey })
      toast.success("Nova stream key gerada!")
    } catch { toast.error("Erro ao rotacionar") }
    finally { setRotating(false) }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  if (!data) return null

  return (
    <div className="max-w-xl space-y-6">
      <Link href="/dashboard/radio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold">Stream Key de Rádio</h2>

      {/* Stream key */}
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <label className="text-sm font-medium">Stream Key para transmissão de áudio</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 font-mono text-sm">
            {showKey ? data.streamKey : "•".repeat(20)}
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setShowKey(!showKey)}>
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleCopy(data.streamKey, "Stream key")}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* RTMP URL */}
      <div className="p-4 rounded-xl border border-white/10 space-y-3">
        <label className="text-sm font-medium">Servidor RTMP (áudio)</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 font-mono text-sm break-all">
            {data.rtmpUrl}
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleCopy(data.rtmpUrl, "URL RTMP")}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* OBS Config */}
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <h3 className="text-sm font-semibold">Configuração recomendada no OBS</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <p>Bitrate: <span className="text-foreground">{data.recommended.bitrate}</span></p>
          <p>Sample rate: <span className="text-foreground">{data.recommended.sampleRate}</span></p>
          <p>Codec: <span className="text-foreground">{data.recommended.codec}</span></p>
          <p>Canais: <span className="text-foreground">{data.recommended.channels}</span></p>
        </div>
      </div>

      {/* Warning */}
      <div className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground">
          <p>Esta é a key para o <span className="text-foreground font-medium">Modo Rádio</span>.</p>
          <p>É diferente da stream key de vídeo.</p>
        </div>
      </div>

      {/* Rotate */}
      <Button variant="outline" onClick={handleRotate} disabled={rotating} className="gap-1.5">
        {rotating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
        Rotacionar key
      </Button>
    </div>
  )
}
