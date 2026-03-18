"use client"
import { useParams } from "next/navigation"
import { Video, Share2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MOCK_CLIPS = [
  { id: "c1", title: "Jogada incrível!", creator: "viewer123", minute: 45, views: 320, duration: "0:28" },
  { id: "c2", title: "Momento épico ao vivo", creator: "fã_angola", minute: 112, views: 890, duration: "0:42" },
  { id: "c3", title: "A melhor reacção", creator: "clipper01", minute: 78, views: 156, duration: "0:15" },
]

export default function StreamClipsPage() {
  const { username } = useParams()
  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="font-bold text-lg">Clips deste stream</h2>
      <p className="text-sm text-muted-foreground">Clips criados durante esta transmissão ao vivo</p>
      {MOCK_CLIPS.length === 0 ? (
        <div className="text-center py-16"><Video className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="font-medium">Sem clips ainda</p><p className="text-sm text-muted-foreground mt-1">Cria o primeiro clip deste stream!</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_CLIPS.map((clip) => (
            <div key={clip.id} className="rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-all group">
              <div className="aspect-video bg-white/5 flex items-center justify-center relative">
                <Video className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                <Badge className="absolute bottom-2 right-2 text-[10px] bg-black/80 border-none">{clip.duration}</Badge>
              </div>
              <div className="p-3 space-y-1.5">
                <p className="text-sm font-medium truncate">{clip.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>por @{clip.creator}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> min {clip.minute}</span>
                  <span>•</span>
                  <span>{clip.views} views</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full text-xs h-7 mt-1" onClick={() => {
                  if (navigator.share) navigator.share({ title: clip.title, url: `https://kwanzastream.ao/clip/${clip.id}` })
                }}>
                  <Share2 className="w-3 h-3 mr-1" /> Partilhar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
