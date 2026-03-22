"use client"
interface AuditLogItemProps { admin: string; role: string; action: string; target?: string; ip: string; timestamp: string; details?: any }
export function AuditLogItem({ admin, role, action, target, ip, timestamp, details }: AuditLogItemProps) {
  return (
    <div className="flex items-start gap-3 p-2 rounded-lg border border-white/5 hover:border-white/10 transition-all">
      <p className="text-[9px] text-muted-foreground w-28 shrink-0">{timestamp}</p>
      <div className="flex-1">
        <p className="text-xs"><strong>@{admin}</strong> <span className="text-muted-foreground">({role})</span> · {ip}</p>
        <p className="text-[10px] text-muted-foreground">→ {action}{target ? ` | ${target}` : ""}{details ? ` | ${JSON.stringify(details)}` : ""}</p>
      </div>
    </div>
  )
}
