"use client"

interface CampaignMetricsRowProps {
  label: string
  value: string | number
  subtext?: string
  highlight?: boolean
}

export function CampaignMetricsRow({ label, value, subtext, highlight }: CampaignMetricsRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="text-right">
        <span className={`text-sm font-semibold ${highlight ? "text-primary" : ""}`}>{value}</span>
        {subtext && <p className="text-[9px] text-muted-foreground">{subtext}</p>}
      </div>
    </div>
  )
}
