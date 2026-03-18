"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PhoneInput } from "@/components/auth/phone-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight } from "lucide-react"

function EnviarContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const method = searchParams.get("method") || "phone"

  const [phone, setPhone] = useState("")
  const [phoneValid, setPhoneValid] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePhoneSubmit = async () => {
    setIsLoading(true)
    try {
      await api.post("/api/auth/reset-password/send", { phone })
      sessionStorage.setItem("ks_recovery_phone", phone)
      toast.success("Código enviado!")
      router.push("/recuperar-senha/verificar")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Número não encontrado")
    } finally { setIsLoading(false) }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await api.post("/api/auth/request-password-reset", { email })
      toast.success("Link de recuperação enviado!")
      router.push("/recuperar-senha/sucesso")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao enviar email")
    } finally { setIsLoading(false) }
  }

  return (
    <AuthLayout showBackLink backHref="/recuperar-senha" backLabel="Voltar">
      <Card>
        <CardHeader>
          <CardTitle>{method === "phone" ? "Recuperar por telefone" : "Recuperar por email"}</CardTitle>
          <CardDescription>
            {method === "phone"
              ? "Envia-te um código SMS para o teu número"
              : "Envia-te um link de recuperação por email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {method === "phone" ? (
            <>
              <PhoneInput value={phone} onChange={(full, valid) => { setPhone(full); setPhoneValid(valid) }} />
              <Button className="w-full" onClick={handlePhoneSubmit} disabled={!phoneValid || isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Enviar código <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="nome@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={!email || isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Enviar link de recuperação
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default function RecuperarSenhaEnviarPage() {
  return <Suspense fallback={null}><EnviarContent /></Suspense>
}
