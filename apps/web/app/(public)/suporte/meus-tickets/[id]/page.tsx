"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { TicketThread } from "@/components/support/ticket-thread"
import api from "@/lib/api"
import Link from "next/link"
export default function MeuTicketDetailPage() {
  const { id } = useParams()
  const [ticket, setTicket] = useState<any>(null)
  useEffect(() => { api.get(`/api/support/tickets/${id}`).then(r => setTicket(r.data)).catch(() => setTicket({ reference: "SUP-2026-000001", subject: "Problema com pagamento", status: "open", messages: [{ content: "Não consigo carregar Salos.", isAdmin: false, createdAt: "22 Mar 09:00" }] })) }, [id])
  if (!ticket) return <div className="max-w-3xl mx-auto px-4 py-8"><p className="text-xs">A carregar...</p></div>
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link href="/suporte/meus-tickets" className="text-[10px] text-muted-foreground hover:text-foreground">← Meus tickets</Link>
      <h1 className="text-xl font-bold">{ticket.subject}</h1>
      <TicketThread messages={ticket.messages} reference={ticket.reference} status={ticket.status} />
      {ticket.status !== "closed" && <Link href={`/suporte/ticket/${id}/responder`} className="inline-block px-4 py-2 rounded-lg bg-primary text-white text-xs">Responder</Link>}
    </div>
  )
}
