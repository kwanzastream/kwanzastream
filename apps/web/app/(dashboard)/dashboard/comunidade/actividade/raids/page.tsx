"use client"
import { ActivityLogItem } from "@/components/community/community-components"
import Link from "next/link"
export default function RaidsActivityPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Raids</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat",h:"/dashboard/comunidade/actividade/chat"},{id:"follows",l:"Follows",h:"/dashboard/comunidade/actividade/follows"},{id:"subs",l:"Subs",h:"/dashboard/comunidade/actividade/subs"},{id:"raids",l:"Raids",h:"/dashboard/comunidade/actividade/raids"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "raids" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <p className="text-[10px] font-bold">Raids recebidos</p>
      {[{time:"20 Mar",icon:"⚔️",text:"@gamer_ao enviou raid com 89 viewers"},{time:"18 Mar",icon:"⚔️",text:"@dj_luanda enviou raid com 45 viewers"}].map((l,i) => <ActivityLogItem key={i} {...l} />)}
      <p className="text-[10px] font-bold mt-3">Raids enviados</p>
      {[{time:"19 Mar",icon:"⚔️",text:"Enviaste raid para @comedia_ao com 67 viewers"}].map((l,i) => <ActivityLogItem key={i} {...l} />)}
    </div>
  )
}
