"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useChat } from "@/hooks/use-chat"
import { HlsPlayer } from "@/components/hls-player"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Heart, Zap, Maximize2, Minimize2, MessageSquare, Send, Loader2, CheckCircle, Users } from "lucide-react"
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
  status: string; startedAt: string; streamKey?: string
  streamer: { id: string; username: string; displayName: string; avatarUrl?: string; isVerified?: boolean; followersCount?: number }
}

export default function StreamPage() {
  const params = useParams()
  const username = params.username as string
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const [stream, setStream] = useState<StreamInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)
  const [theaterMode, setTheaterMode] = useState(false)

  // Chat - using existing hook with object params
  const { messages, viewerCount, isConnected, sendMessage } = useChat({ streamId: stream?.id || "", enabled: !!stream?.id })
  const [chatInput, setChatInput] = useState("")
  const chatEndRef = useRef<HTMLDivElement>(null)

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
        setStream({ ...liveStream, streamer: { ...channelUser, followersCount: channelUser.followersCount || channelUser._count?.followers || 0 } })
        setIsFollowing(channelUser.isFollowing || false)
      })
      .catch(() => setOffline(true))
      .finally(() => setLoading(false))
  }, [username])

  // Auto-scroll chat
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || !isAuthenticated || !isConnected) return
    sendMessage(chatInput.trim())
    setChatInput("")
  }

  const handleFollow = async () => {
    if (!isAuthenticated || !stream) { router.push(`/entrar?redirect=/stream/${username}`); return }
    setFollowLoading(true)
    try {
      if (isFollowing) { await api.delete(`/api/users/${stream.streamer.id}/follow`); setIsFollowing(false); toast.success(`Deixaste de seguir @${username}`) }
      else { await api.post(`/api/users/${stream.streamer.id}/follow`); setIsFollowing(true); toast.success(`A seguir @${username}! 🎉`) }
    } catch (err: any) { toast.error(err?.response?.data?.error || "Erro ao seguir") }
    finally { setFollowLoading(false) }
  }

  const handleSendSalos = async () => {
    if (!isAuthenticated) { router.push(`/entrar?redirect=/stream/${username}`); return }
    if (!stream) return
    setSalosLoading(true)
    try {
      await api.post("/api/donations/", { receiverId: stream.streamer.id, streamId: stream.id, amount: selectedSalos.value, saloType: `SALO_${selectedSalos.value}`, message: salosMessage || undefined })
      toast.success(`Enviaste ${selectedSalos.label} para @${username}! 🎉`)
      setSalosOpen(false); setSalosMessage("")
    } catch (err: any) { toast.error(err?.response?.data?.error || "Erro ao enviar Salos. Verifica o teu saldo.") }
    finally { setSalosLoading(false) }
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
    <div className={`min-h-screen flex flex-col ${theaterMode ? "bg-black" : ""}`}>
      <div className={`flex flex-col lg:flex-row flex-1 ${theaterMode ? "max-w-none" : "max-w-screen-2xl mx-auto w-full"}`}>

        {/* Player + Info Column */}
        <div className="flex-1 flex flex-col">
          {/* Player */}
          <div className="relative">
            <HlsPlayer src={hlsUrl} viewerCount={viewerCount || stream.viewerCount} />
            <div className="absolute top-3 right-3">
              <Button variant="secondary" size="icon" className="w-7 h-7 opacity-70 hover:opacity-100" onClick={() => setTheaterMode((v) => !v)}>
                {theaterMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>

          {/* Stream Info */}
          {!theaterMode && (
            <div className="p-4 border-b">
              <h1 className="font-bold text-lg leading-tight truncate">{stream.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="secondary" className="text-xs">{stream.category}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="w-3 h-3" />{viewerCount || stream.viewerCount} a ver</span>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center gap-3">
                <Link href={`/${stream.streamer.username}`}><Avatar className="w-10 h-10"><AvatarImage src={stream.streamer.avatarUrl} /><AvatarFallback className="bg-primary/20 text-primary">{stream.streamer.displayName.slice(0, 2)}</AvatarFallback></Avatar></Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5"><Link href={`/${stream.streamer.username}`}><p className="font-semibold text-sm hover:underline">{stream.streamer.displayName}</p></Link>{stream.streamer.isVerified && <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />}</div>
                  <p className="text-xs text-muted-foreground">{(stream.streamer.followersCount || 0).toLocaleString("pt-AO")} seguidores</p>
                </div>
                <div className="flex items-center gap-2">
                  {user?.id !== stream.streamer.id && (
                    <>
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
                            <Input placeholder="Mensagem (opcional)" value={salosMessage} onChange={(e) => setSalosMessage(e.target.value)} maxLength={100} />
                            <Button className="w-full bg-[#F9D616] text-black hover:bg-[#F9D616]/90" onClick={handleSendSalos} disabled={salosLoading}>
                              {salosLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Zap className="w-4 h-4 mr-2" />Enviar {selectedSalos.label}</>}
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">1 Salo = 1 Kz · O criador recebe 80%</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Column */}
        <div className={`border-l border-border/50 flex flex-col ${theaterMode ? "lg:w-80 xl:w-96" : "lg:w-72 xl:w-80"} h-[calc(100vh-3.5rem)]`}>
          <div className="flex items-center gap-2 p-3 border-b">
            <MessageSquare className="w-4 h-4" /><span className="text-sm font-medium">Chat</span>
            {!isConnected && <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full ml-auto" title="A reconectar..." />}
            {isConnected && <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-auto" title="Conectado" />}
          </div>

          <ScrollArea className="flex-1 p-3">
            {messages.length === 0 ? (
              <div className="text-center py-8"><p className="text-sm text-muted-foreground">Sê o primeiro a escrever no chat!</p></div>
            ) : (
              <div className="space-y-2">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-1.5 text-xs ${msg.type === "donation" ? "bg-[#F9D616]/10 rounded p-1.5" : msg.type === "system" ? "text-muted-foreground italic" : ""}`}>
                    {msg.type !== "system" && (
                      <Avatar className="w-5 h-5 shrink-0 mt-0.5"><AvatarImage src={msg.avatarUrl} /><AvatarFallback className="text-[8px] bg-primary/20 text-primary">{msg.displayName?.slice(0, 1) || msg.username?.slice(0, 1) || "?"}</AvatarFallback></Avatar>
                    )}
                    <div className="flex-1 min-w-0">
                      {msg.type !== "system" && <span className="font-semibold text-foreground/80">{msg.displayName || msg.username}</span>}
                      {msg.type === "donation" && <span className="text-[#F9D616] ml-1">💰 {msg.amount} Salos</span>}
                      {" "}<span className="text-foreground/70 break-words">{msg.message}</span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
          </ScrollArea>

          <div className="p-3 border-t">
            {isAuthenticated ? (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input placeholder="Escreve uma mensagem..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} maxLength={300} className="h-9 text-sm" disabled={!isConnected} />
                <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!chatInput.trim() || !isConnected}><Send className="w-3.5 h-3.5" /></Button>
              </form>
            ) : (
              <div className="text-center"><p className="text-xs text-muted-foreground mb-2">Entra para participar no chat</p>
                <Link href={`/entrar?redirect=/stream/${username}`}><Button size="sm" variant="outline" className="w-full text-xs h-8">Entrar / Registar</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
