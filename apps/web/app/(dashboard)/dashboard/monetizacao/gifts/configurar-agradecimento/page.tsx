"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ConfigAgradecimentoPage() {
  const [template, setTemplate] = useState("{gifter} ofereceu {qty} subscrições ao canal! 🙏")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/gifts/historico"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Agradecimento de Gifts</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Mensagem</p><Input value={template} onChange={e => setTemplate(e.target.value)} className="bg-white/5" /><p className="text-[8px] text-muted-foreground">Variáveis: {"{gifter}"}, {"{qty}"}</p></div>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Mostrar no chat</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Activar alerta visual</span></label>
      <div className="space-y-1"><p className="text-[10px] font-bold">Som</p><select className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm"><option>Padrão</option><option>Festivo</option><option>Subtil</option><option>Sem som</option></select></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Agradecimento configurado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
