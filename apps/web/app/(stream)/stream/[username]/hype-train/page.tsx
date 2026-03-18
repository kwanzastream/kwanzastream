"use client"
import { useParams } from "next/navigation"
import { StreamHypeTrain } from "@/components/stream/stream-hype-train"

const MOCK_CONTRIBUTORS = [
  { username: "fan1", displayName: "Super Fã", amount: 5000 },
  { username: "fan2", displayName: "Apoiante AO", amount: 3000 },
  { username: "fan3", displayName: "Viewer Pro", amount: 1500 },
]

export default function StreamHypeTrainPage() {
  const { username } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <StreamHypeTrain
          variant="hype-train"
          level={3}
          progress={72}
          timeLeft={145}
          contributors={MOCK_CONTRIBUTORS}
          topContributor={MOCK_CONTRIBUTORS[0]}
        />

        <StreamHypeTrain
          variant="salos-frenesi"
          level={2}
          progress={45}
          timeLeft={88}
          contributors={MOCK_CONTRIBUTORS.slice(1)}
          topContributor={MOCK_CONTRIBUTORS[1]}
        />
      </div>
    </div>
  )
}
