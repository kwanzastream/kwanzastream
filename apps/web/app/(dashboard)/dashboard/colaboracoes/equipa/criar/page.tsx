"use client"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function CriarEquipaPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/colaboracoes/equipa"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Criar Equipa</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input placeholder="Nome da equipa" maxLength={50} className="bg-white/5" /><p className="text-[8px] text-muted-foreground">Max 50 caracteres</p></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea placeholder="Descrição..." maxLength={300} className="w-full h-20 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /><p className="text-[8px] text-muted-foreground">Max 300 caracteres</p></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Imagem (400×400)</p><Button variant="outline" size="sm" className="w-full text-[8px] gap-1"><Upload className="w-3 h-3" />Upload</Button></div><div className="space-y-1"><p className="text-[10px] font-bold">Banner (1200×300)</p><Button variant="outline" size="sm" className="w-full text-[8px] gap-1"><Upload className="w-3 h-3" />Upload</Button></div></div>
      <p className="text-[10px] font-bold">Tipo</p>
      <label className="flex items-center gap-2 py-1"><input type="radio" name="type" defaultChecked /><span className="text-xs">Aberta a candidaturas</span></label>
      <label className="flex items-center gap-2 py-1"><input type="radio" name="type" /><span className="text-xs">Só convites</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Equipa criada!")}><Save className="w-3 h-3" />Criar equipa</Button>
    </div>
  )
}
