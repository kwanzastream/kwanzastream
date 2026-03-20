"use client"
import { Button } from "@/components/ui/button"

export function CollabChannelCard({ username, category, status, viewers }: { username: string; category: string; status: "live" | "offline"; viewers?: number }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-purple-600/60 flex items-center justify-center text-[10px] font-bold">{username.charAt(1).toUpperCase()}</div>
      <div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{username}</p><p className="text-[8px] text-muted-foreground">{category}</p></div>
      {status === "live" ? <span className="flex items-center gap-1 text-[8px] text-red-400 font-bold">🔴 {viewers}</span> : <span className="text-[8px] text-muted-foreground">Offline</span>}
    </div>
  )
}

export function TeamMemberRow({ username, role, isFounder, actions }: { username: string; role: string; isFounder?: boolean; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/60 to-purple-600/60 flex items-center justify-center text-[10px] font-bold">{username.charAt(1).toUpperCase()}</div>
      <div className="flex-1"><p className="text-xs font-bold">{username}</p><p className="text-[8px] text-muted-foreground">{role}</p></div>
      {!isFounder && actions}
    </div>
  )
}

export function RaidTargetCard({ username, category, viewers, onClick }: { username: string; category: string; viewers: number; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-white/10 hover:border-primary/30 text-left">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/60 to-orange-500/60 flex items-center justify-center text-[10px] font-bold">{username.charAt(1).toUpperCase()}</div>
      <div className="flex-1"><p className="text-xs font-bold">{username}</p><p className="text-[8px] text-muted-foreground">{category}</p></div>
      <span className="text-[9px] text-red-400 font-bold">🔴 {viewers}</span>
    </button>
  )
}
