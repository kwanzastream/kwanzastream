"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { OtpPageWrapper } from "@/components/auth/otp-page-wrapper"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent } from "@/components/ui/card"
import { getRegState, setRegState, requireRegStep } from "@/lib/registration-state"

function maskPhone(phone: string) {
  if (phone.length < 6) return phone
  return phone.slice(0, 4) + " " + phone.slice(4, 5) + "** *** " + phone.slice(-3)
}

const REG_STEPS = [
  { label: "Telefone" }, { label: "Verificação" }, { label: "Email" },
  { label: "Username" }, { label: "Nascimento" }, { label: "Interesses" },
  { label: "Canais" }, { label: "Concluído" },
]

export default function RegistarVerificarTelefonePage() {
  const router = useRouter()
  const { requestOtp } = useAuth()
  const [phone, setPhone] = useState("")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const state = getRegState()
    const redirect = requireRegStep(state, ["phone"], "/registar/telefone")
    if (redirect) { router.replace(redirect); return }
    setPhone(state!.phone!)
    setReady(true)
  }, [router])

  if (!ready) return null

  const handleVerify = async (code: string) => {
    try {
      const res = await api.post("/api/auth/verify-otp", { phone, code })
      const { requiresEmail, tempToken, user, accessToken } = res.data

      if (requiresEmail && tempToken) {
        // New user — needs email to complete registration
        setRegState({ phoneVerified: true, tempToken, step: 2 })
        toast.success("Número verificado!")
        router.push("/registar/email-obrigatorio")
      } else if (user && accessToken) {
        // Existing user — already logged in
        localStorage.setItem("ks_token", accessToken)
        document.cookie = `ks_token=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
        if (user.role) {
          document.cookie = `ks_role=${user.role.toLowerCase()}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
        }
        toast.success("Bem-vindo de volta!")
        router.push("/feed")
      } else {
        toast.error("Resposta inesperada do servidor.")
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.response?.data?.message || "Código inválido ou expirado"
      toast.error(msg)
      throw err // Let OtpPageWrapper handle retry state
    }
  }

  const handleResend = async () => {
    await requestOtp(phone)
    toast.success("Código reenviado!")
  }

  return (
    <AuthLayout showBackLink backHref="/registar/telefone" backLabel="Mudar número">
      <div className="mb-6">
        <ProgressSteps steps={REG_STEPS} currentStep={1} />
      </div>
      <Card>
        <CardContent className="pt-6">
          <OtpPageWrapper
            maskedContact={maskPhone(phone)}
            channel="sms"
            onVerify={handleVerify}
            onResend={handleResend}
            onBack={() => router.push("/registar/telefone")}
          />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

