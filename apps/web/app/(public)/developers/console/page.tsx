"use client"
import { useState, useEffect } from "react"
import { Loader2, Plus, BarChart3 } from "lucide-react"
import { AppCard } from "@/components/developers/app-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function ConsolePage() {
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get("/api/developer/apps").then(r => setApps(r.data || [])).catch(() => {}).finally(() => setLoading(false)) }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Console de Developer</h1>
      <div className="flex gap-3">
        <Link href="/developers/console/apps/criar"><Button size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Nova App</Button></Link>
        <Link href="/developers/console/extensoes/criar"><Button variant="outline" size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Nova Extensão</Button></Link>
        <Link href="/developers/console/analytics"><Button variant="outline" size="sm" className="gap-1.5"><BarChart3 className="w-3.5 h-3.5" />Analytics</Button></Link>
      </div>
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Apps ({apps.length})</h2>
        {apps.length === 0 && <p className="text-xs text-muted-foreground py-4">Sem apps. Cria a primeira!</p>}
        {apps.map((a: any) => <AppCard key={a.id} id={a.id} name={a.name} status={a.status} category={a.category} clientId={a.clientId} webhookCount={a._count?.webhooks || 0} />)}
      </div>
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Extensões</h2>
        <p className="text-xs text-muted-foreground">Sem extensões registadas.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[{ label: "Total requests", value: "—" }, { label: "Webhooks entregues", value: "—" }, { label: "Erros", value: "—" }].map((m, i) => (
          <div key={i} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.value}</p><p className="text-[9px] text-muted-foreground">{m.label}</p></div>
        ))}
      </div>
    </div>
  )
}
