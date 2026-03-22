"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft, Key, Webhook, FileText, BarChart3, Rocket, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import api from "@/lib/api"

export default function AppDetailPage() {
  const { id } = useParams()
  const [app, setApp] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get(`/api/developer/apps/${id}`).then(r => setApp(r.data)).catch(() => {}).finally(() => setLoading(false)) }, [id])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!app) return <div className="text-center py-20 text-muted-foreground">App não encontrada</div>

  const links = [
    { icon: Key, label: "Credenciais", href: `/developers/console/apps/${id}/credenciais` },
    { icon: Webhook, label: "Webhooks", href: `/developers/console/apps/${id}/webhooks` },
    { icon: Shield, label: "Rate Limits", href: `/developers/console/apps/${id}/rate-limits` },
    { icon: FileText, label: "Logs", href: `/developers/console/apps/${id}/logs` },
    { icon: BarChart3, label: "Analytics", href: `/developers/console/apps/${id}/analytics` },
    { icon: Rocket, label: "Promover para Produção", href: `/developers/console/apps/${id}/producao` },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/console/apps" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Apps</Link>
      <div className="flex items-start justify-between">
        <div><h1 className="text-xl font-bold">{app.name}</h1><p className="text-[10px] text-muted-foreground font-mono">{app.clientId}</p>{app.description && <p className="text-xs text-muted-foreground mt-1">{app.description}</p>}</div>
        <Badge className={app.status === "production" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}>{app.status}</Badge>
      </div>
      <div className="space-y-2">
        {links.map((l, i) => (
          <Link key={i} href={l.href} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <l.icon className="w-4 h-4 text-primary" /><span className="text-sm">{l.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
