"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Zap, X } from "lucide-react"

interface StreamRaidOverlayProps {
  fromUsername: string
  fromDisplayName: string
  fromAvatarUrl?: string
  toUsername: string
  toDisplayName: string
  toAvatarUrl?: string
  raiderCount: number
  countdownSeconds?: number
  onDismiss?: () => void
}

export function StreamRaidOverlay({
  fromUsername, fromDisplayName, fromAvatarUrl,
  toUsername, toDisplayName, toAvatarUrl,
  raiderCount, countdownSeconds = 10, onDismiss,
}: StreamRaidOverlayProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(countdownSeconds)

  useEffect(() => {
    if (countdown <= 0) {
      router.push(`/stream/${toUsername}`)
      return
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, toUsername, router])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Animated background waves in AO colours */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CE1126]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F9D616]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-black/30 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Content */}
      <div className="relative text-center space-y-6 max-w-md px-6">
        {/* Dismiss */}
        <Button variant="ghost" size="icon" className="absolute -top-4 -right-4 text-white/40 hover:text-white" onClick={onDismiss}>
          <X className="w-5 h-5" />
        </Button>

        {/* Raid icon */}
        <div className="relative">
          <Zap className="w-16 h-16 text-[#F9D616] mx-auto animate-bounce" />
          <div className="absolute inset-0 w-16 h-16 mx-auto bg-[#F9D616]/20 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Message */}
        <div>
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">RAID!</p>
          <h2 className="text-2xl font-black mt-2">
            <span className="text-[#CE1126]">@{fromDisplayName}</span> está a levar{" "}
            <span className="text-[#F9D616]">{raiderCount.toLocaleString("pt-AO")}</span> raiders para{" "}
            <span className="text-[#CE1126]">@{toDisplayName}</span>!
          </h2>
        </div>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-[#CE1126]">
            <AvatarImage src={fromAvatarUrl} />
            <AvatarFallback className="text-xl bg-[#CE1126]/20 text-[#CE1126]">{fromDisplayName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <Zap className="w-8 h-8 text-[#F9D616]" />
          <Avatar className="w-16 h-16 border-2 border-[#F9D616]">
            <AvatarImage src={toAvatarUrl} />
            <AvatarFallback className="text-xl bg-[#F9D616]/20 text-[#F9D616]">{toDisplayName.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </div>

        {/* Countdown */}
        <div className="text-5xl font-black text-[#F9D616] tabular-nums">{countdown}</div>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <Button
            size="lg"
            className="bg-[#CE1126] hover:bg-[#CE1126]/90 font-bold gap-2"
            onClick={() => router.push(`/stream/${toUsername}`)}
          >
            <Zap className="w-4 h-4" /> Juntar ao Raid
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 font-bold"
            onClick={onDismiss}
          >
            Ficar aqui
          </Button>
        </div>
      </div>
    </div>
  )
}
