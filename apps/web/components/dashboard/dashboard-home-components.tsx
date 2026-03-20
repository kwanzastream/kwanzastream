"use client"
import { Check, ChevronRight, Circle, ExternalLink } from "lucide-react"
import Link from "next/link"

export interface ChecklistStep {
  id: string
  title: string
  desc: string
  href?: string
  completed: boolean
}

export function ChecklistProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = (completed / total) * 100
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-muted-foreground">{completed}/{total} completos</span>
        <span className="font-bold text-primary">{Math.round(pct)}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-primary to-green-400 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function ChecklistCard({ step, index }: { step: ChecklistStep; index: number }) {
  const inner = (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${step.completed ? "border-green-500/20 bg-green-500/5 opacity-70" : "border-white/10 hover:border-primary/20"}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${step.completed ? "bg-green-500 text-white" : "bg-white/10 text-muted-foreground"}`}>
        {step.completed ? <Check className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{index + 1}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold ${step.completed ? "line-through text-muted-foreground" : ""}`}>{step.title}</p>
        <p className="text-[8px] text-muted-foreground">{step.desc}</p>
      </div>
      {!step.completed && step.href && <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
    </div>
  )
  return step.href && !step.completed ? <Link href={step.href}>{inner}</Link> : inner
}

export function DashboardStatCard({ icon, label, value, change, positive }: { icon: string; label: string; value: string; change?: string; positive?: boolean }) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{icon}</span>
        <p className="text-[9px] text-muted-foreground uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-xl font-black">{value}</p>
      {change && <p className={`text-[9px] font-bold ${positive ? "text-green-400" : "text-red-400"}`}>{positive ? "↑" : "↓"} {change}</p>}
    </div>
  )
}

export function NewsItem({ title, date, desc, isNew, href }: { title: string; date: string; desc: string; isNew?: boolean; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20 transition-all">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs font-bold">{title}</p>
          {isNew && <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[7px] font-bold">NOVO</span>}
        </div>
        <p className="text-[8px] text-muted-foreground mt-0.5">{date}</p>
        <p className="text-[10px] text-muted-foreground mt-1">{desc}</p>
      </div>
      {href && <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0 mt-1" />}
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : inner
}
