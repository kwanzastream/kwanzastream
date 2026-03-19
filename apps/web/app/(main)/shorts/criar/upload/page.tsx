"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Film, ArrowLeft, AlertCircle, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const MAX_SIZE = 100 * 1024 * 1024 // 100MB
const MAX_DURATION = 60
const ACCEPTED = ".mp4,.mov,.webm"

export default function ShortsUploadPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setError("")
    if (f.size > MAX_SIZE) { setError(`Ficheiro demasiado grande: ${(f.size / 1024 / 1024).toFixed(1)}MB (máximo ${MAX_SIZE / 1024 / 1024}MB)`); return }
    if (!f.type.startsWith("video/")) { setError("Formato inválido — envie um vídeo MP4, MOV ou WebM"); return }
    // Check duration via video element
    const video = document.createElement("video")
    video.preload = "metadata"
    video.onloadedmetadata = () => {
      if (video.duration > MAX_DURATION) { setError(`Vídeo demasiado longo: ${Math.round(video.duration)}s (máximo ${MAX_DURATION}s)`); setFile(null) }
      else { setFile(f); toast.success("Vídeo carregado!") }
      URL.revokeObjectURL(video.src)
    }
    video.src = URL.createObjectURL(f)
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center gap-3"><Link href="/shorts/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Upload de Short</h1></div>

      <input ref={fileRef} type="file" accept={ACCEPTED} onChange={handleFile} className="hidden" />

      {!file ? (
        <button onClick={() => fileRef.current?.click()} className="w-full aspect-[9/16] max-h-[50vh] rounded-2xl border-2 border-dashed border-white/20 hover:border-primary/40 flex flex-col items-center justify-center gap-3 transition-all">
          <Upload className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-sm font-bold">Carregar vídeo</p>
          <p className="text-[10px] text-muted-foreground">MP4, MOV, WebM · Max 60s · Max 100MB</p>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="aspect-[9/16] max-h-[50vh] rounded-2xl bg-black border border-white/10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2"><Film className="w-8 h-8 text-primary/40" /><p className="text-xs text-muted-foreground">{file.name}</p><p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)}MB</p></div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setFile(null)}>Escolher outro</Button>
            <Button className="flex-1 gap-2" onClick={() => router.push("/shorts/criar/editar")}><Check className="w-4 h-4" />Seguinte</Button>
          </div>
        </div>
      )}

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300 flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
    </div>
  )
}
