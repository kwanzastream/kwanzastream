"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Users, Eye, Gift, ArrowUpRight } from "lucide-react"

interface CreatorStatsProps {
    totalEarnings: number    // in Kz
    monthEarnings: number    // in Kz
    totalDonations: number   // count
    monthDonations: number   // count
    totalViews: number
    followers: number
    commission: number       // platform commission (0.20)
}

const formatKz = (amount: number): string => {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M Kz`
    if (amount >= 1_000) return `${(amount / 1_000).toFixed(1)}k Kz`
    return `${amount.toLocaleString()} Kz`
}

export function CreatorRevenue({
    totalEarnings = 0,
    monthEarnings = 0,
    totalDonations = 0,
    monthDonations = 0,
    totalViews = 0,
    followers = 0,
    commission = 0.20,
}: Partial<CreatorStatsProps>) {
    const netEarnings = totalEarnings * (1 - commission)
    const monthNet = monthEarnings * (1 - commission)

    const stats = [
        {
            label: "Ganhos Totais",
            value: formatKz(netEarnings),
            subtext: `${formatKz(totalEarnings)} bruto · ${(commission * 100).toFixed(0)}% comissão`,
            icon: DollarSign,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
        },
        {
            label: "Este Mês",
            value: formatKz(monthNet),
            subtext: `${monthDonations} salos recebidos`,
            icon: TrendingUp,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            label: "Salos Totais",
            value: totalDonations.toLocaleString(),
            subtext: "doações recebidas",
            icon: Gift,
            color: "text-yellow-400",
            bgColor: "bg-yellow-500/10",
        },
        {
            label: "Visualizações",
            value: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews.toString(),
            subtext: `${followers} seguidores`,
            icon: Eye,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    Receita
                </h2>
                <Badge className="bg-green-500/20 text-green-400 border-none text-xs">
                    80% para ti
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-white/10 bg-card/50">
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                                </div>
                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                                    {stat.label}
                                </span>
                            </div>
                            <p className="text-xl font-black">{stat.value}</p>
                            <p className="text-[10px] text-muted-foreground">{stat.subtext}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Commission breakdown */}
            <Card className="border-white/10 bg-card/50">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Cada vez que recebes um Salo:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-green-400 font-bold">80% → Tu</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground">20% → Kwanza Stream</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
