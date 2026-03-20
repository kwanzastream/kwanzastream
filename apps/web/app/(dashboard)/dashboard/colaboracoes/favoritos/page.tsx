"use client"
import { CollabChannelCard } from "@/components/collaborations/collab-components"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
export default function FavoritosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⭐ Favoritos</h1>
      <p className="text-xs text-muted-foreground">Canais favoritos para raids, co-streams e sugestões.</p>
      <div className="space-y-1"><CollabChannelCard username="@canal1" category="Gaming" status="live" viewers={89} /><CollabChannelCard username="@canal2" category="Música" status="offline" /><CollabChannelCard username="@canal3" category="Just Talking" status="offline" /></div>
      <Link href="/dashboard/colaboracoes/favoritos/adicionar"><Button variant="outline" size="sm" className="w-full text-xs gap-1"><Plus className="w-3 h-3" />Adicionar canal</Button></Link>
    </div>
  )
}
