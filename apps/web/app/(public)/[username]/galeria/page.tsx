"use client"
import { useParams } from "next/navigation"
import { Image, Calendar } from "lucide-react"

export default function ChannelGaleriaPage() {
  const { username } = useParams()
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">Galeria</h2>
      <p className="text-sm text-muted-foreground">Screenshots e momentos capturados durante streams de @{username}</p>
      <div className="text-center py-16">
        <Image className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Sem imagens</p>
        <p className="text-sm text-muted-foreground mt-1">O streamer ainda não adicionou imagens à galeria</p>
      </div>
    </div>
  )
}
