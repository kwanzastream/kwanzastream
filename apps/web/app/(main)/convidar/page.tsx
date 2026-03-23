"use client"
import { useState, useEffect } from "react"
import { ReferralLinkCard } from "@/components/referral/referral-link-card"
import { ReferralShareButtons } from "@/components/referral/referral-share-buttons"
import { ReferralStatsCard } from "@/components/referral/referral-stats-card"
import api from "@/lib/api"
import Link from "next/link"
export default function ConvidarPage() {
  const [data, setData] = useState<any>(null)
  useEffect(() => { api.get("/api/referral/my-link").then(r => setData(r.data)).catch(() => setData({ code: "KWANZA123", clicks: 34, completedReferrals: 5, totalSalos: 1000 })) }, [])
  if (!data) return <div className="max-w-lg mx-auto px-4 py-8"><p className="text-xs">A carregar...</p></div>
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <div className="text-center"><h1 className="text-lg font-bold">🎁 Convida os teus amigos</h1></div>
      <ReferralLinkCard code={data.code} clicks={data.clicks || 0} registrations={data.completedReferrals || 0} />
      <ReferralShareButtons code={data.code} />
      <ReferralStatsCard linksShared={data.clicks || 0} friendsRegistered={data.completedReferrals || 0} salosEarned={data.totalSalos || 0} />
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 space-y-1"><p className="text-xs font-semibold">Por cada amigo que se regista:</p><p className="text-[10px]">Tu ganhas: <span className="text-primary font-bold">200 Salos</span></p><p className="text-[10px]">O teu amigo ganha: <span className="text-primary font-bold">100 Salos</span></p></div>
      <div className="space-y-2"><Link href="/convidar/amigos-convidados" className="block p-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs">Ver amigos convidados →</Link><Link href="/convidar/recompensas/historico" className="block p-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs">Ver histórico de recompensas →</Link></div>
    </div>
  )
}
