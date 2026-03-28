"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Camera, RotateCcw, AlertCircle } from "lucide-react"

export default function KYCSelfiePage() {
  const router = useRouter()
  const [photo, setPhoto] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) { const reader = new FileReader(); reader.onload = () => setPhoto(reader.result as string); reader.readAsDataURL(file) }
  }

  const handleSubmit = () => {
    if (!photo) return
    setUploading(true)
    setTimeout(() => { setUploading(false); router.push("/kyc/verificar") }, 2000)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="text-primary/50">1. Documento ✓</span>
          <span className="w-8 h-px bg-primary/30" />
          <span className="text-primary font-semibold">2. Selfie</span>
          <span className="w-8 h-px bg-border" />
          <span>3. Verificar</span>
        </div>
        <h1 className="text-2xl font-bold">Selfie de Verificação</h1>
        <p className="text-sm text-muted-foreground">Tira uma selfie segurando o teu documento junto ao rosto.</p>
      </div>

      {/* Preview / Capture */}
      <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-white/10 bg-white/5">
        {photo ? (
          <>
            <img src={photo} alt="Selfie" className="w-full h-full object-cover" />
            <button onClick={() => { setPhoto(null); inputRef.current?.click() }} className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-medium">
              <RotateCcw className="w-3 h-3" /> Tirar outra
            </button>
          </>
        ) : (
          <button onClick={() => inputRef.current?.click()} className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm font-medium">Tirar selfie</p>
            <p className="text-xs text-muted-foreground">Clica para abrir a câmara</p>
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" capture="user" className="hidden" onChange={handleCapture} />
      </div>

      {/* Guide */}
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex gap-2">
        <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Como tirar a selfie:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Segura o documento junto ao teu rosto</li>
            <li>Boa iluminação, sem óculos de sol</li>
            <li>Rosto e documento claramente visíveis</li>
          </ul>
        </div>
      </div>

      <button onClick={handleSubmit} disabled={!photo || uploading} className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {uploading ? "A enviar..." : "Continuar → Verificar"}
      </button>
    </div>
  )
}
