"use client"

import { useState, useEffect } from "react"

interface EventCountdownProps {
  targetDate: string // ISO date string
  onComplete?: () => void
}

function calculateTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export function EventCountdown({ targetDate, onComplete }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = calculateTimeLeft(targetDate)
      setTimeLeft(tl)
      if (!tl) { clearInterval(interval); onComplete?.() }
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate, onComplete])

  if (!timeLeft) return <div className="text-primary font-bold text-lg animate-pulse">A começar...</div>

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <div className="flex gap-3 justify-center">
      {[
        { value: days, label: "dias" },
        { value: hours, label: "horas" },
        { value: minutes, label: "min" },
        { value: seconds, label: "seg" },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-xl font-black text-primary tabular-nums">
            {String(item.value).padStart(2, "0")}
          </div>
          <span className="text-[9px] text-muted-foreground mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
