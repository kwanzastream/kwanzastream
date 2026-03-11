"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, Zap } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

export default function AdminPagamentosPage() {
  const [stats, setStats] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const debSearch = useDebounce(search, 400)
  const LIMIT = 25

  useEffect(() => { api.get("/api/admin/payments/stats").then((r) => setStats(r.data)).catch(() => {}) }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(LIMIT), ...(debSearch && { search: debSearch }), ...(typeFilter !== "all" && { type: typeFilter }) })
    api.get(`/api/admin/payments?${params}`).then((r) => { setTransactions(r.data?.transactions || r.data || []); setTotal(r.data?.total ?? 0) }).catch(() => {}).finally(() => setLoading(false))
  }, [page, debSearch, typeFilter])

  useEffect(() => { setPage(1) }, [debSearch, typeFilter])

  const formatKz = (n: number) => `${((n || 0) / 100).toLocaleString("pt-AO")} Kz`
  const TX_ICONS: Record<string, any> = { DEPOSIT: ArrowDownLeft, WITHDRAWAL: ArrowUpRight, DONATION_SENT: Zap, DONATION_RECEIVED: Zap }
  const TX_COLORS: Record<string, string> = { DEPOSIT: "text-green-400", WITHDRAWAL: "text-red-400", DONATION_SENT: "text-yellow-400", DONATION_RECEIVED: "text-yellow-400" }
  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Pagamentos</h1>
      {stats && <div className="grid grid-cols-3 gap-3">{[{ label: "Receita total", value: formatKz(stats.totalRevenue ?? 0) }, { label: "Comissão plataforma", value: formatKz(stats.platformCommission ?? 0) }, { label: "Transacções hoje", value: stats.transactionsToday?.toLocaleString("pt-AO") ?? "0" }].map((s) => <Card key={s.label} className="border-border/50"><CardContent className="pt-3 pb-3"><p className="text-[11px] text-muted-foreground">{s.label}</p><p className="text-lg font-bold mt-1">{s.value}</p></CardContent></Card>)}</div>}
      <div className="flex gap-2">
        <div className="relative flex-1 max-w-xs"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar..." className="pl-8 h-8 text-xs" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="w-40 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Todos os tipos</SelectItem><SelectItem value="DEPOSIT">Depósitos</SelectItem><SelectItem value="WITHDRAWAL">Levantamentos</SelectItem><SelectItem value="DONATION_SENT">Salos enviados</SelectItem></SelectContent></Select>
      </div>
      <div className="border border-border/50 rounded-xl overflow-hidden">
        <table className="w-full"><thead className="bg-muted/30"><tr>{["Utilizador", "Tipo", "Valor", "Estado", "Data"].map((h) => <th key={h} className="text-left px-3 py-2.5 text-[11px] font-semibold text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>
            {loading ? Array(8).fill(0).map((_, i) => <tr key={i} className="border-t border-border/30"><td colSpan={5} className="px-3 py-2"><Skeleton className="h-8 w-full" /></td></tr>)
            : transactions.length === 0 ? <tr><td colSpan={5} className="text-center py-10 text-sm text-muted-foreground">Sem transacções</td></tr>
            : transactions.map((tx) => { const Icon = TX_ICONS[tx.type] ?? Zap; const color = TX_COLORS[tx.type] ?? "text-muted-foreground"; return (
              <tr key={tx.id} className="border-t border-border/30 hover:bg-muted/20">
                <td className="px-3 py-2 text-xs">@{tx.user?.username ?? "—"}</td>
                <td className="px-3 py-2"><span className={`flex items-center gap-1 text-xs ${color}`}><Icon className="w-3 h-3" />{tx.type}</span></td>
                <td className="px-3 py-2 text-xs font-medium">{formatKz(Number(tx.amount))}</td>
                <td className="px-3 py-2"><Badge className="text-[10px] h-4 px-1.5">{tx.status}</Badge></td>
                <td className="px-3 py-2 text-[11px] text-muted-foreground">{new Date(tx.createdAt).toLocaleDateString("pt-AO")}</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">Página {page} de {totalPages}</p><div className="flex gap-1"><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft className="w-3.5 h-3.5" /></Button><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight className="w-3.5 h-3.5" /></Button></div></div>}
    </div>
  )
}
