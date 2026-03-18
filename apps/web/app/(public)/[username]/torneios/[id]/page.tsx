"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy } from "lucide-react"

export default function TorneioDetailPage() {
  const { username, id } = useParams()
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild><Link href={`/${username}/torneios`}><ArrowLeft className="w-4 h-4" /></Link></Button>
        <h2 className="font-semibold text-lg">Detalhe do torneio</h2>
      </div>
      <div className="rounded-xl border border-border/50 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-400" />
          <h3 className="text-xl font-bold">Torneio #{id}</h3>
        </div>
        <p className="text-muted-foreground">Resultados e detalhes do torneio serão carregados da API.</p>
      </div>
    </div>
  )
}
