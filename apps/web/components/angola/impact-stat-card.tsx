"use client"
interface ImpactStatCardProps { label: string; value: string | number; icon: string; suffix?: string }
export function ImpactStatCard({ label, value, icon, suffix }: ImpactStatCardProps) {
  return (
    <div className="p-4 rounded-xl border border-white/10 text-center space-y-1">
      <span className="text-2xl">{icon}</span>
      <p className="text-lg font-bold">{typeof value === "number" ? value.toLocaleString("pt-AO") : value}{suffix && <span className="text-xs text-muted-foreground ml-1">{suffix}</span>}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}
