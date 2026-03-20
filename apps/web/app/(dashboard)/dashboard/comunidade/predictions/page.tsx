"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const PREDS = [{question:"Vou ganhar esta ronda?",outcomes:[{label:"Sim (Blue)",amt:"12.500 pts",winner:true},{label:"Não (Red)",amt:"8.200 pts"}],date:"20 Mar 2026"},{question:"Top 3 no torneio?",outcomes:[{label:"Sim",amt:"5.000 pts"},{label:"Não",amt:"15.000 pts",winner:true}],date:"18 Mar 2026"}]
export default function PredictionsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Predictions</h1>
      <Button variant="outline" size="sm" className="text-xs w-full" asChild><Link href="/dashboard/stream-manager/predictions">Criar prediction (Stream Manager) →</Link></Button>
      <div className="space-y-1.5">{PREDS.map((p,i) => <div key={i} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-bold">{p.question}</p><p className="text-[8px] text-muted-foreground mb-2">{p.date}</p>{p.outcomes.map(o => <div key={o.label} className="flex items-center justify-between py-1"><span className={`text-[10px] ${o.winner ? "font-bold text-primary" : "text-muted-foreground"}`}>{o.label}{o.winner && " ✅"}</span><span className="text-[9px] text-muted-foreground">{o.amt}</span></div>)}</div>)}</div>
    </div>
  )
}
