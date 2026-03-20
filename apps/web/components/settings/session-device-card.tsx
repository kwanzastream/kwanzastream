"use client"
import { Monitor, Smartphone, Tablet, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface SessionData { id: string; device: string; os: string; location: string; lastActive: string; current?: boolean }

const DEVICE_ICON: Record<string, any> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet }

export function SessionDeviceCard({ session, onRevoke }: { session: SessionData; onRevoke?: () => void }) {
  const Icon = DEVICE_ICON[session.device] || Monitor
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${session.current ? "border-primary/30 bg-primary/5" : "border-white/10"}`}>
      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-primary" /></div>
      <div className="flex-1 min-w-0"><p className="text-xs font-bold">{session.os}{session.current && <span className="ml-1 text-[8px] text-primary">(este dispositivo)</span>}</p><p className="text-[8px] text-muted-foreground">{session.location} · {session.lastActive}</p></div>
      {!session.current && <Button size="icon" variant="ghost" className="shrink-0" onClick={onRevoke}><X className="w-3 h-3 text-red-400" /></Button>}
    </div>
  )
}
