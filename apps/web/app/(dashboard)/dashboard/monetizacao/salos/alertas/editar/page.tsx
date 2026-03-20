"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function AlertasEditarPage() {
  const [template, setTemplate] = useState("{username} enviou {valor} Salos: {mensagem}")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/salos/alertas"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Personalizar Alerta</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Texto do alerta</p><Input value={template} onChange={e => setTemplate(e.target.value)} className="bg-white/5" /><p className="text-[8px] text-muted-foreground">Variáveis: {"{username}"}, {"{valor}"}, {"{mensagem}"}</p></div>
      <div className="flex gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Cor</p><input type="color" defaultValue="#FFD700" className="w-10 h-10 rounded" /></div><div className="space-y-1 flex-1"><p className="text-[10px] font-bold">Tamanho</p><div className="flex gap-2">{["Pequeno","Médio","Grande"].map(s => <button key={s} className="px-2 py-1 rounded text-[8px] bg-white/5 text-muted-foreground">{s}</button>)}</div></div></div>
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center"><p className="text-[10px] font-bold text-muted-foreground mb-2">Preview</p><p className="text-sm font-bold text-yellow-400">🎉 @superfan enviou 5.000 Salos: Melhor stream!</p></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Alerta personalizado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
