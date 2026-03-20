"use client"
import { Button } from "@/components/ui/button"

export function ModLogItem({ time, user, content, type }: { time: string; user: string; content: string; type: "normal" | "automod" | "mod" | "deleted" | "ban" | "timeout" }) {
  const icons: Record<string, string> = { normal: "✅", automod: "🔴", mod: "⚠️", deleted: "🗑️", ban: "🚫", timeout: "⏱️" }
  return (
    <div className="flex items-start gap-2 py-1.5 border-b border-white/5">
      <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap w-12 shrink-0">{time}</span>
      <span className="text-sm">{icons[type]}</span>
      <div className="flex-1 min-w-0"><span className="text-[9px] font-bold">{user}</span><p className="text-[9px] text-muted-foreground truncate">{content}</p></div>
    </div>
  )
}

export function ReportCard({ reporter, reported, reason, message, actions }: { reporter: string; reported: string; reason: string; message?: string; actions?: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
      <div className="flex justify-between"><p className="text-xs font-bold">{reporter} reportou {reported}</p></div>
      <p className="text-[9px] text-muted-foreground">{reason}</p>
      {message && <p className="text-[9px] mt-1 p-2 rounded bg-white/5 italic truncate">&ldquo;{message}&rdquo;</p>}
      {actions && <div className="flex gap-1 mt-2">{actions}</div>}
    </div>
  )
}

export function AppealCard({ username, banDate, message, actions }: { username: string; banDate: string; message: string; actions?: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5">
      <div className="flex justify-between"><p className="text-xs font-bold">{username}</p><span className="text-[8px] text-muted-foreground">Ban: {banDate}</span></div>
      <p className="text-[9px] mt-1 italic">&ldquo;{message}&rdquo;</p>
      {actions && <div className="flex gap-1 mt-2">{actions}</div>}
    </div>
  )
}

export function ProtectionToggleCard({ icon, title, desc, active }: { icon: string; title: string; desc: string; active: boolean }) {
  return (
    <label className="flex items-center gap-3 p-3 rounded-xl border border-white/10 cursor-pointer">
      <span className="text-lg">{icon}</span>
      <div className="flex-1"><p className="text-xs font-bold">{title}</p><p className="text-[8px] text-muted-foreground">{desc}</p></div>
      <input type="checkbox" defaultChecked={active} />
    </label>
  )
}
