"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Flame, TrendingUp, Radio, Users, MapPin, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { streamService, donationService } from "@/lib/services"

const categories = ["Todos", "Música", "Kuduro", "Gaming", "Culinária", "Educação", "Negócios", "Religião"]

interface LiveStream {
  id: string
  title: string
  category?: string
  viewerCount: number
  thumbnailUrl?: string
  streamer: { id: string; displayName?: string; username?: string; avatarUrl?: string }
}

interface TopCreator {
  rank: number
  user: { id: string; displayName?: string; username?: string; avatarUrl?: string } | null
  totalEarnings: number
  donationCount: number
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = React.useState("Todos")
  const [liveStreams, setLiveStreams] = React.useState<LiveStream[]>([])
  const [topCreators, setTopCreators] = React.useState<TopCreator[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => { fetchData() }, [activeCategory])

  const fetchData = async () => {
    setLoading(true)
    try {
      const category = activeCategory === "Todos" ? undefined : activeCategory
      const [streamsRes, creatorsRes] = await Promise.all([
        streamService.getLive(1, 8, category).catch(() => ({ data: { streams: [] } })),
        donationService.getTopCreators({ limit: 6 }).catch(() => ({ data: { creators: [] } })),
      ])
      setLiveStreams(streamsRes.data.streams || [])
      setTopCreators(creatorsRes.data.creators || [])
    } catch { }
    setLoading(false)
  }

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-10">
            {/* Category Pills */}
            <section>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2 pb-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full px-6 font-bold transition-all ${activeCategory === cat
                        ? "bg-primary text-white"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>

            {/* Featured Banner */}
            <section className="relative group">
              <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl bg-gradient-to-br from-primary/30 to-secondary/20">
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
                  <Badge className="w-fit mb-4 bg-primary border-none text-white font-bold animate-pulse">
                    <Flame className="w-3 h-3 mr-1" /> KWANZA STREAM
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter">A Plataforma de Angola 🇦🇴</h2>
                  <p className="text-lg text-white/80 max-w-xl mb-6 font-medium">
                    Descobre creators, assiste lives e envia Salos aos teus favoritos.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/feed">
                      <Button className="bg-white text-black hover:bg-white/90 font-black rounded-full px-8">
                        Ver Feed
                      </Button>
                    </Link>
                    <Link href="/leaderboard">
                      <Button variant="outline" className="bg-black/40 border-white/20 hover:bg-black/60 font-black rounded-full px-8">
                        Leaderboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Live Streams Grid */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <Radio className="h-6 w-6 text-red-600" /> Lives {activeCategory !== "Todos" ? `· ${activeCategory}` : "Populares"}
                </h3>
                <Link href="/feed">
                  <Button variant="link" className="text-primary font-bold">Ver todas</Button>
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-3 animate-pulse">
                      <div className="aspect-video rounded-xl bg-white/5" />
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-white/5" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-white/5 rounded w-3/4" />
                          <div className="h-2 bg-white/5 rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : liveStreams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {liveStreams.map(stream => (
                    <Link key={stream.id} href={`/stream/${stream.id}`}>
                      <div className="group cursor-pointer space-y-3">
                        <div className="aspect-video rounded-xl overflow-hidden relative border border-white/10">
                          {stream.thumbnailUrl ? (
                            <img src={stream.thumbnailUrl} alt={stream.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                              <Radio className="w-8 h-8 text-white/30" />
                            </div>
                          )}
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-red-600 border-none text-[10px] font-bold px-2 py-0.5">AO VIVO</Badge>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge className="bg-black/70 backdrop-blur-md border-none text-[10px] flex items-center gap-1 font-bold">
                              <Users className="w-3 h-3" /> {stream.viewerCount}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10 border border-white/10">
                            <AvatarImage src={stream.streamer?.avatarUrl} alt={stream.streamer?.displayName} />
                            <AvatarFallback>{(stream.streamer?.displayName || stream.streamer?.username || "?")[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{stream.title}</h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {stream.streamer?.displayName || stream.streamer?.username}
                            </p>
                            {stream.category && (
                              <Badge variant="outline" className="mt-1 text-[10px] h-5 border-white/10 bg-white/5 text-muted-foreground">
                                {stream.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center">
                  <Radio className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">Sem lives nesta categoria</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">Tenta outra categoria ou volta mais tarde</p>
                </div>
              )}
            </section>

            {/* Top Creators */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <Users className="h-6 w-6 text-primary" /> Creators em Destaque
                </h3>
                <Link href="/leaderboard">
                  <Button variant="link" className="text-primary font-bold">Ver ranking</Button>
                </Link>
              </div>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {topCreators.map((creator) => (
                    <Link key={creator.rank} href={creator.user ? `/profile/${creator.user.id}` : "#"}
                      className="w-48 p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 group hover:border-primary/50 transition-all cursor-pointer flex-shrink-0"
                    >
                      <Avatar className="h-20 w-20 mx-auto ring-2 ring-transparent group-hover:ring-primary ring-offset-4 ring-offset-background transition-all">
                        <AvatarImage src={creator.user?.avatarUrl} alt={creator.user?.displayName} />
                        <AvatarFallback>{(creator.user?.displayName || creator.user?.username || "?")[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold truncate flex items-center justify-center gap-1">
                          {creator.user?.displayName || creator.user?.username || "Anónimo"}
                          <CheckCircle2 className="h-3 w-3 text-primary fill-primary" />
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {creator.totalEarnings.toLocaleString()} Kz ganhos
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                        #{creator.rank}
                      </Badge>
                    </Link>
                  ))}
                  {topCreators.length === 0 && !loading && (
                    <p className="text-sm text-muted-foreground py-8 w-full text-center">Sem creators ainda</p>
                  )}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>

            {/* Trending */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <TrendingUp className="h-6 w-6" /> Tendências em Angola
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TrendingCard hashtag="#UnitelFesta" posts="45K" color="bg-primary" />
                  <TrendingCard hashtag="#KuduroPower" posts="120K" color="bg-secondary" />
                  <TrendingCard hashtag="#AngolaModa" posts="12K" color="bg-blue-500" />
                  <TrendingCard hashtag="#LuandaNoite" posts="89K" color="bg-red-500" />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight">
                  <MapPin className="h-6 w-6 text-secondary" /> Próximo de Ti
                </h3>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 space-y-4">
                  <p className="text-sm text-muted-foreground">Encontra eventos e creators na tua província.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-sm font-bold">Luanda</span>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                        {liveStreams.length} Lives
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <MobileNav />
      </div>
    </Suspense>
  )
}

function TrendingCard({ hashtag, posts, color }: { hashtag: string; posts: string; color: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-black group-hover:underline">{hashtag}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{posts} posts esta semana</p>
      </div>
      <div className={`w-2 h-10 rounded-full ${color} opacity-50 group-hover:opacity-100 transition-opacity`} />
    </div>
  )
}
