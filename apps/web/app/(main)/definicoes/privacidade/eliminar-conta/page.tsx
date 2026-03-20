"use client"
import { useState } from "react"
import { ArrowLeft, Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DangerZone } from "@/components/settings/settings-components"
import Link from "next/link"
export default function EliminarContaPage() {
  const [confirm, setConfirm] = useState("")
  const [password, setPassword] = useState("")
  const [deleting, setDeleting] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/privacidade"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold text-red-400 flex items-center gap-2"><Trash2 className="w-5 h-5" />Eliminar Conta</h1></div>
      <DangerZone>
        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto" />
        <p className="text-sm font-bold text-center text-red-400">Esta acção é irreversível</p>
        <div className="text-[10px] text-muted-foreground space-y-1"><p className="font-bold">Será eliminado:</p><ul className="space-y-0.5 pl-3"><li className="list-disc">Todos os streams e VODs</li><li className="list-disc">Salos e subscrições</li><li className="list-disc">Mensagens e chat</li><li className="list-disc">Perfil e seguidores</li></ul></div>
        <div className="text-[10px] text-muted-foreground space-y-1"><p className="font-bold">Será mantido (obrigação legal):</p><ul className="space-y-0.5 pl-3"><li className="list-disc">Transacções financeiras</li><li className="list-disc">Facturas emitidas</li></ul></div>
      </DangerZone>
      <div className="space-y-1"><p className="text-[10px] font-bold">Escreve DELETE para confirmar</p><Input value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="DELETE" className="bg-white/5 font-mono" /></div>
      <div className="space-y-1"><p className="text-[10px] font-bold">Senha actual</p><Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-white/5" /></div>
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-[10px] text-muted-foreground">30 dias para reverter — envia email de recuperação dentro desse prazo.</div>
      <Button variant="destructive" className="w-full h-12 gap-2 font-bold" disabled={confirm !== "DELETE" || !password || deleting} onClick={() => setDeleting(true)}>{deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Trash2 className="w-4 h-4" />Eliminar conta permanentemente</>}</Button>
    </div>
  )
}
