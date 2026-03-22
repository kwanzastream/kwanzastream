"use client"
import { Receipt, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
export default function FaturacaoDevPage() {
  const invoices = [
    { id: "DEV-2026-001", period: "Março 2026", amount: 0, status: "grátis", desc: "Sandbox — sem custos" },
    { id: "DEV-2026-002", period: "Fevereiro 2026", amount: 0, status: "grátis", desc: "Sandbox — sem custos" },
  ]
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Receipt className="w-8 h-8 text-primary" />
      <h1 className="text-2xl font-bold">Faturação</h1>
      <p className="text-sm text-muted-foreground">Facturação de uso da API e extensões</p>
      <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-center">
        <p className="text-[10px] text-muted-foreground">Plano actual</p>
        <p className="text-lg font-bold text-green-400">Grátis</p>
        <p className="text-[10px] text-muted-foreground">A API é gratuita em sandbox. Em produção, paga-se apenas acima de 100.000 requests/mês.</p>
      </div>
      <div className="space-y-2">
        {invoices.map(inv => (
          <div key={inv.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
            <div className="flex-1"><p className="text-sm">{inv.period}</p><p className="text-[10px] text-muted-foreground">{inv.desc}</p></div>
            <Badge className="bg-green-500/10 text-green-400 text-[9px]">{inv.status}</Badge>
            <span className="text-sm font-bold">{inv.amount} Kz</span>
          </div>
        ))}
      </div>
    </div>
  )
}
