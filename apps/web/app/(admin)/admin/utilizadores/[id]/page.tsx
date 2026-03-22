"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AdminConfirmModal } from "@/components/admin/admin-confirm-modal"
import Link from "next/link"
import api from "@/lib/api"
import { toast } from "sonner"
export default function UtilizadorDetailPage() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null); const [modal, setModal] = useState<string | null>(null); const [reason, setReason] = useState("")
  useEffect(() => { api.get(`/api/admin/users/${id}`).then(r => setUser(r.data)).catch(() => setUser({ id, username: `user-${(id as string).slice(0,6)}`, email: "user@ao.co", role: "user", isVerified: true, createdAt: "2026-03-10", status: "active" })) }, [id])
  const handleAction = async (action: string) => {
    try { await api.patch(`/api/admin/users/${id}/${action}`, { reason }); toast.success(`${action} executado`); setModal(null); setReason("") } catch { toast.error("Erro") }
  }
  if (!user) return null
  const tabs = [{ l: "Actividade", h: "actividade" }, { l: "Streams", h: "streams" }, { l: "Pagamentos", h: "pagamentos" }, { l: "Reports", h: "reports" }, { l: "Logs", h: "logs" }]
  return (<div className="space-y-6">
    <div className="flex items-center justify-between"><div><h1 className="text-xl font-bold">@{user.username}</h1><p className="text-xs text-muted-foreground">{user.email} · {user.role} · {user.isVerified ? "✅ Verificado" : "❌ Não verificado"}</p></div><span className={`px-2 py-0.5 rounded text-[10px] ${user.status === "active" ? "bg-green-500/10 text-green-400" : user.status === "suspended" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>{user.status}</span></div>
    <div className="flex gap-2 flex-wrap">{tabs.map(t => <Link key={t.h} href={`/admin/utilizadores/${id}/${t.h}`} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] hover:border-primary/20">{t.l}</Link>)}</div>
    <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setModal("suspend")} className="text-[10px] h-7">🔒 Suspender</Button><Button size="sm" variant="destructive" onClick={() => setModal("ban")} className="text-[10px] h-7">🚫 Banir</Button><Button size="sm" variant="outline" onClick={() => handleAction("verify")} className="text-[10px] h-7">✅ Verificar</Button></div>
    <AdminConfirmModal open={modal === "suspend"} title="Suspender utilizador" message={`Suspender @${user.username}?`} onConfirm={() => handleAction("suspend")} onCancel={() => setModal(null)} destructive requireReason reason={reason} onReasonChange={setReason} />
    <AdminConfirmModal open={modal === "ban"} title="Banir utilizador" message={`Banir permanentemente @${user.username}?`} onConfirm={() => handleAction("ban")} onCancel={() => setModal(null)} destructive requireReason reason={reason} onReasonChange={setReason} />
  </div>)
}
