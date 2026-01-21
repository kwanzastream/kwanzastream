"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  Video,
  Share2,
  Heart,
  MessageCircle,
  Gift,
  MoreHorizontal,
  ChevronDown,
  Monitor,
  Maximize2,
  Volume2,
  Settings,
  Flame,
} from "lucide-react"
import Link from "next/link"

export default function WatchPage() {
  const [chatHidden, setChatHidden] = React.useState(false)

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col h-screen overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-background/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/feed">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">K</div>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="destructive" className="bg-red-600 animate-pulse border-none font-bold text-[10px]">
              AO VIVO
            </Badge>
            <h1 className="text-sm font-bold truncate max-w-[200px] md:max-w-md">
              Festival Som de Luanda 2025 - Palco Principal
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-bold tabular-nums">1.4K</span>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
            <Share2 className="h-5 w-5" />
          </Button>
          <Link href="/feed">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Main Video Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="aspect-video w-full bg-black relative group">
            <img src="/vibrant-concert-stage.png" alt="Live Stream" className="w-full h-full object-contain" />

            {/* Player Controls Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-white">
                    <Video className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-white">
                    <Monitor className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Settings className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Maximize2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary ring-offset-2 ring-offset-background transition-all hover:ring-2 hover:ring-primary">
                  <AvatarImage src="/abstract-profile.png" alt="Preto Show" />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black">Preto Show</h2>
                    <Badge className="bg-primary/20 text-primary border-none text-[10px] font-bold">VERIFICADO</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">920K Seguidores • @pretoshow_oficial</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90 text-white font-black px-8 h-12 rounded-xl">
                  Seguir
                </Button>
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 font-bold h-12 rounded-xl"
                >
                  Partilhar
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-lg font-bold">Sobre esta Live</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Estamos em direto de Luanda para o maior festival de música do ano! Aproveita o som do Kuduro e Semba
                com os melhores artistas nacionais. 🇦🇴🔥 Não te esqueças de apoiar o teu creator favorito com um
                presente!
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/10 text-white border-none font-bold">
                  #FestivalLuanda
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white border-none font-bold">
                  #Kuduro
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white border-none font-bold">
                  #MusicaAngolana
                </Badge>
              </div>
            </div>

            {/* Related Streams */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tighter">
                <Flame className="h-5 w-5 text-secondary" /> Outras Lives Recomendadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RelatedStreamCard
                  title="Noite de Kizomba"
                  name="Yola Semedo"
                  viewers="2.1K"
                  image="/recording-studio.png"
                />
                <RelatedStreamCard
                  title="Gaming: Luanda Warzone"
                  name="Ninja Angolano"
                  viewers="850"
                  image="/gaming-setup.png"
                />
              </div>
            </div>
          </div>
        </main>

        {/* Live Chat Sidebar */}
        {!chatHidden && (
          <aside className="w-full lg:w-96 border-l border-white/10 flex flex-col bg-black/40 backdrop-blur-xl shrink-0">
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-4">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" /> Chat em Tempo Real
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setChatHidden(true)} className="text-muted-foreground">
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-primary flex items-center gap-2">
                    <Gift className="h-3 w-3" /> Sandra Gomes enviou Coroa (5,000 Kz)
                  </p>
                </div>
                <ChatMsg name="Pedro Luanda" message="O som está demais! 🇦🇴🔥" />
                <ChatMsg name="Mariana Benguela" message="Luanda sempre a quebrar tudo!" />
                <ChatMsg name="Creator Studio" message="Bem-vindos ao Festival! Aproveitem a live." isModerator />
                <ChatMsg name="Joao_93" message="Qual é o próximo artista?" />
                <ChatMsg name="Preto Show" message="Obrigado pelo apoio pessoal! ❤️" isStreamer />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-white/10 bg-black/40 space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs h-10"
                >
                  <Gift className="h-4 w-4 mr-2" /> Enviar Presente
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs h-10"
                >
                  Subscrever
                </Button>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Comenta algo..." className="bg-white/5 border-white/10 h-11 rounded-full text-sm" />
                <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-full h-11 w-11 shrink-0">
                  <Heart className="h-5 w-5 fill-white" />
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

function ChatMsg({ name, message, isStreamer = false, isModerator = false }: any) {
  return (
    <div className="text-sm leading-relaxed">
      <span
        className={`font-black mr-2 ${isStreamer ? "text-primary" : isModerator ? "text-secondary" : "text-muted-foreground"}`}
      >
        {name}:
      </span>
      <span className="text-foreground/90">{message}</span>
    </div>
  )
}

function RelatedStreamCard({ title, name, viewers, image }: any) {
  return (
    <div className="flex gap-3 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-all">
      <div className="aspect-video w-32 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
        <div className="absolute top-1 left-1">
          <Badge className="bg-red-600 text-[8px] h-4 px-1 border-none font-bold">LIVE</Badge>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className="text-xs font-bold truncate group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-[10px] text-muted-foreground truncate">{name}</p>
        <p className="text-[10px] text-primary font-bold mt-1 flex items-center gap-1">
          <Users className="h-2.5 w-2.5" /> {viewers}
        </p>
      </div>
    </div>
  )
}
