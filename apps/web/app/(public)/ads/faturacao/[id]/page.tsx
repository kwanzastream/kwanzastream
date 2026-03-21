"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Loader2, ChevronLeft, Download, Building, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

export default function FaturaPage() {
  const { id } = useParams()
  const [invoice, setInvoice] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/ads/invoices/${id}`).then(r => setInvoice(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
  if (!invoice) return <div className="text-center py-20 text-muted-foreground">Fatura não encontrada</div>

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <Link href="/ads/faturacao" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="w-3 h-3" />Faturação</Link>

      <div className="p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <FileText className="w-8 h-8 text-primary" />
          <span className="text-[10px] text-muted-foreground">{invoice.id}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground"><Building className="w-3 h-3" />{invoice.company}</div>
        <p className="text-[10px] text-muted-foreground">NIF: {invoice.nif} · {invoice.address}</p>

        <div className="border-t border-white/10 pt-3 space-y-2">
          {invoice.items?.map((item: any, i: number) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="flex-1 text-muted-foreground">{item.description}</span>
              <span className="font-medium">{item.total.toLocaleString()} Kz</span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-3 space-y-1">
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">Subtotal</span><span>{invoice.subtotal?.toLocaleString()} Kz</span></div>
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">IVA (14%)</span><span>{invoice.iva?.toLocaleString()} Kz</span></div>
          <div className="flex justify-between text-sm font-bold pt-1"><span>Total</span><span className="text-primary">{invoice.total?.toLocaleString()} Kz</span></div>
        </div>
      </div>

      <Button className="w-full gap-1.5"><Download className="w-3.5 h-3.5" />Download PDF</Button>
    </div>
  )
}
