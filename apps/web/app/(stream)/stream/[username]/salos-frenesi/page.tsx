"use client"
import { useParams } from "next/navigation"
import { StreamHypeTrain } from "@/components/stream/stream-hype-train"

const MOCK_CONTRIBUTORS = [
  { username: "angolano1", displayName: "Angolano Raiz", amount: 8000 },
  { username: "luanda_fã", displayName: "Luanda Fã", amount: 5500 },
  { username: "kwanza_vip", displayName: "Kwanza VIP", amount: 3200 },
  { username: "kuduro_king", displayName: "Kuduro King", amount: 2000 },
]

export default function SalosFrenesiPage() {
  const { username } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#CE1126]/10 via-black to-[#F9D616]/10">
      <div className="max-w-md w-full">
        <StreamHypeTrain
          variant="salos-frenesi"
          level={4}
          progress={82}
          timeLeft={67}
          contributors={MOCK_CONTRIBUTORS}
          topContributor={MOCK_CONTRIBUTORS[0]}
        />
      </div>
    </div>
  )
}
