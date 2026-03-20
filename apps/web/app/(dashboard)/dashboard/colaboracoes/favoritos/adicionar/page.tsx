"use client"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CollabChannelCard } from "@/components/collaborations/collab-components"
import { toast } from "sonner"
import Link from "next/link"
export default function AdicionarFavoritoPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/colaboracoes/favoritos"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Adicionar Favorito</h1></div>
      <div className="relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input placeholder="Pesquisar por username..." className="bg-white/5 pl-8" /></div>
      <p className="text-[10px] font-bold">Sugestões</p><p className="text-[8px] text-muted-foreground">Canais com quem já colaboraste + canais que te seguem</p>
      {[{u:"@canal4",c:"Gaming",s:"live" as const,v:120},{u:"@canal5",c:"Educational",s:"offline" as const}].map(ch => <div key={ch.u} className="flex items-center gap-2"><div className="flex-1"><CollabChannelCard username={ch.u} category={ch.c} status={ch.s} viewers={ch.v} /></div><Button size="sm" className="text-[8px] h-7 shrink-0" onClick={() => toast.success("Adicionado!")}>+ Add</Button></div>)}
      <p className="text-[8px] text-muted-foreground">Máximo 20 favoritos</p>
    </div>
  )
}
