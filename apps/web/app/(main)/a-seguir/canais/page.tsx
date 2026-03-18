"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { FollowListItem } from "@/components/social/follow-list-item"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Radio } from "lucide-react"
import Link from "next/link"

interface Channel { username: string; displayName: string; avatarUrl?: string; isOnline: boolean; isLive: boolean; category?: string; lastActive?: string; followsBack?: boolean }

const MOCK: Channel[] = [
  { username: "angolangamer", displayName: "Angola Gamer", isOnline: true, isLive: true, category: "Gaming", followsBack: true },
  { username: "kuduroking", displayName: "Kuduro King", isOnline: true, isLive: false, category: "Música", followsBack: true },
  { username: "luanda_vlog", displayName: "Luanda Vlog", isOnline: false, isLive: false, category: "IRL", lastActive: "há 2h", followsBack: false },
  { username: "chef_mwangole", displayName: "Chef Mwangolê", isOnline: false, isLive: false, category: "Culinária", lastActive: "há 1 dia", followsBack: true },
  { username: "tech_ao", displayName: "Tech Angola", isOnline: false, isLive: false, category: "Tecnologia", lastActive: "há 3h", followsBack: false },
  { username: "basketball_ao", displayName: "Basketball AO", isOnline: true, isLive: true, category: "Desporto", followsBack: false },
]

const TABS = [
  { id: "canais", label: "Canais", href: "/a-seguir/canais" },
  { id: "categorias", label: "Categorias", href: "/a-seguir/categorias" },
  { id: "tribos", label: "Tribos", href: "/a-seguir/tribos" },
  { id: "tags", label: "Tags", href: "/a-seguir/tags" },
]

export default function ASeguirCanaisPage() {
  const searchParams = useSearchParams()
  const filtro = searchParams.get("filtro")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<"live" | "recent" | "alpha">("live")
  const [channels, setChannels] = useState(MOCK)

  const handleUnfollow = (username: string) => {
    setChannels(prev => prev.filter(c => c.username !== username))
  }

  let filtered = channels.filter(c => c.displayName.toLowerCase().includes(search.toLowerCase()) || c.username.includes(search.toLowerCase()))

  // ?filtro= support (correction #3 — replaces amigos/enviados)
  if (filtro === "nao-te-seguem") filtered = filtered.filter(c => !c.followsBack)

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "live") return (b.isLive ? 2 : b.isOnline ? 1 : 0) - (a.isLive ? 2 : a.isOnline ? 1 : 0)
    if (sort === "alpha") return a.displayName.localeCompare(b.displayName)
    return 0
  })

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">A seguir</h1>
        <Badge variant="outline" className="text-xs">Segues {channels.length} canais</Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide">
        {TABS.map(t => (
          <Link key={t.id} href={t.href} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${t.id === "canais" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/10"}`}>{t.label}</Link>
        ))}
      </div>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Pesquisar canais..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} /></div>

      <div className="flex gap-2 flex-wrap">
        {(["live", "recent", "alpha"] as const).map(s => (
          <button key={s} onClick={() => setSort(s)} className={`px-3 py-1.5 rounded-full text-xs border ${sort === s ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>
            {s === "live" ? `Ao vivo (${channels.filter(c => c.isLive).length})` : s === "recent" ? "Actividade" : "A-Z"}
          </button>
        ))}
        {filtro && (
          <Link href="/a-seguir/canais" className="px-3 py-1.5 rounded-full text-xs border border-amber-400/30 bg-amber-400/10 text-amber-400">✕ Filtro: {filtro}</Link>
        )}
      </div>

      <div className="space-y-2">
        {sorted.map(c => (
          <FollowListItem key={c.username} {...c} showUnfollow showMessage onUnfollow={() => handleUnfollow(c.username)} />
        ))}
      </div>

      {sorted.length === 0 && <div className="text-center py-16"><p className="text-sm text-muted-foreground">{search ? "Nenhum canal encontrado" : "Ainda não segues nenhum canal"}</p></div>}
    </div>
  )
}
