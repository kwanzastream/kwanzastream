"use client"
import { ArrowLeft, Save, Upload, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function DefinicoesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/colaboracoes/equipa/gerir"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Definições da Equipa</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Nome</p><Input defaultValue="Angola Gaming Crew" maxLength={50} className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Descrição</p><textarea defaultValue="Os melhores gamers de Angola!" maxLength={300} className="w-full h-16 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /></div>
      <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><p className="text-[10px] font-bold">Imagem</p><Button variant="outline" size="sm" className="w-full text-[8px] gap-1"><Upload className="w-3 h-3" />Alterar</Button></div><div className="space-y-1"><p className="text-[10px] font-bold">Banner</p><Button variant="outline" size="sm" className="w-full text-[8px] gap-1"><Upload className="w-3 h-3" />Alterar</Button></div></div>
      <p className="text-[10px] font-bold">Tipo</p>
      <label className="flex items-center gap-2 py-1"><input type="radio" name="type" defaultChecked /><span className="text-xs">Aberta a candidaturas</span></label>
      <label className="flex items-center gap-2 py-1"><input type="radio" name="type" /><span className="text-xs">Só convites</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Definições guardadas!")}><Save className="w-3 h-3" />Guardar</Button>
      <hr className="border-white/10" />
      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => toast.info("Selecciona o novo líder")}>Transferir liderança</Button>
      <Button variant="outline" size="sm" className="w-full text-xs text-red-400 border-red-400/20" onClick={() => toast.error("Equipa dissolvida")}><AlertTriangle className="w-3 h-3 mr-1" />Dissolver equipa</Button>
    </div>
  )
}
