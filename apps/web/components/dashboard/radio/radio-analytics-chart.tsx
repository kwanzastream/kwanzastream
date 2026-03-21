"use client"

interface RadioAnalyticsChartProps {
  data: { day: string; count: number }[]
  title?: string
}

export function RadioAnalyticsChart({ data, title }: RadioAnalyticsChartProps) {
  const max = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="space-y-3">
      {title && <h3 className="text-sm font-semibold">{title}</h3>}
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => {
          const h = (d.count / max) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-muted-foreground">{d.count}</span>
              <div className="w-full rounded-t-md bg-primary/20 relative" style={{ height: `${h}%`, minHeight: '4px' }}>
                <div
                  className="absolute inset-0 rounded-t-md bg-gradient-to-t from-primary/60 to-primary/20"
                  style={{ height: '100%' }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground">{d.day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
