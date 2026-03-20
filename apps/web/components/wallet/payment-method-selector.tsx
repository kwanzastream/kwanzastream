"use client"
import { Smartphone, CreditCard, Banknote, Server, Users } from "lucide-react"
import Link from "next/link"

export interface PaymentMethodData { id: string; name: string; description: string; icon: any; href: string; primary?: boolean; comingSoon?: boolean }

export const DEPOSIT_METHODS: PaymentMethodData[] = [
  { id: "multicaixa", name: "Multicaixa Express", description: "ATM, app do banco ou TPA", icon: Smartphone, href: "/wallet/depositar/multicaixa", primary: true },
  { id: "ekwanza", name: "e-Kwanza", description: "Carteira digital BAI/BPC", icon: CreditCard, href: "/wallet/depositar/e-kwanza" },
  { id: "unitel", name: "Unitel Money", description: "USSD *123#", icon: Smartphone, href: "/wallet/depositar/unitel-money" },
  { id: "transferencia", name: "Transferência Bancária", description: "Para valores > 50.000 Kz", icon: Banknote, href: "/wallet/depositar/transferencia-bancaria" },
  { id: "agente", name: "Agente", description: "Pagamento presencial", icon: Users, href: "/wallet/depositar/agente", comingSoon: true },
]

export function PaymentMethodSelector({ methods }: { methods: PaymentMethodData[] }) {
  return (
    <div className="space-y-1.5">
      {methods.map(m => (
        <Link key={m.id} href={m.comingSoon ? "#" : m.href} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${m.primary ? "border-primary/30 bg-primary/5" : "border-white/10"} ${m.comingSoon ? "opacity-50 cursor-not-allowed" : "hover:border-primary/30"}`}>
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><m.icon className="w-4 h-4 text-primary" /></div>
          <div className="flex-1"><p className="text-sm font-bold">{m.name}{m.primary && <span className="ml-1 text-[8px] text-primary">(recomendado)</span>}</p><p className="text-[9px] text-muted-foreground">{m.description}</p></div>
          {m.comingSoon && <span className="text-[8px] text-muted-foreground">Em breve</span>}
        </Link>
      ))}
    </div>
  )
}
