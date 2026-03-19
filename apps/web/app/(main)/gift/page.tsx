"use client"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { GiftHubCard } from "@/components/gifting/gift-hub-card"
import { GiftHistoryRow, type GiftHistoryItem } from "@/components/gifting/gift-history-item"
import { Button } from "@/components/ui/button"
import { Gift, Lock } from "lucide-react"
import Link from "next/link"

const RECENT: GiftHistoryItem[] = [
  { id: "g1", type: "subscription", direction: "sent", channel: "kuduro_master", tier: "Tier 1", quantity: 1, date: "há 2 dias", status: "delivered" },
  { id: "g2", type: "salos", direction: "received", user: "super_fan", amount: 500, date: "há 5 dias", status: "delivered" },
]

export default function GiftPage() {
  const { user } = useAuth()
  const router = useRouter()
  if (!user) return <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4"><Lock className="w-12 h-12 text-muted-foreground/30" /><p className="text-lg font-bold">Faz login para enviar gifts</p><Button onClick={() => router.push("/entrar?redirectTo=/gift")}>Entrar</Button></div>

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <h1 className="text-xl font-bold flex items-center gap-2"><Gift className="w-5 h-5 text-primary" />Presentes</h1>
      <div className="grid grid-cols-2 gap-4">
        <GiftHubCard type="subscription" title="Oferecer Subscrição" description="Oferece uma subscrição a outro viewer num canal" href="/gift/subscricao" />
        <GiftHubCard type="salos" title="Oferecer Salos" description="Envia Salos como presente a outro utilizador" href="/gift/salos" />
      </div>
      {RECENT.length > 0 && <div className="space-y-2"><h2 className="text-sm font-bold">Recentes</h2>{RECENT.map(g => <GiftHistoryRow key={g.id} item={g} />)}</div>}
      <div className="flex gap-3"><Link href="/gift/recebidos" className="flex-1"><Button variant="outline" className="w-full text-xs">Recebidos</Button></Link><Link href="/gift/enviados" className="flex-1"><Button variant="outline" className="w-full text-xs">Enviados</Button></Link></div>
    </div>
  )
}
