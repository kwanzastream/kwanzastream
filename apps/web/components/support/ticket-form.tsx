"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { toast } from "sonner"

interface TicketFormProps { onCreated?: (ticket: any) => void }
export function TicketForm({ onCreated }: TicketFormProps) {
  const [cat, setCat] = useState("conta")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("normal")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!subject || !message) return toast.error("Preenche todos os campos")
    setLoading(true)
    try {
      const { data } = await api.post("/api/support/tickets", { category: cat, subject, message, priority })
      toast.success(`Ticket criado: ${data.reference}`)
      onCreated?.(data)
      setSubject(""); setMessage("")
    } catch { toast.error("Erro ao criar ticket. Inicia sessão primeiro.") }
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-4 max-w-lg">
      <div><label className="text-[10px] text-muted-foreground">Categoria</label>
        <select value={cat} onChange={e => setCat(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs">
          {["conta","pagamentos","streaming","chat","tecnico","criadores","outro"].map(c => <option key={c} value={c} className="bg-black">{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
        </select>
      </div>
      <div><label className="text-[10px] text-muted-foreground">Assunto</label>
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Descreve o problema em poucas palavras" className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs" />
      </div>
      <div><label className="text-[10px] text-muted-foreground">Descrição</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Explica o problema em detalhe..." className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[120px]" />
      </div>
      <div><label className="text-[10px] text-muted-foreground">Prioridade</label>
        <div className="flex gap-3 mt-1">{["normal","urgente"].map(p => <label key={p} className="flex items-center gap-1 text-xs cursor-pointer"><input type="radio" name="priority" value={p} checked={priority === p} onChange={() => setPriority(p)} />{p === "normal" ? "○ Normal" : "🔴 Urgente"}</label>)}</div>
      </div>
      <Button onClick={submit} disabled={loading} className="w-full">{loading ? "A criar..." : "📩 Enviar ticket"}</Button>
      <p className="text-[9px] text-muted-foreground text-center">Resposta esperada em 24-48h (dias úteis WAT)</p>
    </div>
  )
}
