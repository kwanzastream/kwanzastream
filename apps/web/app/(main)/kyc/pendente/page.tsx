import Link from "next/link"
import { Clock, CheckCircle, Mail } from "lucide-react"

export default function KYCPendentePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
          <Clock className="w-10 h-10 text-yellow-500" />
        </div>
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold">Verificação em Análise</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Os teus documentos foram enviados com sucesso! A nossa equipa está a analisar a tua verificação. Este processo demora até 48 horas úteis.
        </p>
      </div>
      <div className="w-full max-w-sm space-y-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          <p className="text-xs text-muted-foreground">Documento enviado</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          <p className="text-xs text-muted-foreground">Selfie enviada</p>
        </div>
        <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-center gap-3">
          <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
          <p className="text-xs text-muted-foreground">A aguardar análise da equipa</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Mail className="w-3 h-3" /> Receberás email/SMS quando a verificação for concluída
      </div>
      <Link href="/feed" className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">Voltar ao feed</Link>
    </div>
  )
}
