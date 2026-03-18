"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { OtpPageWrapper } from "@/components/auth/otp-page-wrapper"
import { Card, CardContent } from "@/components/ui/card"

function maskPhone(phone: string) {
  if (phone.length < 6) return phone
  return phone.slice(0, 4) + " " + phone.slice(4, 5) + "** *** " + phone.slice(-3)
}

export default function RecuperarSenhaVerificarPage() {
  const router = useRouter()
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const p = sessionStorage.getItem("ks_recovery_phone")
    if (!p) { router.replace("/recuperar-senha"); return }
    setPhone(p)
  }, [router])

  if (!phone) return null

  const handleVerify = async (code: string) => {
    const res = await api.post("/api/auth/reset-password/verify", { phone, code })
    sessionStorage.setItem("ks_recovery_token", res.data.token)
    toast.success("Código verificado!")
    router.push("/recuperar-senha/nova-senha")
  }

  const handleResend = async () => {
    await api.post("/api/auth/reset-password/send", { phone })
    toast.success("Código reenviado!")
  }

  return (
    <AuthLayout showBackLink backHref="/recuperar-senha/enviar?method=phone" backLabel="Mudar número">
      <Card>
        <CardContent className="pt-6">
          <OtpPageWrapper
            maskedContact={maskPhone(phone)}
            channel="sms"
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={() => router.push("/recuperar-senha/enviar?method=phone")}
          />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
