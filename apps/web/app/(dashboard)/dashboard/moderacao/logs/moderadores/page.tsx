"use client"
import { ModLogItem } from "@/components/moderation/moderation-components"
import Link from "next/link"
export default function LogsModsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">👮 Acções de Moderadores</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat"},{id:"bans",l:"Bans"},{id:"timeouts",l:"Timeouts"},{id:"deletados",l:"Deletados"},{id:"raids",l:"Raids"},{id:"mods",l:"Moderadores"}].map(t => <Link key={t.id} href={`/dashboard/moderacao/logs/${t.id}`}><button className={`px-3 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "mods" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      {[{t:"21:36",u:"@mod1",c:"Timeout @viewer3 (10min) — Spam",type:"mod" as const},{t:"21:38",u:"@mod2",c:"Eliminou msg de @viewer5 — Link spam",type:"mod" as const},{t:"20:15",u:"@mod1",c:"Ban @toxic (7d) — Linguagem ofensiva",type:"mod" as const}].map((l,i) => <ModLogItem key={i} time={l.t} user={l.u} content={l.c} type={l.type} />)}
    </div>
  )
}
