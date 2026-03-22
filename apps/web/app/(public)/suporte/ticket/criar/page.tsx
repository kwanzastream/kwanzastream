"use client"
import { TicketForm } from "@/components/support/ticket-form"
import { useRouter } from "next/navigation"
export default function TicketCriarPage() {
  const router = useRouter()
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">📩 Criar Ticket de Suporte</h1>
      <p className="text-xs text-muted-foreground">Descreve o teu problema em detalhe. Resposta esperada em 24-48h (dias úteis WAT).</p>
      <TicketForm onCreated={(t) => router.push(`/suporte/ticket/${t.id}`)} />
    </div>
  )
}
