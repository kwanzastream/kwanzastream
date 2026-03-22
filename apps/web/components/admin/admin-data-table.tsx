"use client"
import { useState } from "react"

interface Column<T> { key: keyof T; label: string; render?: (value: any, row: T) => React.ReactNode }
interface AdminDataTableProps<T> { columns: Column<T>[]; data: T[]; searchable?: boolean; exportable?: boolean; onRowClick?: (row: T) => void }

export function AdminDataTable<T extends { id?: string }>({ columns, data, searchable, exportable, onRowClick }: AdminDataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const pageSize = 20
  const filtered = search ? data.filter(row => columns.some(c => String(row[c.key]).toLowerCase().includes(search.toLowerCase()))) : data
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize)
  const totalPages = Math.ceil(filtered.length / pageSize)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {searchable && <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="px-3 py-1.5 rounded-lg border border-white/10 bg-transparent text-xs w-64 focus:outline-none focus:border-primary" />}
        {exportable && <button onClick={() => {}} className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] hover:border-white/20">📥 Export CSV</button>}
        <span className="text-[10px] text-muted-foreground ml-auto">{filtered.length} resultados</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-xs">
          <thead><tr className="border-b border-white/5">{columns.map(c => <th key={String(c.key)} className="px-3 py-2 text-left text-[10px] text-muted-foreground font-medium">{c.label}</th>)}</tr></thead>
          <tbody>{paged.map((row, i) => <tr key={(row as any).id || i} onClick={() => onRowClick?.(row)} className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer">{columns.map(c => <td key={String(c.key)} className="px-3 py-2">{c.render ? c.render(row[c.key], row) : String(row[c.key] ?? "")}</td>)}</tr>)}</tbody>
        </table>
      </div>
      {totalPages > 1 && <div className="flex items-center justify-center gap-2">{Array.from({ length: Math.min(totalPages, 5) }, (_, i) => <button key={i} onClick={() => setPage(i)} className={`w-6 h-6 rounded text-[10px] ${page === i ? "bg-primary text-white" : "border border-white/10"}`}>{i + 1}</button>)}</div>}
    </div>
  )
}
