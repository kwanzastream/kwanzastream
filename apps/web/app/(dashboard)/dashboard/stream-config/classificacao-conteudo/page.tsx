"use client"
import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
export default function ClassificacaoPage() {
  const [rating, setRating] = useState("general")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🔞 Classificação</h1>
      {[{id:"general",l:"Geral — adequado para todos"},{id:"13",l:"13+ — linguagem moderada"},{id:"18",l:"18+ — conteúdo adulto"}].map(r => <label key={r.id} className="flex items-center gap-2 py-1"><input type="radio" name="rating" checked={rating === r.id} onChange={() => setRating(r.id)} /><span className="text-xs">{r.l}</span></label>)}
      <p className="text-[8px] text-muted-foreground">Podes alterar por stream. 18+ requer verificação de idade.</p>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Classificação guardada!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
