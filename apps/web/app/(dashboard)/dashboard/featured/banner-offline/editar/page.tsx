"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { BannerPreview } from "@/components/featured/banner-preview"
import { Upload, ChevronLeft, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { toast } from "sonner"

const MAX_SIZE_MB = 5
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"]

export default function EditarBannerPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const handleFile = (f: File) => {
    setError("")
    if (!ACCEPTED.includes(f.type)) {
      setError("Formato inválido. Usa JPG, PNG ou WebP.")
      return
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Ficheiro muito grande (${(f.size / 1024 / 1024).toFixed(1)}MB). Máximo: ${MAX_SIZE_MB}MB.`)
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  const handleSave = async () => {
    if (!file) return
    setSaving(true)
    try {
      // Upload the file
      const formData = new FormData()
      formData.append("file", file)
      const uploadRes = await api.post("/api/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const bannerUrl = uploadRes.data.url || uploadRes.data.imageUrl || preview

      // Save to featured settings
      await api.patch("/api/creator/featured/banner", { bannerUrl })
      toast.success("Banner guardado!")
      router.push("/dashboard/featured/banner-offline")
    } catch {
      toast.error("Erro ao guardar banner")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/featured/banner-offline" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <h2 className="text-lg font-bold">Upload do Banner Offline</h2>

      {/* Drop zone */}
      {!preview && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className="p-10 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/30 transition-colors cursor-pointer text-center"
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium">Arrasta ou clica para carregar</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            JPG · PNG · WebP · Recomendado: 1920×1080px · Máximo: {MAX_SIZE_MB}MB
          </p>
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED.join(",")}
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
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
        <>
          <p className="text-sm font-medium">Preview responsivo:</p>
          <BannerPreview src={preview} />
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving} className="gap-1.5">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Guardar banner
            </Button>
            <Button variant="outline" onClick={() => { setPreview(null); setFile(null) }}>
              Cancelar
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
