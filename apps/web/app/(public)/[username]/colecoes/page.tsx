"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Play, Grid3X3 } from "lucide-react"

const MOCK_COLECOES = [
  { id: "col1", title: "Melhores streams 2025", videoCount: 12, thumbnailUrl: null },
  { id: "col2", title: "Tutoriais de gaming", videoCount: 8, thumbnailUrl: null },
  { id: "col3", title: "Kuduro sessions", videoCount: 5, thumbnailUrl: null },
]

export default function ChannelColecoesPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Colecções</h2>
      {MOCK_COLECOES.length === 0 ? (
        <div className="text-center py-16">
          <Grid3X3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Sem colecções</p>
          <p className="text-sm text-muted-foreground mt-1">Este canal ainda não criou colecções</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_COLECOES.map((col) => (
            <Link key={col.id} href={`/${username}/colecoes/${col.id}`}>
              <div className="group rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all">
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center"><Grid3X3 className="w-10 h-10 text-muted-foreground" /></div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{col.videoCount} vídeos</div>
                </div>
                <div className="p-3"><p className="text-sm font-medium group-hover:text-primary transition-colors">{col.title}</p></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
