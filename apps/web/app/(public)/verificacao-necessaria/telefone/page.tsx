"use client"
import { ErrorPageLayout } from "@/components/errors/error-page-layout"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function VerificacaoTelefonePage() {
  const [timer, setTimer] = useState(60)
  useEffect(() => { if (timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t) } }, [timer])
  return (
    <ErrorPageLayout icon="📱" title="Verificação de Telefone Necessária" description="Enviámos um SMS com o código OTP para o teu número (+244 9XX XXX X**).">
      <div className="space-y-3">
        <input placeholder="Código OTP (6 dígitos)" className="w-full px-4 py-3 rounded-xl border border-white/10 bg-transparent text-sm text-center tracking-widest" maxLength={6} />
        <Button onClick={() => toast.success("Telefone verificado!")} className="w-full">Verificar</Button>
        <button disabled={timer > 0} onClick={() => { setTimer(60); toast.success("SMS reenviado!") }} className="w-full text-[10px] text-muted-foreground hover:text-foreground disabled:opacity-50">{timer > 0 ? `Reenviar em ${timer}s` : "Reenviar SMS"}</button>
        <p className="text-[9px] text-muted-foreground">O SMS pode demorar até 2 minutos via Africa's Talking.</p>
      </div>
    </ErrorPageLayout>
  )
}
