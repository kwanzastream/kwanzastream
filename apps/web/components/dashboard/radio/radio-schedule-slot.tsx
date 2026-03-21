"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Bell, BellOff, Trash2 } from "lucide-react"

const DAYS_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

interface RadioScheduleSlotProps {
  id: string
  dayOfWeek: number
  startHour: number
  durationMin: number
  notifyFollowers: boolean
  programName?: string
  onRemove: (id: string) => void
}

export function RadioScheduleSlot({ id, dayOfWeek, startHour, durationMin, notifyFollowers, programName, onRemove }: RadioScheduleSlotProps) {
  const hours = Math.floor(durationMin / 60)
  const mins = durationMin % 60

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
      <div className="w-20 text-xs font-medium text-muted-foreground">{DAYS_PT[dayOfWeek]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium">{String(startHour).padStart(2, '0')}h00</span>
          <span className="text-xs text-muted-foreground">· {hours}h{mins > 0 ? `${mins}m` : ""}</span>
          {programName && <span className="text-xs text-primary truncate">· {programName}</span>}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {notifyFollowers ? (
          <Badge variant="outline" className="text-[9px] gap-1 text-green-400"><Bell className="w-2.5 h-2.5" />Notificar</Badge>
        ) : (
          <Badge variant="outline" className="text-[9px] gap-1 text-muted-foreground"><BellOff className="w-2.5 h-2.5" />Silencioso</Badge>
        )}
        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={() => onRemove(id)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
