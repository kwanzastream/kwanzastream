"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Home, Compass, Radio, Trophy, Flame, Tv, MessageSquare, Bell, Wallet } from "lucide-react"

interface LiveChannel {
    id: string
    username: string
    displayName: string
    avatarUrl?: string
    viewerCount: number
    category: string
}

const MAIN_NAV = [
    { href: "/feed", icon: Home, label: "Feed" },
    { href: "/explorar", icon: Compass, label: "Explorar" },
    { href: "/ao-vivo", icon: Tv, label: "Ao Vivo" },
    { href: "/tendencias", icon: Flame, label: "Tendências" },
    { href: "/radio", icon: Radio, label: "Rádio" },
]

const SECONDARY_NAV = [
    { href: "/mensagens", icon: MessageSquare, label: "Mensagens" },
    { href: "/notificacoes", icon: Bell, label: "Notificações" },
    { href: "/wallet", icon: Wallet, label: "Carteira" },
    { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
]

const CATEGORIES = [
    { href: "/categoria/gaming", emoji: "🎮", label: "Gaming" },
    { href: "/categoria/musica", emoji: "🎵", label: "Música" },
    { href: "/categoria/futebol", emoji: "⚽", label: "Futebol" },
    { href: "/categoria/just-talking", emoji: "💬", label: "Just Talking" },
    { href: "/categoria/irl", emoji: "📍", label: "IRL Angola" },
    { href: "/categoria/comedia", emoji: "😂", label: "Comédia" },
]

export function Sidebar() {
    const pathname = usePathname()
    const { isAuthenticated } = useAuth()
    const [followedLive, setFollowedLive] = useState<LiveChannel[]>([])

    useEffect(() => {
        if (!isAuthenticated) return
        api.get("/api/streams/live")
            .then((res) => {
                const streams = res.data?.streams || res.data || []
                setFollowedLive(
                    streams.slice(0, 8).map((s: any) => ({
                        id: s.id,
                        username: s.streamer?.username || s.userId,
                        displayName: s.streamer?.displayName || s.title,
                        avatarUrl: s.streamer?.avatarUrl,
                        viewerCount: s.viewerCount || 0,
                        category: s.category || "",
                    }))
                )
            })
            .catch(() => { })
    }, [isAuthenticated])

    const isActive = (href: string) => pathname === href

    return (
        <aside className="w-60 xl:w-64 shrink-0 border-r border-border/50 min-h-screen hidden lg:flex flex-col bg-background">
            <ScrollArea className="flex-1">
                <div className="p-3 space-y-1">
                    <div className="space-y-0.5">
                        {MAIN_NAV.map((item) => (
                            <Link key={item.href} href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive(item.href) ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                                <item.icon className="w-4 h-4 shrink-0" />{item.label}
                            </Link>
                        ))}
                    </div>

                    <Separator className="my-2" />

                    <div className="space-y-0.5">
                        {SECONDARY_NAV.map((item) => (
                            <Link key={item.href} href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${isActive(item.href) ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                                <item.icon className="w-4 h-4 shrink-0" />{item.label}
                            </Link>
                        ))}
                    </div>

                    <Separator className="my-2" />

                    <div>
                        <div className="flex items-center justify-between px-3 py-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categorias</p>
                            <Link href="/explorar/categorias" className="text-xs text-muted-foreground hover:text-primary">Ver todas</Link>
                        </div>
                        <div className="space-y-0.5 mt-1">
                            {CATEGORIES.map((cat) => (
                                <Link key={cat.href} href={cat.href}
                                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors ${isActive(cat.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                                    <span className="text-base">{cat.emoji}</span><span className="text-xs">{cat.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {isAuthenticated && followedLive.length > 0 && (
                        <>
                            <Separator className="my-2" />
                            <div>
                                <div className="flex items-center justify-between px-3 py-1">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ao Vivo Agora</p>
                                </div>
                                <div className="space-y-0.5 mt-1">
                                    {followedLive.map((channel) => (
                                        <Link key={channel.id} href={`/stream/${channel.username}`} className="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors group">
                                            <div className="relative shrink-0">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={channel.avatarUrl} />
                                                    <AvatarFallback className="text-[10px]">{channel.displayName.slice(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#CE1126] rounded-full border border-background" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium truncate">{channel.displayName}</p>
                                                <p className="text-[10px] text-muted-foreground truncate">{channel.category}</p>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground shrink-0">
                                                {channel.viewerCount > 999 ? `${(channel.viewerCount / 1000).toFixed(1)}k` : channel.viewerCount}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}
