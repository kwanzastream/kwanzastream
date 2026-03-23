"use client"
interface ReferralRewardProgressProps { count: number }
export function ReferralRewardProgress({ count }: ReferralRewardProgressProps) {
  const milestones = [{ at: 5, label: "+500 Salos extra", done: count >= 5 }, { at: 10, label: "+1.500 Salos extra", done: count >= 10 }, { at: 25, label: 'Badge "Embaixador"', done: count >= 25 }]
  const nextMilestone = milestones.find(m => !m.done)
  const pct = nextMilestone ? Math.min((count / nextMilestone.at) * 100, 100) : 100
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[10px]"><span className="text-muted-foreground">Progresso</span>{nextMilestone && <span className="text-muted-foreground">{count}/{nextMilestone.at} amigos</span>}</div>
      <div className="w-full h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} /></div>
      {nextMilestone && <p className="text-[9px] text-muted-foreground">Próximo bónus: <span className="text-primary">{nextMilestone.label}</span> — faltam {nextMilestone.at - count} amigos</p>}
      <div className="space-y-1">{milestones.map(m => <div key={m.at} className="flex items-center gap-2 text-[10px]"><span>{m.done ? "✅" : "⬜"}</span><span className={m.done ? "text-foreground" : "text-muted-foreground"}>{m.at} amigos — {m.label}</span></div>)}</div>
    </div>
  )
}
