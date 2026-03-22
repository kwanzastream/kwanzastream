"use client"
export function MaintenanceProgress({ percent, estimatedReturn }: { percent: number; estimatedReturn?: string }) {
  return (
    <div className="space-y-2 max-w-xs mx-auto">
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
      <p className="text-[10px] text-muted-foreground text-center">{percent}% concluído</p>
      {estimatedReturn && <p className="text-[10px] text-muted-foreground text-center">Retorno estimado: <span className="text-foreground">{estimatedReturn}</span></p>}
    </div>
  )
}
