"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SearchFilters } from "@/components/search/search-filters"
import Link from "next/link"

const STATUS_FILTERS = [{ id: "all", label: "Todos" }, { id: "confirmed", label: "Confirmado" }, { id: "eliminated", label: "Eliminado" }, { id: "playing", label: "A disputar" }]

const MOCK = [
  { username: "fifa_king_ao", displayName: "FIFA King AO", seed: 1, status: "playing", country: "Luanda" },
  { username: "goal_master", displayName: "Goal Master", seed: 2, status: "playing", country: "Benguela" },
  { username: "dribble_god", displayName: "Dribble God", seed: 3, status: "eliminated", country: "Luanda" },
  { username: "striker_ao", displayName: "Striker AO", seed: 4, status: "confirmed", country: "Huambo" },
]

const statusBadge: Record<string, string> = { confirmed: "bg-blue-500/10 text-blue-400", eliminated: "bg-red-500/10 text-red-400", playing: "bg-green-500/10 text-green-400", winner: "bg-yellow-500/10 text-yellow-400" }

export default function TorneioParticipantesPage() {
  const { id } = useParams()
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const filtered = MOCK.filter(p => (filter === "all" || p.status === filter) && (!search || p.displayName.toLowerCase().includes(search.toLowerCase())))

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/torneios/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold flex items-center gap-2"><Users className="w-5 h-5" />Participantes</h1></div>
      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar..." className="pl-9 h-9 bg-white/5 border-white/10" /></div>
      </div>
      <SearchFilters filters={STATUS_FILTERS} active={filter} onChange={setFilter} />
      <div className="space-y-2">
        {filtered.map(p => (
          <Link key={p.username} href={`/${p.username}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
            <span className="text-xs font-mono text-muted-foreground w-6">#{p.seed}</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{p.displayName[0]}</div>
            <div className="flex-1"><p className="text-sm font-bold">{p.displayName}</p><p className="text-[10px] text-muted-foreground">@{p.username} · {p.country}</p></div>
            <Badge className={`text-[9px] ${statusBadge[p.status] || ""}`}>{p.status === "confirmed" ? "Confirmado" : p.status === "eliminated" ? "Eliminado" : p.status === "playing" ? "A disputar" : "Vencedor"}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
