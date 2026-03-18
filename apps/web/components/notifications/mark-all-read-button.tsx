"use client"

import { Button } from "@/components/ui/button"
import { CheckCheck, EyeOff, Loader2 } from "lucide-react"

interface MarkAllReadButtonProps {
  unreadCount: number
  onMarkAll: () => void
  onClearRead: () => void
  marking?: boolean
}

export function MarkAllReadButton({ unreadCount, onMarkAll, onClearRead, marking = false }: MarkAllReadButtonProps) {
  return (
    <div className="flex items-center gap-2">
      {unreadCount > 0 && (
        <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={onMarkAll} disabled={marking}>
          {marking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCheck className="w-3.5 h-3.5" />}
          Marcar todas
        </Button>
      )}
      <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground" onClick={onClearRead}>
        <EyeOff className="w-3.5 h-3.5" /> Limpar lidas
      </Button>
    </div>
  )
}
