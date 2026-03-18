"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface NotificationPreferencesRowProps {
  id: string
  label: string
  description?: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
  locked?: boolean
  lockedReason?: string
  frequency?: string
  frequencyOptions?: string[]
  onFrequencyChange?: (freq: string) => void
}

export function NotificationPreferencesRow({
  id, label, description, enabled, onToggle, locked, lockedReason, frequency, frequencyOptions, onFrequencyChange,
}: NotificationPreferencesRowProps) {
  return (
    <div className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${locked ? "border-amber-500/20 bg-amber-500/5" : "border-white/10"}`}>
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="text-sm font-medium cursor-pointer">{label}</Label>
        {description && <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>}
        {locked && lockedReason && <p className="text-[10px] text-amber-400 mt-0.5">⚠️ {lockedReason}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {frequency && frequencyOptions && onFrequencyChange && (
          <select
            value={frequency}
            onChange={(e) => onFrequencyChange(e.target.value)}
            className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-muted-foreground"
            disabled={!enabled || locked}
          >
            {frequencyOptions.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        )}
        <Switch id={id} checked={locked ? true : enabled} onCheckedChange={onToggle} disabled={locked} />
      </div>
    </div>
  )
}
