"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Code, Globe, Bot, Layers } from "lucide-react"

interface AppCardProps { id: string; name: string; status: string; category: string; clientId: string; webhookCount?: number }

const ICONS: Record<string, any> = { bot: Bot, overlay: Code, dashboard: Globe, other: Layers }
const STATUS_MAP: Record<string, { label: string; color: string }> = { sandbox: { label: "Sandbox", color: "text-yellow-400 bg-yellow-500/10" }, review: { label: "Em revisão", color: "text-blue-400 bg-blue-500/10" }, production: { label: "Produção", color: "text-green-400 bg-green-500/10" }, suspended: { label: "Suspensa", color: "text-red-400 bg-red-500/10" } }

export function AppCard({ id, name, status, category, clientId, webhookCount = 0 }: AppCardProps) {
  const Icon = ICONS[category] || Layers
  const s = STATUS_MAP[status] || STATUS_MAP.sandbox
  return (
    <Link href={`/developers/console/apps/${id}`} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
      <Icon className="w-6 h-6 text-primary shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-[10px] text-muted-foreground font-mono">{clientId.slice(0, 20)}...</p>
      </div>
      <div className="text-right shrink-0">
        <Badge className={`text-[9px] ${s.color}`}>{s.label}</Badge>
        <p className="text-[9px] text-muted-foreground mt-0.5">{webhookCount} webhooks</p>
      </div>
    </Link>
  )
}
