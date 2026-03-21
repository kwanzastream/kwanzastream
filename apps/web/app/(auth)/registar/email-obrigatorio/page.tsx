"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight, Mail, AlertCircle } from "lucide-react"
import { getRegState, setRegState, requireRegStep } from "@/lib/registration-state"
import { api } from "@/lib/api"

const REG_STEPS = [
  { label: "Telefone" }, { label: "Verificação" }, { label: "Email" },
  { label: "Username" }, { label: "Nascimento" }, { label: "Interesses" },
  { label: "Canais" }, { label: "Concluído" },
]

export default function RegistarEmailObrigatorioPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const state = getRegState()
    const redirect = requireRegStep(state, ["phoneVerified"], "/registar/telefone")
    if (redirect) { router.replace(redirect); return }
    // Pre-fill if already set
    if (state?.email) setEmail(state.email)
    setReady(true)
  }, [router])

  const isValidEmail = email.includes("@") && email.includes(".")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail) return

    setIsLoading(true)
    setError("")

    try {
      const state = getRegState()

      // Call backend to complete registration with phone + email
      const res = await api.post("/api/auth/complete-phone-registration", {
        tempToken: state?.tempToken,
        email,
      })

      if (res.data.success) {
        setRegState({ email, emailVerified: false, step: 3 })
        toast.success("Email registado com sucesso!")
        router.push("/registar/username")
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erro ao registar email"
      if (msg.includes("já está registado") || msg.includes("already")) {
        setError("Este email já está associado a outra conta.")
      } else if (msg.includes("expirado") || msg.includes("expired")) {
        setError("Sessão expirada. Recomeça o registo.")
        setTimeout(() => router.push("/registar/telefone"), 2000)
      } else {
        setError(msg)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!ready) return null

  return (
    <AuthLayout showBackLink backHref="/registar/verificar-telefone" backLabel="Voltar">
      <div className="mb-6">
        <ProgressSteps steps={REG_STEPS} currentStep={2} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            O teu email
          </CardTitle>
          <CardDescription>
            Obrigatório para recuperação de conta, notificações e segurança
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError("") }}
                autoComplete="email"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <p className="text-[11px] text-muted-foreground">
              Usamos o email para recuperação de password, notificações de segurança
              e comunicações importantes. Nunca partilhamos com terceiros.
            </p>

            <Button type="submit" className="w-full" disabled={!isValidEmail || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Continuar <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
