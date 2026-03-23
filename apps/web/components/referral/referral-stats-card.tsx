"use client"
interface ReferralStatsCardProps { linksShared: number; friendsRegistered: number; salosEarned: number }
export function ReferralStatsCard({ linksShared, friendsRegistered, salosEarned }: ReferralStatsCardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[{ label: "Links partilhados", value: linksShared }, { label: "Amigos registados", value: friendsRegistered }, { label: "Salos ganhos", value: `${salosEarned.toLocaleString()} Kz` }].map(s => <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"><p className="text-sm font-bold">{s.value}</p><p className="text-[9px] text-muted-foreground">{s.label}</p></div>)}
    </div>
  )
}
