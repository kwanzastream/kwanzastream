"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Plus,
  Video,
  Phone,
  Info,
  MoreVertical,
  Smile,
  Paperclip,
  Gift,
  Send,
  ArrowLeft,
  Check,
  CheckCheck,
} from "lucide-react"
import Link from "next/link"

const contacts = [
  {
    id: 1,
    name: "Sandra Gomes",
    avatar: "/abstract-profile.png",
    lastMsg: "O show ontem foi incrível! 🇦🇴",
    time: "10:45",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Preto Show",
    avatar: "/abstract-profile.png",
    lastMsg: "Enviado um presente: Coroa Digital",
    time: "Ontem",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Anselmo Ralph",
    avatar: "/abstract-profile.png",
    lastMsg: "Quando fazemos o próximo dueto?",
    time: "Segunda",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Yola Semedo",
    avatar: "/abstract-profile.png",
    lastMsg: "A tua live está a quebrar tudo!",
    time: "2h",
    unread: 0,
    online: false,
  },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = React.useState(contacts[0])

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      {/* Top Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/feed" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg text-white">
              K
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase hidden sm:block">Mensagens</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <aside className="w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col shrink-0">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Procurar conversas..."
                className="bg-white/5 border-white/10 pl-10 h-10 rounded-full"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 pb-4">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedChat(contact)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedChat.id === contact.id ? "bg-primary/10 border border-primary/20" : "hover:bg-white/5"
                  }`}
                >
                  <div className="relative shrink-0">
                    <Avatar className="h-12 w-12 border border-white/5">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="text-sm font-bold truncate">{contact.name}</h4>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">{contact.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground truncate">{contact.lastMsg}</p>
                      {contact.unread > 0 && (
                        <Badge className="h-5 min-w-[20px] bg-primary text-white border-none text-[10px] font-bold">
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col bg-black/20">
          {/* Chat Header */}
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-background/40 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/5">
                  <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                  <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                </Avatar>
                {selectedChat.online && (
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold">{selectedChat.name}</h3>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">
                  {selectedChat.online ? "Online" : "Visto há 5 min"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Info className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 md:p-6">
            <div className="space-y-6 max-w-4xl mx-auto pb-10">
              <div className="flex justify-center">
                <Badge variant="outline" className="bg-white/5 border-white/10 text-muted-foreground text-[10px] py-1">
                  ONTEM
                </Badge>
              </div>

              <ChatBubble
                side="left"
                text="Olá Elsio! Viste o feedback da live de ontem? Angola parou para te ver! 🇦🇴"
                time="18:30"
              />
              <ChatBubble side="right" text="Sim Sandra! Foi surreal o apoio que recebemos. 🚀" time="18:32" isRead />

              <div className="flex justify-center py-2">
                <Badge variant="outline" className="bg-white/5 border-white/10 text-muted-foreground text-[10px] py-1">
                  HOJE
                </Badge>
              </div>

              <ChatBubble side="left" text="O show ontem foi incrível! 🇦🇴" time="10:45" />

              <div className="flex justify-start">
                <div className="max-w-[80%] md:max-w-[60%] space-y-2">
                  <div className="p-4 rounded-2xl rounded-tl-none bg-linear-to-br from-primary/10 to-transparent border border-primary/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Gift className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs font-black text-primary uppercase">Presente Digital</span>
                    </div>
                    <p className="text-sm font-bold text-foreground">Recebeste um "Kwanza de Ouro" (5,000 Kz)</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-left uppercase font-bold">10:46</p>
                </div>
              </div>

              <ChatBubble side="right" text="Muito obrigado pelo presente Sandra! 🙏❤️" time="10:50" isRead />
            </div>
          </ScrollArea>

          {/* Message Composer */}
          <div className="p-4 bg-background/60 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-4xl mx-auto flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>

              <div className="relative flex-1">
                <Input
                  placeholder="Escreve uma mensagem..."
                  className="bg-white/5 border-white/10 h-11 px-4 rounded-full text-sm focus-visible:ring-primary"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1.5 h-8 w-8 text-primary hover:bg-primary/10"
                >
                  <Gift className="h-4 w-4" />
                </Button>
              </div>

              <Button size="icon" className="bg-primary hover:bg-primary/90 text-white rounded-full h-11 w-11 shrink-0">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function ChatBubble({
  side,
  text,
  time,
  isRead = false,
}: { side: "left" | "right"; text: string; time: string; isRead?: boolean }) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] md:max-w-[60%] space-y-1.5`}>
        <div
          className={`p-3 md:p-4 rounded-2xl ${
            side === "right"
              ? "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/20"
              : "bg-white/5 text-foreground rounded-tl-none border border-white/10"
          }`}
        >
          <p className="text-sm md:text-base leading-relaxed">{text}</p>
        </div>
        <div className={`flex items-center gap-1.5 ${side === "right" ? "justify-end" : "justify-start"}`}>
          <span className="text-[10px] text-muted-foreground uppercase font-bold">{time}</span>
          {side === "right" && (
            <span className="text-white/60">
              {isRead ? <CheckCheck className="h-3 w-3 text-primary" /> : <Check className="h-3 w-3" />}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
