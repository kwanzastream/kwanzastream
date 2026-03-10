"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Users, Radio, CheckCircle2, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { searchService } from "@/lib/services"

interface SearchUser {
  id: string
  username: string
  displayName: string
  avatarUrl: string | null
  isVerified: boolean
  bio: string | null
  followersCount: number
}

interface SearchStream {
  id: string
  title: string
  category: string | null
  thumbnailUrl: string | null
  viewerCount: number
  streamer: {
    id: string
    username: string | null
    displayName: string | null
    avatarUrl: string | null
    isVerified: boolean
  }
}

function SearchContent() {
  const [query, setQuery] = React.useState("")
  const [tab, setTab] = React.useState("all")
  const [users, setUsers] = React.useState<SearchUser[]>([])
  const [streams, setStreams] = React.useState<SearchStream[]>([])
  const [totalUsers, setTotalUsers] = React.useState(0)
  const [totalStreams, setTotalStreams] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [searched, setSearched] = React.useState(false)
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null)

  const doSearch = React.useCallback(async (q: string, type: string) => {
    if (!q.trim()) {
      setUsers([])
      setStreams([])
      setSearched(false)
      return
    }
    setLoading(true)
    try {
      const { data } = await searchService.search(q.trim(), type as any)
      setUsers(data.users || [])
      setStreams(data.streams || [])
      setTotalUsers(data.totalUsers || 0)
      setTotalStreams(data.totalStreams || 0)
      setSearched(true)
    } catch {
      setUsers([])
      setStreams([])
    }
    setLoading(false)
  }, [])

  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(query, tab), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, tab, doSearch])

  const handleTabChange = (value: string) => {
    setTab(value)
  }

  const emptyState = searched && !loading && users.length === 0 && streams.length === 0

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-4xl mx-auto w-full md:border-x border-white/10">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 space-y-2 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/feed" className="md:hidden">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Search className="h-5 w-5 text-primary" />
            </Button>
          </Link>
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Procurar creators, lives, categorias..."
              className="w-full bg-white/5 border-white/10 pl-11 pr-10 h-11 rounded-xl text-base focus-visible:ring-primary"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                className="absolute right-1 top-1.5 h-8 w-8 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {loading && <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />}
        </div>
      </header>

      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full bg-background border-b border-white/10 rounded-none h-14 p-0">
          <TabsTrigger value="all" className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-black text-xs uppercase">
            Tudo
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-black text-xs uppercase">
            Pessoas
          </TabsTrigger>
          <TabsTrigger value="streams" className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-black text-xs uppercase">
            Lives
          </TabsTrigger>
        </TabsList>

        <div className="p-4 md:p-6 pb-24">
          {/* Loading state */}
          {loading && !searched && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty prompt */}
          {!query && !searched && (
            <div className="text-center py-16 space-y-3">
              <Search className="h-12 w-12 text-muted-foreground/20 mx-auto" />
              <p className="text-sm text-muted-foreground">Escreve para encontrar creators e lives</p>
            </div>
          )}

          {/* No results */}
          {emptyState && (
            <div className="text-center py-16 space-y-3">
              <Search className="h-12 w-12 text-muted-foreground/20 mx-auto" />
              <p className="text-sm text-muted-foreground">Nenhum resultado para &quot;{query}&quot;</p>
              <p className="text-xs text-muted-foreground">Tenta termos diferentes ou verifica a ortografia</p>
            </div>
          )}

          {/* Users results */}
          <TabsContent value="all" className="mt-0 space-y-8">
            {users.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Pessoas ({totalUsers})
                </h3>
                {users.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </section>
            )}

            {streams.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Radio className="h-4 w-4 text-red-500" /> Lives Ao Vivo ({totalStreams})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {streams.map(stream => (
                    <StreamCard key={stream.id} stream={stream} />
                  ))}
                </div>
              </section>
            )}
          </TabsContent>

          <TabsContent value="users" className="mt-0 space-y-2">
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </TabsContent>

          <TabsContent value="streams" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {streams.map(stream => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function UserCard({ user }: { user: SearchUser }) {
  return (
    <Link href={`/profile/${user.id}`}>
      <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-white/10">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback>{(user.displayName || user.username || "?")[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h4 className="text-sm font-bold flex items-center gap-1">
              {user.displayName || user.username}
              {user.isVerified && <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary text-white" />}
            </h4>
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
              {user.followersCount.toLocaleString()} Seguidores
              {user.username && ` • @${user.username}`}
            </p>
            {user.bio && (
              <p className="text-xs text-muted-foreground/80 line-clamp-1 mt-0.5">{user.bio}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function StreamCard({ stream }: { stream: SearchStream }) {
  return (
    <Link href={`/watch/${stream.id}`}>
      <div className="group cursor-pointer space-y-2">
        <div className="aspect-video rounded-xl overflow-hidden relative border border-white/10 bg-white/5">
          {stream.thumbnailUrl ? (
            <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Radio className="h-8 w-8 text-red-500/30" />
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-600 border-none text-[10px] font-black px-2 py-0.5">AO VIVO</Badge>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-black/70 backdrop-blur-md border-none text-[10px] flex items-center gap-1 font-bold">
              <Users className="w-3 h-3" /> {stream.viewerCount.toLocaleString()}
            </Badge>
          </div>
        </div>
        <div className="px-1">
          <h4 className="text-xs font-bold truncate group-hover:text-primary transition-colors">{stream.title}</h4>
          <p className="text-[10px] text-muted-foreground font-medium">
            {stream.streamer.displayName || stream.streamer.username}
            {stream.category && ` • ${stream.category}`}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchContent />
    </Suspense>
  )
}
