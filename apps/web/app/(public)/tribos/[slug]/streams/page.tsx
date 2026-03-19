"use client"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { Radio, Clock, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const LIVE = [{ channel: "kuduro_master", title: "Kuduro Mix Live 🎵", viewers: 1200, category: "Música" }]
const RECENT = [{ channel: "danca_ao", title: "Dance practice replay", viewers: 890, date: "há 4h" }, { channel: "beats_angola", title: "Beat making session", viewers: 450, date: "há 12h" }]

export default function TriboStreamsPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      {LIVE.length > 0 && <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Radio className="w-4 h-4 text-red-400 animate-pulse" />Ao Vivo</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{LIVE.map(s => <Link key={s.channel} href={`/${s.channel}`} className="rounded-xl overflow-hidden border border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-all"><div className="aspect-video bg-black/40" /><div className="p-3"><p className="text-sm font-bold">{s.title}</p><p className="text-[10px] text-muted-foreground flex items-center gap-2">@{s.channel} <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{s.viewers}</span></p></div></Link>)}</div></div>}
      <div className="space-y-2"><h2 className="text-sm font-bold flex items-center gap-1.5"><Clock className="w-4 h-4" />Recentes (48h)</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{RECENT.map(s => <Link key={s.channel} href={`/${s.channel}`} className="rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all"><div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10" /><div className="p-3"><p className="text-sm font-bold">{s.title}</p><p className="text-[10px] text-muted-foreground">@{s.channel} · {s.date}</p></div></Link>)}</div></div>
    </div>
  )
}
