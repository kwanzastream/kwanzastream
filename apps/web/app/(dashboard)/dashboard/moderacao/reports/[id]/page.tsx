"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Ban, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"
export default function ReportDetailPage() {
  const { id } = useParams()
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/moderacao/reports/pendentes"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">Report #{id}</h1></div>
      <div className="space-y-1">{[{l:"Reportado por",v:"@viewer1"},{l:"Utilizador reportado",v:"@user2"},{l:"Motivo",v:"Spam no chat"},{l:"Data",v:"20 Mar 2026"}].map(m => <div key={m.l} className="flex justify-between p-2 rounded-xl border border-white/10"><span className="text-[9px] text-muted-foreground">{m.l}</span><span className="text-xs font-bold">{m.v}</span></div>)}</div>
      <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-1">Contexto (mensagens à volta)</p>{["@viewer1: alguém mais a ter lag?","@user2: compra salos aqui bit.ly/xxx","@user2: compra salos aqui bit.ly/xxx","@viewer1: 🚨 reportou @user2"].map((m,i) => <p key={i} className={`text-[9px] py-0.5 ${m.includes("user2") ? "text-red-400" : "text-muted-foreground"}`}>{m}</p>)}</div>
      <div className="p-2 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Histórico de @user2</p><p className="text-[8px] text-muted-foreground">0 bans · 1 timeout · Conta: 3 dias</p></div>
      <div className="flex gap-1"><Button size="sm" className="flex-1 gap-1 text-xs" onClick={() => toast.success("Banido!")}><Ban className="w-3 h-3" />Banir</Button><Button size="sm" variant="outline" className="flex-1 gap-1 text-xs" onClick={() => toast.success("Timeout 10min")}><Clock className="w-3 h-3" />Timeout</Button><Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => toast.info("Ignorado")}><X className="w-3 h-3" />Ignorar</Button></div>
    </div>
  )
}
