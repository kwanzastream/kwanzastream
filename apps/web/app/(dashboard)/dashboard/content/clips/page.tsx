"use client"
import { useState } from "react"
import { ContentListItem } from "@/components/content-manager/content-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const CLIPS = [
  {id:"1",title:"Golo incrível no FIFA",sub:"Criado por @viewer1 · 20 Mar",duration:"30s",views:1234,status:"public" as const},
  {id:"2",title:"Momento cómico no chat",sub:"Criado por ti · 18 Mar",duration:"45s",views:890,status:"public" as const},
  {id:"3",title:"Vitória clutch",sub:"Criado por @clipper · 15 Mar",duration:"60s",views:567,status:"public" as const},
]
export default function ClipsPage() {
  const [tab, setTab] = useState("all")
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3"><h1 className="text-lg font-black">Clips</h1></div>
      <div className="flex gap-1">{[{id:"all",l:"Todos"},{id:"mine",l:"Meus"},{id:"viewers",l:"Viewers"}].map(t => <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${tab === t.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`}>{t.l}</button>)}</div>
      <div className="space-y-1.5">{CLIPS.map(c => <Link key={c.id} href={`/dashboard/content/clips/${c.id}`}><ContentListItem title={c.title} subtitle={c.sub} duration={c.duration} views={c.views} status={c.status} /></Link>)}</div>
    </div>
  )
}
