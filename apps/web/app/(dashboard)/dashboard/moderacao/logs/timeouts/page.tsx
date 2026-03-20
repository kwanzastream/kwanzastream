"use client"
import { ModLogItem } from "@/components/moderation/moderation-components"
import Link from "next/link"
export default function LogsTimeoutsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⏱️ Timeouts</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat"},{id:"bans",l:"Bans"},{id:"timeouts",l:"Timeouts"},{id:"deletados",l:"Deletados"},{id:"raids",l:"Raids"},{id:"mods",l:"Moderadores"}].map(t => <Link key={t.id} href={`/dashboard/moderacao/logs/${t.id}`}><button className={`px-3 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "timeouts" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      {[{t:"21:36",u:"@viewer3",c:"Timeout 10min — Spam (por @mod1)",type:"timeout" as const},{t:"21:20",u:"@viewer5",c:"Timeout 5min — AutoMod spam",type:"timeout" as const},{t:"20:50",u:"@viewer7",c:"Timeout 60s — Flood",type:"timeout" as const}].map((l,i) => <ModLogItem key={i} time={l.t} user={l.u} content={l.c} type={l.type} />)}
    </div>
  )
}
