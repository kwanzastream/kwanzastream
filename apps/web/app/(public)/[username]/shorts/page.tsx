"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Eye } from "lucide-react"

const MOCK_SHORTS = [
  { id: "s1", title: "Trick shot impossível 🏀", viewCount: 5600, createdAt: "2026-03-12" },
  { id: "s2", title: "Dance challenge angolano 💃", viewCount: 12000, createdAt: "2026-03-10" },
  { id: "s3", title: "Tutorial rápido: setup de stream", viewCount: 2300, createdAt: "2026-03-08" },
  { id: "s4", title: "Melhores momentos da semana", viewCount: 8900, createdAt: "2026-03-05" },
  { id: "s5", title: "React ao meme angolano 😂", viewCount: 15000, createdAt: "2026-03-03" },
  { id: "s6", title: "Behind the scenes", viewCount: 3400, createdAt: "2026-03-01" },
  { id: "s7", title: "Unboxing novo equipamento", viewCount: 4500, createdAt: "2026-02-28" },
  { id: "s8", title: "Luanda streets vibes 🌆", viewCount: 7800, createdAt: "2026-02-25" },
]

export default function ChannelShortsPage() {
  const { username } = useParams()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Shorts</h2>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="text-xs" asChild><Link href={`/${username}/shorts/recentes`}>Recentes</Link></Button>
          <Button variant="ghost" size="sm" className="text-xs" asChild><Link href={`/${username}/shorts/populares`}>Populares</Link></Button>
        </div>
      </div>

      {MOCK_SHORTS.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📱</p>
          <p className="font-medium">Sem shorts</p>
          <p className="text-sm text-muted-foreground mt-1">Este canal ainda não publicou shorts</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {MOCK_SHORTS.map((short) => (
            <Link key={short.id} href={`/shorts/${short.id}`}>
              <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                <div className="relative aspect-[9/16] bg-muted max-h-[280px]">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-muted to-muted/50">
                    <Play className="w-10 h-10 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium line-clamp-2">{short.title}</p>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-1">
                    <Eye className="w-3 h-3" />{short.viewCount >= 1000 ? `${(short.viewCount/1000).toFixed(1)}k` : short.viewCount}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
