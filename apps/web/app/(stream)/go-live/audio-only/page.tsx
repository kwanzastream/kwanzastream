"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Music, Upload, Image, X } from "lucide-react"
import { toast } from "sonner"

const CATEGORIES = [
  { id: "radio", label: "Rádio", emoji: "📻" },
  { id: "podcast", label: "Podcast", emoji: "🎙️" },
  { id: "djset", label: "DJ Set", emoji: "🎧" },
  { id: "musica", label: "Música ao Vivo", emoji: "🎵" },
]

const QUALITIES = [
  { id: "64", label: "64 kbps", desc: "Dados baixos" },
  { id: "128", label: "128 kbps", desc: "Padrão" },
  { id: "320", label: "320 kbps", desc: "Alta qualidade" },
]

export default function GoLiveAudioOnlyPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [quality, setQuality] = useState("128")
  const [artworkPreview, setArtworkPreview] = useState("")
  const [artworkFile, setArtworkFile] = useState<File | null>(null)

  // Artwork validation: JPG/PNG/WebP, min 400×400, max 5MB, square
  const handleArtwork = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Format check
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Formato inválido. Usa JPG, PNG ou WebP."); return
    }
    // Size check (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ficheiro demasiado grande. Máximo 5MB."); return
    }
    // Dimension check
    const img = new window.Image()
    img.onload = () => {
      if (img.width < 400 || img.height < 400) {
        toast.error("Imagem demasiado pequena. Mínimo 400×400px."); return
      }
      if (Math.abs(img.width - img.height) > 20) {
        toast.error("A imagem deve ser quadrada (1:1)."); return
      }
      setArtworkPreview(URL.createObjectURL(file))
      setArtworkFile(file)
    }
    img.src = URL.createObjectURL(file)
  }

  const handleContinue = () => {
    if (!title.trim() || !category) return
    sessionStorage.setItem("go-live-audio-setup", JSON.stringify({
      title, category, quality, hasArtwork: !!artworkFile,
    }))
    router.push("/go-live/audio-only/setup")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <Music className="w-10 h-10 text-primary mx-auto mb-3" />
          <h1 className="text-xl font-bold">Modo Rádio</h1>
          <p className="text-sm text-muted-foreground mt-1">Transmite áudio sem câmara</p>
        </div>

        {/* Artwork upload */}
        <div className="space-y-2">
          <Label className="text-xs">Capa / Artwork</Label>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleArtwork} />
          {artworkPreview ? (
            <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden border border-white/20">
              <img src={artworkPreview} alt="Artwork" className="w-full h-full object-cover" />
              <button onClick={() => { setArtworkPreview(""); setArtworkFile(null) }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80">
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()}
              className="w-40 h-40 mx-auto rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center hover:border-primary/50 transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground mb-2" />
              <span className="text-[10px] text-muted-foreground">JPG/PNG/WebP</span>
              <span className="text-[10px] text-muted-foreground">Min 400×400</span>
            </button>
          )}
          <p className="text-[10px] text-muted-foreground text-center">Sem artwork? O teu avatar será usado.</p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label className="text-xs">Nome do programa</Label>
          <Input placeholder="DJ Set Sábado à Noite" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 140))} maxLength={140} className="bg-white/5 border-white/10" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-xs">Categoria</Label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setCategory(c.id)}
                className={`p-3 rounded-xl border text-center transition-all ${category === c.id ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/30"}`}>
                <span className="text-xl">{c.emoji}</span>
                <p className="text-[10px] font-medium mt-1">{c.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Audio quality */}
        <div className="space-y-2">
          <Label className="text-xs">Qualidade de áudio</Label>
          <div className="grid grid-cols-3 gap-2">
            {QUALITIES.map((q) => (
              <button key={q.id} onClick={() => setQuality(q.id)}
                className={`p-2.5 rounded-lg border text-center transition-all ${quality === q.id ? "border-primary bg-primary/10" : "border-white/10"}`}>
                <p className="text-xs font-bold">{q.label}</p>
                <p className="text-[9px] text-muted-foreground">{q.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full h-11" onClick={handleContinue} disabled={!title.trim() || !category}>
          Continuar para teste de microfone
        </Button>
      </div>
    </div>
  )
}
