"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { SocialLoginButton } from "@/components/auth/social-login-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

function EntrarContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || searchParams.get("redirect") || ""
  const qs = redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""

  return (
    <AuthLayout>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
          <CardDescription>Entra na tua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Primary: Phone */}
          <Button asChild className="w-full h-12 text-base font-semibold gap-2">
            <Link href={`/entrar/telefone${qs}`}>
              <Phone className="w-4.5 h-4.5" />
              Continuar com telefone
            </Link>
          </Button>

          {/* Secondary: Google */}
          <SocialLoginButton provider="google" action="login" />

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              ou
            </span>
          </div>

          {/* Tertiary: Email (link, not button) */}
          <Link
            href={`/entrar/email${qs}`}
            className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            <Mail className="w-3.5 h-3.5" />
            Continuar com email
          </Link>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            Não tens conta?{" "}
            <Link href={`/registar${qs}`} className="text-primary font-medium hover:underline">
              Regista-te
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default function EntrarPage() {
  return (
    <Suspense fallback={<AuthLayout><div className="h-64 flex items-center justify-center text-muted-foreground">A carregar...</div></AuthLayout>}>
      <EntrarContent />
    </Suspense>
  )
}
