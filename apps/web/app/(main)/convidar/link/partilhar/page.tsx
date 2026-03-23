"use client"
import { ReferralShareButtons } from "@/components/referral/referral-share-buttons"
import Link from "next/link"
export default function PartilharHubPage() {
  return (
    <div className="max-w-sm mx-auto px-4 py-8 space-y-6">
      <h1 className="text-lg font-bold">Partilhar o teu convite</h1>
      <p className="text-xs text-muted-foreground">Escolhe como queres partilhar:</p>
      <ReferralShareButtons code="KWANZA123" />
      <Link href="/convidar/link/partilhar/whatsapp" className="block p-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-center">Personalizar mensagem WhatsApp →</Link>
      <Link href="/convidar/link/partilhar/sms" className="block p-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-center">Enviar por SMS →</Link>
    </div>
  )
}
