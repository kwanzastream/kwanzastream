"use client"

import { FileText, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const REPORTS = [
  { id: "RPT-2026-001", campaign: "Unitel Spring 2026", period: "25 Mar — 31 Mar", status: "disponível" },
  { id: "RPT-2026-002", campaign: "BAI Digital Q1", period: "1 Fev — 28 Fev", status: "disponível" },
  { id: "RPT-2026-003", campaign: "Multicaixa Summer", period: "Em processamento", status: "pendente" },
]

export default function RelatoriosPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Relatórios</h1>
      <p className="text-xs text-muted-foreground">Relatórios de performance disponíveis para download</p>
      <div className="space-y-3">
        {REPORTS.map(r => (
          <div key={r.id} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{r.campaign}</p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{r.period}</p>
            </div>
            <Badge className={`text-[9px] ${r.status === "disponível" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{r.status}</Badge>
            {r.status === "disponível" && <Button variant="outline" size="sm" className="text-[10px] gap-1"><Download className="w-3 h-3" />PDF</Button>}
          </div>
        ))}
      </div>
    </div>
  )
}
