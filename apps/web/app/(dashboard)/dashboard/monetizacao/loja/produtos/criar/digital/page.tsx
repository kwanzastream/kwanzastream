"use client"
import { useState } from "react"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarDigitalPage() {
  const [name, setName] = useState("")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/monetizacao/loja/produtos/criar"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">💾 Produto Digital</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input value={name} onChange={e => setName(e.target.value)} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea rows={3} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Preço (Kz)</p><Input type="number" className="bg-white/5" /></div>
      <div className="p-4 border-2 border-dashed border-white/20 rounded-xl text-center text-xs text-muted-foreground"><Upload className="w-6 h-6 mx-auto mb-1" />Ficheiro (max 500MB · ZIP, PDF, PNG, MP3, MP4)</div>
      <div className="p-3 border-2 border-dashed border-white/20 rounded-xl text-center text-xs text-muted-foreground">Preview (imagem ou vídeo demo)</div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Instruções de uso</p><textarea rows={2} className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-xs" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Downloads máximos</p><Input type="number" defaultValue={5} className="bg-white/5" /></div>
      <Button className="w-full font-bold gap-1" disabled={!name} onClick={() => toast.success("Produto digital criado!")}><Save className="w-3 h-3" />Criar produto</Button>
    </div>
  )
}
