"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Smartphone, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MOCK = [
  { id: "sh1", title: "Kuduro dance challenge", moment: "0:45:30", views: 89000 },
  { id: "sh2", title: "Best play do stream", moment: "1:23:10", views: 45000 },
]

export default function VideoShortsPage() {
  const { id } = useParams()
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/videos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-xl font-bold">Shorts deste VOD</h1></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {MOCK.map(s => (
          <Link key={s.id} href={`/shorts/${s.id}`} className="aspect-[9/16] rounded-xl border border-white/10 hover:border-primary/30 bg-muted flex flex-col items-center justify-center p-3 text-center transition-all group">
            <Smartphone className="w-6 h-6 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
            <p className="text-xs font-bold truncate w-full">{s.title}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Momento: {s.moment}</p>
            <p className="text-[10px] text-muted-foreground">{(s.views / 1000).toFixed(0)}k views</p>
          </Link>
        ))}
      </div>
      {MOCK.length === 0 && <div className="text-center py-16"><Smartphone className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" /><p className="text-sm text-muted-foreground">Sem shorts criados deste VOD</p></div>}
    </div>
  )
}
