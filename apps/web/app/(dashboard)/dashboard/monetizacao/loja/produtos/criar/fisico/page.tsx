"use client"
import { useState } from "react"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarFisicoPage() {
  const [name, setName] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja/produtos/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">👕 Produto Físico</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input value={name} onChange={e => setName(e.target.value)} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Preço (Kz)</p><Input type="number" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Stock</p><Input type="number" className="bg-white/5" /></div></div>
      <div className="p-4 border-2 border-dashed border-white/20 rounded-xl text-center text-xs text-muted-foreground"><Upload className="w-6 h-6 mx-auto mb-1" />Imagens (até 5)</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Variantes</p><Input placeholder="Ex: S, M, L, XL" className="bg-white/5" /></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Peso (kg)</p><Input type="number" step="0.1" className="bg-white/5" /></div><div className="space-y-1"><p className="text-[10px] font-bold">Entrega</p><label className="flex items-center gap-1"><input type="checkbox" defaultChecked /><span className="text-xs">Angola</span></label></div></div>
      <Button className="w-full font-bold gap-1" disabled={!name} onClick={() => toast.success("Produto criado!")}><Save className="w-3 h-3" />Criar produto</Button>
    </div>
  )
}
