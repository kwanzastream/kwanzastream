"use client"
import { SimpleLineChart } from "@/components/analytics/analytics-components"
import { ActivityLogItem } from "@/components/community/community-components"
import Link from "next/link"
const FOLLOWS_DATA = [{label:"18h",value:2},{label:"19h",value:5},{label:"20h",value:12},{label:"21h",value:18},{label:"22h",value:8},{label:"23h",value:3}]
export default function FollowsPage() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-lg font-black">Follows & Unfollows</h1>
      <div className="flex gap-1">{[{id:"chat",l:"Chat",h:"/dashboard/comunidade/actividade/chat"},{id:"follows",l:"Follows",h:"/dashboard/comunidade/actividade/follows"},{id:"subs",l:"Subs",h:"/dashboard/comunidade/actividade/subs"},{id:"raids",l:"Raids",h:"/dashboard/comunidade/actividade/raids"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1 rounded-full text-[9px] font-bold ${t.id === "follows" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button></Link>)}</div>
      <div className="p-4 rounded-xl border border-white/10"><p className="text-[10px] font-bold mb-3">Follows por hora (último stream)</p><SimpleLineChart data={FOLLOWS_DATA} color="hsl(142 71% 45%)" /></div>
      {[{time:"21:34",icon:"👥",text:"@new1 seguiu (via stream)"},{time:"21:20",icon:"👥",text:"@new2 seguiu (via raid)"},{time:"20:45",icon:"❌",text:"@old_viewer deixou de seguir"}].map((l,i) => <ActivityLogItem key={i} {...l} />)}
    </div>
  )
}
