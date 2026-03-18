"use client"

import { useEffect, useState } from "react"
import { Wifi, WifiOff, Signal, SignalLow, SignalMedium, SignalHigh } from "lucide-react"

interface NetworkIndicatorProps {
  showDataEstimate?: boolean
  className?: string
}

const QUALITY_MAP: Record<string, { label: string; color: string; icon: typeof Signal; quality: string; mbPerHour: number }> = {
  "4g":      { label: "Excelente", color: "text-green-400", icon: SignalHigh,   quality: "480p", mbPerHour: 900 },
  "3g":      { label: "Boa",       color: "text-amber-400", icon: SignalMedium, quality: "360p", mbPerHour: 500 },
  "2g":      { label: "Fraca",     color: "text-orange-400",icon: SignalLow,    quality: "audio-only", mbPerHour: 100 },
  "slow-2g": { label: "Muito fraca",color: "text-red-400",  icon: WifiOff,     quality: "audio-only", mbPerHour: 50 },
}

export function NetworkIndicator({ showDataEstimate = true, className = "" }: NetworkIndicatorProps) {
  const [quality, setQuality] = useState("4g")

  useEffect(() => {
    const conn = (navigator as any).connection
    if (conn) {
      const update = () => setQuality(conn.effectiveType || "4g")
      update()
      conn.addEventListener("change", update)
      return () => conn.removeEventListener("change", update)
    }
  }, [])

  const info = QUALITY_MAP[quality] || QUALITY_MAP["4g"]
  const Icon = info.icon

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon className={`w-4 h-4 ${info.color}`} />
      <div>
        <p className={`text-xs font-bold ${info.color}`}>{info.label}</p>
        {showDataEstimate && (
          <p className="text-[10px] text-muted-foreground">
            ~{info.mbPerHour}MB/hora • Recomendado: {info.quality}
          </p>
        )}
      </div>
    </div>
  )
}

export function getRecommendedQuality(): string {
  const conn = (navigator as any).connection
  const type = conn?.effectiveType || "4g"
  return QUALITY_MAP[type]?.quality || "360p"
}
