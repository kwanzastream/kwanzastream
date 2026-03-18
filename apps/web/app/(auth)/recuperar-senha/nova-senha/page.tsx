"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PasswordInput } from "@/components/auth/password-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function NovaSenhaPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const t = sessionStorage.getItem("ks_recovery_token")
    if (!t) { router.replace("/recuperar-senha"); return }
    setToken(t)
  }, [router])

  const isValid = password.length >= 8 && /\d/.test(password) && password === confirm

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setIsLoading(true)
    try {
      await api.post("/api/auth/reset-password/set", { token, password })
      sessionStorage.removeItem("ks_recovery_phone")
      sessionStorage.removeItem("ks_recovery_token")
      toast.success("Password alterada com sucesso!")
      router.push("/recuperar-senha/sucesso")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Erro ao alterar password")
    } finally { setIsLoading(false) }
  }

  if (!token) return null

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Nova password</CardTitle>
          <CardDescription>Escolhe a tua nova password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordInput value={password} onChange={setPassword} label="Nova password" showStrength />
            <PasswordInput value={confirm} onChange={setConfirm} label="Confirmar password" error={confirm && password !== confirm ? "As passwords não coincidem" : undefined} />
            <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Alterar password
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
