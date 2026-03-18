"use client"

import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RecuperarSenhaPage() {
  return (
    <AuthLayout showBackLink backHref="/entrar" backLabel="Voltar para entrar">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Recuperar password</CardTitle>
          <CardDescription>Escolhe como queres recuperar a tua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full h-11 gap-2 font-medium">
            <Link href="/recuperar-senha/enviar?method=phone">
              <Phone className="w-4 h-4" /> Recuperar por telefone
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-11 gap-2 font-medium">
            <Link href="/recuperar-senha/enviar?method=email">
              <Mail className="w-4 h-4" /> Recuperar por email
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
