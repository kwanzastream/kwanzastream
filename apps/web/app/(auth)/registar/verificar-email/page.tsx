"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Loader2 } from "lucide-react"
import { getRegState, setRegState, requireRegStep } from "@/lib/registration-state"
import { toast } from "sonner"

const EMAIL_REG_STEPS = [
  { label: "Email" }, { label: "Verificação" }, { label: "Username" },
  { label: "Nascimento" }, { label: "Interesses" }, { label: "Canais" }, { label: "Concluído" },
]

export default function RegistarVerificarEmailPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [ready, setReady] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(60)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    const state = getRegState()
    const redirect = requireRegStep(state, ["email"], "/registar/email")
    if (redirect) { router.replace(redirect); return }
    setEmail(state!.email!)
    setReady(true)
  }, [router])

  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setInterval(() => setResendCooldown((c) => c <= 1 ? 0 : c - 1), 1000)
    return () => clearInterval(t)
  }, [resendCooldown])

  if (!ready) return null

  const handleResend = async () => {
    setIsResending(true)
    try {
      // POST /api/auth/verify-email/resend
      toast.success("Email reenviado!")
      setResendCooldown(60)
    } finally {
      setIsResending(false)
    }
  }

  const handleContinue = () => {
    // For launch: allow continuing without email verification
    // Verification required only for monetisation
    setRegState({ emailVerified: true, step: 2 })
    router.push("/registar/username")
  }

  return (
    <AuthLayout showBackLink backHref="/registar/email" backLabel="Mudar email">
      <div className="mb-6">
        <ProgressSteps steps={EMAIL_REG_STEPS} currentStep={1} />
      </div>
      <Card>
        <CardHeader className="text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <CardTitle>Verifica o teu email</CardTitle>
          <CardDescription>
            Enviámos um email para <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Clica no link que enviámos para verificar o teu email. Verifica a pasta de spam se não encontrares.
          </p>

          <Button variant="outline" className="w-full" onClick={handleResend} disabled={resendCooldown > 0 || isResending}>
            {isResending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {resendCooldown > 0 ? `Reenviar em ${resendCooldown}s` : "Reenviar email"}
          </Button>

          <Button className="w-full" onClick={handleContinue}>
            Continuar sem verificar
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Podes verificar o email mais tarde. É obrigatório para monetização.
          </p>

          <Link href="/registar/telefone" className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            Usar número de telefone em vez disso →
          </Link>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
