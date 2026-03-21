"use client"

import { useState, useEffect } from "react"
import { Loader2, Plus } from "lucide-react"
import { CampaignCard } from "@/components/ads/campaign-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function GerirPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/ads/campaigns").then(r => setCampaigns(r.data || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  const grouped = { active: campaigns.filter(c => c.status === "active"), review: campaigns.filter(c => c.status === "review"),
    paused: campaigns.filter(c => c.status === "paused"), completed: campaigns.filter(c => c.status === "completed") }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">As minhas campanhas</h1>
        <Link href="/ads/criar-campanha"><Button size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Nova</Button></Link>
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <p className="text-sm text-muted-foreground">Sem campanhas. Cria a primeira!</p>
          <Link href="/ads/criar-campanha"><Button>Criar campanha</Button></Link>
        </div>
      )}

      {(["active", "review", "paused", "completed"] as const).map(s => grouped[s].length > 0 && (
        <div key={s} className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {s === "active" ? "Activas" : s === "review" ? "Em revisão" : s === "paused" ? "Pausadas" : "Concluídas"} ({grouped[s].length})
          </h2>
          {grouped[s].map((c: any) => <CampaignCard key={c.id} {...c} />)}
        </div>
      ))}
    </div>
  )
}
