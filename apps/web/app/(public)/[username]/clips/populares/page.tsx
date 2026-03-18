"use client"
import { useParams } from "next/navigation"
export default function ChannelClipsPopularesPage() {
  const { username } = useParams()
  return (
    <div className="text-center py-16">
      <p className="text-4xl mb-3">🔥</p>
      <p className="font-medium">Clips populares</p>
      <p className="text-sm text-muted-foreground mt-1">Carregando clips mais populares de @{username}...</p>
    </div>
  )
}
