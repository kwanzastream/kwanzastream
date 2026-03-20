"use client"
import { Button } from "@/components/ui/button"
import { Check, X, ExternalLink } from "lucide-react"

export interface ConnectedServiceData { id: string; name: string; icon: string; connected: boolean; detail?: string }

export function ConnectedServiceRow({ service, onToggle }: { service: ConnectedServiceData; onToggle?: () => void }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
      <span className="text-lg">{service.icon}</span>
      <div className="flex-1"><p className="text-xs font-bold">{service.name}</p>{service.detail && <p className="text-[8px] text-muted-foreground">{service.detail}</p>}</div>
      {service.connected ? <Button size="sm" variant="ghost" className="text-[9px] gap-1 text-green-400" onClick={onToggle}><Check className="w-3 h-3" />Ligado</Button> : <Button size="sm" variant="outline" className="text-[9px] gap-1" onClick={onToggle}><ExternalLink className="w-3 h-3" />Ligar</Button>}
    </div>
  )
}
