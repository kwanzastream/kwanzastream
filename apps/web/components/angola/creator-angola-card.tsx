"use client"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
interface CreatorAngolaCardProps { id: string; username: string; displayName: string; avgViewers: number; province: string; category?: string; isLive?: boolean }
export function CreatorAngolaCard({ id, username, displayName, avgViewers, province, category, isLive }: CreatorAngolaCardProps) {
  return (
    <Link href={`/${username}`} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">{displayName[0]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5"><p className="text-sm font-semibold truncate">{displayName}</p>{isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}</div>
        <p className="text-[10px] text-muted-foreground">@{username} · {province}{category ? ` · ${category}` : ""}</p>
      </div>
      <div className="text-right shrink-0"><p className="text-xs font-bold">{avgViewers.toLocaleString()}</p><p className="text-[9px] text-muted-foreground">avg viewers</p></div>
    </Link>
  )
}
