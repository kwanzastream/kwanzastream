"use client"
import { Radio, Clock, Users, Wifi } from "lucide-react"

export function SmPanel({ title, icon, children, className }: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 overflow-hidden ${className || ""}`}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.02]">{icon}<p className="text-[10px] font-bold uppercase tracking-wider">{title}</p></div>
      <div className="p-3">{children}</div>
    </div>
  )
}

export function SmViewerCount({ count, peak }: { count: number; peak?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-red-400" /><span className="text-sm font-black">{count.toLocaleString()}</span></div>
      {peak && <span className="text-[8px] text-muted-foreground">Pico: {peak.toLocaleString()}</span>}
    </div>
  )
}

export function SmStreamClock({ duration }: { duration: string }) {
  return <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-muted-foreground" /><span className="text-xs font-mono font-bold">{duration}</span></div>
}

export function SmLiveBadge({ isLive }: { isLive: boolean }) {
  return isLive
    ? <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /><span className="text-[10px] font-bold text-red-400">AO VIVO</span></div>
    : <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-500" /><span className="text-[10px] font-bold text-muted-foreground">OFFLINE</span></div>
}

export function SmQuickActionButton({ icon, label, onClick, active, variant }: { icon: string; label: string; onClick?: () => void; active?: boolean; variant?: "danger" }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all text-center ${variant === "danger" ? "border-red-500/20 hover:bg-red-500/10" : active ? "border-primary/30 bg-primary/10" : "border-white/10 hover:border-primary/20"}`}>
      <span className="text-lg">{icon}</span>
      <span className="text-[8px] font-bold">{label}</span>
    </button>
  )
}

export function SmActivityItem({ time, icon, text }: { time: string; icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2 py-1.5 text-[10px]">
      <span className="text-muted-foreground font-mono shrink-0">{time}</span>
      <span>{icon}</span>
      <span className="text-muted-foreground">{text}</span>
    </div>
  )
}
