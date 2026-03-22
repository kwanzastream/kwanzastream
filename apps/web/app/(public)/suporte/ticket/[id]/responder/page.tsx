"use client"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { toast } from "sonner"
export default function TicketResponderPage() {
  const { id } = useParams(); const router = useRouter()
  const [content, setContent] = useState(""); const [loading, setLoading] = useState(false)
  const submit = async () => { if (!content) return; setLoading(true); try { await api.post(`/api/support/tickets/${id}/reply`, { content }); toast.success("Resposta enviada!"); router.push(`/suporte/ticket/${id}`) } catch { toast.error("Erro. Tenta novamente.") } finally { setLoading(false) } }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-bold">Responder ao Ticket</h1>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Escreve a tua resposta..." className="w-full px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[120px]" />
      <Button onClick={submit} disabled={loading || !content}>{loading ? "A enviar..." : "Enviar resposta"}</Button>
    </div>
  )
}
