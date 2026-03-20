"use client"
import { Check, ArrowUpRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function KYCAprovadoPage() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-5">
      <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto"><Check className="w-10 h-10 text-green-400" /></div>
      <h2 className="text-xl font-bold text-green-400">KYC Aprovado! ✅</h2>
      <p className="text-sm text-muted-foreground">A tua identidade foi verificada. Podes agora fazer levantamentos sem restrições.</p>
      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-left space-y-1"><p className="text-xs font-bold flex items-center gap-1"><Shield className="w-3 h-3 text-green-400" />Limites actualizados:</p><p className="text-[10px] text-muted-foreground">• Levantamento até 500.000 Kz/transacção</p><p className="text-[10px] text-muted-foreground">• Sem limite mensal com KYC avançado</p></div>
      <Link href="/wallet/levantar"><Button className="gap-1"><ArrowUpRight className="w-4 h-4" />Fazer levantamento</Button></Link>
    </div>
  )
}
