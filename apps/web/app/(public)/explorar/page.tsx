"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Eye } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ExplorarPage() {
  const [search, setSearch] = useState("")
  const [streams, setStreams] = useState<any[]>([])
  const [creators, setCreators] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get("/api/streams/live").catch(() => ({ data: [] })),
      api.get("/api/recommendations/creators").catch(() => ({ data: [] })),
    ]).then(([streamsRes, creatorsRes]) => {
      setStreams(streamsRes.data?.streams || streamsRes.data || [])
      setCreators(creatorsRes.data?.creators || creatorsRes.data || [])
    }).finally(() => setLoading(false))
  }, [])

  const filteredStreams = streams.filter((s: any) =>
    search ? s.title?.toLowerCase().includes(search.toLowerCase()) || s.streamer?.displayName?.toLowerCase().includes(search.toLowerCase()) : true
  )

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explorar</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Pesquisar streams, canais..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Tabs defaultValue="tudo">
        <TabsList className="mb-6">
          {["tudo", "streams", "categorias", "canais"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="tudo">
          {loading ? <ExplorarSkeleton /> : (
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#CE1126] rounded-full animate-pulse" />
                  <h2 className="font-semibold">Ao Vivo Agora</h2>
                  <Badge variant="secondary">{filteredStreams.length}</Badge>
                </div>
                {filteredStreams.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum stream ao vivo</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredStreams.slice(0, 8).map((stream: any) => (
                      <Link key={stream.id} href={`/stream/${stream.streamer?.username || stream.id}`} className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                        <div className="aspect-video bg-muted relative">
                          {stream.thumbnailUrl && <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover" />}
                          <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px]">AO VIVO</Badge>
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5">
                            <Eye className="w-3 h-3 text-white" /><span className="text-white text-[10px]">{stream.viewerCount || 0}</span>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium truncate">{stream.title}</p>
                          <p className="text-xs text-muted-foreground">{stream.streamer?.displayName}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-semibold mb-4">Categorias</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    { slug: "gaming", label: "🎮 Gaming" }, { slug: "musica", label: "🎵 Música" },
                    { slug: "futebol", label: "⚽ Futebol" }, { slug: "just-talking", label: "💬 Just Talking" },
                    { slug: "irl", label: "📍 IRL Angola" }, { slug: "comedia", label: "😂 Comédia" },
                    { slug: "criatividade", label: "🎨 Criatividade" }, { slug: "tech", label: "💻 Tech" },
                    { slug: "radio", label: "📻 Rádio" }, { slug: "educacao", label: "📚 Educação" },
                  ].map((cat) => (
                    <Link key={cat.slug} href={`/categoria/${cat.slug}`}>
                      <Badge variant="outline" className="text-sm py-1.5 px-3 hover:border-primary cursor-pointer transition-colors">{cat.label}</Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-4">Criadores em Destaque</h2>
                {creators.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum criador disponível</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {creators.slice(0, 12).map((creator: any) => (
                      <Link key={creator.id} href={`/${creator.username}`} className="text-center p-3 rounded-xl border border-border/50 hover:border-primary/50 transition-all group">
                        <Avatar className="w-12 h-12 mx-auto mb-2">
                          <AvatarImage src={creator.avatarUrl} />
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">{creator.displayName?.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs font-medium truncate">{creator.displayName}</p>
                        <p className="text-[10px] text-muted-foreground truncate">@{creator.username}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="streams">
          {filteredStreams.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Nenhum stream ao vivo</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStreams.map((stream: any) => (
                <Link key={stream.id} href={`/stream/${stream.streamer?.username || stream.id}`} className="rounded-xl overflow-hidden border border-border/50 hover:border-primary/50">
                  <div className="aspect-video bg-muted relative">
                    {stream.thumbnailUrl && <img src={stream.thumbnailUrl} alt={stream.title} className="w-full h-full object-cover" />}
                    <Badge className="absolute top-2 left-2 bg-[#CE1126] text-white text-[10px]">AO VIVO</Badge>
                  </div>
                  <div className="p-3"><p className="text-sm font-medium truncate">{stream.title}</p><p className="text-xs text-muted-foreground">{stream.streamer?.displayName}</p></div>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="categorias">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { slug: "gaming", label: "Gaming", emoji: "🎮" }, { slug: "musica", label: "Música", emoji: "🎵" },
              { slug: "futebol", label: "Futebol", emoji: "⚽" }, { slug: "just-talking", label: "Just Talking", emoji: "💬" },
              { slug: "irl", label: "IRL Angola", emoji: "📍" }, { slug: "comedia", label: "Comédia", emoji: "😂" },
              { slug: "criatividade", label: "Criatividade", emoji: "🎨" }, { slug: "tech", label: "Tech & Negócios", emoji: "💻" },
            ].map((cat) => (
              <Link key={cat.slug} href={`/categoria/${cat.slug}`} className="aspect-video rounded-xl border border-border/50 hover:border-primary/50 flex flex-col items-center justify-center gap-2 bg-muted/30">
                <span className="text-4xl">{cat.emoji}</span><span className="font-medium">{cat.label}</span>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="canais">
          {creators.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Nenhum canal disponível</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {creators.map((creator: any) => (
                <Link key={creator.id} href={`/${creator.username}`} className="text-center p-4 rounded-xl border border-border/50 hover:border-primary/50">
                  <Avatar className="w-16 h-16 mx-auto mb-3"><AvatarImage src={creator.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{creator.displayName?.slice(0, 2)}</AvatarFallback></Avatar>
                  <p className="text-sm font-medium">{creator.displayName}</p><p className="text-xs text-muted-foreground">@{creator.username}</p>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ExplorarSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(8).fill(0).map((_, i) => (
        <div key={i} className="space-y-2"><Skeleton className="aspect-video rounded-xl" /><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div>
      ))}
    </div>
  )
}
