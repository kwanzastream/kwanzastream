"use client"
import { Check, Shield, AlertTriangle, Clock, Loader2 } from "lucide-react"

export interface KYCStatusData { status: "none" | "pending" | "approved" | "rejected"; submittedAt?: string; reason?: string }

export function KYCStatusCard({ kyc }: { kyc: KYCStatusData }) {
  if (kyc.status === "approved") return <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-3"><Check className="w-5 h-5 text-green-400 shrink-0" /><div><p className="text-sm font-bold text-green-400">KYC Aprovado</p><p className="text-[9px] text-muted-foreground">Levantamentos sem limites adicionais</p></div></div>
  if (kyc.status === "pending") return <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-center gap-3"><Loader2 className="w-5 h-5 text-yellow-400 animate-spin shrink-0" /><div><p className="text-sm font-bold text-yellow-400">Em Análise</p><p className="text-[9px] text-muted-foreground">Revisão em 24–48h{kyc.submittedAt && ` · Submetido: ${kyc.submittedAt}`}</p></div></div>
  if (kyc.status === "rejected") return <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-red-400 shrink-0" /><div><p className="text-sm font-bold text-red-400">Rejeitado</p><p className="text-[9px] text-muted-foreground">{kyc.reason || "Motivo não especificado"}</p></div></div>
  return <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"><Shield className="w-5 h-5 text-muted-foreground shrink-0" /><div><p className="text-sm font-bold">Verificação necessária</p><p className="text-[9px] text-muted-foreground">Obrigatório para levantamentos &gt; 50.000 Kz/mês</p></div></div>
}
