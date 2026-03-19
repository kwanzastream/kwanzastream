"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Users, Ban, Shield, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchFilters } from "@/components/search/search-filters"
import { toast } from "sonner"
import Link from "next/link"

const FILTERS = [{ id: "active", label: "Activos" }, { id: "banned", label: "Banidos" }, { id: "inactive", label: "Inativos" }]
const MOCK = [
  { username: "beats_angola", displayName: "Beats Angola", status: "active" },
  { username: "kuduro_fan_01", displayName: "Kuduro Fan", status: "active" },
  { username: "spammer_x", displayName: "Spammer X", status: "banned" },
]

export default function TriboGerirMembrosPage() {
  const { slug } = useParams()
  const [filter, setFilter] = useState("active")

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}/gerir`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Gerir Membros</h1></div>
      <SearchFilters filters={FILTERS} active={filter} onChange={setFilter} />
      <div className="space-y-2">
        {MOCK.filter(m => filter === "active" ? m.status !== "banned" : filter === "banned" ? m.status === "banned" : true).map(m => (
          <div key={m.username} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">{m.displayName[0]}</div>
            <div className="flex-1"><p className="text-sm font-bold">@{m.username}</p></div>
            {m.status === "banned" ? <Badge className="text-[9px] bg-red-500/10 text-red-400">Banido</Badge> : (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px] gap-0.5" onClick={() => toast.success(`@${m.username} promovido a moderador`)}><Shield className="w-3 h-3" />Mod</Button>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px] gap-0.5 text-red-400" onClick={() => toast.success(`@${m.username} removido`)}><Trash2 className="w-3 h-3" /></Button>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px] gap-0.5 text-red-400" onClick={() => toast.success(`@${m.username} banido`)}><Ban className="w-3 h-3" /></Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
