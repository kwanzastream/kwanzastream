"use client"
import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Shield, Plus, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"

const MOCK = [
  { username: "danca_ao", displayName: "Dança AO", permissions: ["aprovar membros", "gerir conteúdo"] },
]

export default function TriboGerirModeradoresPage() {
  const { slug } = useParams()
  const [newMod, setNewMod] = useState("")

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-4">
      <div className="flex items-center gap-3"><Link href={`/tribos/${slug}/gerir`}><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-blue-400" />Moderadores</h1></div>
      <div className="flex gap-2"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={newMod} onChange={e => setNewMod(e.target.value)} placeholder="Pesquisar membro para promover..." className="pl-9 h-9 bg-white/5" /></div><Button size="sm" className="text-xs gap-1" onClick={() => { if (newMod) { toast.success(`@${newMod} adicionado como moderador`); setNewMod("") } }}><Plus className="w-3 h-3" />Adicionar</Button></div>
      <div className="space-y-2">
        {MOCK.map(m => (
          <div key={m.username} className="flex items-center gap-3 p-3 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400 font-bold">{m.displayName[0]}</div>
            <div className="flex-1"><p className="text-sm font-bold">@{m.username}</p><div className="flex gap-1 mt-0.5">{m.permissions.map(p => <Badge key={p} variant="outline" className="text-[8px]">{p}</Badge>)}</div></div>
            <Button size="sm" variant="ghost" className="h-7 px-2 text-[10px] text-red-400 gap-0.5" onClick={() => toast.success(`@${m.username} removido como moderador`)}><X className="w-3 h-3" />Remover</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
