"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, ArrowRight } from "lucide-react"
import Link from "next/link"
export default function DepositarUnitelPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(1000)
  const [phone, setPhone] = useState("")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/depositar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Smartphone className="w-5 h-5 text-primary" />Unitel Money</h1></div>
      <p className="text-xs text-muted-foreground">Pagamento via USSD *123#. Recebes um prompt no telemóvel para confirmar.</p>
      <div className="space-y-1"><p className="text-[10px] font-bold">Número Unitel</p><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="9XX XXX XXX" className="bg-white/5" /></div>
      <Input type="number" min={500} value={amount} onChange={e => setAmount(Math.max(500,Number(e.target.value)))} className="bg-white/5 text-center text-lg font-bold" />
      <div className="p-3 rounded-xl border border-white/10 text-[10px] text-muted-foreground space-y-1"><p className="font-bold">Instruções USSD:</p><p>1. Recebes prompt no telemóvel</p><p>2. Marca *123# e segue as instruções</p><p>3. Confirma pagamento de {amount.toLocaleString()} Kz</p></div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={!phone} onClick={() => router.push("/wallet/depositar/multicaixa/confirmar")}><ArrowRight className="w-4 h-4" />Enviar pedido USSD</Button>
    </div>
  )
}
