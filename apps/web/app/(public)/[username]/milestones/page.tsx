"use client"
import { useParams } from "next/navigation"
import { Flag, Check } from "lucide-react"

const MILESTONES = [
  { label: "100 seguidores", threshold: 100, reached: true, date: "2025-07-01" },
  { label: "500 seguidores", threshold: 500, reached: true, date: "2025-10-15" },
  { label: "1.000 seguidores", threshold: 1000, reached: false, date: null },
  { label: "5.000 seguidores", threshold: 5000, reached: false, date: null },
  { label: "10.000 seguidores", threshold: 10000, reached: false, date: null },
  { label: "50.000 seguidores", threshold: 50000, reached: false, date: null },
  { label: "100.000 seguidores", threshold: 100000, reached: false, date: null },
  { label: "10h transmitidas", threshold: 10, reached: true, date: "2025-06-20", type: "hours" },
  { label: "50h transmitidas", threshold: 50, reached: true, date: "2025-09-05", type: "hours" },
  { label: "100h transmitidas", threshold: 100, reached: false, date: null, type: "hours" },
  { label: "500h transmitidas", threshold: 500, reached: false, date: null, type: "hours" },
]

export default function ChannelMilestonesPage() {
  const { username } = useParams()
  const reached = MILESTONES.filter(m => m.reached)
  const pending = MILESTONES.filter(m => !m.reached)

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg">Marcos</h2>

      <div className="space-y-2">
        {MILESTONES.map((m, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${m.reached ? "border-primary/30 bg-primary/5" : "border-border/50 opacity-50"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.reached ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              {m.reached ? <Check className="w-4 h-4" /> : <Flag className="w-4 h-4 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${m.reached ? "" : "text-muted-foreground"}`}>{m.label}</p>
              {m.reached && m.date && <p className="text-[10px] text-muted-foreground">{new Date(m.date).toLocaleDateString("pt-AO")}</p>}
            </div>
            {m.reached && <span className="text-xs text-primary font-medium">🎉</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
