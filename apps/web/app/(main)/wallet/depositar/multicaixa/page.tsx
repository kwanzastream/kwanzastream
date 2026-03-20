"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Smartphone, ArrowRight } from "lucide-react"
import Link from "next/link"

const PRESETS = [500, 1000, 2500, 5000, 10000, 25000]

export default function DepositarMulticaixaPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(1000)
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/depositar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Smartphone className="w-5 h-5 text-primary" />Multicaixa Express</h1></div>
      <p className="text-xs text-muted-foreground">Mínimo: 500 Kz</p>
      <div className="grid grid-cols-3 gap-2">{PRESETS.map(p => <button key={p} onClick={() => setAmount(p)} className={`py-3 rounded-lg text-sm font-bold transition-all ${amount === p ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{(p/1000 >= 1 ? `${p/1000}K` : p)} Kz</button>)}</div>
      <Input type="number" min={500} max={5000000} value={amount} onChange={e => setAmount(Math.max(500, Number(e.target.value)))} className="bg-white/5 text-center text-lg font-bold" />
      <Button className="w-full h-12 gap-2 font-bold" onClick={() => router.push(`/wallet/depositar/multicaixa/referencia?amount=${amount}`)}><ArrowRight className="w-4 h-4" />Gerar referência — {amount.toLocaleString()} Kz</Button>
    </div>
  )
}
