"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { OtpPageWrapper } from "@/components/auth/otp-page-wrapper"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function DuasEtapasEmailPage() {
  const router = useRouter()

  const handleVerify = async (code: string) => {
    toast.success("Verificação completa!")
    router.push("/feed")
  }

  const handleResend = async () => {
    toast.success("Código reenviado para o teu email!")
  }

  return (
    <AuthLayout showBackLink backHref="/auth/duas-etapas" backLabel="Escolher outro método">
      <Card>
        <CardHeader>
          <CardTitle>Verificação por email</CardTitle>
          <CardDescription>Enviámos um código para o teu email</CardDescription>
        </CardHeader>
        <CardContent>
          <OtpPageWrapper
            maskedContact="k***a@gmail.com"
            channel="email"
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={() => router.push("/auth/duas-etapas")}
          />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
