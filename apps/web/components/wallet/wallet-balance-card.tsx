"use client"
import { Wallet, Heart, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WalletBalanceCard({ balance, salos }: { balance: number; salos: number }) {
  return (
    <div className="space-y-3">
      <div className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 to-primary/5 space-y-2">
        <p className="text-xs text-muted-foreground flex items-center gap-1"><Wallet className="w-3 h-3" />Saldo disponível</p>
        <p className="text-3xl font-black">{balance.toLocaleString()} Kz</p>
        <div className="flex gap-2"><Link href="/wallet/depositar"><Button size="sm" className="text-xs gap-1"><ArrowDownLeft className="w-3 h-3" />Depositar</Button></Link><Link href="/wallet/levantar"><Button size="sm" variant="outline" className="text-xs gap-1"><ArrowUpRight className="w-3 h-3" />Levantar</Button></Link></div>
      </div>
      <div className="p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 flex items-center justify-between">
        <div><p className="text-xs text-muted-foreground">Salos disponíveis</p><p className="text-xl font-bold text-yellow-400 flex items-center gap-1"><Heart className="w-4 h-4" />{salos.toLocaleString()}</p></div>
        <Link href="/salos/comprar"><Button size="sm" variant="outline" className="text-xs border-yellow-500/30 text-yellow-400">Comprar Salos</Button></Link>
      </div>
    </div>
  )
}
