"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function VerificacaoEmailPage() {
  const [timer, setTimer] = useState(60)
  useEffect(() => { if (timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t) } }, [timer])
  return (
    <ErrorPageLayout icon="✉️" title="Verificação de Email Necessária" description="Enviámos um código de verificação para o teu email. Verifica a caixa de entrada (e spam).">
      <div className="space-y-3">
        <input placeholder="Código de verificação" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-transparent text-sm text-center tracking-widest" maxLength={6} />
        <Button onClick={() => toast.success("Email verificado!")} className="w-full">Verificar</Button>
        <button disabled={timer > 0} onClick={() => { setTimer(60); toast.success("Email reenviado!") }} className="w-full text-[10px] text-muted-foreground hover:text-foreground disabled:opacity-50">{timer > 0 ? `Reenviar em ${timer}s` : "Reenviar email"}</button>
        <p className="text-[9px] text-muted-foreground">O email pode demorar até 5 minutos. Verifica a pasta de spam.</p>
      </div>
    </ErrorPageLayout>
  )
}
