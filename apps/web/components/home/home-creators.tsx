"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Creator {
    id: string
    username: string
    displayName: string
    avatarUrl?: string
    isLive?: boolean
    category?: string
}

export function HomeCreators() {
    const [creators, setCreators] = useState<Creator[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/api/recommendations/creators")
            .then((res) => setCreators(res.data?.creators || res.data || []))
            .catch(() => setCreators([]))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="text-center space-y-2">
                        <Skeleton className="w-14 h-14 rounded-full mx-auto" />
                        <Skeleton className="h-3 w-20 mx-auto" />
                    </div>
                ))}
            </div>
        )
    }

    if (creators.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Criadores angolanos em breve</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {creators.slice(0, 10).map((creator) => (
                <Link key={creator.id} href={`/${creator.username}`}
                    className="group text-center p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all hover:bg-muted/30">
                    <div className="relative inline-block mb-3">
                        <Avatar className="w-14 h-14 mx-auto">
                            <AvatarImage src={creator.avatarUrl} />
                            <AvatarFallback className="bg-primary/20 text-primary">{creator.displayName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {creator.isLive && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#CE1126] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">AO VIVO</span>
                        )}
                    </div>
                    <p className="text-sm font-medium truncate">{creator.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">@{creator.username}</p>
                    {creator.category && <Badge variant="secondary" className="mt-1.5 text-[10px]">{creator.category}</Badge>}
                </Link>
            ))}
        </div>
    )
}
