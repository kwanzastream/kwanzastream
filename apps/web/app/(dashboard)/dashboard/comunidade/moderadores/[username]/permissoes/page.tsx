"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function ModPermissoesPage() {
  const { username } = useParams()
  const [perms, setPerms] = useState({timeout:true,banTemp:true,delete:true,banPerm:false,emotes:false})
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href={`/dashboard/comunidade/moderadores/${username}`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Permissões — @{username}</h1></div>
      {[{k:"timeout",l:"Timeout (até 10 min)"},{k:"banTemp",l:"Ban temporário (até 24h)"},{k:"delete",l:"Eliminar mensagens"},{k:"banPerm",l:"Ban permanente"},{k:"emotes",l:"Gerir emotes e badges"}].map(p => <label key={p.k} className="flex items-center gap-2 py-1"><input type="checkbox" checked={perms[p.k as keyof typeof perms]} onChange={() => setPerms({...perms,[p.k]:!perms[p.k as keyof typeof perms]})} /><span className="text-xs">{p.l}</span></label>)}
      <Button className="w-full font-bold gap-1" onClick={() => toast.success("Permissões actualizadas!")}><Save className="w-3 h-3" />Guardar</Button>
    </div>
  )
}
