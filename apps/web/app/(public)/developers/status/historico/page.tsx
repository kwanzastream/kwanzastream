"use client"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
const INCIDENTS = [
  { date: "15 Mar 2026", title: "Latência elevada na API REST", duration: "45min", status: "resolved", desc: "Pico de tráfego causou latência acima do normal. Resolvido com auto-scaling." },
  { date: "2 Mar 2026", title: "Webhooks com atraso", duration: "2h", status: "resolved", desc: "Fila de webhooks acumulada. Processamento normalizado após aumento de workers." },
  { date: "10 Fev 2026", title: "Manutenção programada", duration: "30min", status: "maintenance", desc: "Migração de base de dados. Sem perda de dados." },
]
export default function HistoricoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/developers/status" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Estado</Link>
      <h1 className="text-xl font-bold">Histórico de Incidentes</h1>
      <div className="space-y-4">
        {INCIDENTS.map((inc, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 space-y-1">
            <div className="flex items-center justify-between"><span className="text-[10px] text-muted-foreground">{inc.date}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${inc.status === "resolved" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"}`}>{inc.status === "resolved" ? "Resolvido" : "Manutenção"}</span></div>
            <p className="text-sm font-semibold">{inc.title}</p>
            <p className="text-xs text-muted-foreground">{inc.desc}</p>
            <p className="text-[10px] text-muted-foreground">Duração: {inc.duration}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
