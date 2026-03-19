"use client"

import { Badge } from "@/components/ui/badge"
import { Clock, Radio, Check, Circle } from "lucide-react"

export interface ScheduleItem {
  time: string // "14:00 WAT"
  title: string
  status: "pending" | "live" | "completed"
  streamUrl?: string
  channels?: string[]
}

export function EventScheduleItem({ item }: { item: ScheduleItem }) {
  const statusIcon = {
    pending: <Circle className="w-3 h-3 text-muted-foreground" />,
    live: <Radio className="w-3 h-3 text-red-500 animate-pulse" />,
    completed: <Check className="w-3 h-3 text-green-400" />,
  }
  const statusColor = {
    pending: "border-white/10",
    live: "border-red-500/30 bg-red-500/5",
    completed: "border-green-500/20 bg-green-500/5",
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${statusColor[item.status]}`}>
      {statusIcon[item.status]}
      <span className="text-xs font-mono text-primary shrink-0 w-16">{item.time}</span>
      <span className="text-sm flex-1">{item.title}</span>
      {item.status === "live" && <Badge className="bg-red-600 text-white text-[9px] border-none">AO VIVO</Badge>}
      {item.channels && item.channels.length > 0 && <span className="text-[9px] text-muted-foreground">{item.channels.join(", ")}</span>}
    </div>
  )
}
