"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface InvoiceRowProps {
  id: string
  campaignName: string
  amount: number
  date: string
  status: string
}

export function InvoiceRow({ id, campaignName, amount, date, status }: InvoiceRowProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all">
      <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{campaignName}</p>
        <p className="text-[10px] text-muted-foreground">{id} · {new Date(date).toLocaleDateString("pt-AO")}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold">{(amount / 1000).toFixed(0)}k Kz</p>
        <Badge className={`text-[9px] ${status === "pago" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
          {status === "pago" ? "✅ Pago" : "⏳ Pendente"}
        </Badge>
      </div>
      <Button variant="outline" size="sm" className="text-[10px] shrink-0"><Download className="w-3 h-3" /></Button>
    </div>
  )
}
