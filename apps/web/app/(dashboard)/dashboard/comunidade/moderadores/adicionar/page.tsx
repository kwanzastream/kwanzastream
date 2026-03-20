"use client"
import { useState } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function AdicionarModPage() {
  const [username, setUsername] = useState("")
  const [perms, setPerms] = useState({timeout:true,banTemp:true,delete:true,banPerm:false,emotes:false})
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/comunidade/moderadores"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Adicionar Moderador</h1></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Username</p><Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Pesquisar entre seguidores..." className="bg-white/5" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Permissões</p>{[{k:"timeout",l:"Timeout (até 10 min)"},{k:"banTemp",l:"Ban temporário (até 24h)"},{k:"delete",l:"Eliminar mensagens"},{k:"banPerm",l:"Ban permanente"},{k:"emotes",l:"Gerir emotes e badges"}].map(p => <label key={p.k} className="flex items-center gap-2 py-1"><input type="checkbox" checked={perms[p.k as keyof typeof perms]} onChange={() => setPerms({...perms,[p.k]:!perms[p.k as keyof typeof perms]})} /><span className="text-xs">{p.l}</span></label>)}</div>
      <Button className="w-full font-bold gap-1" disabled={!username} onClick={() => toast.success("Moderador adicionado!")}><Plus className="w-3 h-3" />Adicionar moderador</Button>
    </div>
  )
}
