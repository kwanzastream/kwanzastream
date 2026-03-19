"use client"
import { useParams } from "next/navigation"
import { TribeTabs } from "@/components/tribes/tribe-tabs"
import { Radio, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

const FEED_ITEMS = [
  { type: "stream", channel: "kuduro_master", title: "Kuduro Mix Live 🎵", viewers: 1200, time: "Agora" },
  { type: "clip", id: "c1", channel: "danca_ao", title: "Dança insana! 🔥", views: 45000, time: "2h" },
  { type: "post", channel: "beats_angola", text: "Novo beat dropping amanhã às 20h WAT 👀🔥", time: "4h" },
  { type: "join", channel: "novo_membro", text: "juntou-se à tribo", time: "6h" },
]

export default function TriboFeedPage() {
  const { slug } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <TribeTabs slug={String(slug)} />
      <div className="max-w-2xl mx-auto space-y-3">
        {FEED_ITEMS.map((item, i) => (
          <div key={i} className={`p-4 rounded-xl border transition-all ${item.type === "stream" ? "border-red-500/20 bg-red-500/5" : "border-white/10"}`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0">{item.channel[0].toUpperCase()}</div>
              <div className="flex-1 space-y-1">
                <p className="text-xs"><span className="font-bold">@{item.channel}</span> <span className="text-muted-foreground">· {item.time}</span></p>
                {item.type === "stream" && <Link href={`/${item.channel}`} className="block"><p className="text-sm font-bold flex items-center gap-1"><Radio className="w-3 h-3 text-red-400 animate-pulse" />{item.title}</p><p className="text-[10px] text-muted-foreground">{item.viewers?.toLocaleString()} a ver</p></Link>}
                {item.type === "clip" && <Link href={`/clips/${item.id}`} className="block"><p className="text-sm">{item.title}</p><p className="text-[10px] text-muted-foreground">{(item.views! / 1000).toFixed(0)}K views</p></Link>}
                {item.type === "post" && <p className="text-sm">{item.text}</p>}
                {item.type === "join" && <p className="text-xs text-muted-foreground">{item.text}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
