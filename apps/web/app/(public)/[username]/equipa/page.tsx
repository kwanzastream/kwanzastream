"use client"
import { useParams } from "next/navigation"
import { ChannelCard } from "@/components/channel/channel-card"
import { Users } from "lucide-react"

const MOCK_EQUIPA = [
  { username: "player1", displayName: "Player One", followersCount: 1200, isVerified: true },
  { username: "player2", displayName: "Player Two", followersCount: 800, isVerified: false },
  { username: "player3", displayName: "Player Three", followersCount: 3500, isVerified: true },
]

export default function ChannelEquipaPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Equipa</h2>
      {MOCK_EQUIPA.length === 0 ? (
        <div className="text-center py-16">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Sem equipa</p>
          <p className="text-sm text-muted-foreground mt-1">Este canal não pertence a nenhuma equipa</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_EQUIPA.map((m) => (
            <ChannelCard key={m.username} {...m} />
          ))}
        </div>
      )}
    </div>
  )
}
