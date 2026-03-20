"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Smartphone, Key, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function AtivarPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [code, setCode] = useState("")
  const [verifying, setVerifying] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/seguranca/duas-etapas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Activar 2FA</h1></div>
      <div className="flex gap-2">{[1,2,3].map(s => <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-primary" : "bg-white/10"}`} />)}</div>
      {step === 1 && <div className="space-y-4 text-center"><Smartphone className="w-12 h-12 text-primary mx-auto" /><p className="text-sm font-bold">Método: SMS</p><p className="text-[10px] text-muted-foreground">Código enviado para o teu número verificado.</p><Button className="w-full" onClick={() => setStep(2)}>Enviar código de teste</Button></div>}
      {step === 2 && <div className="space-y-4"><p className="text-sm font-bold text-center">Insere o código de teste</p><Input value={code} onChange={e => setCode(e.target.value)} placeholder="123456" maxLength={6} className="bg-white/5 text-center text-2xl font-mono tracking-widest" /><Button className="w-full gap-1" disabled={code.length < 6 || verifying} onClick={() => { setVerifying(true); setTimeout(() => { setStep(3); setVerifying(false) }, 1500) }}>{verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4" />Verificar</>}</Button></div>}
      {step === 3 && <div className="space-y-4 text-center"><Check className="w-12 h-12 text-green-400 mx-auto" /><p className="text-lg font-bold text-green-400">2FA Activo!</p><p className="text-[10px] text-muted-foreground">Guarda os backup codes no próximo passo.</p><Button className="w-full" onClick={() => { toast.success("2FA activado!"); router.push("/definicoes/seguranca/duas-etapas/backup-codes") }}>Ver Backup Codes</Button></div>}
    </div>
  )
}
