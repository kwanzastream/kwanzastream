"use client"
import { Medal, Check, X, Loader2 } from "lucide-react"

export function ProgramHero({ badge, title, desc, level }: { badge: string; title: string; desc: string; level: string }) {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-yellow-500/5 border border-primary/20 text-center space-y-3">
      <span className="text-4xl">{badge}</span>
      <h1 className="text-xl font-black">{title}</h1>
      <p className="text-xs text-muted-foreground">{desc}</p>
      <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold bg-primary/10 text-primary">{level}</span>
    </div>
  )
}

export interface Requirement { label: string; met: boolean; current?: number; required: number }

export function RequirementsChecklist({ requirements }: { requirements: Requirement[] }) {
  return (
    <div className="space-y-2">{requirements.map(r => (
      <div key={r.label} className={`flex items-center gap-3 p-3 rounded-xl border ${r.met ? "border-green-500/20 bg-green-500/5" : "border-white/10"}`}>
        {r.met ? <Check className="w-4 h-4 text-green-400 shrink-0" /> : <X className="w-4 h-4 text-red-400 shrink-0" />}
        <div className="flex-1"><p className="text-xs font-bold">{r.label}</p>{r.current !== undefined && <div className="mt-1 h-1.5 rounded-full bg-white/10"><div className="h-1.5 rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, (r.current / r.required) * 100)}%` }} /></div>}{r.current !== undefined && <p className="text-[8px] text-muted-foreground mt-0.5">{r.current}/{r.required}</p>}</div>
      </div>
    ))}</div>
  )
}

export function BenefitsList({ benefits }: { benefits: { icon: string; label: string; desc?: string }[] }) {
  return (
    <div className="space-y-1.5">{benefits.map(b => (
      <div key={b.label} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
        <span className="text-lg">{b.icon}</span>
        <div><p className="text-xs font-bold">{b.label}</p>{b.desc && <p className="text-[8px] text-muted-foreground">{b.desc}</p>}</div>
      </div>
    ))}</div>
  )
}

export function ApplicationStatusCard({ status, date, detail }: { status: "pending" | "approved" | "rejected"; date: string; detail?: string }) {
  const cfg = { pending: { label: "Em análise", color: "border-yellow-500/20 bg-yellow-500/5", icon: "⏳" }, approved: { label: "Aprovado", color: "border-green-500/20 bg-green-500/5", icon: "✅" }, rejected: { label: "Rejeitado", color: "border-red-500/20 bg-red-500/5", icon: "❌" } }[status]
  return (
    <div className={`p-5 rounded-2xl border text-center space-y-2 ${cfg.color}`}>
      <span className="text-3xl">{cfg.icon}</span>
      <p className="text-sm font-bold">{cfg.label}</p>
      <p className="text-[10px] text-muted-foreground">{date}</p>
      {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
    </div>
  )
}
