"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { InvoiceRow } from "@/components/ads/invoice-row"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function FaturacaoPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get("/api/ads/invoices").then(r => setInvoices(r.data || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  const total = invoices.reduce((s: number, i: any) => s + (i.amount || 0), 0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Faturação</h1>
        <Link href="/ads/faturacao/historico"><Button variant="outline" size="sm" className="text-[10px]">Ver histórico completo</Button></Link>
      </div>
      {invoices.length > 0 && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
          <p className="text-[10px] text-muted-foreground">Total facturado</p>
          <p className="text-2xl font-bold text-primary">{(total / 1000).toFixed(0)}k Kz</p>
        </div>
      )}
      <div className="space-y-2">
        {invoices.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Sem facturas</p>}
        {invoices.map((inv: any) => <InvoiceRow key={inv.id} {...inv} />)}
      </div>
    </div>
  )
}
