"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Webhook, Trash2, FlaskConical } from "lucide-react"

interface WebhookRowProps { id: string; url: string; events: string[]; isActive: boolean; lastDelivery?: string; onTest?: () => void; onDelete?: () => void }

export function WebhookRow({ id, url, events, isActive, lastDelivery, onTest, onDelete }: WebhookRowProps) {
  return (
    <div className="p-3 rounded-xl border border-white/10 space-y-2">
      <div className="flex items-start gap-2">
        <Webhook className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono truncate">{url}</p>
          <div className="flex gap-1 mt-1 flex-wrap">{events.map(e => <Badge key={e} variant="outline" className="text-[8px]">{e}</Badge>)}</div>
        </div>
        <Badge className={`text-[9px] shrink-0 ${isActive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{isActive ? "✅ Activo" : "❌ Inactivo"}</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-muted-foreground">{lastDelivery ? `Última entrega: ${new Date(lastDelivery).toLocaleString("pt-AO")}` : "Sem entregas"}</span>
        <div className="flex gap-1">
          {onTest && <Button variant="outline" size="sm" className="text-[9px] h-6 gap-1" onClick={onTest}><FlaskConical className="w-2.5 h-2.5" />Testar</Button>}
          {onDelete && <Button variant="outline" size="sm" className="text-[9px] h-6 gap-1 text-red-400" onClick={onDelete}><Trash2 className="w-2.5 h-2.5" />Eliminar</Button>}
        </div>
      </div>
    </div>
  )
}
