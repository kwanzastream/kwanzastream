"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Trophy, Swords } from "lucide-react"

const MOCK_TORNEIOS = [
  { id: "t1", title: "Kwanza Cup FIFA 2026", status: "active", result: "Em curso", game: "FIFA 26" },
  { id: "t2", title: "Battle Royale Angola S3", status: "won", result: "Venceu 🏆", game: "Fortnite" },
  { id: "t3", title: "Tekken Community Cup", status: "eliminated", result: "Eliminado (Top 8)", game: "Tekken 8" },
]

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-500/10 text-green-500 border-green-500/30",
  won: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  eliminated: "bg-muted text-muted-foreground",
  registered: "bg-blue-500/10 text-blue-500 border-blue-500/30",
}

export default function ChannelTorneiosPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Torneios</h2>
      {MOCK_TORNEIOS.length === 0 ? (
        <div className="text-center py-16">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Sem torneios</p>
          <p className="text-sm text-muted-foreground mt-1">Este canal não participou em torneios ainda</p>
        </div>
      ) : (
        <div className="space-y-3">
          {MOCK_TORNEIOS.map((t) => (
            <Link key={t.id} href={`/${username}/torneios/${t.id}`}>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Swords className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.game}</p>
                </div>
                <Badge className={`text-[10px] shrink-0 ${STATUS_STYLES[t.status] || ""}`}>{t.result}</Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
