"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
export default function SalosCustomPage() {
  const router = useRouter()
  const [amount, setAmount] = useState(100)
  const price = amount // 1:1 base rate for custom
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <div className="flex items-center gap-3"><Link href="/salos/comprar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Valor Personalizado</h1></div>
      <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-yellow-400" /><Input type="number" min={10} max={100000} value={amount} onChange={e => setAmount(Math.max(10,Number(e.target.value)))} className="bg-white/5 text-center text-xl font-bold" /><span className="text-sm text-muted-foreground">Salos</span></div>
      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center"><p className="text-2xl font-black text-yellow-400">{price.toLocaleString()} Kz</p></div>
      <Button className="w-full h-12 gap-2 font-bold" onClick={() => router.push(`/salos/comprar/confirmar?pack=${amount}`)}><ArrowRight className="w-4 h-4" />Comprar {amount.toLocaleString()} Salos</Button>
    </div>
  )
}
