"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
export default function LevantarMulticaixaPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(5000)
  const [iban, setIban] = useState("")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/levantar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Levantar — Multicaixa</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Valor (mín 5.000 Kz, máx 500.000 Kz)</p><Input type="number" min={5000} max={500000} value={amount} onChange={e => setAmount(Math.max(5000,Math.min(500000,Number(e.target.value))))} className="bg-white/5 text-center text-lg font-bold" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">IBAN</p><Input value={iban} onChange={e => setIban(e.target.value)} placeholder="AO06 ..." className="bg-white/5" /></div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={!iban} onClick={() => router.push(`/wallet/levantar/confirmar?method=multicaixa&amount=${amount}`)}><ArrowRight className="w-4 h-4" />Continuar</Button>
    </div>
  )
}
