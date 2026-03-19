"use client"

import { TrendingUp, TrendingDown, Minus, Sparkles } from "lucide-react"

export function RankChangeBadge({ change }: { change: number | "NEW" }) {
  if (change === "NEW") return <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 text-[9px] font-bold text-primary"><Sparkles className="w-3 h-3" />NEW</span>
  if (change > 0) return <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-500/10 text-[9px] font-bold text-green-400"><TrendingUp className="w-3 h-3" />+{change}</span>
  if (change < 0) return <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-500/10 text-[9px] font-bold text-red-400"><TrendingDown className="w-3 h-3" />{change}</span>
  return <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/5 text-[9px] font-bold text-muted-foreground"><Minus className="w-3 h-3" />=</span>
}
