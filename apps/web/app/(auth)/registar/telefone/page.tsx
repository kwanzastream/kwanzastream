"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PhoneInput } from "@/components/auth/phone-input"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight } from "lucide-react"
import { setRegState } from "@/lib/registration-state"
import Link from "next/link"

const REG_STEPS = [
  { label: "Telefone" }, { label: "Verificação" }, { label: "Email" },
  { label: "Username" }, { label: "Nascimento" }, { label: "Interesses" },
  { label: "Canais" }, { label: "Concluído" },
]

export default function RegistarTelefonePage() {
  const { requestOtp } = useAuth()
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [ageConfirmed, setAgeConfirmed] = useState(false)

  const handleSend = async () => {
    setIsLoading(true)
    try {
      await requestOtp(phone, { termsAccepted, ageConfirmed })
      setRegState({ phone, method: "phone", step: 1 })
      toast.success("Código enviado!")
      router.push("/registar/verificar-telefone")
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.response?.data?.message || err?.message || "Erro ao enviar código"
      if (msg.includes("já existe") || msg.includes("already exists") || msg.includes("já está registado")) {
        toast.error("Este número já tem conta. Tenta entrar.")
      } else {
        toast.error(msg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout showBackLink backHref="/registar" backLabel="Voltar">
      <div className="mb-6">
        <ProgressSteps steps={REG_STEPS} currentStep={0} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>O teu número</CardTitle>
          <CardDescription>Usamos o telefone para verificar a tua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PhoneInput value={phone} onChange={(full, valid) => { setPhone(full); setIsValid(valid) }} />
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(v) => setTermsAccepted(!!v)} className="mt-0.5" />
              <Label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                Aceito os <Link href="/termos" className="text-primary hover:underline" target="_blank">Termos de Serviço</Link> e a <Link href="/privacidade" className="text-primary hover:underline" target="_blank">Política de Privacidade</Link>
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="age" checked={ageConfirmed} onCheckedChange={(v) => setAgeConfirmed(!!v)} className="mt-0.5" />
              <Label htmlFor="age" className="text-xs text-muted-foreground cursor-pointer">Confirmo que tenho 13 anos ou mais</Label>
            </div>
          </div>
          <Button className="w-full" onClick={handleSend} disabled={!isValid || !termsAccepted || !ageConfirmed || isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Receber código SMS <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Já tens conta? <Link href="/entrar" className="text-primary hover:underline">Entrar</Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

