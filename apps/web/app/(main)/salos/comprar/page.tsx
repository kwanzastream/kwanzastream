"use client"
import { SalosPackageCard, SALOS_PACKAGES } from "@/components/wallet/salos-package-card"
import { Heart, Info } from "lucide-react"
import Link from "next/link"

export default function SalosComprarPage() {
  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-5">
      <h1 className="text-xl font-bold flex items-center gap-2"><Heart className="w-5 h-5 text-yellow-400" />Comprar Salos</h1>
      <p className="text-xs text-muted-foreground">Apoia os teus criadores favoritos</p>
      <div className="space-y-2">{SALOS_PACKAGES.map(pkg => <SalosPackageCard key={pkg.amount} pkg={pkg} />)}</div>
      <Link href="/salos/comprar/custom" className="block"><div className="p-4 rounded-2xl border border-dashed border-white/20 text-center text-sm font-bold text-muted-foreground hover:border-primary/30 transition-all">Valor personalizado →</div></Link>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-muted-foreground flex items-center gap-2"><Info className="w-4 h-4 shrink-0 text-primary" />O criador recebe 80%. Plataforma retém 20%.</div>
    </div>
  )
}
