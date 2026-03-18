"use client"

import Link from "next/link"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Smartphone, Key } from "lucide-react"

const METHODS = [
  { label: "SMS (Telefone)", description: "Recebe um código por SMS", icon: Phone, href: "/auth/duas-etapas/telefone" },
  { label: "Email", description: "Recebe um código por email", icon: Mail, href: "/auth/duas-etapas/email" },
  { label: "App Authenticator", description: "Google Authenticator ou Authy", icon: Smartphone, href: "/auth/duas-etapas/app" },
  { label: "Código de backup", description: "Usa um dos teus códigos de backup", icon: Key, href: "/auth/duas-etapas/backup-codes" },
]

export default function DuasEtapasPage() {
  return (
    <AuthLayout>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Verificação em duas etapas</CardTitle>
          <CardDescription>Escolhe como queres verificar a tua identidade</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {METHODS.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 hover:border-primary/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <m.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
