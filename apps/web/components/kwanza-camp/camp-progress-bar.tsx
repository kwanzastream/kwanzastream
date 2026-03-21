"use client"

interface CampProgressBarProps {
  percentage: number
  size?: "sm" | "md"
  showLabel?: boolean
}

export function CampProgressBar({ percentage, size = "md", showLabel = true }: CampProgressBarProps) {
  const h = size === "sm" ? "h-1.5" : "h-2.5"

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${h} rounded-full bg-white/10 overflow-hidden`}>
        <div
          className={`${h} rounded-full transition-all duration-500 ${percentage >= 100 ? "bg-green-500" : "bg-gradient-to-r from-primary to-purple-500"}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabel && <span className="text-[10px] text-muted-foreground shrink-0">{percentage}%</span>}
    </div>
  )
}
