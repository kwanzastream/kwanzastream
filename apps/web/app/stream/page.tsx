"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  Settings,
  X,
  Send,
  Users,
  Wallet,
  Gift,
  Flame,
  MessageCircle,
  Share2,
  ChevronDown,
  Circle,
  Copy,
  Check,
  Loader2,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { streamService, userService } from "@/lib/services"
import { useChat, type ChatMessage } from "@/hooks/use-chat"
import { DonationAlertOverlay } from "@/components/donation-alert-overlay"

export default function StreamPage() {
  const { user, isLoggedIn, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [isLive, setIsLive] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [cameraOn, setCameraOn] = React.useState(true)
  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState("Música")
  const [streamKey, setStreamKey] = React.useState("")
  const [streamId, setStreamId] = React.useState("")
  const [chatInput, setChatInput] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const [isStarting, setIsStarting] = React.useState(false)
  const [elapsed, setElapsed] = React.useState(0)
  const [showMobileChat, setShowMobileChat] = React.useState(false)
  const [showMobileSettings, setShowMobileSettings] = React.useState(true)
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  const { messages, viewerCount, isConnected, sendMessage } = useChat({
    streamId,
    enabled: isLive && !!streamId,
  })

  // Auth guard
  React.useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push("/auth")
    }
  }, [authLoading, isLoggedIn, router])

  // Fetch or generate stream key on mount
  React.useEffect(() => {
    const getStreamKey = async () => {
      try {
        if (user?.streamKey) {
          setStreamKey(user.streamKey)
        } else {
          const res = await userService.generateStreamKey()
          setStreamKey(res.data.streamKey)
        }
      } catch (err) {
        console.error("Failed to get stream key:", err)
      }
    }
    if (isLoggedIn) getStreamKey()
  }, [isLoggedIn, user])

  // Elapsed time counter
  React.useEffect(() => {
    if (!isLive) {
      setElapsed(0)
      return
    }
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(timer)
  }, [isLive])

  // Auto-scroll chat
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (s: number) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0")
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0")
    const sec = String(s % 60).padStart(2, "0")
    return `${h}:${m}:${sec}`
  }

  const handleGoLive = async () => {
    if (!title.trim()) return
    setIsStarting(true)
    try {
      const res = await streamService.create({ title: title.trim(), category })
      setStreamId(res.data.id)
      setIsLive(true)
    } catch (err) {
      console.error("Failed to create stream:", err)
    } finally {
      setIsStarting(false)
    }
  }

  const handleEndStream = async () => {
    try {
      if (streamId) {
        await streamService.end(streamId)
      }
    } catch (err) {
      console.error("Failed to end stream:", err)
    } finally {
      setIsLive(false)
      setStreamId("")
    }
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(streamKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return
    sendMessage(chatInput)
    setChatInput("")
  }

  const rtmpUrl = `rtmp://localhost:1935/live/${streamKey}`

  if (authLoading) return null

  return (
    <div className="min-h-dvh bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* Top Status Bar */}
      <header className="h-12 md:h-14 border-b border-white/10 flex items-center justify-between px-3 md:px-4 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-sm md:text-base">K</div>
            <span className="font-bold tracking-tighter hidden sm:block text-sm">STUDIO</span>
          </div>
          <Separator orientation="vertical" className="h-5 md:h-6 bg-white/10" />
          <div className="flex items-center gap-2">
            {isLive ? (
              <Badge variant="destructive" className="bg-red-600 animate-pulse border-none font-bold text-[10px] md:text-xs">
                <Circle className="w-2 h-2 fill-current mr-1" /> AO VIVO
              </Badge>
            ) : (
              <Badge variant="outline" className="border-white/20 text-muted-foreground font-bold text-[10px] md:text-xs">
                PRÉVIA
              </Badge>
            )}
            <span className="text-[10px] md:text-xs font-medium text-muted-foreground">{formatTime(elapsed)}</span>
          </div>
          {isLive && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              <span className="text-xs font-bold">{viewerCount}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile chat toggle */}
          <Button
            variant="ghost" size="icon"
            className="lg:hidden text-muted-foreground hover:text-white h-9 w-9"
            onClick={() => setShowMobileChat(!showMobileChat)}
          >
            <MessageCircle className={`h-5 w-5 ${showMobileChat ? 'text-primary' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white h-9 w-9">
            <Settings className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 h-9 w-9" onClick={() => router.push("/feed")}>
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Stream Settings */}
        <aside className="hidden lg:flex w-80 flex-col border-r border-white/10 p-6 space-y-8 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Detalhes da Live</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold">Título da tua Live</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Noite de Kuduro com os Amigos"
                className="bg-white/5 border-white/10 h-10 focus-visible:ring-primary"
                disabled={isLive}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold">Categoria</label>
              <div className="relative">
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-white/5 border-white/10 h-10 cursor-pointer pr-10"
                  disabled={isLive}
                />
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* Stream Key / RTMP Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Configuração OBS</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold">Servidor RTMP</label>
              <div className="flex gap-2">
                <Input value="rtmp://localhost:1935/live" readOnly className="bg-white/5 border-white/10 h-9 text-xs font-mono" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold">Chave de Stream</label>
              <div className="flex gap-2">
                <Input
                  value={streamKey || "A carregar..."}
                  readOnly
                  className="bg-white/5 border-white/10 h-9 text-xs font-mono"
                  type="password"
                />
                <Button size="sm" variant="outline" className="border-white/10 bg-transparent shrink-0 h-9" onClick={handleCopyKey} disabled={!streamKey}>
                  {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Cola isto no OBS → Configurações → Stream → Chave
              </p>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="mt-auto pt-6">
            <Card className="bg-linear-to-br from-primary/20 to-transparent border-primary/20 overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Flame className="h-4 w-4 text-primary" /> Dica de Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Abre o OBS, cola o servidor RTMP e a tua chave, e carrega em &quot;Começar Transmissão&quot; no OBS. Depois clica em &quot;Ir ao Vivo&quot; aqui! 🇦🇴
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Center - Video Preview */}
        <main className="flex-1 bg-black flex flex-col relative group">
          <div className="flex-1 flex items-center justify-center relative">
            {!cameraOn ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                    <VideoOff className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">
                    Câmara Desativada
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                    <Video className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {isLive ? "Transmitindo via OBS" : "Configura o OBS e clica em Ir ao Vivo"}
                  </p>
                </div>
              </div>
            )}

            {/* In-Video Badges */}
            {isLive && (
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-xs px-3 py-1 font-bold">
                  <Users className="w-3 h-3 mr-2" /> {viewerCount}
                </Badge>
                <Badge className="bg-primary border-none text-white text-xs px-3 py-1 font-bold">AO VIVO</Badge>
              </div>
            )}

            {/* Donation Alert Overlay */}
            {isLive && streamId && (
              <DonationAlertOverlay streamId={streamId} />
            )}
          </div>

          {/* Bottom Control Bar */}
          <div className="h-16 md:h-20 border-t border-white/10 flex items-center justify-between px-3 md:px-6 bg-black/60 backdrop-blur-xl z-20">
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                size="icon"
                variant={cameraOn ? "secondary" : "destructive"}
                onClick={() => setCameraOn(!cameraOn)}
                className="rounded-full w-10 h-10 md:w-12 md:h-12"
              >
                {cameraOn ? <Video className="h-4 w-4 md:h-5 md:w-5" /> : <VideoOff className="h-4 w-4 md:h-5 md:w-5" />}
              </Button>
              <Button
                size="icon"
                variant={isMuted ? "destructive" : "secondary"}
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full w-10 h-10 md:w-12 md:h-12"
              >
                {isMuted ? <MicOff className="h-4 w-4 md:h-5 md:w-5" /> : <Mic className="h-4 w-4 md:h-5 md:w-5" />}
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 md:w-12 md:h-12 text-muted-foreground hidden sm:flex">
                <Monitor className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              {isLive ? (
                <Button
                  size="lg"
                  onClick={handleEndStream}
                  className="rounded-full px-5 md:px-10 font-black text-sm md:text-lg h-11 md:h-14 shadow-2xl bg-red-600 hover:bg-red-700 text-white"
                >
                  <span className="hidden sm:inline">Terminar Live</span>
                  <span className="sm:hidden">Parar</span>
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleGoLive}
                  disabled={!title.trim() || isStarting || !streamKey}
                  className="rounded-full px-5 md:px-10 font-black text-sm md:text-lg h-11 md:h-14 shadow-2xl bg-primary hover:bg-primary/90 text-white shadow-primary/20 disabled:opacity-50"
                >
                  {isStarting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> <span className="hidden sm:inline">A preparar...</span><span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <><span className="hidden sm:inline">Ir ao Vivo</span><span className="sm:hidden">Go Live</span></>
                  )}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile stream settings (before going live) */}
          {!isLive && showMobileSettings && (
            <div className="lg:hidden absolute inset-0 bg-black/90 backdrop-blur-md z-30 p-4 overflow-y-auto">
              <div className="max-w-md mx-auto space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Configurar Live</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowMobileSettings(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold">Título da tua Live</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Noite de Kuduro"
                    className="bg-white/5 border-white/10 h-11 text-base focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold">Categoria</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-white/5 border-white/10 h-11 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold">Servidor RTMP</label>
                  <Input value="rtmp://localhost:1935/live" readOnly className="bg-white/5 border-white/10 h-10 text-xs font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold">Chave de Stream</label>
                  <div className="flex gap-2">
                    <Input value={streamKey || "..."} readOnly className="bg-white/5 border-white/10 h-10 text-xs font-mono" type="password" />
                    <Button size="sm" variant="outline" className="border-white/10 bg-transparent h-10" onClick={handleCopyKey} disabled={!streamKey}>
                      {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full h-12 bg-primary hover:bg-primary/90 font-bold text-base"
                  onClick={() => { setShowMobileSettings(false); handleGoLive() }}
                  disabled={!title.trim() || isStarting || !streamKey}
                >
                  {isStarting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> A preparar...</> : 'Ir ao Vivo'}
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* Right Side - Chat Interface (desktop always visible, mobile overlay) */}
        <aside className={`
          ${showMobileChat ? 'fixed inset-x-0 bottom-0 h-[60vh] z-50 rounded-t-2xl border-t-2 border-white/10 shadow-2xl animate-slide-up' : 'hidden'}
          lg:relative lg:block lg:w-80 lg:h-auto lg:rounded-none lg:border-l lg:border-t-0
          border-white/10 flex flex-col bg-black/95 lg:bg-black/20 backdrop-blur-xl lg:backdrop-blur-none
        `}>
          <div className="h-12 md:h-14 border-b border-white/10 flex items-center justify-between px-4">
            <h3 className="text-xs md:text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> Chat da Live
            </h3>
            <div className="flex items-center gap-2">
              {isLive && (
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-[10px] text-muted-foreground">
                    {isConnected ? "Conectado" : "..."}
                  </span>
                </div>
              )}
              {/* Mobile close */}
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={() => setShowMobileChat(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-3 md:p-4">
            <div className="space-y-3">
              {!isLive && messages.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    O chat ficará activo quando iniciares a live.
                  </p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-2 text-sm items-start">
                  <Avatar className="h-6 w-6 shrink-0 mt-0.5">
                    <AvatarImage src={msg.avatarUrl} />
                    <AvatarFallback className="text-[10px] bg-white/10">
                      {(msg.displayName || msg.username || "?")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="leading-tight">
                      <span className={`font-black mr-1.5 ${msg.userId === user?.id ? "text-primary" : "text-muted-foreground"}`}>
                        {msg.displayName || msg.username}
                      </span>
                      <span className="text-foreground/90">{msg.message}</span>
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </ScrollArea>

          <div className="p-3 md:p-4 border-t border-white/10 bg-black/40 safe-area-bottom">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleSendChat()
                    }
                  }}
                  placeholder="Escreve algo..."
                  className="bg-white/5 border-white/10 pr-10 rounded-full h-10 text-sm"
                  disabled={!isLive}
                />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8 text-primary">
                  <Flame className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 rounded-full h-10 w-10 shrink-0"
                onClick={handleSendChat}
                disabled={!chatInput.trim() || !isLive}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside >
      </div >
    </div >
  )
}
