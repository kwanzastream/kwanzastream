"use client"
import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { SearchBar } from "@/components/search/search-bar"
import { SearchTabs } from "@/components/search/search-tabs"
import { SearchEmptyState } from "@/components/search/search-empty-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import Link from "next/link"

interface SearchUser {
  id: string
  username: string
  displayName: string
  avatarUrl?: string
  isVerified: boolean
  bio?: string
  followersCount: number
}

const FILTERS = [
  { id: "all", label: "Todos" },{ id: "verified", label: "Verificado" },
]

function PesquisaCanaisContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<SearchUser[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    if (!q.trim()) {
      setUsers([])
      setLoading(false)
      return
    }

    setLoading(true)
    api.get(`/api/search?q=${encodeURIComponent(q.trim())}&type=users&limit=20`)
      .then((res) => {
        let results = res.data.users || []
        if (filter === "verified") results = results.filter((u: SearchUser) => u.isVerified)
        setUsers(results)
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [q, filter])

  const handleFollow = async (userId: string, username: string) => {
    try {
      await api.post(`/api/users/${userId}/follow`)
      toast.success(`Agora segues @${username}`)
    } catch {
      toast.error("Erro ao seguir")
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 space-y-4">
      <SearchBar initialQuery={q} />
      <SearchTabs query={q} />

      {/* Filters */}
      <div className="flex gap-2">
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${filter === f.id ? 'bg-primary text-white border-primary' : 'border-white/10 hover:border-primary/30'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
      ) : users.length === 0 ? (
        <SearchEmptyState query={q} />
      ) : (
        <div className="space-y-2">
          {users.map(c => (
            <div key={c.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 hover:border-primary/30 transition-all">
              <Link href={`/${c.username}`}>
                <Avatar className="w-11 h-11">
                  <AvatarImage src={c.avatarUrl || undefined} />
                  <AvatarFallback className="bg-primary/20 text-primary">{(c.displayName || c.username || '?').slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Link href={`/${c.username}`} className="text-sm font-bold truncate hover:underline">{c.displayName}</Link>
                  {c.isVerified && <Badge variant="outline" className="text-[8px] shrink-0">Verificado</Badge>}
                </div>
                <p className="text-[10px] text-muted-foreground truncate">@{c.username} · {c.followersCount} seguidores</p>
                {c.bio && <p className="text-xs text-muted-foreground truncate">{c.bio}</p>}
              </div>
              <Button size="sm" variant="outline" className="text-xs shrink-0" onClick={() => handleFollow(c.id, c.username!)}>Seguir</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PesquisaCanaisPage() {
  return <Suspense><PesquisaCanaisContent /></Suspense>
}
