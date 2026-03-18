"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { OtpInput } from "@/components/auth/otp-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Smartphone } from "lucide-react"

export default function DuasEtapasAppPage() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (otpCode?: string) => {
    const c = otpCode || code
    if (c.length !== 6) return
    setIsLoading(true)
    try {
      // POST /api/auth/2fa/verify-totp
      toast.success("Verificação completa!")
      router.push("/feed")
    } catch {
      toast.error("Código inválido")
      setCode("")
    } finally { setIsLoading(false) }
  }

  return (
    <AuthLayout showBackLink backHref="/auth/duas-etapas" backLabel="Escolher outro método">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>App Authenticator</CardTitle>
          <CardDescription>Insere o código da tua app (Google Authenticator, Authy, etc.)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="py-2">
            <OtpInput value={code} onChange={setCode} onComplete={handleVerify} disabled={isLoading} />
          </div>
          <Button className="w-full" onClick={() => handleVerify()} disabled={code.length !== 6 || isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Verificar
          </Button>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
