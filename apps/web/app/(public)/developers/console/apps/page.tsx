"use client"
import { useState, useEffect } from "react"
import { Loader2, Plus } from "lucide-react"
import { AppCard } from "@/components/developers/app-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
export default function AppsPage() {
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get("/api/developer/apps").then(r => setApps(r.data || [])).catch(() => {}).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center"><h1 className="text-2xl font-bold">As minhas Apps</h1><Link href="/developers/console/apps/criar"><Button size="sm" className="gap-1.5"><Plus className="w-3.5 h-3.5" />Nova</Button></Link></div>
      {apps.length === 0 && <div className="text-center py-12 space-y-3"><p className="text-sm text-muted-foreground">Ainda não criaste nenhuma app.</p><Link href="/developers/console/apps/criar"><Button>Criar primeira app</Button></Link></div>}
      <div className="space-y-3">{apps.map((a: any) => <AppCard key={a.id} id={a.id} name={a.name} status={a.status} category={a.category} clientId={a.clientId} webhookCount={a._count?.webhooks || 0} />)}</div>
    </div>
  )
}
