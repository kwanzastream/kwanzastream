"use client"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function VerificacoesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/settings"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Verificações</h1></div>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Email obrigatório</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">Telefone obrigatório</span></label>
      <p className="text-[10px] font-bold">Contas novas (&lt; 7 dias)</p>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">Bloquear</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Slow mode automático</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Contas suspeitas: verificação extra</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Verificações guardadas!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
