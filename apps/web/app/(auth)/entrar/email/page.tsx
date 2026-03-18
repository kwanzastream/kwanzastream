"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { PasswordInput } from "@/components/auth/password-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

function EntrarEmailContent() {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || searchParams.get("redirect") || "/feed"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setIsLoading(true)
    try {
      await login({ email, password })
      toast.success("Bem-vindo de volta!")
      router.push(redirectTo)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Email ou password incorrectos")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout showBackLink backHref="/entrar" backLabel="Voltar para opções de login">
      <Card>
        <CardHeader>
          <CardTitle>Entrar com email</CardTitle>
          <CardDescription>Usa o teu email e password para entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <Link href="/recuperar-senha" className="text-xs text-primary hover:underline">
                  Esqueceste a password?
                </Link>
              </div>
              <PasswordInput
                value={password}
                onChange={setPassword}
                label=""
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !email || !password}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default function EntrarEmailPage() {
  return (
    <Suspense fallback={<AuthLayout><div className="h-64 flex items-center justify-center text-muted-foreground">A carregar...</div></AuthLayout>}>
      <EntrarEmailContent />
    </Suspense>
  )
}
