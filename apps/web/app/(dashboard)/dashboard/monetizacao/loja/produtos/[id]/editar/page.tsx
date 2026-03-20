"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function EditarProdutoPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/monetizacao/loja/produtos/${id}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Editar Produto</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input defaultValue="Overlay OBS Angola" className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea rows={3} defaultValue="Overlay profissional para OBS com tema angolano" className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Preço (Kz)</p><Input type="number" defaultValue={500} className="bg-white/5" /></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Produto actualizado!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
