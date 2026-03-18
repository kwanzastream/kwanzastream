"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronLeft, ChevronRight, Bell } from "lucide-react"

export default function ChannelScheduleWeekPage() {
  const { username, semana } = useParams()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Schedule — Semana {semana}</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8" asChild>
            <Link href={`/${username}/schedule`}><ChevronLeft className="w-4 h-4" /></Link>
          </Button>
          <span className="text-sm font-medium">{semana}</span>
          <Button variant="ghost" size="icon" className="w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="text-center py-16">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">Sem streams nesta semana</p>
        <p className="text-sm text-muted-foreground mt-1">Consulta outras semanas usando a navegação acima</p>
      </div>
    </div>
  )
}
