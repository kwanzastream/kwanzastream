"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useChat } from "@/hooks/use-chat"
import { HlsPlayer } from "@/components/hls-player"
import { StreamChat } from "@/components/stream/stream-chat"
import { StreamInfoPanel } from "@/components/stream/stream-info-panel"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Eye, Heart, Zap, Monitor, Minimize2, MessageSquare, Info,
  Loader2, CheckCircle, ExternalLink
} from "lucide-react"
import { toast } from "sonner"

const SALO_AMOUNTS = [
  { label: "50 Salos", value: 50, kz: "50 Kz" },
  { label: "200 Salos", value: 200, kz: "200 Kz" },
  { label: "500 Salos", value: 500, kz: "500 Kz" },
  { label: "1000 Salos", value: 1000, kz: "1.000 Kz" },
  { label: "2500 Salos", value: 2500, kz: "2.500 Kz" },
  { label: "5000 Salos", value: 5000, kz: "5.000 Kz" },
]

interface StreamInfo {
  id: string; title: string; category: string; viewerCount: number
  status: string; startedAt: string; streamKey?: string; description?: string
  tags?: string[]; contentRating?: "general" | "13+" | "18+"
  streamer: { id: string; username: string; displayName: string; avatarUrl?: string; isVerified?: boolean; followersCount?: number; socialLinks?: Record<string, string> }
}

export default function StreamPage() {
  const params = useParams()
  const username = params.username as string
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuth()

  const mode = searchParams.get("mode") // "theatre" | "fullscreen"
  const isTheatre = mode === "theatre"

  const [stream, setStream] = useState<StreamInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)

  // Mobile tabs
  const [mobileTab, setMobileTab] = useState<"chat" | "info">("chat")

  // Chat
  const { messages, viewerCount, isConnected, sendMessage } = useChat({ streamId: stream?.id || "", enabled: !!stream?.id })

  // Salos
  const [salosOpen, setSalosOpen] = useState(false)
  const [selectedSalos, setSelectedSalos] = useState(SALO_AMOUNTS[0])
  const [salosMessage, setSalosMessage] = useState("")
  const [salosLoading, setSalosLoading] = useState(false)

  // HLS URL
  const hlsUrl = stream?.streamKey
    ? `${process.env.NEXT_PUBLIC_HLS_BASE_URL || "http://localhost:8000/live"}/${stream.streamKey}/index.m3u8`
    : ""

  // Fetch stream
  useEffect(() => {
    if (!username) return
    api.get(`/api/users/${username}`)
      .then(async (res) => {
        const channelUser = res.data.user
        const streamsRes = await api.get(`/api/streams/user/${channelUser.id}`)
        const streams = streamsRes.data?.streams || streamsRes.data || []
        const liveStream = streams.find((s: any) => s.status === "LIVE")
        if (!liveStream) { setOffline(true); setLoading(false); return }
        setStream({
          ...liveStream,
          streamer: { ...channelUser, followersCount: channelUser.followersCount || channelUser._count?.followers || 0 }
        })
        setIsFollowing(channelUser.isFollowing || false)
      })
      .catch(() => setOffline(true))
      .finally(() => setLoading(false))
  }, [username])

  const handleFollow = async () => {
    if (!isAuthenticated || !stream) { router.push(`/entrar?redirectTo=/stream/${username}`); return }
    setFollowLoading(true)
    try {
      if (isFollowing) { await api.delete(`/api/users/${stream.streamer.id}/follow`); setIsFollowing(false); toast.success(`Deixaste de seguir @${username}`) }
      else { await api.post(`/api/users/${stream.streamer.id}/follow`); setIsFollowing(true); toast.success(`A seguir @${username}! 🎉`) }
    } catch (err: any) { toast.error(err?.response?.data?.error || "Erro ao seguir") }
    finally { setFollowLoading(false) }
  }

  const handleSendSalos = async () => {
    if (!isAuthenticated) { router.push(`/entrar?redirectTo=/stream/${username}`); return }
    if (!stream) return
    setSalosLoading(true)
    try {
      await api.post("/api/donations/", { receiverId: stream.streamer.id, streamId: stream.id, amount: selectedSalos.value, saloType: `SALO_${selectedSalos.value}`, message: salosMessage || undefined })
      toast.success(`Enviaste ${selectedSalos.label} para @${username}! 🎉`)
      setSalosOpen(false); setSalosMessage("")
    } catch (err: any) { toast.error(err?.response?.data?.error || "Erro ao enviar Salos. Verifica o teu saldo.") }
    finally { setSalosLoading(false) }
  }

  const toggleTheatre = () => {
    const newMode = isTheatre ? "" : "theatre"
    router.replace(`/stream/${username}${newMode ? `?mode=${newMode}` : ""}`, { scroll: false })
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground ml-3">A carregar stream...</p></div>

  if (offline || !stream) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md"><p className="text-6xl mb-4">📴</p><h1 className="text-2xl font-bold mb-2">@{username} não está ao vivo</h1><p className="text-muted-foreground mb-6">Este canal não está a transmitir de momento.</p>
        <div className="flex gap-3 justify-center"><Link href={`/${username}`}><Button variant="outline">Ver canal</Button></Link><Link href="/ao-vivo"><Button>Ver outros streams</Button></Link></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`flex flex-col lg:flex-row flex-1 ${isTheatre ? "max-w-none" : "max-w-screen-2xl mx-auto w-full"}`}>

        {/* Player + Info Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Player */}
          <div className="relative" data-player-container>
            <HlsPlayer src={hlsUrl} viewerCount={viewerCount || stream.viewerCount} />
            <div className="absolute top-3 right-3 flex gap-1.5">
              <Button variant="secondary" size="icon" className="w-7 h-7 opacity-70 hover:opacity-100 hidden lg:flex" onClick={toggleTheatre}>
                {isTheatre ? <Minimize2 className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>

          {/* Stream Info Bar */}
          <div className="p-4 border-b border-white/10">
            <h1 className="font-bold text-lg leading-tight truncate">{stream.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="secondary" className="text-xs bg-white/10 border-none">{stream.category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" />{viewerCount || stream.viewerCount} a ver</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <Link href={`/${stream.streamer.username}`}>
                <Avatar className="w-10 h-10"><AvatarImage src={stream.streamer.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{stream.streamer.displayName.slice(0, 2)}</AvatarFallback></Avatar>
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5"><Link href={`/${stream.streamer.username}`}><p className="font-semibold text-sm hover:underline">{stream.streamer.displayName}</p></Link>{stream.streamer.isVerified && <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />}</div>
                <p className="text-xs text-muted-foreground">{(stream.streamer.followersCount || 0).toLocaleString("pt-AO")} seguidores</p>
              </div>
              {user?.id !== stream.streamer.id && (
                <div className="flex items-center gap-2">
                  <Button size="sm" variant={isFollowing ? "outline" : "default"} onClick={handleFollow} disabled={followLoading} className="gap-1.5">
                    <Heart className={`w-3.5 h-3.5 ${isFollowing ? "fill-current" : ""}`} />{isFollowing ? "A seguir" : "Seguir"}
                  </Button>
                  <Dialog open={salosOpen} onOpenChange={setSalosOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-1.5 text-[#F9D616] border-[#F9D616]/30 hover:bg-[#F9D616]/10"><Zap className="w-3.5 h-3.5" />Salos</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm">
                      <DialogHeader><DialogTitle>Enviar Salos para @{username}</DialogTitle></DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                          {SALO_AMOUNTS.map((amt) => (
                            <button key={amt.value} onClick={() => setSelectedSalos(amt)} className={`p-2.5 rounded-lg border text-center transition-all text-sm ${selectedSalos.value === amt.value ? "border-[#F9D616] bg-[#F9D616]/10 text-[#F9D616]" : "border-border hover:border-muted-foreground"}`}>
                              <p className="font-bold text-xs">{amt.label}</p><p className="text-[10px] text-muted-foreground mt-0.5">{amt.kz}</p>
                            </button>
                          ))}
                        </div>
                        <Input placeholder="Mensagem (opcional)" value={salosMessage} onChange={(e) => setSalosMessage(e.target.value)} maxLength={150} />
                        <Button className="w-full bg-[#F9D616] text-black hover:bg-[#F9D616]/90" onClick={handleSendSalos} disabled={salosLoading}>
                          {salosLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4 mr-2" />Enviar {selectedSalos.label}</>}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">1 Salo = 1 Kz · O criador recebe 80%</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="lg:hidden flex border-b border-white/10">
            <button onClick={() => setMobileTab("chat")} className={`flex-1 py-2.5 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 ${mobileTab === "chat" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
              <MessageSquare className="w-3.5 h-3.5" /> Chat
            </button>
            <button onClick={() => setMobileTab("info")} className={`flex-1 py-2.5 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 ${mobileTab === "info" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>
              <Info className="w-3.5 h-3.5" /> Info
            </button>
          </div>

          {/* Mobile: Info Panel */}
          <div className={`lg:hidden ${mobileTab === "info" ? "block" : "hidden"}`}>
            <StreamInfoPanel
              title={stream.title} category={stream.category} viewerCount={viewerCount || stream.viewerCount}
              tags={stream.tags} description={stream.description} startedAt={stream.startedAt}
              contentRating={stream.contentRating} socialLinks={stream.streamer.socialLinks}
            />
          </div>

          {/* Mobile: Chat */}
          <div className={`lg:hidden ${mobileTab === "chat" ? "block" : "hidden"} flex-1`}>
            <StreamChat
              messages={messages} viewerCount={viewerCount || stream.viewerCount}
              isConnected={isConnected} sendMessage={sendMessage} username={username}
              streamId={stream.id} compact
            />
          </div>

          {/* Desktop: Info below player */}
          <div className="hidden lg:block">
            <StreamInfoPanel
              title={stream.title} category={stream.category} viewerCount={viewerCount || stream.viewerCount}
              tags={stream.tags} description={stream.description} startedAt={stream.startedAt}
              contentRating={stream.contentRating} socialLinks={stream.streamer.socialLinks}
            />
          </div>
        </div>

        {/* Desktop: Chat Column */}
        <div className={`hidden lg:flex ${isTheatre ? "w-80 xl:w-96" : "w-72 xl:w-80"}`}>
          <StreamChat
            messages={messages} viewerCount={viewerCount || stream.viewerCount}
            isConnected={isConnected} sendMessage={sendMessage} username={username}
            streamId={stream.id}
          />
        </div>
      </div>
    </div>
  )
}
