"use client"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, Shield, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Link from "next/link"
export default function SenhaPage() {
  const [showPw, setShowPw] = useState(false)
  const [saving, setSaving] = useState(false)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/seguranca"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Alterar Senha</h1></div>
      <div className="space-y-3">
        <div className="space-y-1"><p className="text-[10px] font-bold">Senha actual</p><div className="relative"><Input type={showPw ? "text" : "password"} className="bg-white/5 pr-10" /><button className="absolute right-2 top-2" onClick={() => setShowPw(!showPw)}>{showPw ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}</button></div></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Nova senha</p><Input type="password" className="bg-white/5" /><div className="h-1 w-full bg-white/10 rounded-full"><div className="h-1 w-1/3 bg-yellow-400 rounded-full" /></div><p className="text-[8px] text-yellow-400">Força: Média</p></div>
        <div className="space-y-1"><p className="text-[10px] font-bold">Confirmar nova senha</p><Input type="password" className="bg-white/5" /></div>
      </div>
      <Button className="w-full h-12 gap-2 font-bold" disabled={saving} onClick={() => { setSaving(true); setTimeout(() => { toast.success("Senha alterada! Email de confirmação enviado."); setSaving(false) }, 1500) }}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Shield className="w-4 h-4" />Guardar nova senha</>}</Button>
    </div>
  )
}
