"use client"

import { useEffect, useState, useCallback } from "react"
import { api } from "@/lib/api"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Search, MoreVertical, Ban, UserCheck, Eye, ChevronLeft, ChevronRight, Radio } from "lucide-react"
import Link from "next/link"

interface AdminUser { id: string; username: string; displayName: string; email: string; role: string; kycTier: number; isBanned: boolean; createdAt: string; balance: number; followerCount: number; avatarUrl?: string }
const ROLE_BADGE: Record<string, string> = { ADMIN: "bg-[#CE1126]/10 text-[#CE1126]", STREAMER: "bg-purple-500/10 text-purple-400", USER: "bg-muted text-muted-foreground" }

export default function AdminUtilizadoresPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const debouncedSearch = useDebounce(search, 400)
  const LIMIT = 25

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT), ...(debouncedSearch && { search: debouncedSearch }), ...(roleFilter !== "all" && { role: roleFilter }) })
      const res = await api.get(`/api/admin/users?${params}`)
      setUsers(res.data?.users || res.data || []); setTotal(res.data?.total ?? 0)
    } catch { toast.error("Erro ao carregar") } finally { setLoading(false) }
  }, [page, debouncedSearch, roleFilter])

  useEffect(() => { fetchUsers() }, [fetchUsers])
  useEffect(() => { setPage(1) }, [debouncedSearch, roleFilter])

  const handleBan = async (u: AdminUser) => {
    const action = u.isBanned ? "unban" : "ban"
    if (!confirm(`${u.isBanned ? "Desbanir" : "Banir"} @${u.username}?`)) return
    try { await api.post(`/api/admin/users/${u.id}/${action}`); toast.success(`@${u.username} ${action === "ban" ? "banido" : "desbanido"}`); fetchUsers() }
    catch (err: any) { toast.error(err?.response?.data?.message || "Erro") }
  }

  const handleChangeRole = async (userId: string, role: string) => {
    try { await api.put(`/api/admin/users/${userId}`, { role }); toast.success("Role actualizado"); fetchUsers() }
    catch { toast.error("Erro ao actualizar") }
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="space-y-3">
      <div><h1 className="text-lg font-bold">Utilizadores</h1><p className="text-xs text-muted-foreground">{total.toLocaleString("pt-AO")} registados</p></div>
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-xs"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar..." className="pl-8 h-8 text-xs" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <Select value={roleFilter} onValueChange={setRoleFilter}><SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos</SelectItem><SelectItem value="USER">Users</SelectItem><SelectItem value="STREAMER">Streamers</SelectItem><SelectItem value="ADMIN">Admins</SelectItem></SelectContent></Select>
      </div>
      <div className="border border-border/50 rounded-xl overflow-hidden">
        <table className="w-full"><thead className="bg-muted/30"><tr>{["Utilizador", "Role / KYC", "Saldo", "Seguidores", "Registado", "Acções"].map((h) => <th key={h} className="text-left px-3 py-2.5 text-[11px] font-semibold text-muted-foreground whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody>
            {loading ? Array(8).fill(0).map((_, i) => <tr key={i} className="border-t border-border/30"><td colSpan={6} className="px-3 py-2"><Skeleton className="h-8 w-full" /></td></tr>)
            : users.length === 0 ? <tr><td colSpan={6} className="text-center py-12 text-sm text-muted-foreground">Nenhum utilizador encontrado</td></tr>
            : users.map((u) => (
              <tr key={u.id} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                <td className="px-3 py-2"><div className="flex items-center gap-2"><Avatar className="w-7 h-7 shrink-0"><AvatarImage src={u.avatarUrl} /><AvatarFallback className="text-[10px]">{u.displayName?.slice(0, 2)}</AvatarFallback></Avatar><div><p className="text-xs font-medium flex items-center gap-1.5">{u.displayName}{u.isBanned && <Ban className="w-3 h-3 text-red-500" />}</p><p className="text-[10px] text-muted-foreground">@{u.username}</p></div></div></td>
                <td className="px-3 py-2"><div className="flex items-center gap-1.5"><Badge className={`text-[10px] h-4 px-1.5 ${ROLE_BADGE[u.role] ?? ROLE_BADGE.USER}`}>{u.role}</Badge>{u.kycTier > 0 && <Badge className="text-[10px] h-4 px-1.5 bg-green-500/10 text-green-500">KYC {u.kycTier}</Badge>}</div></td>
                <td className="px-3 py-2 text-xs">{((u.balance || 0) / 100).toLocaleString("pt-AO")} Kz</td>
                <td className="px-3 py-2 text-xs">{(u.followerCount || 0).toLocaleString("pt-AO")}</td>
                <td className="px-3 py-2 text-[11px] text-muted-foreground">{new Date(u.createdAt).toLocaleDateString("pt-AO")}</td>
                <td className="px-3 py-2"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="w-3.5 h-3.5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end">
                  <DropdownMenuItem asChild><Link href={`/${u.username}`} target="_blank"><Eye className="w-3.5 h-3.5 mr-2" />Ver perfil</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleChangeRole(u.id, u.role === "STREAMER" ? "USER" : "STREAMER")}><Radio className="w-3.5 h-3.5 mr-2" />{u.role === "STREAMER" ? "Remover Streamer" : "Tornar Streamer"}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className={u.isBanned ? "text-green-500" : "text-destructive"} onClick={() => handleBan(u)}>{u.isBanned ? <><UserCheck className="w-3.5 h-3.5 mr-2" />Desbanir</> : <><Ban className="w-3.5 h-3.5 mr-2" />Banir</>}</DropdownMenuItem>
                </DropdownMenuContent></DropdownMenu></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">Página {page} de {totalPages}</p><div className="flex gap-1"><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft className="w-3.5 h-3.5" /></Button><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight className="w-3.5 h-3.5" /></Button></div></div>}
    </div>
  )
}
