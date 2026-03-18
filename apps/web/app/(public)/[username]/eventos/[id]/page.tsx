"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react"

export default function EventoDetailPage() {
  const { username, id } = useParams()
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="w-8 h-8" asChild><Link href={`/${username}/eventos`}><ArrowLeft className="w-4 h-4" /></Link></Button>
        <h2 className="font-semibold text-lg">Detalhe do evento</h2>
      </div>
      <div className="rounded-xl border border-border/50 p-6 space-y-4">
        <h3 className="text-xl font-bold">Evento #{id}</h3>
        <p className="text-muted-foreground">Detalhes do evento serão carregados da API.</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Data a definir</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Local a definir</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 0 participantes</span>
        </div>
        <Button>Participar</Button>
      </div>
    </div>
  )
}
