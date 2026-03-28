"use client"

import { useState } from "react"
import { Search, Filter, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"

interface Column { key: string; label: string; width?: string }
interface AdminPageProps {
  title: string
  description: string
  icon: string
  columns: Column[]
  data: Record<string, any>[]
  actions?: { label: string; variant?: "primary" | "outline" }[]
}

export function AdminPage({ title, description, icon, columns, data, actions }: AdminPageProps) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = data.filter((row) =>
    Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
  )
  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2"><span>{icon}</span>{title}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
        <div className="flex gap-2">
          {actions?.map((a) => (
            <button key={a.label} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${a.variant === "primary" ? "bg-primary text-white hover:bg-primary/90" : "border border-white/10 hover:bg-white/5"}`}>{a.label}</button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Pesquisar..." className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-primary/50 focus:outline-none" />
        </div>
        <button className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5"><Filter className="w-3.5 h-3.5 text-muted-foreground" /></button>
        <button className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5"><Download className="w-3.5 h-3.5 text-muted-foreground" /></button>
        <button className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5"><RefreshCw className="w-3.5 h-3.5 text-muted-foreground" /></button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                {columns.map((col) => (
                  <th key={col.key} className="text-left text-xs font-medium text-muted-foreground px-3 py-2" style={{ width: col.width }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={columns.length} className="text-center py-8 text-sm text-muted-foreground">Nenhum resultado encontrado</td></tr>
              ) : paged.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-3 py-2.5 text-xs">{row[col.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 rounded disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
          <span>{page}/{totalPages || 1}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-1 rounded disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  )
}
