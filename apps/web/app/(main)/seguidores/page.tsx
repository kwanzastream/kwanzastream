"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { FollowListItem } from "@/components/social/follow-list-item"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Follower { username: string; displayName: string; avatarUrl?: string; isOnline: boolean; followedBack: boolean; isSubscriber?: boolean; followDate: string }

const MOCK: Follower[] = [
  { username: "viewer_001", displayName: "Viewer 001", isOnline: true, followedBack: true, followDate: "há 2 dias" },
  { username: "fan_kuduro", displayName: "Fan Kuduro", isOnline: false, followedBack: false, isSubscriber: true, followDate: "há 1 semana" },
  { username: "new_fan", displayName: "Novo Fã", isOnline: true, followedBack: false, followDate: "há 3h" },
  { username: "gamer_ao", displayName: "Gamer AO", isOnline: false, followedBack: true, followDate: "há 1 mês" },
  { username: "music_lover", displayName: "Music Lover", isOnline: false, followedBack: false, isSubscriber: true, followDate: "há 2 semanas" },
]

export default function SeguidoresPage() {
  const searchParams = useSearchParams()
  const filtro = searchParams.get("filtro")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<"recent" | "name">("recent")
  const [followers, setFollowers] = useState(MOCK)
  const [filter, setFilter] = useState<"all" | "sub" | "not-followed">(
    filtro === "nao-seguidos-de-volta" ? "not-followed" : "all"
  )

  let filtered = followers.filter(f =>
    f.displayName.toLowerCase().includes(search.toLowerCase()) || f.username.includes(search.toLowerCase())
  )

  // Filters (correction #3 — replaces amigos/pedidos)
  if (filter === "sub") filtered = filtered.filter(f => f.isSubscriber)
  if (filter === "not-followed") filtered = filtered.filter(f => !f.followedBack)

  const sorted = [...filtered].sort((a, b) => sort === "name" ? a.displayName.localeCompare(b.displayName) : 0)

  const handleFollowBack = (username: string) => {
    setFollowers(prev => prev.map(f => f.username === username ? { ...f, followedBack: true } : f))
    toast.success(`Agora segues @${username}`)
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Seguidores</h1>
        <Badge variant="outline" className="text-xs">{followers.length} seguidores</Badge>
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Pesquisar seguidores..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} /></div>

      <div className="flex gap-2 flex-wrap">
        {([
          { key: "all", label: "Todos" },
          { key: "sub", label: "Subscritores" },
          { key: "not-followed", label: "Não seguidos de volta" },
        ] as const).map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs border ${filter === f.key ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>
            {f.label}
          </button>
        ))}
        <button onClick={() => setSort(s => s === "recent" ? "name" : "recent")}
          className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-muted-foreground">
          {sort === "recent" ? "Recentes" : "A-Z"}
        </button>
      </div>

      <div className="space-y-2">
        {sorted.map(f => (
          <FollowListItem key={f.username} username={f.username} displayName={f.displayName} avatarUrl={f.avatarUrl}
            isOnline={f.isOnline} followedBack={f.followedBack}
            showFollowBack showMessage
            onFollowBack={() => handleFollowBack(f.username)} />
        ))}
      </div>

      {sorted.length === 0 && <div className="text-center py-16"><Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">{search ? "Nenhum seguidor encontrado" : "Sem seguidores ainda"}</p></div>}
    </div>
  )
}
