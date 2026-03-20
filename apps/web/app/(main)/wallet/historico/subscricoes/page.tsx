"use client"
import { TransactionItem, type TransactionData } from "@/components/wallet/transaction-item"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK: TransactionData[] = [{id:"1",type:"subscription",description:"Transacção Subscrições",amount:1000,date:"hoje",status:"completed"}]

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/wallet/historico"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
        <h1 className="text-lg font-bold">Subscrições</h1>
      </div>
      <div className="space-y-1.5">{MOCK.map(tx => <TransactionItem key={tx.id} tx={tx} />)}</div>
    </div>
  )
}
