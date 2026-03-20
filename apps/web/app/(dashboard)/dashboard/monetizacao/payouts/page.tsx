"use client"
import { PayoutStatusCard } from "@/components/monetization/monetization-components"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function PayoutsHistoricoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">💳 Payouts</h1>
      <Link href="/dashboard/monetizacao/payouts/solicitar"><Button size="sm" className="w-full text-xs">Solicitar payout →</Button></Link>
      <div className="space-y-1.5">
        <PayoutStatusCard id="3" date="15 Mar 2026" gross="55.000 Kz" fee="11.000 Kz" net="44.000 Kz" method="Multicaixa Express" status="done" />
        <PayoutStatusCard id="2" date="15 Fev 2026" gross="48.000 Kz" fee="9.600 Kz" net="38.400 Kz" method="Banco BAI" status="done" />
        <PayoutStatusCard id="1" date="15 Jan 2026" gross="35.000 Kz" fee="7.000 Kz" net="28.000 Kz" method="Multicaixa Express" status="done" />
      </div>
    </div>
  )
}
