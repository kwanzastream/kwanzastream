"use client"
import { Button } from "@/components/ui/button"
import { Check, X, Eye } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
export default function ClaimsPendentesPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📋 Claims Pendentes</h1>
      <div className="flex gap-1"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Pendentes</button><Link href="/dashboard/moderacao/claims/resolvidos"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Resolvidos</button></Link></div>
      <p className="text-xs font-bold text-yellow-400">2 claims pendentes</p>
      {[{id:"1",clip:"Momento incrível",date:"12 Mar",by:"@utilizador3",reason:"Conteúdo da minha stream usado sem permissão"},{id:"2",clip:"Best play GTA",date:"10 Mar",by:"@creator_ao",reason:"Música do meu canal usada sem crédito"}].map(c => <Link key={c.id} href={`/dashboard/moderacao/claims/${c.id}`}><div className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5"><p className="text-xs font-bold">Clip: &ldquo;{c.clip}&rdquo; ({c.date})</p><p className="text-[8px] text-muted-foreground">{c.by}: &ldquo;{c.reason}&rdquo;</p><div className="flex gap-1 mt-2"><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.success("Claim aprovado") }}><Check className="w-2.5 h-2.5" />Aprovar</Button><Button size="sm" variant="outline" className="text-[8px] h-6 gap-0.5" onClick={e => { e.preventDefault(); toast.info("Claim rejeitado") }}><X className="w-2.5 h-2.5" />Rejeitar</Button></div></div></Link>)}
    </div>
  )
}
