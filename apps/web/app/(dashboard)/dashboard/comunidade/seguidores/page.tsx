"use client"
import { useState } from "react"
import { CommunityMemberRow } from "@/components/community/community-components"
import { MetricCard } from "@/components/analytics/analytics-components"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Ban } from "lucide-react"
import Link from "next/link"
const FOLLOWERS = [
  {u:"@superfan",date:"20 Mar 2026",badges:["⭐"]},{u:"@viewer_ao",date:"18 Mar 2026",badges:[]},{u:"@gamer_luanda",date:"15 Mar 2026",badges:["💎"]},
  {u:"@newbie",date:"14 Mar 2026",badges:[]},{u:"@loyal_fan",date:"10 Mar 2026",badges:["⭐","🛡️"]},
]
export default function SeguidoresPage() {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("recent")
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-lg font-black">Comunidade</h1>
      <div className="flex gap-1 overflow-x-auto pb-1">{[{id:"seguidores",l:"Seguidores",h:"/dashboard/comunidade/seguidores"},{id:"subscritores",l:"Subscritores",h:"/dashboard/comunidade/subscritores"},{id:"vips",l:"VIPs",h:"/dashboard/comunidade/vips"},{id:"moderadores",l:"Moderadores",h:"/dashboard/comunidade/moderadores"},{id:"banidos",l:"Banidos",h:"/dashboard/comunidade/banidos"},{id:"roles",l:"Roles",h:"/dashboard/comunidade/roles"},{id:"emotes",l:"Emotes",h:"/dashboard/comunidade/emotes"},{id:"badges",l:"Badges",h:"/dashboard/comunidade/badges"},{id:"points",l:"Points",h:"/dashboard/comunidade/channel-points/rewards"},{id:"polls",l:"Polls",h:"/dashboard/comunidade/polls"},{id:"predictions",l:"Predictions",h:"/dashboard/comunidade/predictions"}].map(t => <Link key={t.id} href={t.h}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "seguidores" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>{t.l}</button></Link>)}</div>
      <div className="grid grid-cols-3 gap-3"><MetricCard icon="👥" label="Total" value="1.234" /><MetricCard icon="📈" label="Esta semana" value="+89" change="+7.8%" positive /><MetricCard icon="🔄" label="Retenção" value="94%" /></div>
      <div className="flex gap-2"><div className="flex-1 relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar..." className="bg-white/5 pl-8 h-8 text-xs" /></div><div className="flex gap-1">{[{id:"recent",l:"Recentes"},{id:"oldest",l:"Antigos"},{id:"name",l:"Nome"}].map(s => <button key={s.id} onClick={() => setSort(s.id)} className={`px-2 py-1 rounded text-[8px] ${sort === s.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{s.l}</button>)}</div></div>
      <Link href="/dashboard/comunidade/seguidores/novos"><Button variant="outline" size="sm" className="text-xs">⚡ Novos (últimas 48h) →</Button></Link>
      <div className="space-y-1">{FOLLOWERS.map(f => <CommunityMemberRow key={f.u} username={f.u} subtitle={`Seguidor desde ${f.date}`} badges={f.badges} actions={<Button size="icon" variant="ghost" className="w-6 h-6"><Ban className="w-3 h-3 text-red-400" /></Button>} />)}</div>
    </div>
  )
}
