"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function CommunityMemberRow({ username, subtitle, badges, actions }: { username: string; subtitle: string; badges?: string[]; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10 hover:border-primary/20 transition-all">
      <Avatar className="w-8 h-8"><AvatarFallback className="text-[10px] bg-primary/20">{username.slice(1,3).toUpperCase()}</AvatarFallback></Avatar>
      <div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{username}{badges && badges.map(b => <span key={b} className="ml-1 text-[8px]">{b}</span>)}</p><p className="text-[8px] text-muted-foreground">{subtitle}</p></div>
      {actions && <div className="flex gap-1 shrink-0">{actions}</div>}
    </div>
  )
}

export function BanCard({ username, reason, bannedBy, duration, remaining }: { username: string; reason: string; bannedBy: string; duration: string; remaining?: string }) {
  return (
    <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5">
      <div className="flex items-center justify-between"><p className="text-xs font-bold">{username}</p>{remaining && <span className="text-[8px] text-yellow-400 font-bold">{remaining} restante</span>}</div>
      <p className="text-[9px] text-muted-foreground mt-1">Motivo: {reason}</p>
      <p className="text-[8px] text-muted-foreground">Por: {bannedBy} · Duração: {duration}</p>
    </div>
  )
}

export function RewardCard({ title, cost, desc, active, maxPerStream }: { title: string; cost: number; desc: string; active: boolean; maxPerStream?: string }) {
  return (
    <div className={`p-3 rounded-xl border ${active ? "border-primary/20 bg-primary/5" : "border-white/10 opacity-50"}`}>
      <div className="flex items-center justify-between"><p className="text-xs font-bold">{title}</p><span className="text-[9px] font-bold text-primary">{cost.toLocaleString()} pts</span></div>
      <p className="text-[8px] text-muted-foreground mt-1">{desc}</p>
      {maxPerStream && <p className="text-[7px] text-muted-foreground">Máx: {maxPerStream}</p>}
    </div>
  )
}

export function ActivityLogItem({ time, icon, text }: { time: string; icon: string; text: string }) {
  return <div className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0"><span className="text-[8px] text-muted-foreground font-mono shrink-0">{time}</span><span className="text-sm">{icon}</span><p className="text-[10px] text-muted-foreground">{text}</p></div>
}

export function PollResultCard({ question, options, total, date }: { question: string; options: { label: string; votes: number; winner?: boolean }[]; total: number; date: string }) {
  return (
    <div className="p-3 rounded-xl border border-white/10">
      <p className="text-xs font-bold">{question}</p><p className="text-[8px] text-muted-foreground mb-2">{date} · {total} votos</p>
      <div className="space-y-1">{options.map(o => <div key={o.label}><div className="flex items-center justify-between text-[9px]"><span className={o.winner ? "font-bold text-primary" : "text-muted-foreground"}>{o.label}{o.winner && " ✅"}</span><span>{Math.round((o.votes/total)*100)}%</span></div><div className="h-1.5 rounded-full bg-white/10"><div className={`h-1.5 rounded-full ${o.winner ? "bg-primary" : "bg-white/20"}`} style={{width:`${(o.votes/total)*100}%`}} /></div></div>)}</div>
    </div>
  )
}
