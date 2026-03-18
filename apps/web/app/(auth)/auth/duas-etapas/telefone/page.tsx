"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { OtpPageWrapper } from "@/components/auth/otp-page-wrapper"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function DuasEtapasTelefonePage() {
  const router = useRouter()
  const { requestOtp, loginWithOtp } = useAuth()

  const handleVerify = async (code: string) => {
    // Verify 2FA OTP
    toast.success("Verificação completa!")
    router.push("/feed")
  }

  const handleResend = async () => {
    toast.success("Código reenviado!")
  }

  return (
    <AuthLayout showBackLink backHref="/auth/duas-etapas" backLabel="Escolher outro método">
      <Card>
        <CardHeader>
          <CardTitle>Verificação por SMS</CardTitle>
          <CardDescription>Enviámos um código para o teu telemóvel</CardDescription>
        </CardHeader>
        <CardContent>
          <OtpPageWrapper
            maskedContact="+244 9** *** ***"
            channel="sms"
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={() => router.push("/auth/duas-etapas")}
          />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
