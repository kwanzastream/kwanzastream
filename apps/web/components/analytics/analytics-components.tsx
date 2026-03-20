"use client"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function MetricCard({ icon, label, value, change, positive }: { icon: string; label: string; value: string; change?: string; positive?: boolean }) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-center gap-2 mb-2"><span className="text-sm">{icon}</span><p className="text-[9px] text-muted-foreground uppercase tracking-wide">{label}</p></div>
      <p className="text-xl font-black">{value}</p>
      {change && <p className={`text-[9px] font-bold flex items-center gap-0.5 mt-1 ${positive === true ? "text-green-400" : positive === false ? "text-red-400" : "text-muted-foreground"}`}>{positive === true ? <TrendingUp className="w-3 h-3" /> : positive === false ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}{change}</p>}
    </div>
  )
}

export function PeriodSelector({ period, onChange }: { period: string; onChange: (p: string) => void }) {
  return (
    <div className="flex gap-1">{["7d","30d","90d","1y"].map(p => <button key={p} onClick={() => onChange(p)} className={`px-3 py-1 rounded-full text-[10px] font-bold ${period === p ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>{p === "7d" ? "7 dias" : p === "30d" ? "30 dias" : p === "90d" ? "90 dias" : "1 ano"}</button>)}</div>
  )
}

export function SimpleLineChart({ data, color }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="h-32 flex items-end gap-1">{data.map((d, i) => <div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="w-full rounded-t" style={{ height: `${(d.value / max) * 100}%`, minHeight: 2, background: color || "hsl(var(--primary))" }} /><span className="text-[7px] text-muted-foreground">{d.label}</span></div>)}</div>
  )
}

export function SimpleBarChart({ data, color }: { data: { label: string; value: number }[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="space-y-1">{data.map((d, i) => <div key={i} className="flex items-center gap-2"><span className="text-[8px] text-muted-foreground w-16 text-right shrink-0">{d.label}</span><div className="flex-1 h-4 rounded bg-white/5"><div className="h-4 rounded transition-all" style={{ width: `${(d.value / max) * 100}%`, background: color || "hsl(var(--primary))" }} /></div><span className="text-[8px] font-bold w-10 shrink-0">{d.value.toLocaleString()}</span></div>)}</div>
  )
}

export function HeatmapGrid({ data }: { data: number[][] }) {
  const days = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"]
  const hours = ["06","09","12","15","18","20","22","00"]
  const max = Math.max(...data.flat(), 1)
  return (
    <div className="overflow-x-auto"><table className="w-full"><thead><tr><th />{days.map(d => <th key={d} className="text-[8px] text-muted-foreground font-normal px-1">{d}</th>)}</tr></thead><tbody>{hours.map((h, hi) => <tr key={h}><td className="text-[8px] text-muted-foreground pr-2">{h}h</td>{days.map((_, di) => { const v = data[hi]?.[di] || 0; const opacity = max > 0 ? v / max : 0; return <td key={di} className="p-0.5"><div className="w-full aspect-square rounded-sm" style={{ background: `hsl(var(--primary) / ${Math.max(0.05, opacity)})` }} /></td> })}</tr>)}</tbody></table></div>
  )
}

export function InsightCard({ icon, text }: { icon: string; text: string }) {
  return <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20"><span className="text-sm shrink-0">{icon}</span><p className="text-[10px] text-muted-foreground">{text}</p></div>
}

export function StreamListItem({ title, date, duration, viewers, salos, followers, href }: { title: string; date: string; duration: string; viewers: number; salos: number; followers: number; href?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20 transition-all">
      <div className="w-16 h-10 rounded bg-primary/10 flex items-center justify-center text-xs shrink-0">🎬</div>
      <div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{title}</p><p className="text-[8px] text-muted-foreground">{date} · {duration}</p></div>
      <div className="text-right text-[8px] text-muted-foreground shrink-0"><p>👁 {viewers} · 💛 {salos.toLocaleString()} Kz</p><p>👥 +{followers}</p></div>
    </div>
  )
}
