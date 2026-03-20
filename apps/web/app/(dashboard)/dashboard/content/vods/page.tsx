"use client"
import { useState } from "react"
import { ContentListItem } from "@/components/content-manager/content-components"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Upload, Film, Scissors, Smartphone, FolderOpen, Calendar, Star, Trophy, AlertTriangle } from "lucide-react"

const TABS = [{id:"vods",l:"VODs",href:"/dashboard/content/vods"},{id:"clips",l:"Clips",href:"/dashboard/content/clips"},{id:"shorts",l:"Shorts",href:"/dashboard/content/shorts"},{id:"colecoes",l:"Colecções",href:"/dashboard/content/colecoes"},{id:"schedule",l:"Schedule",href:"/dashboard/content/schedule"},{id:"highlights",l:"Highlights",href:"/dashboard/content/highlights"},{id:"eventos",l:"Eventos",href:"/dashboard/content/eventos"},{id:"copyright",l:"Copyright",href:"/dashboard/content/copyright"}]
const VODS = [
  {id:"1",title:"FIFA 26 — Torneio Angola",sub:"20 Mar 2026",duration:"2h 34min",views:1234,status:"public" as const},
  {id:"2",title:"Just Talking — Conversa com a comunidade",sub:"18 Mar 2026",duration:"1h 45min",views:567,status:"public" as const},
  {id:"3",title:"Kuduro Live DJ Set",sub:"15 Mar 2026",duration:"3h 10min",views:890,status:"followers" as const},
  {id:"4",title:"Call of Duty — Ranked Grind",sub:"12 Mar 2026",duration:"2h 00min",views:345,status:"private" as const},
  {id:"5",title:"Novo stream — processando",sub:"10 Mar 2026",duration:"1h 20min",views:0,status:"processing" as const},
]

export default function VodsPage() {
  const [search, setSearch] = useState("")
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between"><h1 className="text-lg font-black">Conteúdo</h1><Link href="/dashboard/content/vods/upload"><Button size="sm" className="gap-1 text-xs"><Upload className="w-3 h-3" />Upload VOD</Button></Link></div>
      <div className="flex gap-1 overflow-x-auto pb-1">{TABS.map(t => <Link key={t.id} href={t.href}><button className={`px-3 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${t.id === "vods" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"}`}>{t.l}</button></Link>)}</div>
      <div className="flex gap-2"><div className="flex-1 relative"><Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar VODs..." className="bg-white/5 pl-8 h-8 text-xs" /></div></div>
      <div className="space-y-1.5">{VODS.map(v => <Link key={v.id} href={`/dashboard/content/vods/${v.id}`}><ContentListItem title={v.title} subtitle={v.sub} duration={v.duration} views={v.views} status={v.status} /></Link>)}</div>
    </div>
  )
}
