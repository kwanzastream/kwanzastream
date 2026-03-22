"use client"
import { useState, useEffect } from "react"
import { HistoryNav } from "@/components/history/history-nav"
import { HistoryItemSearch } from "@/components/history/history-item-search"
import { HistoryEmptyState } from "@/components/history/history-empty-state"
import api from "@/lib/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function PesquisasPage() {
  const [items, setItems] = useState<any[]>([])
  const router = useRouter()
  useEffect(() => { api.get("/api/history/searches").then(r => setItems(r.data || [])).catch(() => setItems([{ id: "s1", query: "kuduro ao vivo", searchedAt: "há 2h" }, { id: "s2", query: "girabola gaming", searchedAt: "há 4h" }, { id: "s3", query: "angola gaming cup", searchedAt: "há 2d" }])) }, [])
  const remove = (id: string) => { setItems(items.filter(i => i.id !== id)); toast.success("Removido") }
  const repeat = (q: string) => router.push(`/explore?q=${encodeURIComponent(q)}`)
  const clearAll = () => { api.delete("/api/history/searches").catch(() => {}); setItems([]); toast.success("Pesquisas limpas") }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-lg font-bold">Histórico</h1>
      <HistoryNav />
      <div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Pesquisas recentes</h2>{items.length > 0 && <button onClick={clearAll} className="text-[10px] text-red-400 hover:underline">Limpar tudo</button>}</div>
      {items.length === 0 ? <HistoryEmptyState type="pesquisas" /> : <div>{items.map(i => <HistoryItemSearch key={i.id} {...i} onRepeat={repeat} onRemove={remove} />)}</div>}
    </div>
  )
}
