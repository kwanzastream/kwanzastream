"use client"
import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function PermissoesChatPage() {
  const [who, setWho] = useState("registered")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/settings"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Permissões de Chat</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Quem pode chattar</p>{[{id:"all",l:"Todos (read-only para não-registados)"},{id:"registered",l:"Utilizadores registados"},{id:"followers",l:"Só seguidores"},{id:"subs",l:"Só subscritores"}].map(o => <label key={o.id} className="flex items-center gap-2 py-1"><input type="radio" name="who" checked={who === o.id} onChange={() => setWho(o.id)} /><span className="text-xs">{o.l}</span></label>)}</div>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" defaultChecked /><span className="text-xs">Verificação de email obrigatória</span></label>
      <label className="flex items-center gap-2 py-1"><input type="checkbox" /><span className="text-xs">Bloquear contas com menos de 7 dias</span></label>
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Permissões guardadas!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
