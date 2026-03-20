"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function AppealDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/appeals/pendentes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Appeal #{id}</h1></div>
      <div className="space-y-1">{[{l:"Utilizador",v:"@exmembro"},{l:"Banido em",v:"15 Mar 2026"},{l:"Tipo",v:"Permanente"},{l:"Razão do ban",v:"Spam — links repetidos"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
      <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5"><p className="text-[10px] font-bold">Mensagem de apelo</p><p className="text-[9px] mt-1 italic">&ldquo;Fui banido por engano. Eu não estava a fazer spam, estava só a partilhar um link do WhatsApp com o meu grupo de amigos. Prometo respeitar as regras do canal.&rdquo;</p></div>
      <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Mensagens que levaram ao ban</p>{["@exmembro: vem ver wa.me/xxx","@exmembro: wa.me/xxx junta-te","@exmembro: link do grupo wa.me/xxx"].map((m,i) => <p key={i} className="text-[9px] text-red-400 py-0.5">{m}</p>)}</div>
      <div className="p-2 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Histórico</p><p className="text-[8px] text-muted-foreground">1 ban · 2 timeouts · Conta: 45 dias · 34 streams assistidos</p></div>
      <div className="flex gap-2"><Button className="flex-1 gap-1" onClick={() => toast.success("Ban levantado — utilizador notificado")}><Check className="w-3 h-3" />Aceitar apelo</Button><Button variant="outline" className="flex-1 gap-1" onClick={() => toast.info("Ban mantido — utilizador notificado")}><X className="w-3 h-3" />Rejeitar</Button></div>
    </div>
  )
}
