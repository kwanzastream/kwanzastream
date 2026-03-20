"use client"
import { Eye, Lock, Users, Loader2, AlertTriangle } from "lucide-react"

export function ContentStatusBadge({ status }: { status: "public" | "private" | "followers" | "processing" | "failed" }) {
  const map = { public: { icon: "🟢", label: "Público", cls: "text-green-400" }, private: { icon: "🔒", label: "Privado", cls: "text-muted-foreground" }, followers: { icon: "👥", label: "Seguidores", cls: "text-blue-400" }, processing: { icon: "⚙️", label: "Processando", cls: "text-yellow-400" }, failed: { icon: "❌", label: "Falhou", cls: "text-red-400" } }
  const s = map[status]
  return <span className={`text-[8px] font-bold ${s.cls}`}>{s.icon} {s.label}</span>
}

export function ContentListItem({ title, subtitle, duration, views, status, actions }: { title: string; subtitle: string; duration?: string; views?: number; status: "public" | "private" | "followers" | "processing" | "failed"; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/20 transition-all">
      <div className="w-20 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-xs shrink-0">🎬</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold truncate">{title}</p>
        <p className="text-[8px] text-muted-foreground">{subtitle}{duration && ` · ${duration}`}{views !== undefined && ` · ${views.toLocaleString()} views`}</p>
        <ContentStatusBadge status={status} />
      </div>
      {actions && <div className="flex gap-1 shrink-0">{actions}</div>}
    </div>
  )
}

export function CopyrightClaimCard({ content, claimant, type, status }: { content: string; claimant: string; type: string; status: "pending" | "contested" | "resolved" }) {
  const statusMap = { pending: { label: "Pendente", cls: "text-yellow-400 bg-yellow-500/10" }, contested: { label: "Contestado", cls: "text-blue-400 bg-blue-500/10" }, resolved: { label: "Resolvido", cls: "text-green-400 bg-green-500/10" } }
  const s = statusMap[status]
  return (
    <div className="p-3 rounded-xl border border-white/10">
      <div className="flex items-center justify-between"><p className="text-xs font-bold">{content}</p><span className={`px-2 py-0.5 rounded-full text-[8px] font-bold ${s.cls}`}>{s.label}</span></div>
      <p className="text-[8px] text-muted-foreground mt-1">Reclamante: {claimant} · Tipo: {type}</p>
    </div>
  )
}
