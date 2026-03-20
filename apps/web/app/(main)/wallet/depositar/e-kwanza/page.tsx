"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"
export default function DepositarEKwanzaPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(1000)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/depositar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" />e-Kwanza</h1></div>
      <p className="text-xs text-muted-foreground">Carteira digital BAI/BPC. Confirma o pagamento na app e-Kwanza.</p>
      <Input type="number" min={500} value={amount} onChange={e => setAmount(Math.max(500, Number(e.target.value)))} className="bg-white/5 text-center text-lg font-bold" />
      <Button className="w-full h-12 gap-2 font-bold" onClick={() => router.push("/wallet/depositar/e-kwanza/confirmar")}><ArrowRight className="w-4 h-4" />Pagar {amount.toLocaleString()} Kz via e-Kwanza</Button>
    </div>
  )
}
