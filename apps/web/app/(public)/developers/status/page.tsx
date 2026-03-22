"use client"
import { StatusIndicator } from "@/components/developers/status-indicator"
export default function StatusPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-4xl">🟢</span>
        <h1 className="text-2xl font-bold">Todos os sistemas operacionais</h1>
        <p className="text-xs text-muted-foreground">Última actualização: agora mesmo</p>
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-1">
        <StatusIndicator status="operational" label="API REST" uptime="100% (30 dias)" />
        <StatusIndicator status="operational" label="WebSocket / Chat" uptime="100%" />
        <StatusIndicator status="operational" label="Webhooks" uptime="99.8% entrega" />
        <StatusIndicator status="operational" label="CDN (Bunny.net)" uptime="100%" />
        <StatusIndicator status="operational" label="Auth (OAuth)" uptime="100%" />
        <StatusIndicator status="operational" label="EventSub" uptime="100%" />
      </div>
      <div className="p-3 rounded-xl border border-white/10 text-center space-y-1">
        <p className="text-sm font-semibold">Latência API (p95)</p>
        <p className="text-2xl font-bold text-primary">45ms</p>
      </div>
      <a href="/developers/status/historico" className="block text-center text-xs text-muted-foreground hover:text-foreground">Ver histórico de incidentes →</a>
    </div>
  )
}
