"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, ArrowRight, Wallet } from "lucide-react"
import Link from "next/link"

export default function PagamentosDefPage() {
  const { user } = useAuth()
  const tier = (user as any)?.kycTier ?? 0

  return (
    <div className="space-y-4 max-w-lg">
      <Card className={`border ${tier > 0 ? "border-green-500/30" : "border-yellow-500/30"}`}>
        <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Shield className="w-4 h-4" />Verificação de identidade</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[1, 2].map((t) => (
            <div key={t} className="flex items-center gap-3">
              {tier >= t ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-muted shrink-0" />}
              <div className="flex-1"><p className="text-sm font-medium">Tier {t} — {t === 1 ? "Verificação Básica" : "Verificação Completa"}</p><p className="text-xs text-muted-foreground">{t === 1 ? "Depósito até 50.000 Kz/mês" : "Sem limites"}</p></div>
              {tier >= t && <Badge className="bg-green-500/10 text-green-500 text-[10px]">Activo</Badge>}
            </div>
          ))}
          {tier < 2 && <Link href="/kyc"><Button size="sm" className="w-full mt-2 gap-1.5"><Shield className="w-3.5 h-3.5" />{tier === 0 ? "Iniciar verificação" : "Completar verificação"}<ArrowRight className="w-3.5 h-3.5" /></Button></Link>}
        </CardContent>
      </Card>
      {[{ href: "/wallet", icon: Wallet, label: "Carteira", desc: "Ver saldo, depositar, levantar" }, { href: "/wallet/depositar", icon: ArrowRight, label: "Depositar", desc: "Multicaixa, E-Kwanza, Unitel Money" }, { href: "/subscricao/gerir", icon: ArrowRight, label: "As minhas subscrições", desc: "Gerir subscrições activas" }].map((item) => (
        <Link key={item.href} href={item.href}>
          <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer"><CardContent className="pt-4 pb-4 flex items-center gap-3"><item.icon className="w-5 h-5 text-muted-foreground shrink-0" /><div className="flex-1"><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div><ArrowRight className="w-4 h-4 text-muted-foreground" /></CardContent></Card>
        </Link>
      ))}
    </div>
  )
}
