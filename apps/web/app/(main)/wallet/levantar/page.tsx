"use client"
import { ArrowLeft, ArrowUpRight, Shield, Smartphone, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KYCStatusCard } from "@/components/wallet/kyc-status-card"
import Link from "next/link"

const METHODS = [
  { id: "multicaixa", name: "Multicaixa Express", desc: "Transferência para conta bancária", icon: Smartphone, href: "/wallet/levantar/multicaixa" },
  { id: "banco", name: "Transferência Bancária", desc: "Directamente para o banco", icon: Banknote, href: "/wallet/levantar/banco" },
  { id: "unitel", name: "Unitel Money", desc: "Para número Unitel", icon: Smartphone, href: "/wallet/levantar/unitel-money" },
]

export default function LevantarPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/saldo"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><ArrowUpRight className="w-5 h-5 text-red-400" />Levantar</h1></div>
      <KYCStatusCard kyc={{ status: "none" }} />
      <div className="p-3 rounded-xl border border-white/10 text-[10px] text-muted-foreground space-y-1"><p className="font-bold flex items-center gap-1"><Shield className="w-3 h-3 text-primary" />Requisitos:</p><ul className="list-disc list-inside space-y-0.5"><li>KYC verificado</li><li>Saldo mínimo: 5.000 Kz</li><li>Conta activa há mais de 30 dias</li></ul></div>
      <div className="space-y-1.5">{METHODS.map(m => <Link key={m.id} href={m.href} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all"><div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center"><m.icon className="w-4 h-4 text-primary" /></div><div><p className="text-sm font-bold">{m.name}</p><p className="text-[9px] text-muted-foreground">{m.desc}</p></div></Link>)}</div>
    </div>
  )
}
