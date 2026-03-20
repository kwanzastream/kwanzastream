"use client"
import { useState } from "react"
import { ActivityLogItem } from "@/components/community/community-components"
import Link from "next/link"
const LOG = [
  {time:"14:23",icon:"💬",text:"@viewer1: Boa stream! GG"},{time:"14:22",icon:"⏱",text:"@mod_trusted deu timeout a @spammer (5min)"},{time:"14:20",icon:"🗑️",text:"Mensagem de @troll eliminada por @mod_trusted"},
  {time:"14:18",icon:"💛",text:"@generous enviou 500 Salos"},{time:"14:15",icon:"⭐",text:"@new_sub subscreveu Tier 2"},{time:"14:10",icon:"👥",text:"@new_fan seguiu o canal"},
]
export default function ActividadeChatPage() {
  const [period, setPeriod] = useState("last")
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Actividade</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat",h:"/dashboard/comunidade/actividade/chat"},{id:"follows",l:"Follows",h:"/dashboard/comunidade/actividade/follows"},{id:"subs",l:"Subs",h:"/dashboard/comunidade/actividade/subs"},{id:"raids",l:"Raids",h:"/dashboard/comunidade/actividade/raids"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "chat" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="flex gap-1">{[{id:"last",l:"Último stream"},{id:"24h",l:"24h"},{id:"7d",l:"7 dias"}].map(p => <button key={p.id} onClick={() => setPeriod(p.id)} className={`px-2 py-0.5 rounded text-[8px] ${period === p.id ? "bg-white/10 text-white" : "text-muted-foreground"}`}>{p.l}</button>)}</div>
      <div>{LOG.map((l,i) => <ActivityLogItem key={i} {...l} />)}</div>
    </div>
  )
}
