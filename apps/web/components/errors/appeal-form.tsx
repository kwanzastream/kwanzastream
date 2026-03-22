"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AppealFormProps { type: "suspensao" | "ban"; reason?: string; date?: string; duration?: string }

export function AppealForm({ type, reason, date, duration }: AppealFormProps) {
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) return (
    <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-center">
      <p className="text-xs text-green-400">✅ Apelo enviado com sucesso</p>
      <p className="text-[10px] text-muted-foreground mt-1">Resposta em 24-48h por email.</p>
    </div>
  )

  return (
    <div className="space-y-4 max-w-lg mx-auto text-left">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
        {reason && <p className="text-[10px] text-muted-foreground">Motivo: <span className="text-foreground">{reason}</span></p>}
        {date && <p className="text-[10px] text-muted-foreground">Data: <span className="text-foreground">{date}</span></p>}
        {duration && <p className="text-[10px] text-muted-foreground">Duração: <span className="text-foreground">{duration}</span></p>}
      </div>
      <div>
        <label className="text-[10px] text-muted-foreground">Explica porque achas que foi um engano:</label>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Descreve a situação..." maxLength={1000} className="w-full mt-1 px-3 py-2 rounded-lg border border-white/10 bg-transparent text-xs min-h-[100px]" />
        <p className="text-[9px] text-muted-foreground text-right">{text.length}/1000</p>
      </div>
      <div>
        <label className="text-[10px] text-muted-foreground">Provas (opcional)</label>
        <input type="file" accept=".jpg,.png,.pdf" className="w-full mt-1 text-xs" />
        <p className="text-[9px] text-muted-foreground">JPG/PNG/PDF, máx 5MB</p>
      </div>
      {type === "ban" && <p className="text-[10px] text-yellow-400 text-center">⚠ Só 1 apelo permitido. Certifica-te que é completo.</p>}
      <Button onClick={() => { if (!text) return toast.error("Escreve a tua explicação"); toast.success("Apelo enviado!"); setSubmitted(true) }} disabled={!text} className="w-full">{text ? "Enviar apelo" : "Escreve o apelo primeiro"}</Button>
    </div>
  )
}
