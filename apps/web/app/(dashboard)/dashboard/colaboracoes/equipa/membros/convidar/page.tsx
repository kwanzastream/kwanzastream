"use client"
import { ArrowLeft, Search, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function ConvidarMembroPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/colaboracoes/equipa/membros"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Convidar Membro</h1></div>
      <div className="relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar por username..." className="bg-white/5 pl-8" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Mensagem de convite (opcional)</p><textarea placeholder="Junta-te à nossa equipa!" className="w-full h-16 rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm resize-none" /></div>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Convite enviado!")}><Send className="w-3 h-3" />Enviar convite</Button>
    </div>
  )
}
