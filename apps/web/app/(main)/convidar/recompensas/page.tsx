"use client"
import { ReferralRewardProgress } from "@/components/referral/referral-reward-progress"
import Link from "next/link"
export default function RecompensasPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <h1 className="text-lg font-bold">🎁 Recompensas por Convite</h1>
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2"><p className="text-xs font-semibold">Por cada amigo que se regista com o teu link:</p><p className="text-[10px]">→ Tu ganhas: <span className="text-primary font-bold">200 Salos</span></p><p className="text-[10px]">→ O amigo ganha: <span className="text-primary font-bold">100 Salos de boas-vindas</span></p></div>
      <div className="p-4 rounded-xl border border-white/10"><h2 className="text-sm font-semibold mb-3">Bónus especiais</h2><ReferralRewardProgress count={5} /></div>
      <div className="space-y-2"><Link href="/convidar/recompensas/como-funciona" className="block p-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs">Como funcionam os convites →</Link><Link href="/convidar/recompensas/historico" className="block p-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs">Histórico de recompensas →</Link></div>
    </div>
  )
}
