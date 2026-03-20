"use client"
import { ArrowLeft, Clock, Check, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
const LOGINS = [
  { date: "20 Mar, 14:30", device: "Chrome · Windows", location: "Luanda", success: true },
  { date: "20 Mar, 09:15", device: "Safari · iPhone", location: "Luanda", success: true },
  { date: "19 Mar, 22:00", device: "Chrome · Mac", location: "Lisboa", success: false },
  { date: "19 Mar, 18:30", device: "Chrome · Windows", location: "Luanda", success: true },
  { date: "18 Mar, 16:00", device: "Firefox · Android", location: "Benguela", success: true },
]
export default function HistoricoLoginPage() {
  const suspicious = LOGINS.some(l => !l.success)
  return (
    <div className="max-w-lg space-y-5">
      <div className="flex items-center gap-3"><Link href="/definicoes/seguranca"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold flex items-center gap-2"><Clock className="w-5 h-5" />Histórico de Login</h1></div>
      {suspicious && <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 text-xs flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />Login suspeito detectado — verifica as sessões activas</div>}
      <div className="space-y-1">{LOGINS.map((l, i) => <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${l.success ? "border-white/10" : "border-red-500/20 bg-red-500/5"}`}><div><p className="text-xs font-bold">{l.date}</p><p className="text-[9px] text-muted-foreground">{l.device} · {l.location}</p></div><Badge className={l.success ? "bg-green-500/10 text-green-400 text-[7px]" : "bg-red-500/10 text-red-400 text-[7px]"}>{l.success ? <><Check className="w-3 h-3" />Sucesso</> : <><X className="w-3 h-3" />Falhado</>}</Badge></div>)}</div>
    </div>
  )
}
