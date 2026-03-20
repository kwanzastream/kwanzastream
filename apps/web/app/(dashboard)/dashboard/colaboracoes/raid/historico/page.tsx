"use client"
import { useState } from "react"
export default function RaidHistoricoPage() {
  const [filter, setFilter] = useState("all")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">📜 Histórico de Raids</h1>
      <div className="flex gap-1">{["Todos","Enviados","Recebidos"].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${filter === f ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{f}</button>)}</div>
      {[{ch:"@canal1",type:"Enviado",viewers:234,followers:"+12",date:"19 Mar"},{ch:"@canal-origem1",type:"Recebido",viewers:45,followers:"+8",date:"19 Mar"},{ch:"@canal2",type:"Enviado",viewers:189,followers:"+5",date:"15 Mar"}].map((r,i) => <div key={i} className="p-2.5 rounded-xl border border-white/10"><div className="flex justify-between"><span className="text-xs font-bold">{r.ch}</span><span className={`text-[8px] font-bold ${r.type === "Enviado" ? "text-blue-400" : "text-green-400"}`}>{r.type}</span></div><p className="text-[8px] text-muted-foreground">{r.viewers} viewers · {r.followers} seguidores · {r.date}</p></div>)}
    </div>
  )
}
