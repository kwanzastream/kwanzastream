"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { CreditCard, Crown } from "lucide-react"

export default function SubscricoesActivasPage() {
  const [subs, setSubs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/subscriptions/me").then(r => setSubs(r.data?.subscriptions || r.data || [])).catch(() => setSubs([])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscrições Activas</h1>
          <p className="text-sm text-muted-foreground mt-1">Canais que subscreveste.</p>
        </div>
        <Link href="/subscricao/gerir/historico" className="text-sm text-primary hover:underline">Histórico →</Link>
      </div>

      {loading ? (
        <div className="space-y-3">{Array(3).fill(0).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : subs.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Crown className="w-12 h-12 text-muted-foreground/30 mx-auto" />
          <p className="font-medium text-lg">Nenhuma subscrição activa</p>
          <p className="text-sm text-muted-foreground">Subscreve os teus creators favoritos para apoiá-los e desbloquear benefícios exclusivos.</p>
          <Link href="/explorar" className="inline-flex px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors mt-2">Explorar creators</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {subs.map((s: any) => (
            <div key={s.id} className="p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">{s.channel?.displayName?.slice(0, 2) || "KS"}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.channel?.displayName}</p>
                <p className="text-xs text-muted-foreground">Renova: {new Date(s.expiresAt).toLocaleDateString("pt-AO")}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium">Activa</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
