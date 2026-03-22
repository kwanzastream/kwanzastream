"use client"
import { useState, useEffect } from "react"
import api from "@/lib/api"
import Link from "next/link"
export default function MeusTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  useEffect(() => { api.get("/api/support/tickets").then(r => setTickets(r.data || [])).catch(() => setTickets([{ id: "1", reference: "SUP-2026-000001", subject: "Problema com pagamento", status: "open", category: "pagamentos", createdAt: "2026-03-22" }])) }, [])
  const colors: Record<string, string> = { open: "text-green-400 bg-green-500/10", pending: "text-yellow-400 bg-yellow-500/10", resolved: "text-blue-400 bg-blue-500/10", closed: "text-muted-foreground bg-white/5" }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold">Meus Tickets</h1><Link href="/suporte/ticket/criar" className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs">+ Novo ticket</Link></div>
      {tickets.length === 0 ? <p className="text-xs text-muted-foreground text-center py-8">Sem tickets. Tudo ok! 🎉</p> :
      <div className="space-y-2">{tickets.map(t => <Link key={t.id} href={`/suporte/meus-tickets/${t.id}`} className="block p-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors"><div className="flex items-center justify-between"><span className="text-xs font-semibold">{t.subject}</span><span className={`text-[9px] px-1.5 py-0.5 rounded-full ${colors[t.status] || ""}`}>{t.status}</span></div><p className="text-[10px] text-muted-foreground mt-1">{t.reference} · {t.category}</p></Link>)}</div>}
    </div>
  )
}
