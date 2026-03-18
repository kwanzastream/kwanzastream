"use client"
import { useParams } from "next/navigation"
import { Play, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_SHORTS = [
  { id: "s1", title: "Jogada rápida!", views: 1200, duration: "0:15" },
  { id: "s2", title: "Recorte do stream", views: 450, duration: "0:30" },
]

export default function StreamShortsPage() {
  const { username } = useParams()
  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="font-bold text-lg">Shorts deste stream</h2>
      {MOCK_SHORTS.length === 0 ? (
        <div className="text-center py-16"><Play className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="font-medium">Sem shorts</p></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {MOCK_SHORTS.map((s) => (
            <div key={s.id} className="rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-all">
              <div className="aspect-[9/16] bg-white/5 flex items-center justify-center relative max-h-64">
                <Play className="w-8 h-8 text-muted-foreground" />
                <Badge className="absolute bottom-2 right-2 text-[10px] bg-black/80 border-none">{s.duration}</Badge>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium truncate">{s.title}</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5"><Eye className="w-2.5 h-2.5" />{s.views}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
