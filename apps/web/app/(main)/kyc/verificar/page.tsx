"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, FileText, Camera, Loader2 } from "lucide-react"

export default function KYCVerificarPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => { router.push("/kyc/pendente") }, 2000)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="text-primary/50">1. Documento ✓</span>
          <span className="w-8 h-px bg-primary/30" />
          <span className="text-primary/50">2. Selfie ✓</span>
          <span className="w-8 h-px bg-primary/30" />
          <span className="text-primary font-semibold">3. Verificar</span>
        </div>
        <h1 className="text-2xl font-bold">Confirmar e Enviar</h1>
        <p className="text-sm text-muted-foreground">Revê os dados antes de submeter a verificação.</p>
      </div>

      {/* Review Items */}
      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><FileText className="w-5 h-5 text-green-500" /></div>
          <div className="flex-1"><p className="text-sm font-medium">Documento enviado</p><p className="text-xs text-muted-foreground">B.I. angolano · Verificado</p></div>
          <span className="text-green-500 text-xs font-medium">✓</span>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center"><Camera className="w-5 h-5 text-green-500" /></div>
          <div className="flex-1"><p className="text-sm font-medium">Selfie enviada</p><p className="text-xs text-muted-foreground">Foto com documento · Verificada</p></div>
          <span className="text-green-500 text-xs font-medium">✓</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
        <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /><p className="text-sm font-semibold">O que acontece a seguir?</p></div>
        <ul className="text-xs text-muted-foreground space-y-1 pl-6 list-disc">
          <li>A tua verificação será analisada pela equipa</li>
          <li>Tempo médio de aprovação: 24-48 horas</li>
          <li>Receberás notificação por email/SMS quando aprovado</li>
          <li>Após aprovação, podes monetizar e levantar fundos</li>
        </ul>
      </div>

      <button onClick={handleSubmit} disabled={submitting} className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />A submeter...</> : <><ShieldCheck className="w-4 h-4" />Submeter verificação</>}
      </button>
    </div>
  )
}
