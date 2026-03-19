"use client"
import { useParams } from "next/navigation"
import { TribeHeader } from "@/components/tribes/tribe-header"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { Radio, Clock } from "lucide-react"
import Link from "next/link"
import type { TribeData } from "@/components/tribes/tribe-card"

const MOCK: TribeData = { slug: "kuduro-kings", name: "Kuduro Kings", description: "A tribo do Kuduro. Música, dança, cultura angolana pura. Junta-te à melhor comunidade de Kuduro da plataforma.", category: "Música", memberCount: 12500, weeklyStreams: 45, access: "open", color: "#CE1126", founder: { username: "kuduro_master", displayName: "Kuduro Master" } }

const LIVE_STREAMS = [{ channel: "kuduro_master", title: "Kuduro Mix Live — Sexta à Noite 🎵", viewers: 1200 }]
const RECENT_CLIPS = [{ id: "c1", title: "Dança insana no palco! 🔥", views: 45000, creator: "danca_ao" }, { id: "c2", title: "Novo beat — produção ao vivo", views: 12000, creator: "beats_angola" }]

export default function TriboPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-6">
      <TribeHeader tribe={MOCK} isMember isFounder={false} />
      <TribeTabs slug={String(slug)} />

      {/* Default: Feed view */}
      {LIVE_STREAMS.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-bold flex items-center gap-1.5"><Radio className="w-4 h-4 text-red-400 animate-pulse" />Ao Vivo Agora</h2>
          {LIVE_STREAMS.map(s => (
            <Link key={s.channel} href={`/${s.channel}`} className="block p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-all">
              <p className="text-sm font-bold">{s.title}</p>
              <p className="text-[10px] text-muted-foreground">@{s.channel} · {s.viewers.toLocaleString()} a ver</p>
            </Link>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-sm font-bold flex items-center gap-1.5"><Clock className="w-4 h-4" />Clips Recentes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RECENT_CLIPS.map(c => (
            <Link key={c.id} href={`/clips/${c.id}`} className="rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10" />
              <div className="p-2"><p className="text-[10px] font-bold truncate">{c.title}</p><p className="text-[9px] text-muted-foreground">@{c.creator} · {(c.views / 1000).toFixed(0)}K views</p></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
