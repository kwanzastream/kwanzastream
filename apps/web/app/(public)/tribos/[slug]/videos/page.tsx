"use client"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import Link from "next/link"

const MOCK = [{ id: "v1", title: "Kuduro Live Session — Completo", channel: "kuduro_master", duration: "2:15:00", views: 12000, date: "há 2 dias" }, { id: "v2", title: "Beat Making ao Vivo", channel: "beats_angola", duration: "1:45:00", views: 5600, date: "há 5 dias" }]

export default function TriboVideosPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{MOCK.map(v => <Link key={v.id} href={`/videos/${v.id}`} className="rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all"><div className="relative aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10"><span className="absolute bottom-1 right-1 bg-black/70 text-[9px] text-white px-1 rounded">{v.duration}</span></div><div className="p-3"><p className="text-sm font-bold line-clamp-2">{v.title}</p><p className="text-[10px] text-muted-foreground">@{v.channel} · {(v.views/1000).toFixed(0)}K views · {v.date}</p></div></Link>)}</div>
    </div>
  )
}
