"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, AlertCircle, ArrowRight, User, Camera } from "lucide-react"

export default function KycPage() {
  const { user } = useAuth()
  const router = useRouter()
  const tier = (user as any)?.kycTier ?? 0

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div><h1 className="text-xl font-bold">Verificação de Identidade</h1><p className="text-sm text-muted-foreground mt-1">Necessário para pagamentos e levantamentos</p></div>

      <Card className={`border ${tier === 0 ? "border-yellow-500/30" : "border-green-500/30"}`}>
        <CardContent className="pt-4 flex items-center gap-3">
          {tier === 0 ? <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" /> : <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />}
          <div><p className="font-medium">{tier === 0 ? "Não verificado" : tier === 1 ? "Verificação Básica concluída" : "Verificação Completa concluída"}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{tier === 0 ? "Completa a verificação para usar pagamentos" : tier === 1 ? "Podes depositar até 50.000 Kz/mês" : "Sem limites de pagamento"}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {[
          { t: 1, label: "Verificação Básica", desc: "Número de telefone + BI (número)", limit: "Depósito até 50.000 Kz/mês", steps: ["Número de telefone verificado", "Número do BI"], icon: User, route: "documento" },
          { t: 2, label: "Verificação Completa", desc: "BI frente/verso + Selfie", limit: "Sem limites", steps: ["Foto do BI (frente e verso)", "Selfie com o documento"], icon: Camera, route: "selfie" },
        ].map((item) => {
          const done = tier >= item.t; const active = tier === item.t - 1
          return (
            <Card key={item.t} className={`border ${done ? "border-green-500/30 bg-green-500/5" : active ? "border-primary/50" : "border-border/50 opacity-60"}`}>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-green-500/20" : "bg-muted"}`}>
                    {done ? <CheckCircle className="w-4 h-4 text-green-500" /> : <item.icon className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2"><p className="font-medium text-sm">{item.label}</p>{done && <Badge className="bg-green-500/10 text-green-500 text-[10px] h-4">Concluído</Badge>}</div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p><p className="text-xs text-primary mt-1">{item.limit}</p>
                  </div>
                </div>
                {active && (
                  <div className="space-y-2 pt-1">
                    {item.steps.map((s) => <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{s}</div>)}
                    <Button className="w-full mt-2" size="sm" onClick={() => router.push(`/kyc/${item.route}`)}>Começar verificação<ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
      <p className="text-xs text-center text-muted-foreground">Os teus dados são protegidos e usados apenas para verificação de identidade conforme a lei angolana.</p>
    </div>
  )
}
