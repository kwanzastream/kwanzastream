"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, ChevronLeft, Loader2, AlertCircle, Film, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"

const MAX_SIZE_MB = 500
const MAX_DURATION_S = 90
const ACCEPTED = ["video/mp4", "video/quicktime"]

export default function TrailerUploadPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)
  const [vods, setVods] = useState<any[]>([])
  const [showVods, setShowVods] = useState(false)

  useEffect(() => {
    // Load available VODs
    api.get("/api/vods?limit=10").then(res => {
      setVods(res.data.vods || res.data || [])
    }).catch(() => {})
  }, [])

  const handleFile = (f: File) => {
    setError("")
    if (!ACCEPTED.includes(f.type)) {
      setError("Formato inválido. Usa MP4 ou MOV.")
      return
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ficheiro muito grande (${(f.size / 1024 / 1024).toFixed(0)}MB). Máximo: ${MAX_SIZE_MB}MB.`)
      return
    }
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
    // Get duration
    const video = document.createElement("video")
    video.preload = "metadata"
    video.onloadedmetadata = () => {
      setDuration(Math.floor(video.duration))
      if (video.duration > MAX_DURATION_S) {
        setError(`O trailer não pode ter mais de ${MAX_DURATION_S} segundos. O teu vídeo tem ${Math.floor(video.duration)} segundos.`)
      }
      URL.revokeObjectURL(video.src)
    }
    video.src = url
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  const selectVod = (vod: any) => {
    setPreview(vod.videoUrl)
    setFile(null)
    setDuration(vod.duration || null)
    setError("")
    setShowVods(false)
    if (vod.duration && vod.duration > MAX_DURATION_S) {
      toast.info(`Nota: só os primeiros ${MAX_DURATION_S}s do VOD serão usados como trailer.`)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      let trailerUrl = preview
      if (file) {
        const formData = new FormData()
        formData.append("file", file)
        const uploadRes = await api.post("/api/upload/video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        trailerUrl = uploadRes.data.url || uploadRes.data.videoUrl || preview
      }
      await api.patch("/api/creator/featured/trailer", { trailerUrl })
      toast.success("Trailer guardado!")
      router.push("/dashboard/featured/trailer-canal")
    } catch {
      toast.error("Erro ao guardar trailer")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/featured/trailer-canal" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold">Upload do Trailer</h2>

      {/* Drop zone */}
      {!preview && (
        <>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="p-10 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/30 transition-colors cursor-pointer text-center"
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium">Arrasta ou clica para carregar</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              MP4 · MOV · Duração máxima: {MAX_DURATION_S}s · Tamanho máximo: {MAX_SIZE_MB}MB
            </p>
            <p className="text-[10px] text-muted-foreground">Resolução recomendada: 1280×720</p>
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED.join(",")}
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* VOD selector */}
          <div className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => setShowVods(!showVods)} className="text-xs text-muted-foreground">
              Ou usar um VOD existente como trailer ↓
            </Button>
            {showVods && vods.length > 0 && (
              <div className="space-y-1 p-3 rounded-xl border border-white/10">
                {vods.map((vod: any) => (
                  <button
                    key={vod.id}
                    onClick={() => selectVod(vod)}
                    className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                  >
                    <Film className="w-4 h-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{vod.title}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {vod.duration ? `${Math.floor(vod.duration / 60)}min` : "Duração desconhecida"}
                      </p>
                    </div>
                  </button>
                ))}
                <p className="text-[9px] text-muted-foreground mt-2 px-2">
                  Nota: só os primeiros {MAX_DURATION_S}s do VOD serão usados como trailer.
                </p>
              </div>
            )}
            {showVods && vods.length === 0 && (
              <p className="text-xs text-muted-foreground px-3">Sem VODs disponíveis.</p>
            )}
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="space-y-4">
          <p className="text-sm font-medium">Preview:</p>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
            <video ref={videoRef} src={preview} className="w-full h-full object-contain" controls playsInline />
          </div>
          {duration !== null && (
            <p className="text-xs text-muted-foreground">Duração: {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, "0")}</p>
          )}
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving || !!error} className="gap-1.5">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              ✓ Guardar trailer
            </Button>
            <Button variant="outline" onClick={() => { setPreview(null); setFile(null); setDuration(null); setError("") }}>
              ✕ Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
