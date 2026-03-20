"use client"
import { ArrowLeft, Flame, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function HypeTrainPage() {
  const isActive = false
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-3"><Link href="/dashboard/stream-manager"><Button variant="ghost" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link><h1 className="text-lg font-bold">🚂 Hype Train / Salos Frenesi</h1></div>
      {isActive ? (
        <div className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-3 text-center"><Flame className="w-10 h-10 text-orange-400 mx-auto animate-pulse" /><p className="text-xl font-black text-orange-400">Nível 3 🔥</p><div className="h-3 rounded-full bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all" style={{width:"65%"}} /></div><p className="text-[9px] text-muted-foreground">65% para nível 4 · 1:34 restante</p>
          <div className="space-y-1">{[{u:"@fan1",v:"200 Salos"},{u:"@sub_lover",v:"Sub Tier 2"},{u:"@generous",v:"500 Salos"}].map(c => <p key={c.u} className="text-[10px] text-muted-foreground">{c.u} — {c.v}</p>)}</div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl border border-white/10 text-center space-y-3"><p className="text-2xl">🚂</p><p className="text-sm text-muted-foreground">Nenhum Hype Train activo</p><div className="p-3 rounded-xl bg-white/5 text-[10px] text-muted-foreground flex items-start gap-2"><Info className="w-3 h-3 text-primary shrink-0 mt-0.5" /><p>Hype Train activa automaticamente quando há uma sequência de Salos + subscrições num período curto. Threshold: 5 eventos em 3 minutos.</p></div></div>
      )}
      <div className="p-3 rounded-xl border border-white/10"><p className="text-[10px] font-bold">Histórico desta sessão</p><p className="text-[9px] text-muted-foreground mt-1">Nenhum Hype Train nesta sessão.</p></div>
    </div>
  )
}
