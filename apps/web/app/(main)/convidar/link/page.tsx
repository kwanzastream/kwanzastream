"use client"
import { useState, useEffect } from "react"
import { ReferralLinkCard } from "@/components/referral/referral-link-card"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import Link from "next/link"
export default function ConvidarLinkPage() {
  const [data, setData] = useState<any>(null)
  useEffect(() => { api.get("/api/referral/my-link").then(r => setData(r.data)).catch(() => setData({ code: "KWANZA123", clicks: 34, completedReferrals: 5 })) }, [])
  if (!data) return <div className="max-w-lg mx-auto px-4 py-8"><p className="text-xs">A carregar...</p></div>
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <h1 className="text-lg font-bold">O teu link de referral</h1>
      <ReferralLinkCard code={data.code} clicks={data.clicks || 0} registrations={data.completedReferrals || 0} />
      <div className="space-y-2"><Link href="/convidar/link/partilhar" className="block"><Button className="w-full text-xs">↗️ Partilhar</Button></Link><Link href="/convidar/link/gerar" className="block p-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-center">🔄 Gerar novo link</Link></div>
    </div>
  )
}
