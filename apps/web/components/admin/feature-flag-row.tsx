"use client"
import { Button } from "@/components/ui/button"
interface FeatureFlagRowProps { name: string; enabled: boolean; rollout: number; description: string; onToggle: () => void }
export function FeatureFlagRow({ name, enabled, rollout, description, onToggle }: FeatureFlagRowProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
      <div className="flex-1"><p className="text-sm font-mono font-semibold">{name}</p><p className="text-[10px] text-muted-foreground">{description}</p></div>
      <div className="text-center"><span className={`text-xs font-bold ${enabled ? "text-green-400" : "text-red-400"}`}>{enabled ? "✅" : "❌"}</span><p className="text-[9px] text-muted-foreground">{rollout}%</p></div>
      <Button size="sm" variant="outline" onClick={onToggle} className="text-[10px] h-7">{enabled ? "Desactivar" : "Activar"}</Button>
    </div>
  )
}
