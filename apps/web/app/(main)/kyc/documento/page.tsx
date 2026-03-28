"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, CreditCard, BookOpen, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function KYCDocumentoPage() {
  const router = useRouter()
  const [docType, setDocType] = useState("bi")
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = () => {
    if (!file) return
    setUploading(true)
    setTimeout(() => { setUploading(false); router.push("/kyc/selfie") }, 2000)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="text-primary font-semibold">1. Documento</span>
          <span className="w-8 h-px bg-border" />
          <span>2. Selfie</span>
          <span className="w-8 h-px bg-border" />
          <span>3. Verificar</span>
        </div>
        <h1 className="text-2xl font-bold">Documento de Identidade</h1>
        <p className="text-sm text-muted-foreground">Envia uma foto clara do teu documento de identificação.</p>
      </div>

      {/* Doc Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Tipo de documento</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "bi", icon: CreditCard, label: "B.I." },
            { id: "passaporte", icon: BookOpen, label: "Passaporte" },
            { id: "carta", icon: FileText, label: "Carta Condução" },
          ].map((d) => (
            <button key={d.id} onClick={() => setDocType(d.id)} className={`p-3 rounded-xl border text-center transition-colors ${docType === d.id ? "border-primary bg-primary/10" : "border-white/10 hover:border-white/20"}`}>
              <d.icon className={`w-5 h-5 mx-auto mb-1 ${docType === d.id ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-xs font-medium">{d.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Foto do documento</label>
        <label className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/30 cursor-pointer transition-colors">
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">{file ? file.name : "Clica para enviar"}</p>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG ou PDF · Máx 10MB</p>
          <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      {/* Tips */}
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex gap-2">
        <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Dicas para aprovação rápida:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Foto nítida sem reflexos</li>
            <li>Documento completo (todas as bordas visíveis)</li>
            <li>Documento válido e não expirado</li>
          </ul>
        </div>
      </div>

      <button onClick={handleSubmit} disabled={!file || uploading} className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {uploading ? "A enviar..." : "Continuar → Selfie"}
      </button>
    </div>
  )
}
