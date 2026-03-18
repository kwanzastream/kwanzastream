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

function VerificarTelefoneContent() {
  const { requestOtp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/feed"

  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [otpStep, setOtpStep] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    setIsLoading(true)
    try {
      await requestOtp(phone)
      setOtpStep(true)
      toast.success("Código enviado!")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao enviar código")
    } finally { setIsLoading(false) }
  }

  const handleVerify = async (code: string) => {
    // Call verify endpoint
    toast.success("Telefone verificado! 🎉")
    router.push(returnTo)
  }

  return (
    <AuthLayout showBackLink backHref="/entrar" backLabel="Voltar">
      <Card>
        <CardHeader>
          <CardTitle>Verificar telefone</CardTitle>
          <CardDescription>Confirma o teu número de telefone</CardDescription>
        </CardHeader>
        <CardContent>
          {!otpStep ? (
            <div className="space-y-4">
              <PhoneInput value={phone} onChange={(full, valid) => { setPhone(full); setIsValid(valid) }} />
              <Button className="w-full" onClick={handleSend} disabled={!isValid || isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Enviar código <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <OtpPageWrapper maskedContact={maskPhone(phone)} channel="sms" onVerify={handleVerify} onResend={handleSend} onBack={() => setOtpStep(false)} />
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default function VerificarTelefonePage() {
  return <Suspense fallback={null}><VerificarTelefoneContent /></Suspense>
}
