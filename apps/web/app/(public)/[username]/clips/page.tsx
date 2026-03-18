"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Eye, Share2 } from "lucide-react"
import { WhatsAppShareButton } from "@/components/public/whatsapp-share-button"

const MOCK_CLIPS = [
  { id: "c1", title: "Jogada incrível!", duration: 30, viewCount: 1200, createdAt: "2026-03-10" },
  { id: "c2", title: "Momento de riso ao vivo", duration: 45, viewCount: 890, createdAt: "2026-03-08" },
  { id: "c3", title: "Golo épico no FIFA", duration: 20, viewCount: 3400, createdAt: "2026-03-05" },
  { id: "c4", title: "Reacção ao kuduro remix", duration: 60, viewCount: 2100, createdAt: "2026-03-01" },
]

export default function ChannelClipsPage() {
  const { username } = useParams()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Clips</h2>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="sm" className="text-xs" asChild><Link href={`/${username}/clips/recentes`}>Recentes</Link></Button>
          <Button variant="ghost" size="sm" className="text-xs" asChild><Link href={`/${username}/clips/populares`}>Populares</Link></Button>
        </div>
      </div>

      {MOCK_CLIPS.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">✂️</p>
          <p className="font-medium">Sem clips</p>
          <p className="text-sm text-muted-foreground mt-1">Nenhum clip criado neste canal</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {MOCK_CLIPS.map((clip) => (
            <Link key={clip.id} href={`/clips/${clip.id}`}>
              <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{clip.duration}s</div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium truncate">{clip.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Eye className="w-3 h-3" />{clip.viewCount}</span>
                    <WhatsAppShareButton url={`/clips/${clip.id}`} text={`${clip.title} — Kwanza Stream`} variant="ghost" size="icon" className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
