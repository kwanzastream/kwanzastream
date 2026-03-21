"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2, ChevronLeft, Upload, Trash2, Image } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"

export default function ArtworkPage() {
  const [loading, setLoading] = useState(true)
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    api.get("/api/creator/radio")
      .then(res => setArtworkUrl(res.data.config?.artworkUrl || null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return toast.error("Formato inválido. Usa JPG, PNG ou WebP.")
    }
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Máximo 5MB.")
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const handleSave = async () => {
    setUploading(true)
    try {
      await api.patch("/api/creator/radio/artwork", { artworkUrl: preview || artworkUrl })
      toast.success("Artwork guardado!")
      setArtworkUrl(preview)
      setPreview(null)
    } catch { toast.error("Erro ao guardar") }
    finally { setUploading(false) }
  }

  const handleRemove = async () => {
    try {
      await api.patch("/api/creator/radio/artwork", { artworkUrl: null })
      toast.success("Artwork removido")
      setArtworkUrl(null)
      setPreview(null)
    } catch { toast.error("Erro") }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  }

  const currentImg = preview || artworkUrl

  return (
    <div className="max-w-xl space-y-6">
      <Link href="/dashboard/radio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold">Artwork do Programa</h2>

      {/* Preview */}
      {currentImg ? (
        <div className="space-y-3">
          <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border border-white/10">
            <img src={currentImg} alt="Artwork" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => fileRef.current?.click()}>
              <Upload className="w-3 h-3" />Substituir
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-red-400" onClick={handleRemove}>
              <Trash2 className="w-3 h-3" />Remover
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]) }}
          className="p-12 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/30 transition-colors text-center cursor-pointer"
        >
          <Image className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium">Arrasta ou clica para carregar</p>
          <p className="text-[10px] text-muted-foreground mt-1">JPG · PNG · WebP · 400×400px · Máximo 5MB</p>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }} />

      {preview && (
        <Button onClick={handleSave} disabled={uploading} className="w-full gap-1.5">
          {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Guardar artwork
        </Button>
      )}

      {/* Tips */}
      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
        <h3 className="text-sm font-semibold">Dicas</h3>
        <ul className="text-[10px] text-muted-foreground space-y-1 list-disc pl-4">
          <li>Imagem clara e reconhecível em 100×100px</li>
          <li>Evita texto pequeno — fica ilegível em mobile</li>
          <li>Cores vibrantes destacam-se no feed de rádio</li>
          <li>Sem artwork: o teu avatar é usado por defeito</li>
        </ul>
      </div>
    </div>
  )
}
