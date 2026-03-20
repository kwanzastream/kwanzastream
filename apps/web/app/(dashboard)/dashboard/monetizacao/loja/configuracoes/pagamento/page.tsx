"use client"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function PagamentoConfigPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Métodos de Pagamento</h1></div>
      {[{name:"Multicaixa Express",active:true},{name:"e-Kwanza",active:true},{name:"Saldo Kwanza Stream",active:true},{name:"Unitel Money",active:false}].map(m => <label key={m.name} className="flex items-center justify-between p-3 rounded-xl border border-white/10"><span className="text-xs font-bold">{m.name}</span><input type="checkbox" defaultChecked={m.active} /></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Métodos guardados!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
