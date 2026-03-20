"use client"
import { PaymentMethodSelector, DEPOSIT_METHODS } from "@/components/wallet/payment-method-selector"
import { ArrowLeft, ArrowDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WalletDepositarPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/saldo"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><ArrowDownLeft className="w-5 h-5 text-green-400" />Depositar</h1></div>
      <PaymentMethodSelector methods={DEPOSIT_METHODS} />
    </div>
  )
}
