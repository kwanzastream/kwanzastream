"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Scissors, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK = [
  { id: "cl1", title: "Clutch incrível", creator: "viewer_001", moment: "1:23:45", views: 4500 },
  { id: "cl2", title: "Dança ao vivo", creator: "fan123", moment: "2:15:30", views: 2300 },
]

export default function VideoClipsPage() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"><Link href={`/videos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Clips deste VOD</h1></div>
        <Button size="sm" className="text-xs gap-1"><Scissors className="w-3 h-3" />Criar clip</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK.map(c => (
          <Link key={c.id} href={`/clips/${c.id}`} className="group rounded-xl border border-white/[0.06] hover:border-primary/30 overflow-hidden transition-all">
            <div className="aspect-video bg-muted flex items-center justify-center relative"><Play className="w-8 h-8 text-white/30 group-hover:text-white/60 transition-colors" /><span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[9px] font-mono text-white">{c.moment}</span></div>
            <div className="p-3"><p className="text-sm font-bold truncate">{c.title}</p><p className="text-[10px] text-muted-foreground">@{c.creator} · {(c.views / 1000).toFixed(1)}k views</p></div>
          </Link>
        ))}
      </div>
    </div>
  )
}
