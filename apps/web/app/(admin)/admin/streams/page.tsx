"use client"

import { useEffect, useState, useCallback } from "react"
import { api } from "@/lib/api"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Search, Radio, Eye, Square, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

interface AdminStream { id: string; title: string; status: string; category: string; viewerCount: number; peakViewers: number; startedAt: string; streamer: { id: string; username: string; displayName: string } }
const STATUS_BADGE: Record<string, string> = { LIVE: "bg-[#CE1126]/10 text-[#CE1126] border-[#CE1126]/20", ENDED: "bg-muted text-muted-foreground", SUSPENDED: "bg-yellow-500/10 text-yellow-500" }

export default function AdminStreamsPage() {
  const [streams, setStreams] = useState<AdminStream[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const debouncedSearch = useDebounce(search, 400)
  const LIMIT = 25

  const fetchStreams = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT), ...(debouncedSearch && { search: debouncedSearch }), ...(statusFilter !== "all" && { status: statusFilter }) })
      const res = await api.get(`/api/admin/streams?${params}`)
      setStreams(res.data?.streams || res.data || []); setTotal(res.data?.total ?? 0)
    } catch { toast.error("Erro ao carregar streams") } finally { setLoading(false) }
  }, [page, debouncedSearch, statusFilter])

  useEffect(() => { fetchStreams() }, [fetchStreams])
  useEffect(() => { setPage(1) }, [debouncedSearch, statusFilter])

  const handleEndStream = async (s: AdminStream) => {
    if (!confirm(`Terminar stream de @${s.streamer.username}?`)) return
    try { await api.post(`/api/admin/streams/${s.id}/end`); toast.success("Stream terminado"); fetchStreams() }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro") }
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="space-y-3">
      <div><h1 className="text-lg font-bold">Streams</h1><p className="text-xs text-muted-foreground">{total.toLocaleString("pt-AO")} total</p></div>
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-xs"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar..." className="pl-8 h-8 text-xs" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="LIVE">Ao vivo</SelectItem><SelectItem value="ENDED">Terminados</SelectItem></SelectContent></Select>
      </div>
      <div className="border border-border/50 rounded-xl overflow-hidden">
        <table className="w-full"><thead className="bg-muted/30"><tr>{["Stream", "Estado", "Viewers", "Iniciado", "Acções"].map((h) => <th key={h} className="text-left px-3 py-2.5 text-[11px] font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {loading ? Array(8).fill(0).map((_, i) => <tr key={i} className="border-t border-border/30"><td colSpan={5} className="px-3 py-2"><Skeleton className="h-8 w-full" /></td></tr>)
            : streams.length === 0 ? <tr><td colSpan={5} className="text-center py-12 text-sm text-muted-foreground">Nenhum stream encontrado</td></tr>
            : streams.map((s) => (
              <tr key={s.id} className="border-t border-border/30 hover:bg-muted/20">
                <td className="px-3 py-2 max-w-xs"><p className="text-xs font-medium truncate">{s.title}</p><p className="text-[10px] text-muted-foreground">@{s.streamer?.username} · {s.category}</p></td>
                <td className="px-3 py-2"><Badge className={`text-[10px] h-4 px-1.5 border ${STATUS_BADGE[s.status] ?? STATUS_BADGE.ENDED}`}>{s.status === "LIVE" && <span className="w-1.5 h-1.5 bg-[#CE1126] rounded-full mr-1 animate-pulse inline-block" />}{s.status}</Badge></td>
                <td className="px-3 py-2 text-xs">{s.viewerCount > 0 ? <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{s.viewerCount}</span> : <span className="text-muted-foreground">{s.peakViewers} peak</span>}</td>
                <td className="px-3 py-2 text-[11px] text-muted-foreground">{new Date(s.startedAt).toLocaleDateString("pt-AO")}</td>
                <td className="px-3 py-2"><div className="flex items-center gap-1"><Link href={`/stream/${s.streamer?.username}`} target="_blank"><Button variant="ghost" size="icon" className="h-6 w-6"><ExternalLink className="w-3 h-3" /></Button></Link>{s.status === "LIVE" && <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => handleEndStream(s)} title="Terminar stream"><Square className="w-3 h-3" /></Button>}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">Página {page} de {totalPages}</p><div className="flex gap-1"><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft className="w-3.5 h-3.5" /></Button><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight className="w-3.5 h-3.5" /></Button></div></div>}
    </div>
  )
}
