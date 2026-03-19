"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { TribeMemberCard, type TribeMember } from "@/components/tribes/tribe-member-card"
import { SearchFilters } from "@/components/search/search-filters"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

const SORT_FILTERS = [{ id: "active", label: "Mais activos" }, { id: "followers", label: "Mais seguidos" }, { id: "recent", label: "Mais recentes" }]
const MODS: TribeMember[] = [
  { username: "kuduro_master", displayName: "Kuduro Master", role: "founder", joinedAt: new Date(Date.now() - 31536000000).toISOString() },
  { username: "danca_ao", displayName: "Dança AO", role: "moderator", joinedAt: new Date(Date.now() - 15768000000).toISOString() },
]
const MEMBERS: TribeMember[] = [
  { username: "beats_angola", displayName: "Beats Angola", role: "member", joinedAt: new Date(Date.now() - 2592000000).toISOString() },
  { username: "kuduro_fan_01", displayName: "Kuduro Fan", role: "member", joinedAt: new Date(Date.now() - 604800000).toISOString() },
]

export default function TriboMembrosPage() {
  const { slug } = useParams()
  const [sort, setSort] = useState("active")
  const [search, setSearch] = useState("")
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      <div className="flex items-center gap-3 justify-between">
        <div className="relative flex-1 max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar membros..." className="pl-9 h-9 bg-white/5 border-white/10" /></div>
        <Link href={`/tribos/${slug}/membros/moderadores`} className="text-xs text-primary hover:underline">Ver moderadores →</Link>
      </div>
      <SearchFilters filters={SORT_FILTERS} active={sort} onChange={setSort} />
      <div className="space-y-2">{MODS.map(m => <TribeMemberCard key={m.username} member={m} />)}</div>
      <div className="space-y-2">{MEMBERS.map(m => <TribeMemberCard key={m.username} member={m} />)}</div>
    </div>
  )
}
