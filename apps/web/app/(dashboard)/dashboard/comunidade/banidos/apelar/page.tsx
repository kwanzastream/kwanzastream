"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
const APPEALS = [{u:"@banned_user",msg:"Peço desculpa pelo comportamento. Prometo respeitar as regras.",date:"10 Mar 2026",reason:"Linguagem ofensiva"}]
export default function ApelarPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Apelos de Ban</h1>
      <div className="flex gap-1"><Link href="/dashboard/comunidade/banidos/temporarios"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Temporários</button></Link><Link href="/dashboard/comunidade/banidos/permanentes"><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-white/5 text-muted-foreground">Permanentes</button></Link><button className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary text-primary-foreground">Apelos</button></div>
      {APPEALS.map(a => <div key={a.u} className="p-3 rounded-xl border border-white/10 space-y-2"><p className="text-xs font-bold">{a.u}</p><p className="text-[9px] text-muted-foreground">Ban original: {a.reason} · {a.date}</p><div className="p-2 rounded bg-white/5 text-[10px] italic">&ldquo;{a.msg}&rdquo;</div><div className="flex gap-1"><Button size="sm" className="flex-1 text-[9px]" onClick={() => toast.success("Apelo aceite — ban levantado!")}>✅ Aceitar</Button><Button size="sm" variant="outline" className="flex-1 text-[9px]" onClick={() => toast.info("Apelo rejeitado")}>❌ Rejeitar</Button></div></div>)}
    </div>
  )
}
