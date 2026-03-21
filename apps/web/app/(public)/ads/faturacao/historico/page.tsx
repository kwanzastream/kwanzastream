"use client"

import { ChevronLeft } from "lucide-react"
import { InvoiceRow } from "@/components/ads/invoice-row"
import Link from "next/link"

const INVOICES = [
  { id: "INV-ADS-2026-00234", campaignName: "Unitel Spring 2026", amount: 25000, date: "2026-03-25", status: "pago" },
  { id: "INV-ADS-2026-00198", campaignName: "BAI Digital Q1", amount: 15000, date: "2026-02-15", status: "pago" },
  { id: "INV-ADS-2026-00156", campaignName: "Multicaixa Awareness", amount: 10000, date: "2026-01-10", status: "pendente" },
]

export default function HistoricoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/ads/faturacao" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Faturação</Link>
      <h1 className="text-xl font-bold">Histórico de facturas</h1>
      <div className="space-y-2">
        {INVOICES.map(inv => <InvoiceRow key={inv.id} {...inv} />)}
      </div>
    </div>
  )
}
