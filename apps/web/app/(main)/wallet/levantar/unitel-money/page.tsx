"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Smartphone } from "lucide-react"
import Link from "next/link"
export default function LevantarUnitelPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(5000)
  const [phone, setPhone] = useState("")
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/wallet/levantar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Smartphone className="w-5 h-5" />Levantar — Unitel Money</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Número Unitel</p><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="9XX XXX XXX" className="bg-white/5" /></div>
      <Input type="number" min={5000} max={500000} value={amount} onChange={e => setAmount(Math.max(5000,Math.min(500000,Number(e.target.value))))} className="bg-white/5 text-center text-lg font-bold" />
      <Button className="w-full h-12 gap-2 font-bold" disabled={!phone} onClick={() => router.push(`/wallet/levantar/confirmar?method=unitel&amount=${amount}`)}><ArrowRight className="w-4 h-4" />Continuar</Button>
    </div>
  )
}
