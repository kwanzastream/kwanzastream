"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Flame, Zap, Clock, Crown } from "lucide-react"

interface Contributor {
  username: string
  displayName: string
  avatarUrl?: string
  amount: number
}

interface StreamHypeTrainProps {
  variant: "hype-train" | "salos-frenesi"
  level: number   // 1-5+
  progress: number // 0-100
  timeLeft: number // seconds
  contributors: Contributor[]
  topContributor?: Contributor
}

export function StreamHypeTrain({
  variant, level, progress, timeLeft, contributors, topContributor,
}: StreamHypeTrainProps) {
  const isHype = variant === "hype-train"
  const title = isHype ? "HYPE TRAIN" : "FRENESI DE SALOS"
  const Icon = isHype ? Flame : Zap

  // Colours
  const colours = isHype
    ? { bg: "from-purple-600/20 to-blue-600/20", bar: "from-purple-500 to-blue-500", accent: "text-purple-400", border: "border-purple-500/30" }
    : { bg: "from-[#CE1126]/20 via-black/20 to-[#F9D616]/20", bar: "from-[#CE1126] to-[#F9D616]", accent: "text-[#F9D616]", border: "border-[#F9D616]/30" }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

  return (
    <div className={`rounded-xl border ${colours.border} bg-gradient-to-r ${colours.bg} p-4 space-y-3 relative overflow-hidden`}>
      {/* Animated background for frenesi */}
      {!isHype && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#CE1126] rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#F9D616] rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${colours.accent} animate-bounce`} />
          <span className="text-sm font-black tracking-wider">{title}</span>
          <Badge className={`${colours.accent} bg-white/10 border-none text-[10px] font-bold`}>
            Nível {level}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="font-mono">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colours.bar} rounded-full transition-all duration-500 relative`}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold">{progress}%</span>
      </div>

      {/* Top contributor */}
      {topContributor && (
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Crown className={`w-4 h-4 ${colours.accent} shrink-0`} />
          <Avatar className="w-5 h-5">
            <AvatarImage src={topContributor.avatarUrl} />
            <AvatarFallback className="text-[8px]">{topContributor.displayName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-semibold">{topContributor.displayName}</span>
          <span className={`text-xs font-bold ml-auto ${colours.accent}`}>
            {topContributor.amount.toLocaleString("pt-AO")} {isHype ? "pts" : "Salos"}
          </span>
        </div>
      )}

      {/* Recent contributors */}
      {contributors.length > 0 && (
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground mr-1">Recentes:</span>
          {contributors.slice(0, 5).map((c) => (
            <Avatar key={c.username} className="w-5 h-5 border border-white/20" title={`${c.displayName}: ${c.amount}`}>
              <AvatarImage src={c.avatarUrl} />
              <AvatarFallback className="text-[7px]">{c.displayName.slice(0, 1)}</AvatarFallback>
            </Avatar>
          ))}
          {contributors.length > 5 && (
            <span className="text-[10px] text-muted-foreground">+{contributors.length - 5}</span>
          )}
        </div>
      )}
    </div>
  )
}
