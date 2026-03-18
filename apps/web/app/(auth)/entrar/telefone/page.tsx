"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PhoneInput } from "@/components/auth/phone-input"
import { OtpPageWrapper } from "@/components/auth/otp-page-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight } from "lucide-react"

function maskPhone(phone: string) {
  if (phone.length < 6) return phone
  return phone.slice(0, 4) + " " + phone.slice(4, 5) + "** *** " + phone.slice(-3)
}

function EntrarTelefoneContent() {
  const { requestOtp, loginWithOtp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || searchParams.get("redirect") || "/feed"

  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOtp = async () => {
    setIsLoading(true)
    try {
      await requestOtp(phone)
      setOtpStep(true)
      toast.success("Código enviado!")
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Erro ao enviar código"
      if (msg.includes("não existe") || msg.includes("not found")) {
        toast.error("Este número não tem conta. Queres registar-te?")
      } else {
        toast.error(msg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (code: string) => {
    await loginWithOtp(phone, code)
    toast.success("Bem-vindo de volta!")
    router.push(redirectTo)
  }

  const handleResend = async () => {
    await requestOtp(phone)
    toast.success("Código reenviado!")
  }

  return (
    <AuthLayout showBackLink backHref="/entrar" backLabel="Voltar para opções de login">
      <Card>
        <CardHeader>
          <CardTitle>Entrar com telefone</CardTitle>
          <CardDescription>Recebe um código SMS para entrar na tua conta</CardDescription>
        </CardHeader>
        <CardContent>
          {!otpStep ? (
            <div className="space-y-4">
              <PhoneInput
                value={phone}
                onChange={(full, valid) => { setPhone(full); setIsValid(valid) }}
              />
              <Button
                className="w-full"
                onClick={handleSendOtp}
                disabled={!isValid || isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Receber código SMS
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <OtpPageWrapper
              maskedContact={maskPhone(phone)}
              channel="sms"
              onVerify={handleVerify}
              onResend={handleResend}
              onBack={() => { setOtpStep(false) }}
            />
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default function EntrarTelefonePage() {
  return (
    <Suspense fallback={<AuthLayout><div className="h-64 flex items-center justify-center text-muted-foreground">A carregar...</div></AuthLayout>}>
      <EntrarTelefoneContent />
    </Suspense>
  )
}
