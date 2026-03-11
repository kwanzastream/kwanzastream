"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Radio, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchResults { streams: any[]; users: any[]; categories: any[] }

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQ = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQ)
  const debouncedQuery = useDebounce(query, 400)
  const [results, setResults] = useState<SearchResults>({ streams: [], users: [], categories: [] })
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(!!initialQ)

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults({ streams: [], users: [], categories: [] }); setHasSearched(false); return }
    setLoading(true); setHasSearched(true)
    api.get(`/api/search/?q=${encodeURIComponent(debouncedQuery)}&type=all`)
      .then((res) => { const d = res.data; setResults({ streams: d.streams || [], users: d.users || [], categories: d.categories || [] }) })
      .catch(() => {}).finally(() => setLoading(false))
  }, [debouncedQuery])

  const total = results.streams.length + results.users.length + results.categories.length

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><Input placeholder="Pesquisar streams, canais, categorias..." className="pl-11 h-12 text-base" value={query} onChange={(e) => { setQuery(e.target.value); router.replace(`/pesquisa?q=${encodeURIComponent(e.target.value)}`, { scroll: false }) }} autoFocus /></div>
      {!hasSearched && <div className="text-center py-16"><TrendingUp className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-30" /><p className="font-medium">Pesquisa na Kwanza Stream</p><p className="text-sm text-muted-foreground mt-1">Encontra streams, criadores e categorias</p></div>}
      {loading && <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>}
      {hasSearched && !loading && (<>
        <p className="text-sm text-muted-foreground">{total === 0 ? `Sem resultados para "${debouncedQuery}"` : `${total} resultado${total !== 1 ? "s" : ""} para "${debouncedQuery}"`}</p>
        <Tabs defaultValue="tudo">
          <TabsList><TabsTrigger value="tudo">Tudo ({total})</TabsTrigger><TabsTrigger value="canais"><Users className="w-3.5 h-3.5 mr-1" />Canais ({results.users.length})</TabsTrigger><TabsTrigger value="streams"><Radio className="w-3.5 h-3.5 mr-1" />Streams ({results.streams.length})</TabsTrigger></TabsList>
          <TabsContent value="tudo" className="space-y-6 mt-4">
            {results.users.length > 0 && <section><h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4" />Canais</h3><div className="space-y-2">{results.users.slice(0, 5).map((u: any) => <UserResult key={u.id} user={u} />)}</div></section>}
            {results.streams.length > 0 && <section><h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Radio className="w-4 h-4" />Streams ao vivo</h3><div className="space-y-2">{results.streams.slice(0, 5).map((s: any) => <StreamResult key={s.id} stream={s} />)}</div></section>}
          </TabsContent>
          <TabsContent value="canais" className="space-y-2 mt-4">{results.users.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum canal encontrado</p> : results.users.map((u: any) => <UserResult key={u.id} user={u} />)}</TabsContent>
          <TabsContent value="streams" className="space-y-2 mt-4">{results.streams.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">Nenhum stream encontrado</p> : results.streams.map((s: any) => <StreamResult key={s.id} stream={s} />)}</TabsContent>
        </Tabs>
      </>)}
    </div>
  )
}

function UserResult({ user }: { user: any }) {
  return (
    <Link href={`/${user.username}`}><div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
      <Avatar className="w-10 h-10"><AvatarImage src={user.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{user.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user.displayName}</p><p className="text-xs text-muted-foreground">@{user.username}{user.followerCount ? ` · ${user.followerCount.toLocaleString("pt-AO")} seguidores` : ""}</p></div>
      {user.isLive && <Badge className="bg-[#CE1126] text-white text-[10px]">AO VIVO</Badge>}
    </div></Link>
  )
}

function StreamResult({ stream }: { stream: any }) {
  return (
    <Link href={`/stream/${stream.streamer?.username || stream.userId}`}><div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Radio className="w-4 h-4 text-primary" /></div>
      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{stream.title}</p><p className="text-xs text-muted-foreground">{stream.streamer?.displayName || "Criador"}{stream.category ? ` · ${stream.category}` : ""}</p></div>
      {stream.viewerCount > 0 && <span className="text-xs text-muted-foreground shrink-0">{stream.viewerCount.toLocaleString("pt-AO")} a ver</span>}
    </div></Link>
  )
}

export default function PesquisaPage() { return <Suspense><SearchContent /></Suspense> }
