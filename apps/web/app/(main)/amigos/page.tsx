"use client"

import { useState } from "react"
import { FriendCard } from "@/components/social/friend-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Friend { username: string; displayName: string; avatarUrl?: string; isOnline: boolean; category?: string }

const MOCK: Friend[] = [
  { username: "angolangamer", displayName: "Angola Gamer", isOnline: true, category: "Gaming" },
  { username: "kuduroking", displayName: "Kuduro King", isOnline: true, category: "Música" },
  { username: "luanda_life", displayName: "Luanda Life", isOnline: false, category: "IRL" },
  { username: "tech_ao", displayName: "Tech Angola", isOnline: false, category: "Tecnologia" },
  { username: "chef_mwangole", displayName: "Chef Mwangolê", isOnline: true, category: "Culinária" },
]

export default function AmigosPage() {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<"recent" | "online" | "name">("online")

  const sorted = [...MOCK]
    .filter(f => f.displayName.toLowerCase().includes(search.toLowerCase()) || f.username.includes(search.toLowerCase()))
    .sort((a, b) => sort === "online" ? (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0) : sort === "name" ? a.displayName.localeCompare(b.displayName) : 0)

  const onlineCount = MOCK.filter(f => f.isOnline).length

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Amigos</h1>
          <Badge variant="outline" className="text-xs">{MOCK.length} mútuos</Badge>
        </div>
        <Link href="/amigos/sugeridos" className="flex items-center gap-1 text-xs text-primary hover:underline">Sugestões <ArrowRight className="w-3 h-3" /></Link>
      </div>
      <p className="text-xs text-muted-foreground">Utilizadores com follow mútuo (segues e seguem-te de volta)</p>

      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Pesquisar amigos..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} /></div>

      <div className="flex gap-2">
        {(["online", "recent", "name"] as const).map(s => (
          <button key={s} onClick={() => setSort(s)} className={`px-3 py-1.5 rounded-full text-xs border ${sort === s ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"}`}>
            {s === "online" ? `Online (${onlineCount})` : s === "recent" ? "Recentes" : "A-Z"}
          </button>
        ))}
      </div>

      {/* Online now section */}
      {onlineCount > 0 && sort === "online" && (
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-green-400 uppercase tracking-wider">🟢 Online agora</h2>
          {sorted.filter(f => f.isOnline).map(f => <FriendCard key={f.username} {...f} />)}
        </div>
      )}

      <div className="space-y-2">
        {sort === "online" && onlineCount > 0 && <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-4">Offline</h2>}
        {(sort === "online" ? sorted.filter(f => !f.isOnline) : sorted).map(f => <FriendCard key={f.username} {...f} />)}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-16"><Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">{search ? "Nenhum amigo encontrado" : "Sem amigos ainda — segue canais para criar conexões mútuas"}</p></div>
      )}
    </div>
  )
}
