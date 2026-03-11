"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Heart, Users, Play, Clock, Eye, Share2, MoreHorizontal, CheckCircle, Zap } from "lucide-react"

interface ChannelUser {
  id: string; username: string; displayName: string; avatarUrl?: string; bannerUrl?: string
  bio?: string; role: string; isVerified: boolean; createdAt: string; isFollowing?: boolean
  followersCount: number; followingCount: number; streamsCount: number
}

interface Vod { id: string; title: string; thumbnailUrl?: string; duration: number; viewCount: number; createdAt: string }

export default function ChannelPage() {
  const params = useParams()
  const username = params.username as string
  const router = useRouter()
  const { user: authUser, isAuthenticated } = useAuth()

  const [channel, setChannel] = useState<ChannelUser | null>(null)
  const [liveStream, setLiveStream] = useState<any>(null)
  const [vods, setVods] = useState<Vod[]>([])
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [followLoading, setFollowLoading] = useState(false)

  useEffect(() => {
    if (!username) return
    setLoading(true)

    // getUserProfile supports username lookup via OR: [{ id }, { username: id }]
    api.get(`/api/users/${username}`)
      .then(async (res) => {
        const u = res.data.user
        setChannel(u)
        setFollowersCount(u.followersCount || u._count?.followers || 0)
        setIsFollowing(u.isFollowing || false)

        // Fetch live + vods in parallel
        const [liveRes, vodsRes] = await Promise.allSettled([
          api.get(`/api/streams/user/${u.id}`),
          api.get(`/api/vods/?creatorId=${u.id}`),
        ])

        if (liveRes.status === "fulfilled") {
          const streams = liveRes.value.data?.streams || liveRes.value.data || []
          setLiveStream(streams.find((s: any) => s.status === "LIVE") || null)
        }
        if (vodsRes.status === "fulfilled") {
          setVods(vodsRes.value.data?.vods || vodsRes.value.data || [])
        }
      })
      .catch(() => setChannel(null))
      .finally(() => setLoading(false))
  }, [username])

  const handleFollow = async () => {
    if (!isAuthenticated) { router.push(`/entrar?redirect=/${username}`); return }
    if (!channel) return
    setFollowLoading(true)
    try {
      if (isFollowing) {
        await api.delete(`/api/users/${channel.id}/follow`)
        setIsFollowing(false); setFollowersCount((c) => c - 1)
        toast.success(`Deixaste de seguir @${username}`)
      } else {
        await api.post(`/api/users/${channel.id}/follow`)
        setIsFollowing(true); setFollowersCount((c) => c + 1)
        toast.success(`Estás a seguir @${username}! 🎉`)
      }
    } catch (err: any) { toast.error(err?.response?.data?.message || err?.response?.data?.error || "Erro ao actualizar follow") }
    finally { setFollowLoading(false) }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/${username}`
    try { if (navigator.share) await navigator.share({ title: `${channel?.displayName} no Kwanza Stream`, url }); else { await navigator.clipboard.writeText(url); toast.success("Link copiado!") } }
    catch { await navigator.clipboard.writeText(url); toast.success("Link copiado!") }
  }

  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = s % 60
    return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`
  }

  if (loading) return <ChannelSkeleton />
  if (!channel) return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div><p className="text-5xl mb-4">🔍</p><h1 className="text-2xl font-bold mb-2">Canal não encontrado</h1><p className="text-muted-foreground mb-6">@{username} não existe ou foi removido.</p>
        <Link href="/explorar"><Button>Explorar canais</Button></Link></div>
    </div>
  )

  const isOwnChannel = authUser?.username === username

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-40 md:h-52 bg-gradient-to-br from-primary/30 via-muted to-muted overflow-hidden">
        {channel.bannerUrl && <img src={channel.bannerUrl} alt="Banner" className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Profile info */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16 mb-6">
          <div className="relative shrink-0">
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-background">
              <AvatarImage src={channel.avatarUrl} />
              <AvatarFallback className="text-2xl bg-primary/20 text-primary font-bold">{channel.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            {liveStream && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#CE1126] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">AO VIVO</div>}
          </div>
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1">
            <div>
              <div className="flex items-center gap-2"><h1 className="text-xl sm:text-2xl font-bold">{channel.displayName}</h1>{channel.isVerified && <CheckCircle className="w-5 h-5 text-primary shrink-0" />}</div>
              <p className="text-sm text-muted-foreground">@{channel.username}</p>
              <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /><strong className="text-foreground">{followersCount.toLocaleString("pt-AO")}</strong> seguidores</span>
                <span><strong className="text-foreground">{channel.streamsCount?.toLocaleString("pt-AO") || 0}</strong> streams</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {isOwnChannel ? (
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard")}>Gerir canal</Button>
              ) : (
                <>
                  <Button size="sm" variant={isFollowing ? "outline" : "default"} onClick={handleFollow} disabled={followLoading} className="gap-1.5">
                    <Heart className={`w-3.5 h-3.5 ${isFollowing ? "fill-current" : ""}`} />{isFollowing ? "A seguir" : "Seguir"}
                  </Button>
                  {liveStream && <Link href={`/stream/${username}`}><Button size="sm" className="gap-1.5 bg-[#CE1126] hover:bg-[#CE1126]/90"><Play className="w-3.5 h-3.5 fill-current" />Ver stream</Button></Link>}
                  <Button variant="outline" size="sm" onClick={() => router.push(`/salos/enviar/${username}`)} className="gap-1.5"><Zap className="w-3.5 h-3.5" />Salos</Button>
                </>
              )}
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={handleShare}><Share2 className="w-4 h-4" /></Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="w-8 h-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end"><DropdownMenuItem onClick={() => router.push(`/report?target=${channel.id}&type=USER`)}>Reportar canal</DropdownMenuItem></DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Live stream banner */}
        {liveStream && (
          <Link href={`/stream/${username}`}>
            <div className="mb-6 rounded-xl overflow-hidden border border-[#CE1126]/50 bg-[#CE1126]/5 hover:bg-[#CE1126]/10 transition-colors flex items-center gap-4 p-4">
              <div className="w-28 sm:w-36 aspect-video bg-muted rounded-lg overflow-hidden shrink-0 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#CE1126]/30 to-muted"><Play className="w-8 h-8 text-[#CE1126]" /></div>
                <Badge className="absolute top-1 left-1 bg-[#CE1126] text-white text-[9px] px-1 py-0.5">AO VIVO</Badge>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{liveStream.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{liveStream.category}</p>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground"><Eye className="w-3 h-3" />{liveStream.viewerCount || 0} espectadores</div>
              </div>
              <Badge className="bg-[#CE1126] text-white shrink-0 hidden sm:flex">Assistir</Badge>
            </div>
          </Link>
        )}

        {/* Tabs */}
        <Tabs defaultValue="inicio">
          <TabsList className="mb-6">
            <TabsTrigger value="inicio">Início</TabsTrigger>
            <TabsTrigger value="vods">Vídeos{vods.length > 0 && <Badge variant="secondary" className="ml-1.5 text-[10px] px-1">{vods.length}</Badge>}</TabsTrigger>
            <TabsTrigger value="sobre">Sobre</TabsTrigger>
          </TabsList>

          <TabsContent value="inicio">
            {vods.length > 0 ? (
              <div><h3 className="font-semibold mb-3">Vídeos recentes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vods.slice(0, 6).map((vod) => (
                    <Link key={vod.id} href={`/videos/${vod.id}`}>
                      <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                        <div className="relative aspect-video bg-muted">
                          {vod.thumbnailUrl ? <img src={vod.thumbnailUrl} alt={vod.title} className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center"><Play className="w-8 h-8 text-muted-foreground" /></div>}
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{formatDuration(vod.duration)}</div>
                        </div>
                        <div className="p-3"><p className="text-sm font-medium truncate">{vod.title}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{vod.viewCount}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(vod.createdAt).toLocaleDateString("pt-AO")}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16"><p className="text-4xl mb-3">📺</p><p className="font-medium">Sem conteúdo ainda</p><p className="text-sm text-muted-foreground mt-1">Este canal ainda não tem vídeos publicados</p></div>
            )}
          </TabsContent>

          <TabsContent value="vods">
            {vods.length === 0 ? (
              <div className="text-center py-16"><p className="text-4xl mb-3">🎬</p><p className="font-medium">Sem vídeos</p><p className="text-sm text-muted-foreground mt-1">Este canal ainda não publicou vídeos</p></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {vods.map((vod) => (
                  <Link key={vod.id} href={`/videos/${vod.id}`}>
                    <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50">
                      <div className="relative aspect-video bg-muted">
                        {vod.thumbnailUrl && <img src={vod.thumbnailUrl} alt={vod.title} className="w-full h-full object-cover" />}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{formatDuration(vod.duration)}</div>
                      </div>
                      <div className="p-3"><p className="text-sm font-medium truncate">{vod.title}</p><div className="flex items-center gap-3 text-xs text-muted-foreground mt-1"><span>{vod.viewCount} views</span><span>{new Date(vod.createdAt).toLocaleDateString("pt-AO")}</span></div></div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sobre">
            <div className="max-w-2xl space-y-6">
              {channel.bio && <div><h3 className="font-semibold mb-2">Sobre</h3><p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{channel.bio}</p></div>}
              <div>
                <h3 className="font-semibold mb-3">Estatísticas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[{ label: "Seguidores", value: followersCount.toLocaleString("pt-AO") }, { label: "A seguir", value: (channel.followingCount || 0).toLocaleString("pt-AO") }, { label: "Streams", value: (channel.streamsCount || 0).toLocaleString("pt-AO") }].map((stat) => (
                    <div key={stat.label} className="bg-muted/30 rounded-xl p-4 text-center"><p className="text-xl font-bold">{stat.value}</p><p className="text-xs text-muted-foreground mt-1">{stat.label}</p></div>
                  ))}
                </div>
              </div>
              <div><h3 className="font-semibold mb-2">Membro desde</h3><p className="text-sm text-muted-foreground">{new Date(channel.createdAt).toLocaleDateString("pt-AO", { year: "numeric", month: "long", day: "numeric" })}</p></div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ChannelSkeleton() {
  return (
    <div><Skeleton className="h-40 md:h-52 w-full" /><div className="max-w-6xl mx-auto px-4"><div className="flex items-end gap-4 -mt-12 mb-6"><Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" /><div className="flex-1 space-y-2 pb-1"><Skeleton className="h-6 w-48" /><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-40" /></div></div></div></div>
  )
}
