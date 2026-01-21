"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, UserPlus, Gift, Radio, AtSign, Trophy, Wallet, CheckCircle2, Trash2, Circle } from "lucide-react"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "live",
    user: "Preto Show",
    avatar: "/abstract-profile.png",
    content: "está ao vivo agora: Preparativos para o grande show!",
    time: "agora",
    unread: true,
  },
  {
    id: 2,
    type: "gift",
    user: "Sandra Gomes",
    avatar: "/abstract-profile.png",
    content: "enviou-te um Kwanza de Ouro (5,000 Kz)",
    time: "5 min",
    unread: true,
  },
  {
    id: 3,
    type: "follow",
    user: "Yola Semedo",
    avatar: "/abstract-profile.png",
    content: "começou a seguir-te",
    time: "2h",
    unread: false,
    canFollowBack: true,
  },
  {
    id: 4,
    type: "mention",
    user: "Anselmo Ralph",
    avatar: "/abstract-profile.png",
    content: "mencionou-te num post: '@elsiocosta és o maior!'",
    time: "5h",
    unread: false,
  },
  {
    id: 5,
    type: "milestone",
    content: "Parabéns! Chegaste aos 1,000 seguidores!",
    time: "ontem",
    unread: false,
  },
  {
    id: 6,
    type: "payment",
    content: "Levantamento de 50,000 Kz processado com sucesso via Multicaixa Express.",
    time: "3 dias",
    unread: false,
  },
]

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-2xl mx-auto w-full md:border-x border-white/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/feed">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Circle className="h-5 w-5 fill-primary text-primary" />
            </Button>
          </Link>
          <h1 className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
            <Bell className="h-5 w-5 text-primary" /> Notificações
          </h1>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary font-bold text-xs">
          Limpar tudo
        </Button>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full bg-background border-b border-white/10 rounded-none h-14 p-0">
          <TabsTrigger
            value="all"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-bold"
          >
            Todas
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-bold"
          >
            Não Lidas
          </TabsTrigger>
          <TabsTrigger
            value="mentions"
            className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary h-full font-bold"
          >
            Menções
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 h-[calc(100vh-120px)]">
          <TabsContent value="all" className="mt-0 pb-20">
            {notifications.length > 0 ? (
              <div className="divide-y divide-white/5">
                {notifications.map((notif) => (
                  <NotificationItem key={notif.id} {...notif} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                  <Bell className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <h3 className="font-bold text-lg">Sem notificações novas</h3>
                <p className="text-sm text-muted-foreground">Ouve os teus fãs e mantem-te conectado com Angola!</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="unread" className="mt-0">
            <div className="divide-y divide-white/5">
              {notifications
                .filter((n) => n.unread)
                .map((notif) => (
                  <NotificationItem key={notif.id} {...notif} />
                ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}

function NotificationItem({ type, user, avatar, content, time, unread, canFollowBack }: any) {
  const getIcon = () => {
    switch (type) {
      case "live":
        return <Radio className="h-3 w-3 text-red-500" />
      case "gift":
        return <Gift className="h-3 w-3 text-secondary" />
      case "follow":
        return <UserPlus className="h-3 w-3 text-primary" />
      case "mention":
        return <AtSign className="h-3 w-3 text-blue-400" />
      case "milestone":
        return <Trophy className="h-3 w-3 text-yellow-500" />
      case "payment":
        return <Wallet className="h-3 w-3 text-green-500" />
      default:
        return <Bell className="h-3 w-3 text-muted-foreground" />
    }
  }

  return (
    <div
      className={`p-4 md:px-6 flex gap-4 transition-colors cursor-pointer group ${unread ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-white/5"}`}
    >
      <div className="relative shrink-0">
        {avatar ? (
          <Avatar className="h-12 w-12 border border-white/10">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={user} />
            <AvatarFallback>{user ? user[0] : "K"}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 bg-background border border-white/10 rounded-full p-1 shadow-lg">
          {getIcon()}
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex justify-between items-start gap-2">
          <p className="text-sm leading-relaxed">
            {user && <span className="font-bold mr-1">{user}</span>}
            <span className="text-foreground/90">{content}</span>
          </p>
          <span className="text-[10px] text-muted-foreground uppercase font-black shrink-0 mt-1">{time}</span>
        </div>

        {canFollowBack && (
          <div className="pt-2">
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90 rounded-full h-8 px-4 font-bold">
              Seguir de Volta
            </Button>
          </div>
        )}

        {type === "live" && (
          <div className="pt-2">
            <div className="aspect-video w-48 rounded-lg overflow-hidden border border-white/10 relative">
              <img src="/vibrant-concert-stage.png" alt="Live Preview" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2">
                <Badge variant="destructive" className="bg-red-600 text-[8px] h-4 px-1 border-none">
                  AO VIVO
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
