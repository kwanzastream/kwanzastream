"use client"
import { useState } from "react"
import { ModLogItem } from "@/components/moderation/moderation-components"
import Link from "next/link"
export default function LogsBansPage() {
  const [filter, setFilter] = useState("all")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🚫 Bans</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat"},{id:"bans",l:"Bans"},{id:"timeouts",l:"Timeouts"},{id:"deletados",l:"Deletados"},{id:"raids",l:"Raids"},{id:"mods",l:"Moderadores"}].map(t => <Link key={t.id} href={`/dashboard/moderacao/logs/${t.id}`}><button className={`px-3 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "bans" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="flex gap-1">{["Todos","Activos","Expirados","Levantados"].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-2 py-0.5 rounded text-[8px] ${filter === f ? "bg-white/10" : "text-muted-foreground"}`}>{f}</button>)}</div>
      {[{t:"21:36",u:"@spammer",c:"Ban permanente — Spam repetido",type:"ban" as const},{t:"20:15",u:"@toxic",c:"Ban 7d — Linguagem ofensiva (por @mod1)",type:"ban" as const},{t:"18:00",u:"@viewer3",c:"Ban levantado — Apelo aceite",type:"normal" as const}].map((l,i) => <ModLogItem key={i} time={l.t} user={l.u} content={l.c} type={l.type} />)}
    </div>
  )
}
