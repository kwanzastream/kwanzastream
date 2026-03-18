"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"

export default function ColecaoDetailPage() {
  const { username, id } = useParams()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild><Link href={`/${username}/colecoes`}><ArrowLeft className="w-4 h-4" /></Link></Button>
        <h2 className="font-semibold text-lg">Colecção</h2>
      </div>
      <div className="bg-muted/30 rounded-xl p-6 text-center">
        <Play className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Colecção #{id}</p>
        <p className="text-sm text-muted-foreground mt-1">Os vídeos desta colecção serão listados aqui</p>
        <Button variant="outline" size="sm" className="mt-4" asChild><Link href={`/${username}/colecoes/${id}/videos`}>Ver todos os vídeos</Link></Button>
      </div>
    </div>
  )
}
