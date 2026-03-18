"use client"
import { useParams } from "next/navigation"
import { ChannelCard } from "@/components/channel/channel-card"
import { Zap } from "lucide-react"

const MOCK_RAIDERS = [
  { username: "raider1", displayName: "Raider One", followersCount: 2500, raids: 12 },
  { username: "raider2", displayName: "Raider Two", followersCount: 800, raids: 5 },
  { username: "raider3", displayName: "Raider Three", followersCount: 15000, raids: 3 },
]

export default function ChannelRaidersPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-semibold text-lg">Raiders</h2>
        <p className="text-sm text-muted-foreground">Canais que já fizeram raid para @{username}</p>
      </div>
      {MOCK_RAIDERS.length === 0 ? (
        <div className="text-center py-16">
          <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Sem raids ainda</p>
          <p className="text-sm text-muted-foreground mt-1">Nenhum canal fez raid para este canal ainda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_RAIDERS.map((r) => (
            <div key={r.username} className="relative">
              <ChannelCard {...r} />
              <span className="absolute top-2 right-2 text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-full font-medium">
                {r.raids} raids
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
