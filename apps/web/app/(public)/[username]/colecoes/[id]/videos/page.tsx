"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"

export default function ColecaoVideosPage() {
  const { username, id } = useParams()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild><Link href={`/${username}/colecoes/${id}`}><ArrowLeft className="w-4 h-4" /></Link></Button>
        <h2 className="font-semibold text-lg">Vídeos da colecção</h2>
      </div>
      <div className="text-center py-16">
        <Play className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Sem vídeos nesta colecção</p>
        <p className="text-sm text-muted-foreground mt-1">Os vídeos adicionados pelo streamer aparecerão aqui</p>
      </div>
    </div>
  )
}
