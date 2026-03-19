"use client"

import { Input } from "@/components/ui/input"

const PRESETS = [1, 5, 10, 25]

export function GiftQuantitySelector({ quantity, onChange, max }: { quantity: number; onChange: (q: number) => void; max?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {PRESETS.map(p => <button key={p} onClick={() => onChange(p)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${quantity === p ? "bg-primary text-primary-foreground" : "bg-white/[0.04] text-muted-foreground hover:bg-white/10"}`}>{p}</button>)}
      </div>
      <div className="flex items-center gap-2"><Input type="number" min={1} max={max || 100} value={quantity} onChange={e => onChange(Math.min(max || 100, Math.max(1, Number(e.target.value))))} className="bg-white/5 text-center" /><span className="text-xs text-muted-foreground shrink-0">max {max || 100}</span></div>
    </div>
  )
}
