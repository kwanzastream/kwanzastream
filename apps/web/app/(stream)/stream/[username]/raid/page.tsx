"use client"
import { useParams } from "next/navigation"
import { StreamRaidOverlay } from "@/components/stream/stream-raid-overlay"

export default function StreamRaidPage() {
  const { username } = useParams()
  return (
    <StreamRaidOverlay
      fromUsername={username as string}
      fromDisplayName={username as string}
      toUsername="destino_canal"
      toDisplayName="Canal Destino"
      raiderCount={342}
      countdownSeconds={10}
      onDismiss={() => window.history.back()}
    />
  )
}
