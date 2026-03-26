"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { SearchBar } from "@/components/search/search-bar"
import { SearchTabs } from "@/components/search/search-tabs"
import { SearchResultsSection } from "@/components/search/search-results-section"
import { SearchEmptyState } from "@/components/search/search-empty-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Radio, Users, Video, Hash } from "lucide-react"
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

interface SearchStream {
  id: string
  title: string
  category: string
  viewerCount: number
  streamer: { id: string; username: string; displayName: string; avatarUrl?: string; isVerified: boolean }
}

function SearchTudoContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<SearchUser[]>([])
  const [streams, setStreams] = useState<SearchStream[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalStreams, setTotalStreams] = useState(0)

  useEffect(() => {
    if (!q.trim()) {
      setUsers([])
      setStreams([])
      setLoading(false)
      return
    }

    setLoading(true)
    api.get(`/api/search?q=${encodeURIComponent(q.trim())}&type=all&limit=10`)
      .then((res) => {
        setUsers(res.data.users || [])
        setStreams(res.data.streams || [])
        setTotalUsers(res.data.totalUsers || 0)
        setTotalStreams(res.data.totalStreams || 0)
      })
      .catch(() => {
        setUsers([])
        setStreams([])
      })
      .finally(() => setLoading(false))
  }, [q])

  const total = totalUsers + totalStreams

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 space-y-4">
      <SearchBar initialQuery={q} />
      <SearchTabs query={q} />

      {loading ? (
        <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>
      ) : !q.trim() ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">Pesquisa na Kwanza Stream</p>
          <p className="text-sm mt-1">Encontra canais, streams ao vivo e muito mais</p>
        </div>
      ) : total === 0 ? (
        <SearchEmptyState query={q} />
      ) : <>
        <p className="text-xs text-muted-foreground">{total} resultado{total !== 1 ? 's' : ''} para &quot;{q}&quot;</p>

        {/* Live streams */}
        {streams.length > 0 && (
          <SearchResultsSection title="Ao Vivo" icon={<Radio className="w-4 h-4 text-[#CE1126]" />} count={streams.length} viewAllHref={`/pesquisa/streams?q=${encodeURIComponent(q)}`}>
            <div className="space-y-2">{streams.map(s => (
              <Link key={s.id} href={`/stream/${s.streamer.username}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#CE1126]/10 flex items-center justify-center shrink-0"><Radio className="w-4 h-4 text-[#CE1126]" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{s.title}</p><p className="text-xs text-muted-foreground">{s.streamer.displayName} · {s.category}</p></div>
                <div className="flex items-center gap-1.5 shrink-0"><Badge className="bg-[#CE1126] text-white text-[8px]">LIVE</Badge><span className="text-xs text-muted-foreground">{s.viewerCount}</span></div>
              </Link>
            ))}</div>
          </SearchResultsSection>
        )}

        {/* Channels */}
        {users.length > 0 && (
          <SearchResultsSection title="Canais" icon={<Users className="w-4 h-4" />} count={users.length} viewAllHref={`/pesquisa/canais?q=${encodeURIComponent(q)}`}>
            <div className="space-y-2">{users.map(c => (
              <Link key={c.id} href={`/${c.username}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={c.avatarUrl || undefined} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">{(c.displayName || c.username || '?').slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium truncate">{c.displayName}</p>
                    {c.isVerified && <span className="text-primary text-xs">✓</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">@{c.username} · {c.followersCount} seguidores</p>
                </div>
              </Link>
            ))}</div>
          </SearchResultsSection>
        )}
      </>}
    </div>
  )
}

export default function PesquisaTudoPage() { return <Suspense><SearchTudoContent /></Suspense> }
