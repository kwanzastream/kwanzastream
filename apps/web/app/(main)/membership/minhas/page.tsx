"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Crown, Users } from "lucide-react"

export default function MembershipMinhasPage() {
  const [memberships, setMemberships] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/memberships/mine").then(r => setMemberships(r.data?.memberships || r.data || [])).catch(() => setMemberships([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Crown className="w-5 h-5 text-yellow-500" />As Minhas Memberships</h1>
        <p className="text-sm text-muted-foreground mt-1">Canais que estás a apoiar activamente.</p>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(3).fill(0).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : memberships.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-5xl">👑</p>
          <p className="font-medium text-lg">Nenhuma membership activa</p>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Apoia os teus creators favoritos com uma subscrição mensal e desbloqueia benefícios exclusivos.</p>
          <Link href="/explorar" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mt-2"><Users className="w-3.5 h-3.5" />Encontrar creators</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {memberships.map((m: any) => (
            <div key={m.id} className="p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">{m.streamer?.displayName?.slice(0, 2)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{m.streamer?.displayName}</p>
                <p className="text-xs text-muted-foreground">{m.tier} · {m.price} Kz/mês</p>
              </div>
              <span className="text-xs text-green-500 font-medium">Activa</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
