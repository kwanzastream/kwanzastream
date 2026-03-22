"use client"
import { BarChart3 } from "lucide-react"
export default function ConsoleAnalyticsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <BarChart3 className="w-8 h-8 text-primary" />
      <h1 className="text-2xl font-bold">Analytics Agregados</h1>
      <p className="text-sm text-muted-foreground">Métricas combinadas de todas as tuas apps e extensões</p>
      <div className="grid grid-cols-4 gap-3">
        {[{ label: "Total Requests", value: "12.400" }, { label: "Webhooks", value: "890" }, { label: "Erros (4xx/5xx)", value: "12" }, { label: "Taxa de erro", value: "0.1%" }].map((m, i) => (
          <div key={i} className="p-3 rounded-xl border border-white/10 text-center"><p className="text-sm font-bold">{m.value}</p><p className="text-[9px] text-muted-foreground">{m.label}</p></div>
        ))}
      </div>
      <div className="p-4 rounded-xl border border-white/10 space-y-2">
        <h2 className="text-sm font-semibold">Requests por app</h2>
        {[{ name: "Bot de Moderação", requests: 7800 }, { name: "Salo Alert Overlay", requests: 3200 }, { name: "Stream Insights", requests: 1400 }].map(a => (
          <div key={a.name} className="flex items-center gap-3">
            <span className="text-xs w-32 truncate">{a.name}</span>
            <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden"><div className="h-full bg-primary/50 rounded" style={{ width: `${a.requests / 78}%` }} /></div>
            <span className="text-[10px] text-muted-foreground w-12 text-right">{(a.requests / 1000).toFixed(1)}k</span>
          </div>
        ))}
      </div>
    </div>
  )
}
