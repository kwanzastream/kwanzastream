"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PasswordInput } from "@/components/auth/password-input"
import { ProgressSteps } from "@/components/auth/progress-steps"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight } from "lucide-react"
import { setRegState } from "@/lib/registration-state"

const EMAIL_REG_STEPS = [
  { label: "Email" }, { label: "Verificação" }, { label: "Username" },
  { label: "Nascimento" }, { label: "Interesses" }, { label: "Canais" }, { label: "Concluído" },
]

export default function RegistarEmailPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isValid = email.includes("@") && password.length >= 8 && /\d/.test(password) && password === confirmPassword && acceptTerms

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setIsLoading(true)
    try {
      // In production: POST /api/auth/register/email → sends verification email
      setRegState({ email, password, method: "email", step: 1 })
      toast.success("Email de verificação enviado!")
      router.push("/registar/verificar-email")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao registar")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout showBackLink backHref="/registar" backLabel="Voltar">
      <div className="mb-6">
        <ProgressSteps steps={EMAIL_REG_STEPS} currentStep={0} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registar com email</CardTitle>
          <CardDescription>Cria a tua conta com email e password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="nome@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>

            <PasswordInput value={password} onChange={setPassword} label="Password" placeholder="Mínimo 8 caracteres, 1 número" showStrength />

            <PasswordInput value={confirmPassword} onChange={setConfirmPassword} label="Confirmar password" placeholder="Repete a password" autoComplete="new-password" error={confirmPassword && password !== confirmPassword ? "As passwords não coincidem" : undefined} />

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-1 rounded border-input" />
              <span className="text-xs text-muted-foreground">
                Aceito os{" "}
                <Link href="/termos" target="_blank" className="text-primary hover:underline">Termos de Serviço</Link>
                {" "}e a{" "}
                <Link href="/privacidade" target="_blank" className="text-primary hover:underline">Política de Privacidade</Link>
              </span>
            </label>

            <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Criar conta <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
