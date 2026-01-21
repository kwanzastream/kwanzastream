"use client"

import * as React from "react"
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
} from "lucide-react"

export default function StreamPage() {
  const [isLive, setIsLive] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [cameraOn, setCameraOn] = React.useState(true)

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* Top Status Bar */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">K</div>
            <span className="font-bold tracking-tighter hidden sm:block">STUDIO</span>
          </div>
          <Separator orientation="vertical" className="h-6 bg-white/10" />
          <div className="flex items-center gap-3">
            {isLive ? (
              <Badge variant="destructive" className="bg-red-600 animate-pulse border-none font-bold">
                <Circle className="w-2 h-2 fill-current mr-1.5" /> AO VIVO
              </Badge>
            ) : (
              <Badge variant="outline" className="border-white/20 text-muted-foreground font-bold">
                PRÉVIA
              </Badge>
            )}
            <span className="text-xs font-medium text-muted-foreground">00:45:22</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-bold">1.2K</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-sm font-black text-primary">45,200 Kz</span>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
            <X className="h-5 w-5" />
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
                placeholder="Ex: Noite de Kuduro com os Amigos"
                className="bg-white/5 border-white/10 h-10 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold">Categoria</label>
              <div className="relative">
                <Input value="Música" readOnly className="bg-white/5 border-white/10 h-10 cursor-pointer pr-10" />
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Separator className="bg-white/10" />

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Interação</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Permitir Comentários</span>
              <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md" />
              </div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <span className="text-sm font-medium">Apenas Seguidores</span>
              <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-not-allowed">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <Card className="bg-linear-to-br from-primary/20 to-transparent border-primary/20 overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Flame className="h-4 w-4 text-primary" /> Dica de Creator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pede aos teus fãs para usarem o Multicaixa Express para te enviarem presentes em tempo real! 🇦🇴
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Center - Video Preview */}
        <main className="flex-1 bg-black flex flex-col relative group">
          <div className="flex-1 flex items-center justify-center relative">
            <img
              src="/vibrant-concert-stage.png"
              alt="Stream Preview"
              className={`max-w-full max-h-full object-contain ${cameraOn ? "opacity-100" : "opacity-0"}`}
            />
            {!cameraOn && (
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
            )}

            {/* In-Video Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-xs px-3 py-1 font-bold">
                <Users className="w-3 h-3 mr-2" /> 1,240
              </Badge>
              <Badge className="bg-primary border-none text-white text-xs px-3 py-1 font-bold">AO VIVO</Badge>
            </div>

            {/* Gift Notification Overlay */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-primary/50 rounded-full px-6 py-3 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">
                  <span className="text-primary">Sandra Gomes</span> enviou{" "}
                  <span className="text-secondary">500 Kz</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="h-20 border-t border-white/10 flex items-center justify-between px-6 bg-black/60 backdrop-blur-xl z-20">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant={cameraOn ? "secondary" : "destructive"}
                onClick={() => setCameraOn(!cameraOn)}
                className="rounded-full w-12 h-12"
              >
                {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button
                size="icon"
                variant={isMuted ? "destructive" : "secondary"}
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full w-12 h-12"
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full w-12 h-12 text-muted-foreground">
                <Monitor className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsLive(!isLive)}
                className={`rounded-full px-10 font-black text-lg h-14 shadow-2xl transition-all ${
                  isLive
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                }`}
              >
                {isLive ? "Terminar Live" : "Começar Transmissão"}
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>

        {/* Right Side - Chat Interface */}
        <aside className="w-full lg:w-80 border-l border-white/10 flex flex-col bg-black/20">
          <div className="h-14 border-b border-white/10 flex items-center px-4">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> Chat da Live
            </h3>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <ChatMessage name="Elsio Costa" message="Bem-vindos todos! 🇦🇴" isStreamer />
              <ChatMessage name="Sandra Gomes" message="Amei o som! Continua assim! 🔥" />
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 space-y-2 animate-in fade-in slide-in-from-right-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-primary uppercase">Super Chat</span>
                  <span className="text-[10px] font-bold text-primary">500 Kz</span>
                </div>
                <p className="text-xs font-bold">Manda um salve para Benguela! 🌊</p>
                <p className="text-[10px] text-muted-foreground">Por: Sandra Gomes</p>
              </div>
              <ChatMessage name="Ninja Angolano" message="Gaming de alto nível aqui!" />
              <ChatMessage name="Tia Maria" message="A ensinar o mundo a cozinhar angolano! ❤️" />
              <ChatMessage name="Preto Show" message="A quebraaaar! 🇦🇴🇦🇴" isVerified />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-white/10 bg-black/40">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Escreve algo..."
                  className="bg-white/5 border-white/10 pr-10 rounded-full h-10 text-sm"
                />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8 text-primary">
                  <Flame className="h-4 w-4" />
                </Button>
              </div>
              <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-full h-10 w-10 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ChatMessage({
  name,
  message,
  isStreamer = false,
  isVerified = false,
}: { name: string; message: string; isStreamer?: boolean; isVerified?: boolean }) {
  return (
    <div className="flex gap-2 text-sm items-start">
      <Avatar className="h-6 w-6 shrink-0 mt-0.5">
        <AvatarImage src={`/.jpg?key=kkbj7&height=24&width=24&query=${name}`} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="leading-tight">
          <span
            className={`font-black mr-1.5 ${isStreamer ? "text-primary" : "text-muted-foreground"} hover:underline cursor-pointer`}
          >
            {name}
          </span>
          <span className="text-foreground/90">{message}</span>
        </p>
      </div>
    </div>
  )
}
