"use client"
import { ModLogItem } from "@/components/moderation/moderation-components"
import Link from "next/link"
export default function LogsRaidsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-bold">⚔️ Raids Recebidos</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat"},{id:"bans",l:"Bans"},{id:"timeouts",l:"Timeouts"},{id:"deletados",l:"Deletados"},{id:"raids",l:"Raids"},{id:"mods",l:"Moderadores"}].map(t => <Link key={t.id} href={`/dashboard/moderacao/logs/${t.id}`}><button className={`px-3 py-1 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "raids" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      {[{channel:"@streamer_ao",viewers:45,msgs:120,actions:"Nenhuma"},{channel:"@gamer_luanda",viewers:12,msgs:34,actions:"Slow mode 30s activado"}].map(r => <div key={r.channel} className="p-3 rounded-xl border border-white/10"><p className="text-xs font-bold">{r.channel} → {r.viewers} viewers</p><p className="text-[8px] text-muted-foreground">{r.msgs} mensagens · Acção: {r.actions}</p></div>)}
    </div>
  )
}
