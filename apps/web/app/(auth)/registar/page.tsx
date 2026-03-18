"use client"

import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { SocialLoginButton } from "@/components/auth/social-login-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { setRegState } from "@/lib/registration-state"

export default function RegistarPage() {
  return (
    <AuthLayout>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Junta-te ao Kwanza Stream</CardTitle>
          <CardDescription>A plataforma de streaming de Angola 🇦🇴</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Primary: Phone */}
          <Button
            asChild
            className="w-full h-12 text-base font-semibold gap-2"
            onClick={() => setRegState({ method: "phone", step: 0 })}
          >
            <Link href="/registar/telefone">
              <Phone className="w-4.5 h-4.5" />
              Continuar com telefone
            </Link>
          </Button>

          {/* Secondary: Google */}
          <SocialLoginButton provider="google" action="register" />

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              ou
            </span>
          </div>

          {/* Tertiary: Email */}
          <Link
            href="/registar/email"
            className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            onClick={() => setRegState({ method: "email", step: 0 })}
          >
            <Mail className="w-3.5 h-3.5" />
            Continuar com email
          </Link>

          <Separator />

          <p className="text-center text-sm text-muted-foreground">
            Já tens conta?{" "}
            <Link href="/entrar" className="text-primary font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
