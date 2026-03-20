"use client"
import { ActivityLogItem } from "@/components/community/community-components"
import Link from "next/link"
export default function SubsActivityPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Actividade de Subs</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat",h:"/dashboard/comunidade/actividade/chat"},{id:"follows",l:"Follows",h:"/dashboard/comunidade/actividade/follows"},{id:"subs",l:"Subs",h:"/dashboard/comunidade/actividade/subs"},{id:"raids",l:"Raids",h:"/dashboard/comunidade/actividade/raids"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "subs" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      {[{time:"21:30",icon:"⭐",text:"@new_sub subscreveu Tier 2 (1.500 Kz)"},{time:"20:15",icon:"🔄",text:"@loyal renovou Tier 1 (12 meses consecutivos!)"},{time:"19:00",icon:"🎁",text:"@generous ofereceu sub Tier 1 a @lucky_viewer"},{time:"18:30",icon:"📉",text:"@ex_sub cancelou Tier 1 (motivo: financeiro)"}].map((l,i) => <ActivityLogItem key={i} {...l} />)}
    </div>
  )
}
