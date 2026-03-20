"use client"
import { ModLogItem } from "@/components/moderation/moderation-components"
import Link from "next/link"
export default function LogsDeletadosPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">🗑️ Deletados</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat"},{id:"bans",l:"Bans"},{id:"timeouts",l:"Timeouts"},{id:"deletados",l:"Deletados"},{id:"raids",l:"Raids"},{id:"mods",l:"Moderadores"}].map(t => <Link key={t.id} href={`/dashboard/moderacao/logs/${t.id}`}><button className={`px-3 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "deletados" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      {[{t:"21:38",u:"@viewer5",c:"\"bit.ly/xxx compra aqui\" — Eliminado por @mod2",type:"deleted" as const},{t:"21:35",u:"@viewer2",c:"\"[conteúdo ofensivo]\" — AutoMod",type:"deleted" as const}].map((l,i) => <ModLogItem key={i} time={l.t} user={l.u} content={l.c} type={l.type} />)}
    </div>
  )
}
