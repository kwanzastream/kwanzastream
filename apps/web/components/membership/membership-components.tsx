"use client"
import { Button } from "@/components/ui/button"

export function TierSummaryCard({ tier, name, price, members, mrr, benefits, active }: { tier: number; name: string; price: string; members: number; mrr: string; benefits: string[]; active?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${active ? "border-primary/30 bg-primary/5" : "border-white/10"}`}>
      <div className="flex items-center justify-between"><p className="text-sm font-black">Tier {tier} — "{name}"</p><span className="text-xs font-bold text-primary">{price}/mês</span></div>
      <p className="text-[9px] text-muted-foreground">{members} membros · MRR {mrr}</p>
      <div className="flex gap-1 mt-2 flex-wrap">{benefits.map(b => <span key={b} className="px-2 py-0.5 rounded-full bg-primary/10 text-[7px] text-primary">{b}</span>)}</div>
    </div>
  )
}

export function MemberRow({ username, tier, months, renew, actions }: { username: string; tier: number; months: number; renew: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">{username.slice(1,3).toUpperCase()}</div>
      <div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{username}</p><p className="text-[8px] text-muted-foreground">Tier {tier} · {months} meses · Renova {renew}</p></div>
      {actions && <div className="flex gap-1 shrink-0">{actions}</div>}
    </div>
  )
}

export function ChurnRiskCard({ username, tier, months, cancelDate, reason, actions }: { username: string; tier: number; months: number; cancelDate: string; reason?: string; actions?: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
      <div className="flex items-center justify-between"><p className="text-xs font-bold">{username}</p><span className="text-[8px] text-yellow-400 font-bold">Cancelou {cancelDate}</span></div>
      <p className="text-[8px] text-muted-foreground">Tier {tier} · {months} meses</p>
      {reason && <p className="text-[9px] italic mt-1">&ldquo;{reason}&rdquo;</p>}
      {actions && <div className="flex gap-1 mt-2">{actions}</div>}
    </div>
  )
}

export function BenefitToggleRow({ label, desc, active, onToggle }: { label: string; desc: string; active: boolean; onToggle?: () => void }) {
  return (
    <label className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10 cursor-pointer">
      <input type="checkbox" checked={active} onChange={onToggle} />
      <div className="flex-1"><p className="text-xs font-bold">{label}</p><p className="text-[8px] text-muted-foreground">{desc}</p></div>
    </label>
  )
}

export function OfferCard({ title, discount, validUntil, uses, maxUses }: { title: string; discount: string; validUntil: string; uses: number; maxUses: number }) {
  return (
    <div className="p-3 rounded-xl border border-primary/20 bg-primary/5">
      <p className="text-xs font-bold">{title}</p>
      <p className="text-[9px] text-primary font-bold">{discount}</p>
      <p className="text-[8px] text-muted-foreground">Até {validUntil} · {uses}/{maxUses} utilizações</p>
    </div>
  )
}
