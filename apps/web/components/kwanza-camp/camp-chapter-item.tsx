"use client"

import { Check, Play, Lock } from "lucide-react"

interface CampChapterItemProps {
  index: number
  title: string
  duration: number
  status: "completed" | "current" | "locked"
  onClick?: () => void
}

export function CampChapterItem({ index, title, duration, status, onClick }: CampChapterItemProps) {
  return (
    <button
      onClick={status !== "locked" ? onClick : undefined}
      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
        status === "completed" ? "bg-green-500/5 border border-green-500/20" :
        status === "current" ? "bg-primary/5 border border-primary/20 hover:border-primary/40" :
        "border border-white/5 opacity-50 cursor-not-allowed"
      }`}
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        status === "completed" ? "bg-green-500/20 text-green-400" :
        status === "current" ? "bg-primary/20 text-primary" :
        "bg-white/5 text-muted-foreground"
      }`}>
        {status === "completed" ? <Check className="w-3.5 h-3.5" /> :
         status === "current" ? <Play className="w-3.5 h-3.5" /> :
         <Lock className="w-3 h-3" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${status === "completed" ? "line-through text-muted-foreground" : ""}`}>
          {index + 1}. {title}
        </p>
      </div>
      <span className="text-[10px] text-muted-foreground shrink-0">{duration} min</span>
    </button>
  )
}
