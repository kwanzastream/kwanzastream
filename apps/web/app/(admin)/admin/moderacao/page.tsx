"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { AlertTriangle, CheckCircle, XCircle, Ban, User, MessageSquare, Radio } from "lucide-react"

interface Report { id: string; type: string; reason: string; status: string; createdAt: string; reporter: { username: string; displayName: string }; targetUser?: { id: string; username: string; displayName: string; isBanned: boolean }; targetStream?: { id: string; title: string }; description?: string }
const REPORT_TYPE_ICON: Record<string, any> = { USER: User, STREAM: Radio, MESSAGE: MessageSquare }
const STATUS_CONFIG: Record<string, { label: string; cls: string }> = { PENDING: { label: "Pendente", cls: "bg-yellow-500/10 text-yellow-500" }, RESOLVED: { label: "Resolvido", cls: "bg-green-500/10 text-green-500" }, DISMISSED: { label: "Dispensado", cls: "bg-muted text-muted-foreground" } }

export default function AdminModeracaoPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [bans, setBans] = useState<any[]>([])
  const [bansLoading, setBansLoading] = useState(false)

  useEffect(() => { api.get("/api/admin/reports?status=PENDING").then((res) => setReports(res.data?.reports || res.data || [])).catch(() => {}).finally(() => setLoading(false)) }, [])

  const loadBans = () => { setBansLoading(true); api.get("/api/admin/bans").then((r) => setBans(r.data?.bans || r.data || [])).catch(() => {}).finally(() => setBansLoading(false)) }

  const handleResolve = async (id: string, action: "RESOLVED" | "DISMISSED") => {
    try { await api.put(`/api/admin/reports/${id}`, { status: action }); setReports((p) => p.filter((r) => r.id !== id)); toast.success(action === "RESOLVED" ? "Report resolvido" : "Report dispensado") }
    catch { toast.error("Erro ao actualizar") }
  }

  const handleBanFromReport = async (report: Report) => {
    if (!report.targetUser || !confirm(`Banir @${report.targetUser.username} e resolver report?`)) return
    try { await api.post(`/api/admin/users/${report.targetUser.id}/ban`); await api.put(`/api/admin/reports/${report.id}`, { status: "RESOLVED" }); setReports((p) => p.filter((r) => r.id !== report.id)); toast.success(`@${report.targetUser.username} banido`) }
    catch { toast.error("Erro") }
  }

  return (
    <div className="space-y-4">
      <div><h1 className="text-lg font-bold">Moderação</h1><p className="text-xs text-muted-foreground">Gestão de reports e banimentos</p></div>
      <Tabs defaultValue="reports" onValueChange={(v) => { if (v === "banimentos") loadBans() }}>
        <TabsList><TabsTrigger value="reports">Reports{reports.length > 0 && <Badge className="ml-1.5 h-4 text-[10px] px-1 bg-[#CE1126]">{reports.length}</Badge>}</TabsTrigger><TabsTrigger value="banimentos">Banimentos</TabsTrigger></TabsList>
        <TabsContent value="reports" className="space-y-3 mt-3">
          {loading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />) : reports.length === 0 ? <div className="text-center py-12"><CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3 opacity-50" /><p className="font-medium">Nenhum report pendente</p></div>
          : reports.map((r) => { const TypeIcon = REPORT_TYPE_ICON[r.type] ?? AlertTriangle; return (
            <div key={r.id} className="p-4 rounded-xl border border-border/50 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0"><TypeIcon className="w-4 h-4 text-yellow-500" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><p className="text-sm font-medium">Report de {r.type.toLowerCase()}</p><Badge className={`text-[10px] h-4 px-1.5 ${STATUS_CONFIG[r.status]?.cls}`}>{STATUS_CONFIG[r.status]?.label}</Badge></div>
                  <p className="text-xs text-muted-foreground mt-0.5">Por @{r.reporter?.username} · Motivo: {r.reason}</p>
                  {r.targetUser && <p className="text-xs mt-1">Reportado: <span className="font-medium">@{r.targetUser.username}</span>{r.targetUser.isBanned && <Badge className="ml-2 text-[10px] h-4 bg-red-500/10 text-red-500">JÁ BANIDO</Badge>}</p>}
                  {r.description && <p className="text-xs text-muted-foreground mt-1 italic">&quot;{r.description}&quot;</p>}
                </div>
                <p className="text-[10px] text-muted-foreground shrink-0">{new Date(r.createdAt).toLocaleDateString("pt-AO")}</p>
              </div>
              <div className="flex gap-2 pt-1">
                {r.targetUser && !r.targetUser.isBanned && <Button size="sm" variant="destructive" className="h-7 text-xs gap-1.5" onClick={() => handleBanFromReport(r)}><Ban className="w-3 h-3" />Banir utilizador</Button>}
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5" onClick={() => handleResolve(r.id, "RESOLVED")}><CheckCircle className="w-3 h-3" />Resolver</Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs gap-1.5 text-muted-foreground" onClick={() => handleResolve(r.id, "DISMISSED")}><XCircle className="w-3 h-3" />Dispensar</Button>
              </div>
            </div>
          )})}
        </TabsContent>
        <TabsContent value="banimentos" className="mt-3">
          {bansLoading ? <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
          : bans.length === 0 ? <div className="text-center py-12"><p className="text-sm text-muted-foreground">Nenhum utilizador banido</p></div>
          : <div className="space-y-2">{bans.map((ban: any) => <div key={ban.id || ban.userId} className="flex items-center gap-3 p-3 rounded-xl border border-border/50"><Ban className="w-4 h-4 text-red-500 shrink-0" /><div className="flex-1"><p className="text-sm font-medium">@{ban.username || ban.user?.username}</p><p className="text-xs text-muted-foreground">{ban.reason || "Sem motivo"}</p></div><Button size="sm" variant="ghost" className="h-7 text-xs text-green-500 hover:text-green-500" onClick={async () => { try { await api.post(`/api/admin/users/${ban.id || ban.userId}/unban`); setBans((p) => p.filter((b) => (b.id || b.userId) !== (ban.id || ban.userId))); toast.success("Desbanido") } catch { toast.error("Erro") } }}>Desbanir</Button></div>)}</div>}
        </TabsContent>
      </Tabs>
    </div>
  )
}
