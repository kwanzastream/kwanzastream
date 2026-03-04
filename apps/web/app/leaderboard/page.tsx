"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy, Medal, Crown, ArrowLeft, Users, Gift, Loader2 } from "lucide-react"
import { donationService } from "@/lib/services"
import Link from "next/link"

interface LeaderEntry {
    rank: number
    user: {
        id: string
        username?: string
        displayName?: string
        avatarUrl?: string
    } | null
    totalAmount: number
}

type Period = "all" | "month" | "week" | "today"

export default function LeaderboardPage() {
    const router = useRouter()
    const [leaders, setLeaders] = React.useState<LeaderEntry[]>([])
    const [loading, setLoading] = React.useState(true)
    const [period, setPeriod] = React.useState<Period>("all")

    React.useEffect(() => {
        const load = async () => {
            setLoading(true)
            try {
                const { data } = await donationService.getLeaderboard({ limit: 20, period })
                setLeaders(data.leaderboard || [])
            } catch {
                setLeaders([])
            }
            setLoading(false)
        }
        load()
    }, [period])

    const top3 = leaders.slice(0, 3)
    const rest = leaders.slice(3)

    const podiumColors = [
        "from-yellow-500 to-amber-400",  // 1st
        "from-slate-400 to-slate-300",   // 2nd
        "from-amber-700 to-orange-600",  // 3rd
    ]

    const podiumIcons = [
        <Crown key="1" className="h-6 w-6 text-yellow-400" />,
        <Medal key="2" className="h-5 w-5 text-slate-300" />,
        <Medal key="3" className="h-5 w-5 text-amber-600" />,
    ]

    const podiumOrder = [1, 0, 2] // display: 2nd, 1st, 3rd

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10 p-4 md:px-6 flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
                    <Trophy className="h-5 w-5 text-yellow-400" /> Leaderboard
                </h1>
            </header>

            <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
                {/* Period Filter */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {([
                        { key: "all", label: "Geral" },
                        { key: "month", label: "Este Mês" },
                        { key: "week", label: "Esta Semana" },
                        { key: "today", label: "Hoje" },
                    ] as { key: Period; label: string }[]).map(p => (
                        <Button
                            key={p.key}
                            variant={period === p.key ? "default" : "outline"}
                            size="sm"
                            className={period === p.key
                                ? "bg-primary font-bold"
                                : "border-white/10 bg-transparent"
                            }
                            onClick={() => setPeriod(p.key)}
                        >
                            {p.label}
                        </Button>
                    ))}
                </div>

                {loading ? (
                    <div className="space-y-4">
                        <div className="flex items-end justify-center gap-4 py-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <Skeleton className="h-16 w-16 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            ))}
                        </div>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full rounded-xl" />
                        ))}
                    </div>
                ) : leaders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                            <Trophy className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                        <h3 className="font-bold text-lg">Sem dados ainda</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Quando os utilizadores começarem a enviar Salos, o ranking aparecerá aqui.
                        </p>
                        <Link href="/feed">
                            <Button variant="outline" size="sm" className="border-white/10">Explorar Feed</Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Podium */}
                        {top3.length >= 3 && (
                            <div className="flex items-end justify-center gap-3 md:gap-6 py-4">
                                {podiumOrder.map(idx => {
                                    const entry = top3[idx]
                                    if (!entry) return null
                                    const isFirst = idx === 0
                                    return (
                                        <Link
                                            key={entry.rank}
                                            href={entry.user ? `/profile/${entry.user.id}` : "#"}
                                            className="flex flex-col items-center text-center group"
                                        >
                                            <div className="relative mb-2">
                                                <Avatar className={`${isFirst ? "h-20 w-20" : "h-14 w-14"} ring-2 ring-offset-2 ring-offset-background transition-transform group-hover:scale-110 ${idx === 0 ? "ring-yellow-500" : idx === 1 ? "ring-slate-400" : "ring-amber-700"
                                                    }`}
                                                >
                                                    <AvatarImage src={entry.user?.avatarUrl} />
                                                    <AvatarFallback className={`bg-gradient-to-br ${podiumColors[idx]} text-white font-bold ${isFirst ? "text-xl" : "text-sm"}`}>
                                                        {(entry.user?.displayName || entry.user?.username || "?")[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -top-2 -right-2 bg-background border border-white/10 rounded-full p-1">
                                                    {podiumIcons[idx]}
                                                </div>
                                            </div>
                                            <p className={`font-bold ${isFirst ? "text-sm" : "text-xs"} truncate max-w-[100px]`}>
                                                {entry.user?.displayName || entry.user?.username || "Anónimo"}
                                            </p>
                                            <p className="text-xs text-primary font-black">
                                                {entry.totalAmount.toLocaleString()} Kz
                                            </p>
                                            <Badge variant="outline" className="mt-1 text-[10px] border-white/10">
                                                #{entry.rank}
                                            </Badge>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}

                        {/* Rest of rankings */}
                        <div className="space-y-2">
                            {(top3.length < 3 ? leaders : rest).map(entry => (
                                <Link
                                    key={entry.rank}
                                    href={entry.user ? `/profile/${entry.user.id}` : "#"}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors group"
                                >
                                    <span className="w-8 text-center font-black text-muted-foreground text-sm">
                                        {entry.rank}
                                    </span>
                                    <Avatar className="h-10 w-10 ring-1 ring-white/10">
                                        <AvatarImage src={entry.user?.avatarUrl} />
                                        <AvatarFallback className="bg-white/5 text-sm">
                                            {(entry.user?.displayName || entry.user?.username || "?")[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                                            {entry.user?.displayName || entry.user?.username || "Anónimo"}
                                        </p>
                                        {entry.user?.username && (
                                            <p className="text-xs text-muted-foreground">@{entry.user.username}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-primary text-sm">{entry.totalAmount.toLocaleString()} Kz</p>
                                        <p className="text-[10px] text-muted-foreground">total doado</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
