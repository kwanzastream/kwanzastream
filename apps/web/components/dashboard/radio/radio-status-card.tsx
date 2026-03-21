"use client"

import { Radio, Mic2, Users, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RadioStatusCardProps {
  isLive?: boolean
  stats: {
    transmissions: number
    totalMinutes: number
    uniqueListeners: number
    salosReceived: number
  }
}

export function RadioStatusCard({ isLive, stats }: RadioStatusCardProps) {
  const hours = Math.floor(stats.totalMinutes / 60)
  const mins = stats.totalMinutes % 60

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Estado:</span>
        {isLive ? (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/30 gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Ao vivo
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-500" /> Offline
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Radio className="w-4 h-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold">{stats.transmissions}</p>
          <p className="text-[10px] text-muted-foreground">Transmissões</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Mic2 className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
          <p className="text-lg font-bold">{hours}h{mins > 0 ? ` ${mins}m` : ""}</p>
          <p className="text-[10px] text-muted-foreground">Tempo total</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Users className="w-4 h-4 mx-auto mb-1 text-blue-400" />
          <p className="text-lg font-bold">{stats.uniqueListeners.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Ouvintes únicos</p>
        </div>
        <div className="p-3 rounded-xl border border-white/10 text-center">
          <Heart className="w-4 h-4 mx-auto mb-1 text-red-400" />
          <p className="text-lg font-bold">{stats.salosReceived.toLocaleString()} Kz</p>
          <p className="text-[10px] text-muted-foreground">Salos recebidos</p>
        </div>
      </div>
    </div>
  )
}
